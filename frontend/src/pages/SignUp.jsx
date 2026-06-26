import React from 'react';
import { Link } from 'react-router-dom';
import { FaGoogle, FaMicrosoft, FaShieldAlt, FaLock, FaCheckCircle, FaUser, FaEnvelope, FaBuilding, FaIdBadge } from 'react-icons/fa';
import './Auth.css';

const SignUp = () => {
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

        <section className="auth-form-panel">
          <div>
            <h2>Crear cuenta</h2>
            <p className="subtext">Completa la información para registrarte</p>
          </div>
          <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
            <div className="field-group input-group">
              <span className="input-icon"><FaUser /></span>
              <input id="name" type="text" placeholder="Ej: María Pérez" />
            </div>
            <div className="field-group input-group">
              <span className="input-icon"><FaEnvelope /></span>
              <input id="email" type="email" placeholder="ejemplo@empresa.com" />
            </div>
            <div className="field-group input-group">
              <span className="input-icon"><FaBuilding /></span>
              <input id="company" type="text" placeholder="Ej: Empresa Demo SAS" />
            </div>
            <div className="field-group input-group">
              <span className="input-icon"><FaIdBadge /></span>
              <input id="nit" type="text" placeholder="Ej: 900123456-7" />
            </div>
            <div className="field-group input-group">
              <span className="input-icon"><FaLock /></span>
              <input id="password" type="password" placeholder="••••••••••" />
            </div>
            <div className="field-group input-group">
              <span className="input-icon"><FaLock /></span>
              <input id="confirmPassword" type="password" placeholder="••••••••••" />
            </div>
            <label className="checkbox-group">
              <input type="checkbox" />
              Acepto los <a href="#">Términos y Condiciones</a> y la <a href="#">Política de Privacidad</a>
            </label>
            <button type="submit" className="btn-primary">Crear cuenta</button>
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
            <p className="switch-text">¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
          </form>
        </section>
      </div>
    </div>
  );
};

export default SignUp;
