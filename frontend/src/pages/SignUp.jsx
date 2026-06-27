import React from 'react';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaLock, FaCheckCircle, FaEnvelope, FaShieldVirus, FaBuilding } from 'react-icons/fa';
import '../styles/SignUp.css';

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

/* ── Ilustración SVG: escudo 3D con check + servidores ── */
const ShieldCheckIllustration = () => (
  <div className="signup-shield-wrapper">
    <svg className="signup-shield-svg" viewBox="0 0 280 260" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Gradientes escudo */}
        <linearGradient id="sg-shield" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%"   stopColor="#2563eb"/>
          <stop offset="55%"  stopColor="#1a40b8"/>
          <stop offset="100%" stopColor="#0d2170"/>
        </linearGradient>
        <linearGradient id="sg-shield-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#93c5fd"/>
          <stop offset="100%" stopColor="#3b82f6"/>
        </linearGradient>
        <linearGradient id="sg-shine" x1="0%" y1="0%" x2="60%" y2="100%">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.22"/>
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0"/>
        </linearGradient>

        {/* Plataforma hexagonal */}
        <linearGradient id="sg-plat-top" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#1e50d4"/>
          <stop offset="100%" stopColor="#0d2a8a"/>
        </linearGradient>
        <linearGradient id="sg-plat-left" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#0a1e6e"/>
          <stop offset="100%" stopColor="#0d2a8a"/>
        </linearGradient>
        <linearGradient id="sg-plat-right" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#1636a0"/>
          <stop offset="100%" stopColor="#0f2480"/>
        </linearGradient>

        {/* Glow plataforma */}
        <radialGradient id="sg-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#3b82f6" stopOpacity="0.7"/>
          <stop offset="100%" stopColor="#1e40af" stopOpacity="0"/>
        </radialGradient>

        {/* Servidor gradientes */}
        <linearGradient id="sg-srv-face" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#1e3a8a"/>
          <stop offset="100%" stopColor="#0f1e5c"/>
        </linearGradient>
        <linearGradient id="sg-srv-top" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#2563eb"/>
          <stop offset="100%" stopColor="#1e3a8a"/>
        </linearGradient>
        <linearGradient id="sg-srv-side" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#0d1f6e"/>
          <stop offset="100%" stopColor="#162580"/>
        </linearGradient>

        <filter id="sg-blur-glow">
          <feGaussianBlur stdDeviation="6" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="sg-drop">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#1e40af" floodOpacity="0.6"/>
        </filter>
      </defs>

      {/* ══ GLOW DE PLATAFORMA ══ */}
      <ellipse cx="140" cy="198" rx="90" ry="18" fill="url(#sg-glow)" opacity="0.9"/>
      <ellipse cx="140" cy="198" rx="55" ry="10" fill="#60a5fa"        opacity="0.35"/>

      {/* ══ PLATAFORMA HEXAGONAL (3 caras isométricas) ══ */}
      {/* Cara superior */}
      <polygon
        points="140,168 195,183 140,198 85,183"
        fill="url(#sg-plat-top)"
        stroke="#3b82f6" strokeWidth="0.8" strokeOpacity="0.5"
      />
      {/* Cara izquierda */}
      <polygon
        points="85,183 140,198 140,218 85,203"
        fill="url(#sg-plat-left)"
        stroke="#1d4ed8" strokeWidth="0.6" strokeOpacity="0.4"
      />
      {/* Cara derecha */}
      <polygon
        points="140,198 195,183 195,203 140,218"
        fill="url(#sg-plat-right)"
        stroke="#2563eb" strokeWidth="0.6" strokeOpacity="0.4"
      />
      {/* Líneas de rejilla en cara superior */}
      <line x1="112" y1="175" x2="167" y2="190" stroke="#60a5fa" strokeWidth="0.5" opacity="0.3"/>
      <line x1="120" y1="179" x2="175" y2="194" stroke="#60a5fa" strokeWidth="0.5" opacity="0.25"/>
      <line x1="140" y1="168" x2="140" y2="198" stroke="#60a5fa" strokeWidth="0.5" opacity="0.3"/>
      <line x1="162" y1="175" x2="107" y2="190" stroke="#60a5fa" strokeWidth="0.5" opacity="0.25"/>

      {/* ══ SERVIDOR IZQUIERDO ══ */}
      {/* Cara superior */}
      <polygon points="38,145 68,133 80,139 50,151" fill="url(#sg-srv-top)" opacity="0.95"/>
      {/* Cara frontal */}
      <polygon points="38,145 50,151 50,183 38,177" fill="url(#sg-srv-face)" opacity="0.95"/>
      {/* Cara lateral */}
      <polygon points="50,151 80,139 80,171 50,183" fill="url(#sg-srv-side)" opacity="0.95"/>
      {/* Ranuras del servidor */}
      <line x1="52" y1="156" x2="78" y2="145" stroke="#3b82f6" strokeWidth="1.2" opacity="0.6"/>
      <line x1="52" y1="162" x2="78" y2="151" stroke="#3b82f6" strokeWidth="1.2" opacity="0.6"/>
      <line x1="52" y1="168" x2="78" y2="157" stroke="#3b82f6" strokeWidth="1.2" opacity="0.6"/>
      {/* LED */}
      <circle cx="57" cy="154" r="2" fill="#22d3ee" opacity="0.9"/>
      <circle cx="57" cy="161" r="2" fill="#60a5fa" opacity="0.9"/>
      <circle cx="57" cy="168" r="2" fill="#22d3ee" opacity="0.7"/>

      {/* Segundo rack izquierdo (más atrás) */}
      <polygon points="22,130 52,118 64,124 34,136" fill="url(#sg-srv-top)" opacity="0.7"/>
      <polygon points="22,130 34,136 34,168 22,162" fill="url(#sg-srv-face)" opacity="0.7"/>
      <polygon points="34,136 64,124 64,156 34,168" fill="url(#sg-srv-side)" opacity="0.7"/>
      <line x1="36" y1="141" x2="62" y2="130" stroke="#3b82f6" strokeWidth="1" opacity="0.4"/>
      <line x1="36" y1="148" x2="62" y2="137" stroke="#3b82f6" strokeWidth="1" opacity="0.4"/>

      {/* ══ SERVIDOR DERECHO ══ */}
      {/* Cara superior */}
      <polygon points="200,133 230,145 242,139 212,127" fill="url(#sg-srv-top)" opacity="0.95"/>
      {/* Cara frontal */}
      <polygon points="230,145 242,139 242,171 230,177" fill="url(#sg-srv-face)" opacity="0.95"/>
      {/* Cara lateral */}
      <polygon points="200,133 230,145 230,177 200,165" fill="url(#sg-srv-side)" opacity="0.95"/>
      {/* Ranuras */}
      <line x1="202" y1="138" x2="228" y2="150" stroke="#3b82f6" strokeWidth="1.2" opacity="0.6"/>
      <line x1="202" y1="145" x2="228" y2="157" stroke="#3b82f6" strokeWidth="1.2" opacity="0.6"/>
      <line x1="202" y1="152" x2="228" y2="164" stroke="#3b82f6" strokeWidth="1.2" opacity="0.6"/>
      {/* LED */}
      <circle cx="223" cy="149" r="2" fill="#22d3ee" opacity="0.9"/>
      <circle cx="223" cy="156" r="2" fill="#60a5fa" opacity="0.9"/>
      <circle cx="223" cy="163" r="2" fill="#22d3ee" opacity="0.7"/>

      {/* Segundo rack derecho */}
      <polygon points="216,118 246,130 258,124 228,112" fill="url(#sg-srv-top)" opacity="0.7"/>
      <polygon points="246,130 258,124 258,156 246,162" fill="url(#sg-srv-face)" opacity="0.7"/>
      <polygon points="216,118 246,130 246,162 216,150" fill="url(#sg-srv-side)" opacity="0.7"/>
      <line x1="218" y1="123" x2="244" y2="135" stroke="#3b82f6" strokeWidth="1" opacity="0.4"/>
      <line x1="218" y1="130" x2="244" y2="142" stroke="#3b82f6" strokeWidth="1" opacity="0.4"/>

      {/* ══ ESCUDO PRINCIPAL ══ */}
      <path
        d="M140 28 L205 58 L205 118 C205 162 140 192 140 192 C140 192 75 162 75 118 L75 58 Z"
        fill="url(#sg-shield)"
        stroke="url(#sg-shield-stroke)"
        strokeWidth="2.5"
        filter="url(#sg-drop)"
      />
      {/* Reflejo interior */}
      <path
        d="M140 42 L192 67 L192 118 C192 152 140 175 140 175"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.5"
        opacity="0.15"
        strokeLinecap="round"
      />
      {/* Brillo superior */}
      <path
        d="M108 46 Q140 34 172 46"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.5"
        opacity="0.2"
        strokeLinecap="round"
      />
      {/* Capa de brillo isométrico interior */}
      <path
        d="M140 42 L192 67 L192 118 C192 152 140 175 140 175 C140 175 88 152 88 118 L88 67 Z"
        fill="url(#sg-shine)"
      />

      {/* ══ CHECKMARK ══ */}
      <path
        d="M115 110 L132 128 L168 90"
        fill="none"
        stroke="#ffffff"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.95"
      />
      {/* Glow del check */}
      <path
        d="M115 110 L132 128 L168 90"
        fill="none"
        stroke="#93c5fd"
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.25"
      />

      {/* ══ DESTELLOS AMBIENTALES ══ */}
      <circle cx="72"  cy="68"  r="3"   fill="#93c5fd" opacity="0.8"/>
      <circle cx="210" cy="55"  r="2.5" fill="#7dd3fc" opacity="0.7"/>
      <circle cx="65"  cy="148" r="2"   fill="#bfdbfe" opacity="0.6"/>
      <circle cx="218" cy="150" r="2.5" fill="#93c5fd" opacity="0.7"/>
      <circle cx="140" cy="24"  r="2"   fill="#bfdbfe" opacity="0.6"/>
    </svg>
  </div>
);

