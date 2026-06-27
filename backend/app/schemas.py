from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, Literal


# Usuario Schemas
class UsuarioResponse(BaseModel):
    id: int
    email: str
    nombre_completo: str
    proveedor_auth: str
    proveedor_user_id: str
    avatar_url: Optional[str]
    rol: str
    empresa_id: Optional[int]
    activo: bool
    creado_en: datetime

    class Config:
        from_attributes = True


# OAuth2 Schemas
class OAuth2LoginRequest(BaseModel):
    provider: Literal["google", "microsoft"]
    code: str
    redirect_uri: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user: UsuarioResponse


class UsuarioCreate(BaseModel):
    email: str
    nombre_completo: str
    proveedor_auth: str
    proveedor_user_id: str
    empresa_id: Optional[int] = None


# Empresa Schemas
class EmpresaResponse(BaseModel):
    id: int
    nombre: str
    nit: str
    sector: Optional[str]
    tamano: Optional[str]
    maneja_datos_sensibles: bool
    creado_en: datetime

    class Config:
        from_attributes = True


class EmpresaCreate(BaseModel):
    nombre: str
    nit: str
    sector: Optional[str] = None
    tamano: Optional[str] = None
    maneja_datos_sensibles: bool = False


# Bloque Schemas
class BloqueResponse(BaseModel):
    id: int
    nombre: str
    peso_maximo: float
    orden: int

    class Config:
        from_attributes = True


# Pregunta Schemas
class PreguntaResponse(BaseModel):
    id: int
    numero: int
    texto: str
    peso: float
    suma_al_total: bool
    es_padre: bool
    bloque_id: int
    pregunta_padre_id: Optional[int]

    class Config:
        from_attributes = True


# Diagnostico Schemas
class DiagnosticoResponse(BaseModel):
    id: int
    empresa_id: int
    usuario_id: int
    porcentaje_resultado: Optional[float]
    creado_en: datetime

    class Config:
        from_attributes = True


class DiagnosticoCreate(BaseModel):
    empresa_id: int


# Respuesta Schemas
class RespuestaResponse(BaseModel):
    id: int
    diagnostico_id: int
    pregunta_id: int
    valor: str
    puntaje_obtenido: Optional[float]

    class Config:
        from_attributes = True


class RespuestaCreate(BaseModel):
    pregunta_id: int
    valor: str
    puntaje_obtenido: Optional[float] = None
