# Guía Rápida: Frontend → Backend OAuth2

## Flow de Autenticación

```
FRONTEND                          BACKEND
  │                                 │
  ├─ Usuario hace click en         │
  │  "Login con Google"             │
  │                                 │
  ├─ Abre Google OAuth Flow         │
  │  (con Google SDK)               │
  │                                 │
  ├─ Google redirige con CODE   ──→ POST /auth/google/callback
  │                                 │
  │                        ← JWT + User Data
  │                                 │
  ├─ Guarda JWT en localStorage     │
  │                                 │
  └─ Redirige a app                 │
```

## Implementación en Frontend

### 1. Instalar Google OAuth Library
```bash
npm install @react-oauth/google
```

### 2. Configurar en App.jsx
```jsx
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <GoogleOAuthProvider clientId="TU_GOOGLE_CLIENT_ID">
      <YourApp />
    </GoogleOAuthProvider>
  );
}
```

### 3. Botón de Login
```jsx
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

export function LoginButton() {
  const googleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        const response = await axios.post(
          'http://localhost:8000/auth/google/callback',
          {
            provider: 'google',
            code: codeResponse.code,
            redirect_uri: 'http://localhost:3000/auth/google/callback'
          }
        );
        
        // Guardar token
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Redirigir a dashboard
        window.location.href = '/dashboard';
      } catch (error) {
        console.error('Login error:', error);
      }
    },
    flow: 'auth-code'
  });

  return (
    <button onClick={() => googleLogin()}>
      Login con Google
    </button>
  );
}
```

### 4. Requests Autenticadas
```jsx
import axios from 'axios';

// Agregar token a headers
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Ejemplo: Crear diagnóstico
async function createDiagnostic(empresaId) {
  const response = await axios.post(
    'http://localhost:8000/diagnostics',
    { empresa_id: empresaId }
  );
  return response.data;
}
```

### 5. Obtener Usuario Autenticado
```jsx
// En cualquier componente
const user = JSON.parse(localStorage.getItem('user'));
console.log(user.nombre_completo); // Nombre del usuario
console.log(user.email); // Email del usuario
```

## Endpoints Disponibles

```bash
# Login Google
POST http://localhost:8000/auth/google/callback
Content-Type: application/json
{
  "provider": "google",
  "code": "authorization_code",
  "redirect_uri": "http://localhost:3000/auth/google/callback"
}

# Login Microsoft  
POST http://localhost:8000/auth/microsoft/callback
Content-Type: application/json
{
  "provider": "microsoft",
  "code": "authorization_code",
  "redirect_uri": "http://localhost:3000/auth/microsoft/callback"
}

# Obtener usuario actual
GET http://localhost:8000/auth/me
Authorization: Bearer {jwt_token}

# Crear diagnóstico
POST http://localhost:8000/diagnostics
Authorization: Bearer {jwt_token}
Content-Type: application/json
{
  "empresa_id": 1
}
```

## Variables de Entorno (Frontend)

```bash
# .env
VITE_GOOGLE_CLIENT_ID=tu_google_client_id
VITE_BACKEND_URL=http://localhost:8000
```

## Checkpoints

- [ ] Backend en http://localhost:8000
- [ ] Frontend en http://localhost:3000
- [ ] JWT token guardado en localStorage
- [ ] GET /auth/me retorna usuario
- [ ] POST /diagnostics crea sesión
- [ ] Usuario puede responder preguntas

## Debugging

```javascript
// Ver token guardado
console.log(localStorage.getItem('access_token'));

// Ver usuario guardado
console.log(JSON.parse(localStorage.getItem('user')));

// Verificar endpoint
fetch('http://localhost:8000/health')
  .then(r => r.json())
  .then(console.log);
```

## Documentación Oficial

- Google OAuth: https://developers.google.com/identity/protocols/oauth2
- Microsoft OAuth: https://learn.microsoft.com/en-us/azure/active-directory/develop/oauth-code-flow
- Backend Swagger: http://localhost:8000/docs
