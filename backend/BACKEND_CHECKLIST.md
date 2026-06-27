# Checklist de Verificación del Backend

## Estado Actual ✅

- [x] Backend OAuth2 implementado (Google + Microsoft)
- [x] Base de datos SQLAlchemy con 6 tablas
- [x] Modelos de ORM completos
- [x] Endpoints de autenticación funcionales
- [x] JWT tokens generados con expiración 24h
- [x] Integración con endpoints de diagnósticos (compañero)
- [x] Documentación de configuración OAuth2
- [x] Datos de prueba en base de datos

## Antes de Ejecutar el Servidor

### 1. Crear archivo .env
```bash
cp backend/.env.example backend/.env
```

### 2. Rellenar credenciales OAuth2

**Google:**
1. Ir a https://console.cloud.google.com/
2. Crear nuevo proyecto (Nombre: "BugSlayers")
3. APIs y servicios → Credenciales
4. Crear ID de cliente OAuth 2.0 (Aplicación web)
5. URIs autorizados:
   - http://localhost:3000
   - http://localhost:3000/auth/google/callback
6. Copiar `Client ID` y `Client Secret`
7. En `.env`:
   ```
   GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=xxx
   GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback
   ```

**Microsoft:**
1. Ir a https://portal.azure.com/
2. Azure Active Directory → Registros de aplicaciones
3. Nuevo registro
4. Nombre: "BugSlayers"
5. Tipos de cuenta: "Cuentas en cualquier directorio organizacional"
6. URI de redirección (web): http://localhost:3000/auth/microsoft/callback
7. Certificados y secretos → Nuevo secreto de cliente
8. Copiar valores
9. En `.env`:
   ```
   MICROSOFT_CLIENT_ID=xxx
   MICROSOFT_CLIENT_SECRET=xxx
   MICROSOFT_REDIRECT_URI=http://localhost:3000/auth/microsoft/callback
   ```

### 3. Variables de .env completas
```bash
SECRET_KEY=tu_clave_secreta_muy_larga_de_32_caracteres
DATABASE_URL=sqlite:///./bugslayers.db
GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxx
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback
MICROSOFT_CLIENT_ID=xxx
MICROSOFT_CLIENT_SECRET=xxx
MICROSOFT_REDIRECT_URI=http://localhost:3000/auth/microsoft/callback
```

## Ejecutar el Servidor

```bash
cd backend
python -m uvicorn app.main:app --reload --port 8000
```

**Esperado:**
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete
```

## Verificaciones de Funcionamiento

### 1. Health Check
```bash
curl http://localhost:8000/health
```
**Respuesta esperada:**
```json
{"status": "ok", "service": "backend"}
```

### 2. Swagger UI (Documentación interactiva)
Abrir: http://localhost:8000/docs
- Ver todos los endpoints
- Probar requests
- Descargar especificación OpenAPI

### 3. Base de Datos
```bash
# Verificar que bugslayers.db existe
ls -la backend/bugslayers.db

# Listar tablas (SQLite)
sqlite3 backend/bugslayers.db ".tables"

# Ver esquema
sqlite3 backend/bugslayers.db ".schema"
```

### 4. Endpoints de OAuth2

**GET /auth/me** (sin autenticación - debe fallar)
```bash
curl http://localhost:8000/auth/me
```
**Respuesta esperada:** 403 Unauthorized

**GET /auth/me** (con token válido - después del login)
```bash
curl -H "Authorization: Bearer {tu_jwt_token}" \
  http://localhost:8000/auth/me
```
**Respuesta esperada:** Datos del usuario autenticado

### 5. Endpoints de Diagnósticos (integración con compañero)
```bash
# Ver endpoints disponibles en Swagger
# http://localhost:8000/docs
```

## Estructura de Respuestas

### Login exitoso
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "nombre_completo": "Juan Pérez",
    "proveedor_auth": "google",
    "rol": "usuario",
    "empresa_id": 1,
    "activo": true
  }
}
```

### Usuario autenticado
```json
{
  "id": 1,
  "email": "user@example.com",
  "nombre_completo": "Juan Pérez",
  "proveedor_auth": "google",
  "proveedor_user_id": "google123456",
  "rol": "usuario",
  "empresa_id": 1,
  "activo": true
}
```

## Troubleshooting

### Error: "ModuleNotFoundError: No module named 'app'"
```bash
# Instalar dependencias
cd backend
pip install -r requirements.txt

# O si estás en otro directorio
python -m pip install -r backend/requirements.txt
```

### Error: "sqlite3.IntegrityError: UNIQUE constraint failed"
- BD puede tener datos inconsistentes
- Solución: Eliminar `bugslayers.db` y reiniciar servidor
```bash
rm backend/bugslayers.db
# Reiniciar servidor - creará BD nueva
```

### Error: "ValueError: setting an attribute on a class without __dict__"
- Asegúrate de usar SQLAlchemy 2.0+
```bash
pip install --upgrade sqlalchemy
```

### OAuth2 retorna "Invalid code"
- Verificar que GOOGLE_CLIENT_ID y GOOGLE_CLIENT_SECRET sean correctos
- Verificar que GOOGLE_REDIRECT_URI coincida exactamente en Google Cloud
- Verificar que el código no haya expirado (dura ~10 minutos)

### CORS error desde frontend
- El backend ya tiene CORS habilitado para http://localhost:3000
- Si frontend está en otro puerto, editar `main.py`:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # ← Cambiar aquí
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Base de Datos - Datos de Prueba

**Empresa de prueba:**
- NIT: 123456789
- Nombre: Empresa Test Hackathon
- Sector: Tecnología
- Tamaño: pequeña
- Maneja datos sensibles: Sí

Para agregar más datos:
```python
# Script para insertar datos
from app.database import SessionLocal
from app.models import Empresa

db = SessionLocal()
empresa = Empresa(
    nombre="Mi Empresa",
    nit="987654321",
    sector="Finanzas",
    tamano="mediana",
    maneja_datos_sensibles=True
)
db.add(empresa)
db.commit()
print(f"Empresa creada con ID: {empresa.id}")
```

## Logs y Debugging

### Ver logs en tiempo real
```bash
cd backend
python -m uvicorn app.main:app --reload --port 8000 --log-level debug
```

### Habilitar print statements
Los print statements aparecen en consola cuando el servidor está corriendo:
```python
# En app/auth.py
print(f"Verificando token para usuario: {user_id}")
```

## Próximos Pasos

1. **Configurar .env con credenciales OAuth2** ← BLOQUEADOR
2. Frontend listo en http://localhost:3000
3. Implementar flow de login en React
4. Conectar componentes de diagnósticos
5. Prueba end-to-end completa
6. Deploy a producción

## Archivos Importantes

- `app/main.py` - Rutas principales
- `app/auth.py` - Lógica OAuth2 y JWT
- `app/models.py` - Modelos de BD
- `app/schemas.py` - Validación de requests/responses
- `app/database.py` - Configuración de BD
- `.env.example` - Variables de entorno
- `OAUTH2_SETUP.md` - Guía detallada OAuth2
