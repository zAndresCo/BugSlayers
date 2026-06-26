import React from 'react';
import { Link } from 'react-router-dom';
import { FaGoogle, FaMicrosoft, FaEnvelope, FaLock, FaEye } from 'react-icons/fa';
import './Auth.css';

const Login = () => {
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
            <div className="shield-illustration">
              <div className="shield-icon">🔒</div>
            </div>
          </div>
          <p className="bottom-note">Protegemos tus datos, aseguramos tu futuro.</p>
        </section>

        <section className="auth-form-panel">
          <div>
            <h2>Iniciar sesión</h2>
            <p className="subtext">Accede a tu cuenta para continuar</p>
          </div>

          <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
            <div className="field-group input-group">
              <span className="input-icon"><FaEnvelope /></span>
              <input id="email" type="email" placeholder="ejemplo@empresa.com" />
            </div>
            <div className="field-group input-group">
              <span className="input-icon"><FaLock /></span>
              <input id="password" type="password" placeholder="••••••••••" />
              <button type="button" className="input-action" aria-label="Mostrar contraseña"><FaEye /></button>
            </div>

            <div className="link-row">
              <a href="#">¿Olvidaste tu contraseña?</a>
            </div>

            <button type="submit" className="btn-primary">Iniciar sesión</button>

            <div className="divider">o continúa con</div>

            <div className="social-actions">
              <button type="button" className="social-button">
                <FaGoogle className="social-icon" />
                Continuar con Google
              </button>
              <button type="button" className="social-button">
                <FaMicrosoft className="social-icon" />
                Continuar con Microsoft
              </button>
            </div>

            <p className="switch-text">¿No tienes cuenta? <Link to="/signup">Regístrate</Link></p>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Login;
