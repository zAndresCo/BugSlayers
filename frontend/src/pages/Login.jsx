import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaShieldAlt, FaUserCircle, FaShieldVirus } from 'react-icons/fa';
import '../styles/Login.css';

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

const ShieldIllustration = () => (
  <div className="shield-glow-wrapper">
    <svg className="shield-svg" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#1a3a8f" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="#060f3a" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="shieldFill" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#1e50d4"/>
          <stop offset="100%" stopColor="#0d2a8a"/>
        </linearGradient>
        <linearGradient id="shieldEdge" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#60a5fa" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.4"/>
        </linearGradient>
        <linearGradient id="lockFill" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#93c5fd"/>
          <stop offset="100%" stopColor="#3b82f6"/>
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Fondo circular suave */}
      <circle cx="120" cy="120" r="108" fill="url(#bgGlow)"/>

      {/* ── Líneas de red (nodos conectados) ── */}
      {/* nodo centro-arriba  → nodo izq-arriba */}
      <line x1="120" y1="28"  x2="32"  y2="68"  stroke="#2563eb" strokeWidth="0.8" opacity="0.5"/>
      {/* nodo centro-arriba  → nodo der-arriba */}
      <line x1="120" y1="28"  x2="208" y2="68"  stroke="#2563eb" strokeWidth="0.8" opacity="0.5"/>
      {/* nodo izq-arriba     → nodo izq-medio */}
      <line x1="32"  y1="68"  x2="18"  y2="148" stroke="#2563eb" strokeWidth="0.8" opacity="0.5"/>
      {/* nodo der-arriba     → nodo der-medio */}
      <line x1="208" y1="68"  x2="222" y2="148" stroke="#2563eb" strokeWidth="0.8" opacity="0.5"/>
      {/* nodo izq-medio      → nodo centro-abajo */}
      <line x1="18"  y1="148" x2="120" y2="210" stroke="#2563eb" strokeWidth="0.8" opacity="0.5"/>
      {/* nodo der-medio      → nodo centro-abajo */}
      <line x1="222" y1="148" x2="120" y2="210" stroke="#2563eb" strokeWidth="0.8" opacity="0.5"/>
      {/* diagonales cruzadas extras */}
      <line x1="32"  y1="68"  x2="120" y2="120" stroke="#3b82f6" strokeWidth="0.6" opacity="0.3"/>
      <line x1="208" y1="68"  x2="120" y2="120" stroke="#3b82f6" strokeWidth="0.6" opacity="0.3"/>
      <line x1="18"  y1="148" x2="120" y2="120" stroke="#3b82f6" strokeWidth="0.6" opacity="0.3"/>
      <line x1="222" y1="148" x2="120" y2="120" stroke="#3b82f6" strokeWidth="0.6" opacity="0.3"/>

      {/* ── Nodos de red ── */}
      <circle cx="120" cy="28"  r="4" fill="#60a5fa" opacity="0.85"/>
      <circle cx="32"  cy="68"  r="4" fill="#60a5fa" opacity="0.85"/>
      <circle cx="208" cy="68"  r="4" fill="#60a5fa" opacity="0.85"/>
      <circle cx="18"  cy="148" r="4" fill="#60a5fa" opacity="0.85"/>
      <circle cx="222" cy="148" r="4" fill="#60a5fa" opacity="0.85"/>
      <circle cx="120" cy="210" r="4" fill="#60a5fa" opacity="0.85"/>
      {/* nodo central tenue */}
      <circle cx="120" cy="120" r="3" fill="#93c5fd" opacity="0.4"/>

      {/* ── Escudo flat ── */}
      <path
        d="M120 38 L185 65 L185 118 C185 158 120 186 120 186 C120 186 55 158 55 118 L55 65 Z"
        fill="url(#shieldFill)"
        stroke="url(#shieldEdge)"
        strokeWidth="2"
        filter="url(#glow)"
      />

      {/* Destello interior superior izquierdo */}
      <path
        d="M120 52 L172 74 L172 118 C172 148 120 170 120 170"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1"
        opacity="0.12"
        strokeLinecap="round"
      />

      {/* ── Candado flat ── */}
      {/* arco */}
      <path
        d="M105 112 L105 101 C105 89 135 89 135 101 L135 112"
        fill="none"
        stroke="url(#lockFill)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* cuerpo */}
      <rect x="98" y="112" width="44" height="34" rx="7" fill="url(#lockFill)"/>
      {/* ojo */}
      <circle cx="120" cy="129" r="6" fill="#0d2a8a" opacity="0.85"/>
      <rect x="118" y="129" width="4" height="9" rx="2" fill="#0d2a8a" opacity="0.85"/>
    </svg>
  </div>
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
            <ShieldIllustration />
          </div>

          <p className="bottom-note">Protegemos tus datos, aseguramos tu futuro.</p>
        </section>

        <section className="auth-form-panel">

          <div className="auth-top-icon">
            <div className="auth-top-icon-circle">
              <FaUserCircle className="auth-top-icon-svg" />
            </div>
          </div>

          <div className="auth-header">
            <h2>Iniciar sesión</h2>
            <p>Accede a tu cuenta empresarial<br />para continuar</p>
          </div>

          <div className="auth-envelope-wrapper">
            <div className="auth-envelope-circle">
              <div className="auth-dot auth-dot-left" />
              <div className="auth-dot auth-dot-right" />
              <div className="auth-envelope-inner">
                <FaEnvelope className="auth-envelope-icon" />
                <div className="auth-shield-badge">
                  <FaShieldAlt className="auth-shield-icon" />
                </div>
              </div>
            </div>
          </div>

          <div className="auth-sso-text">
            <h3>Ingresa con tu correo empresarial</h3>
            <p>Usa tu cuenta de Google Workspace o Microsoft 365</p>
          </div>

          <div className="auth-sso-buttons">
            <button type="button" className="auth-sso-btn" onClick={() => redirectToProvider('google')}>
              <GoogleIcon />
              Continuar con Google
            </button>
            <button type="button" className="auth-sso-btn" onClick={() => redirectToProvider('microsoft')}>
              <MicrosoftIcon />
              Continuar con Microsoft
            </button>
          </div>

          <div className="auth-divider">
            <div className="auth-divider-line" />
            <div className="auth-divider-dot" />
            <div className="auth-divider-line" />
          </div>

          <div className="auth-corp-notice">
            <FaShieldVirus className="auth-corp-icon" />
            <span>Solo cuentas corporativas<br />de Google Workspace y Microsoft 365</span>
          </div>

          <div className="auth-separator" />

          <p className="auth-switch">
            ¿No tienes una cuenta?{' '}
            <Link to="/signup">Regístrate</Link>
          </p>

        </section>
      </div>
    </div>
  );
};

export default Login;