const SignUp = () => {
  return (
    <div className="auth-page">
      <div className="auth-card">

        {/* ===== PANEL IZQUIERDO ===== */}
        <section className="auth-panel auth-panel-left">
          <div className="brand-row">
            <div className="brand-badge">🔐</div>
            <div>
              <p className="brand">SecureTech</p>
              <p className="brand-sub">Ciberseguridad</p>
            </div>
          </div>
          <div>
            <h1>Crea <span>tu cuenta</span> y comienza hoy</h1>
            <p className="lead">Únete a empresas que ya están fortaleciendo su seguridad y cumplimiento normativo.</p>
          </div>

          {/* Ilustración escudo 3D con check */}
          <div className="auth-graphic">
            <ShieldCheckIllustration />
          </div>

          <div className="feature-list">
            <div className="feature-item">
              <div className="feature-icon"><FaShieldAlt /></div>
              <div>
                <h3>Seguro</h3>
                <p>Tus datos siempre protegidos.</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon"><FaLock /></div>
              <div>
                <h3>Confiable</h3>
                <p>Cumple con la Ley 1581 de 2012.</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon"><FaCheckCircle /></div>
              <div>
                <h3>Intuitivo</h3>
                <p>Fácil de usar y entender.</p>
              </div>
            </div>
          </div>

          <p className="bottom-note">Comienza hoy con un proceso de registro seguro y profesional.</p>
        </section>

        {/* ===== PANEL DERECHO ===== */}
        <section className="auth-form-panel">

          <div className="auth-top-icon">
            <div className="auth-top-icon-circle">
              <FaBuilding className="auth-top-icon-building" />
            </div>
          </div>

          <div className="auth-header">
            <h2>Crear cuenta empresarial</h2>
            <p>Regístrate de forma segura usando<br />tu correo empresarial</p>
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
            <h3>Regístrate con tu correo empresarial</h3>
            <p>Usa tu cuenta de Google Workspace o Microsoft 365</p>
          </div>

          <div className="auth-sso-buttons">
            <button type="button" className="auth-sso-btn">
              <GoogleIcon />
              Registrarse con Google
            </button>
            <button type="button" className="auth-sso-btn">
              <MicrosoftIcon />
              Registrarse con Microsoft
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
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login">Inicia sesión</Link>
          </p>

        </section>
      </div>
    </div>
  );
};

export default SignUp;
