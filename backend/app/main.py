from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from datetime import timedelta

from app.database import engine, get_db
from app.models import Base, Usuario
from app.schemas import (
    OAuth2LoginRequest, UsuarioResponse, TokenResponse
)
from app.auth import (
    verify_google_token, verify_microsoft_token, get_or_create_user,
    create_access_token, verify_token, ACCESS_TOKEN_EXPIRE_MINUTES
)

# Create tables
Base.metadata.create_all(bind=engine)

from apis.diagnostics import router as diagnostics_router

app = FastAPI(title="BugSalyers Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir routers de diagnóstico
app.include_router(diagnostics_router)


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok", "service": "backend"}


@app.post("/auth/google/callback", response_model=TokenResponse)
async def google_callback(request: OAuth2LoginRequest, db: Session = Depends(get_db)):
    """Endpoint para callback de Google OAuth2"""
    try:
        # Verificar token de Google
        user_info = await verify_google_token(request.code, request.redirect_uri)
        
        # Obtener o crear usuario
        user = get_or_create_user(
            db=db,
            email=user_info["email"],
            name=user_info["name"],
            provider="google",
            provider_user_id=user_info["provider_user_id"]
        )
        
        # Crear token de acceso
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            user_id=user.id,
            expires_delta=access_token_expires
        )
        
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": UsuarioResponse.from_orm(user),
        }
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Error en autenticación de Google: {str(e)}",
        )


@app.post("/auth/microsoft/callback", response_model=TokenResponse)
async def microsoft_callback(request: OAuth2LoginRequest, db: Session = Depends(get_db)):
    """Endpoint para callback de Microsoft OAuth2"""
    try:
        # Verificar token de Microsoft
        user_info = await verify_microsoft_token(request.code, request.redirect_uri)
        
        # Obtener o crear usuario
        user = get_or_create_user(
            db=db,
            email=user_info["email"],
            name=user_info["name"],
            provider="microsoft",
            provider_user_id=user_info["provider_user_id"]
        )
        
        # Crear token de acceso
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            user_id=user.id,
            expires_delta=access_token_expires
        )
        
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": UsuarioResponse.from_orm(user),
        }
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Error en autenticación de Microsoft: {str(e)}",
        )


@app.get("/auth/me", response_model=UsuarioResponse)
def get_current_user(current_user: Usuario = Depends(verify_token)):
    """Endpoint para obtener información del usuario autenticado"""
    return current_user
