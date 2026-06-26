# BugSlayers Backend - Guía de Configuración OAuth2

## Configuración Rápida

### 1. Configurar Variables de Entorno

Copia el archivo `.env.example` a `.env` y completa con tus credenciales:

```bash
cp .env.example .env
```

### 2. Google OAuth2

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto
3. Habilita la API de OAuth 2.0
4. En "Credenciales", crea una credencial OAuth 2.0 para "Aplicación web"
5. Agrega estos URIs autorizados:
   - `http://localhost:3000/auth/google/callback` (desarrollo)
   - `https://tudominio.com/auth/google/callback` (producción)
6. Copia `Client ID` y `Client Secret` en tu archivo `.env`

### 3. Microsoft OAuth2

1. Ve a [Azure Portal](https://portal.azure.com/)
2. Registra una nueva aplicación
3. En "Certificados y secretos", crea un nuevo secreto
4. En "URIs de redirección", agrega:
   - `http://localhost:3000/auth/microsoft/callback` (desarrollo)
   - `https://tudominio.com/auth/microsoft/callback` (producción)
5. Copia `Client ID` y `Client Secret` en tu archivo `.env`

## Estructura de BD

La base de datos está organizada con las siguientes tablas:

- **usuarios**: Información del usuario OAuth
- **empresas**: Datos de la empresa
- **diagnosticos**: Sesiones de diagnóstico
- **preguntas**: Preguntas del cuestionario
- **bloques**: Grupos de preguntas
- **respuestas**: Respuestas del usuario

## Endpoints de Autenticación

### Google Login
```
POST /auth/google/callback
Content-Type: application/json

{
  "provider": "google",
  "code": "authorization_code_from_google",
  "redirect_uri": "http://localhost:3000/auth/google/callback"
}
```

### Microsoft Login
```
POST /auth/microsoft/callback
Content-Type: application/json

{
  "provider": "microsoft",
  "code": "authorization_code_from_microsoft",
  "redirect_uri": "http://localhost:3000/auth/microsoft/callback"
}
```

### Obtener Usuario Actual
```
GET /auth/me
Authorization: Bearer {access_token}
```

## Instalación y Ejecución

```bash
# Instalar dependencias
pip install -r requirements.txt

# Ejecutar servidor
uvicorn app.main:app --reload --port 8000

# API Documentation
http://localhost:8000/docs
```

## Variables de Entorno Necesarias

```
SECRET_KEY=tu-clave-secreta
GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=xxx
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback
MICROSOFT_CLIENT_ID=xxx
MICROSOFT_CLIENT_SECRET=xxx
MICROSOFT_REDIRECT_URI=http://localhost:3000/auth/microsoft/callback
DATABASE_URL=sqlite:///./bugslayers.db
```

## Base de Datos

La BD se crea automáticamente al iniciar el servidor. Puedes resetearla eliminando `bugslayers.db`:

```bash
rm bugslayers.db
```

Al iniciar de nuevo, se creará una BD nueva con las tablas vacías.
