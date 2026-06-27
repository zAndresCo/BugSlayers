from datetime import datetime, timedelta
from jose import JWTError, jwt
from sqlalchemy.orm import Session
from fastapi import HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
import httpx
import os
from app.database import get_db
from app.models import Usuario

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY", "bugslayers-secret-key-change-in-production-2026")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 1440  # 24 horas

security = HTTPBearer()

# Google OAuth2 Config
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID", "")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET", "")
GOOGLE_REDIRECT_URI = os.getenv("GOOGLE_REDIRECT_URI", "http://localhost:3000/auth/google/callback")

# Microsoft OAuth2 Config
MICROSOFT_CLIENT_ID = os.getenv("MICROSOFT_CLIENT_ID", "")
MICROSOFT_CLIENT_SECRET = os.getenv("MICROSOFT_CLIENT_SECRET", "")
MICROSOFT_REDIRECT_URI = os.getenv("MICROSOFT_REDIRECT_URI", "http://localhost:3000/auth/microsoft/callback")


def create_access_token(user_id: int, expires_delta: timedelta | None = None):
    """Crear JWT token"""
    to_encode = {"sub": str(user_id)}
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def verify_google_token(code: str, redirect_uri: str) -> dict:
    """Verificar token de Google y obtener información del usuario"""
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://oauth2.googleapis.com/token",
            data={
                "code": code,
                "client_id": GOOGLE_CLIENT_ID,
                "client_secret": GOOGLE_CLIENT_SECRET,
                "redirect_uri": redirect_uri,
                "grant_type": "authorization_code",
            },
        )
        
        if response.status_code != 200:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No se pudo verificar el token de Google",
            )
        
        token_data = response.json()
        access_token = token_data.get("access_token")
        
        # Obtener información del usuario
        user_info_response = await client.get(
            "https://www.googleapis.com/oauth2/v1/userinfo",
            headers={"Authorization": f"Bearer {access_token}"},
        )
        
        if user_info_response.status_code != 200:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="No se pudo obtener información del usuario de Google",
            )
        
        user_info = user_info_response.json()
        return {
            "email": user_info.get("email"),
            "name": user_info.get("name"),
            "provider_user_id": user_info.get("id"),
            "avatar_url": user_info.get("picture"),
        }


async def verify_microsoft_token(code: str, redirect_uri: str) -> dict:
    """Verificar token de Microsoft y obtener información del usuario"""
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://login.microsoftonline.com/common/oauth2/v2.0/token",
            data={
                "code": code,
                "client_id": MICROSOFT_CLIENT_ID,
                "client_secret": MICROSOFT_CLIENT_SECRET,
                "redirect_uri": redirect_uri,
                "grant_type": "authorization_code",
                "scope": "openid profile email",
            },
        )
        
        if response.status_code != 200:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No se pudo verificar el token de Microsoft",
            )
        
        token_data = response.json()
        access_token = token_data.get("access_token")
        
        # Obtener información del usuario
        user_info_response = await client.get(
            "https://graph.microsoft.com/v1.0/me",
            headers={"Authorization": f"Bearer {access_token}"},
        )
        
        if user_info_response.status_code != 200:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="No se pudo obtener información del usuario de Microsoft",
            )
        
        user_info = user_info_response.json()
        # Microsoft Graph requires a separate call to /me/photo to get binary photo
        # For now we return None for avatar_url; can be extended later
        return {
            "email": user_info.get("userPrincipalName") or user_info.get("mail"),
            "name": user_info.get("displayName"),
            "provider_user_id": user_info.get("id"),
            "avatar_url": None,
        }


def get_or_create_user(
    db: Session,
    email: str,
    name: str,
    provider: str,
    provider_user_id: str,
    avatar_url: str | None = None,
) -> Usuario:
    """Obtener usuario existente o crear uno nuevo"""
    # Buscar usuario existente
    user = db.query(Usuario).filter(Usuario.email == email).first()
    
    if user:
        # Actualizar proveedor si es diferente
        updated = False
        if user.proveedor_auth != provider:
            user.proveedor_auth = provider
            user.proveedor_user_id = provider_user_id
            updated = True
        # Actualizar avatar si cambió
        if avatar_url and user.avatar_url != avatar_url:
            user.avatar_url = avatar_url
            updated = True
        if updated:
            db.add(user)
            db.commit()
            db.refresh(user)
        return user
    
    # Crear nuevo usuario
    new_user = Usuario(
        email=email,
        nombre_completo=name,
        proveedor_auth=provider,
        proveedor_user_id=provider_user_id,
        avatar_url=avatar_url,
        activo=True,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security), db: Session = Depends(get_db)):
    """Verificar JWT token y retornar usuario"""
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="No se pudo validar las credenciales",
            )
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="No se pudo validar las credenciales",
        )
    
    user = db.query(Usuario).filter(Usuario.id == int(user_id)).first()
    if user is None or not user.activo:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuario no encontrado o inactivo",
        )
    return user
