import React from 'react';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaLock, FaCheckCircle, FaEnvelope, FaShieldVirus } from 'react-icons/fa';
import { FaBuilding } from 'react-icons/fa';
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

const SignUp = () => {
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
            <h1>Crea <span>tu cuenta</span> y comienza hoy</h1>
            <p className="lead">Únete a empresas que ya están fortaleciendo su seguridad y cumplimiento normativo.</p>
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

          {/* Ícono de edificio */}
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
              <FaBuilding style={{ fontSize: '36px', color: '#2563EB' }} />
            </div>
          </div>

          {/* Título y subtítulo */}
          <div style={{ textAlign: 'center', marginBottom: '8px' }}>
            <h2 style={{ margin: '0 0 6px', fontSize: '22px', fontWeight: '700', color: '#1a237e' }}>
              Crear cuenta empresarial
            </h2>
            <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>
              Regístrate de forma segura usando<br />tu correo empresarial
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
              Regístrate con tu correo empresarial
            </h3>
            <p style={{ margin: 0, fontSize: '13px', color: '#6b7280' }}>
              Usa tu cuenta de Google Workspace o Microsoft 365
            </p>
          </div>

          {/* Botones SSO con íconos de color real */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
            <button
              type="button"
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
              Registrarse con Google
            </button>

            <button
              type="button"
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
              Registrarse con Microsoft
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
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '20px'
          }}>
            <FaShieldVirus style={{ fontSize: '18px', color: '#2563EB', flexShrink: 0 }} />
            <span style={{ fontSize: '12px', color: '#6b7280', lineHeight: '1.5' }}>
              Solo cuentas corporativas<br />de Google Workspace y Microsoft 365
            </span>
          </div>

          {/* Línea separadora */}
          <div style={{ height: '1px', backgroundColor: '#e5e7eb', marginBottom: '16px' }} />

          {/* Link de login */}
          <p style={{ textAlign: 'center', fontSize: '13px', color: '#6b7280', margin: 0 }}>
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" style={{ color: '#2563EB', fontWeight: '600', textDecoration: 'none' }}>
              Inicia sesión
            </Link>
          </p>

        </section>
      </div>
    </div>
  );
};

export default SignUp;