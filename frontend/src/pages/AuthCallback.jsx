import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AuthCallback = () => {
  const { provider } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('Procesando autenticación...');
  const hasProcessedRef = useRef(false);

  useEffect(() => {
    if (hasProcessedRef.current) return;

    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    if (!code || !provider) {
      setStatus('No se recibió el código de autorización o el proveedor es inválido.');
      return;
    }

    hasProcessedRef.current = true;

    const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    const redirectUri = `${window.location.origin}/auth/${provider}/callback`;
    const url = `${backendUrl}/auth/${provider}/callback`;

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        provider,
        code,
        redirect_uri: redirectUri,
      }),
    })
      .then(async (response) => {
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.detail || response.statusText || 'Error de autenticación');
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setStatus('Inicio de sesión exitoso. Redirigiendo...');
        setTimeout(() => {
          navigate('/welcome');
        }, 1000);
      })
      .catch((error) => {
        setStatus(`Error: ${error.message}`);
      });
  }, [navigate, provider]);

  return (
    <div style={{ padding: '32px', fontFamily: 'Inter, sans-serif', textAlign: 'center' }}>
      <h1>
        Autenticando con {provider === 'google' ? 'Google' : provider === 'microsoft' ? 'Microsoft' : 'OAuth2'}
      </h1>
      <p>{status}</p>
    </div>
  );
};

export default AuthCallback;
