import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaShieldAlt, FaUserCircle, FaShieldVirus } from 'react-icons/fa';
import './Auth.css';

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 48 48" style={{ flexShrink: 0 }}>
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.96 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    <path fill="none" d="M0 0h48v48H0z"/>
  </svg>
);

const MicrosoftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 21 21" style={{ flexShrink: 0 }}>
    <rect x="1" y="1" width="9" height="9" fill="#F25022"/>
    <rect x="11" y="1" width="9" height="9" fill="#7FBA00"/>
    <rect x="1" y="11" width="9" height="9" fill="#00A4EF"/>
    <rect x="11" y="11" width="9" height="9" fill="#FFB900"/>
  </svg>
);

const Login = () => {
  const redirectToProvider = useCallback((provider) => {
    const clientId = provider === 'google'
      ? import.meta.env.VITE_GOOGLE_CLIENT_ID
      : import.meta.env.VITE_MICROSOFT_CLIENT_ID;
    const redirectUri = provider === 'google'
      ? import.meta.env.VITE_GOOGLE_REDIRECT_URI || `${window.location.origin}/auth/${provider}/callback`
      : import.meta.env.VITE_MICROSOFT_REDIRECT_URI || `${window.location.origin}/auth/${provider}/callback`;

    if (!clientId) {
      alert(`Debes configurar VITE_${provider.toUpperCase()}_CLIENT_ID en el frontend.`);
      return;
    }

    const authUrl = provider === 'google'
      ? `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(clientId)}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent('openid email profile')}&access_type=offline&prompt=consent`
      : `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${encodeURIComponent(clientId)}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent('openid profile email User.Read')}`;

    window.location.href = authUrl;
  }, []);

  return (
    <div className="auth-page">
      <div className="auth-card">

        {/* ===== PANEL IZQUIERDO (sin cambios) ===== */}
        <section className="auth-panel auth-panel-left">
          <div className="brand-row">
            <div className="brand-badge">🔐</div>
            <div>
              <p className="brand">SecureTech</p>
              <p className="brand-sub">Ciberseguridad</p>
            </div>
          </div>
          <div>
            <h1>Bienvenido <span>de nuevo</span></h1>
            <p className="lead">Inicia sesión para continuar protegiendo lo que más importa para tu empresa.</p>
          </div>
          <div className="auth-graphic">
            <div className="shield-illustration">
              <div className="shield-icon">🔒</div>
            </div>
          </div>
          <p className="bottom-note">Protegemos tus datos, aseguramos tu futuro.</p>
        </section>

        {/* ===== PANEL DERECHO ===== */}
        <section className="auth-form-panel">

          {/* Ícono de usuario */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              backgroundColor: '#EEF2FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FaUserCircle style={{ fontSize: '40px', color: '#4F6EF7' }} />
            </div>
          </div>

          {/* Título y subtítulo */}
          <div style={{ textAlign: 'center', marginBottom: '8px' }}>
            <h2 style={{ margin: '0 0 6px', fontSize: '22px', fontWeight: '700', color: '#1a237e' }}>
              Iniciar sesión
            </h2>
            <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>
              Accede a tu cuenta empresarial<br />para continuar
            </p>
          </div>

          {/* Gráfico sobre + escudo con círculo punteado */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '24px 0',
            position: 'relative'
          }}>
            <div style={{
              width: '130px',
              height: '130px',
              borderRadius: '50%',
              border: '2px dashed #c7d2fe',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}>
              {/* Punto lateral izquierdo */}
              <div style={{
                position: 'absolute', left: '-6px', top: '50%',
                transform: 'translateY(-50%)',
                width: '10px', height: '10px',
                borderRadius: '50%', backgroundColor: '#c7d2fe'
              }} />
              {/* Punto lateral derecho */}
              <div style={{
                position: 'absolute', right: '-6px', top: '50%',
                transform: 'translateY(-50%)',
                width: '10px', height: '10px',
                borderRadius: '50%', backgroundColor: '#c7d2fe'
              }} />

              {/* Sobre con escudo */}
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <FaEnvelope style={{ fontSize: '60px', color: '#2563EB' }} />
                <div style={{
                  position: 'absolute',
                  bottom: '-10px',
                  right: '-14px',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#2563EB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <FaShieldAlt style={{ fontSize: '16px', color: '#ffffff' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Texto SSO */}
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: '0 0 6px', fontSize: '16px', fontWeight: '700', color: '#1a237e' }}>
              Ingresa con tu correo empresarial
            </h3>
            <p style={{ margin: 0, fontSize: '13px', color: '#6b7280' }}>
              Usa tu cuenta de Google Workspace o Microsoft 365
            </p>
          </div>

          {/* Botones SSO con íconos de color real */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
            <button
              type="button"
              onClick={() => redirectToProvider('google')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                padding: '12px 16px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                backgroundColor: '#fff',
                cursor: 'pointer',
                fontSize: '15px',
                fontWeight: '500',
                color: '#374151',
                width: '100%'
              }}
            >
              <GoogleIcon />
              Continuar con Google
            </button>

            <button
              type="button"
              onClick={() => redirectToProvider('microsoft')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                padding: '12px 16px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                backgroundColor: '#fff',
                cursor: 'pointer',
                fontSize: '15px',
                fontWeight: '500',
                color: '#374151',
                width: '100%'
              }}
            >
              <MicrosoftIcon />
              Continuar con Microsoft
            </button>
          </div>

          {/* Divisor con punto central */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '4px 0 16px'
          }}>
            <div style={{ width: '40%', height: '1px', backgroundColor: '#e5e7eb' }} />
            <div style={{
              width: '8px', height: '8px',
              borderRadius: '50%',
              backgroundColor: '#d1d5db',
              margin: '0 8px'
            }} />
            <div style={{ width: '40%', height: '1px', backgroundColor: '#e5e7eb' }} />
          </div>

          {/* Aviso cuentas corporativas */}
          <div style={{
            display: 'flex',
            alignItems: 'flex',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '20px'
          }}>
            <FaShieldVirus style={{ fontSize: '18px', color: '#2563EB', marginTop: '2px', flexShrink: 0 }} />
            <span style={{ fontSize: '12px', color: '#6b7280', lineHeight: '1.5' }}>
              Solo cuentas corporativas<br />de Google Workspace y Microsoft 365
            </span>
          </div>

          {/* Línea separadora antes del registro */}
          <div style={{ height: '1px', backgroundColor: '#e5e7eb', marginBottom: '16px' }} />

          {/* Link de registro */}
          <p style={{ textAlign: 'center', fontSize: '13px', color: '#6b7280', margin: 0 }}>
            ¿No tienes una cuenta?{' '}
            <Link to="/signup" style={{ color: '#2563EB', fontWeight: '600', textDecoration: 'none' }}>
              Regístrate
            </Link>
          </p>

        </section>
      </div>
    </div>
  );
};

export default Login;