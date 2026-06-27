import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import heroImg from "../assets/images/img-welcome.png";
import { cargarResultadoDiagnostico } from "../services/diagnosticoService";
import "./welcome.css";

// ── Iconos SVG inline ──────────────────────────────────────────────────────────
const BellIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);

const UserIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="#1a56db" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#e8f0fe"/>
    <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" fill="#1a56db"/>
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="#1a56db"/>
  </svg>
);

const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

const ClipboardIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
    <line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/>
  </svg>
);

const ArrowRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const DiagnosticListIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#1a56db" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
    <rect x="9" y="3" width="6" height="4" rx="1"/>
    <line x1="9" y1="12" x2="15" y2="12"/>
    <line x1="9" y1="16" x2="11" y2="16"/>
  </svg>
);

const TargetIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#1a56db" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
    <line x1="12" y1="2" x2="12" y2="6"/>
    <line x1="12" y1="18" x2="12" y2="22"/>
    <line x1="2" y1="12" x2="6" y2="12"/>
    <line x1="18" y1="12" x2="22" y2="12"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#1a56db" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const ShieldCheckIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#1a56db" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <polyline points="9 12 11 14 15 10"/>
  </svg>
);

const ShieldBadgeIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1a56db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <polyline points="9 12 11 14 15 10"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a56db" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);



// ── Componente principal ───────────────────────────────────────────────────────
const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [notifCount] = useState(1);

  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem('user');
      if (raw) {
        const parsedUser = JSON.parse(raw);
        setUser(parsedUser);
        setIsLoggedIn(true);
        setUserName(parsedUser.nombre_completo || parsedUser.email || 'Usuario');
        setUserAvatar(parsedUser.avatar_url || '');

        if (parsedUser.empresa_id) {
          const token = window.localStorage.getItem('access_token');
          if (token) {
            fetch((import.meta.env.VITE_API_URL || 'http://localhost:8000').replace(/\/$/, '') + '/api/v1/companies/me', {
              method: 'GET',
              headers: { 'Authorization': `Bearer ${token}` },
            })
              .then(async (res) => {
                if (!res.ok) return null;
                return res.json();
              })
              .then((data) => {
                if (data && data.nombre) setEmpresa(data.nombre);
              })
              .catch(() => {});
          }
        }
      }
    } catch (e) {
      console.warn('Error leyendo usuario del localStorage', e);
    }
  }, []);

  // Diagnóstico state (newer UI)
  const [diagnostico, setDiagnostico] = useState(null);

  const claseNivel = diagnostico?.nivelDiagnostico?.etiqueta
    ? `resultado-nivel-badge nivel-${diagnostico.nivelDiagnostico.etiqueta.toLowerCase()}`
    : 'resultado-nivel-badge';

  useEffect(() => {
    const desdeNavegacion = location.state?.diagnostico;
    if (desdeNavegacion) {
      setDiagnostico(desdeNavegacion);
      return;
    }
    const guardado = cargarResultadoDiagnostico();
    if (guardado) setDiagnostico(guardado);
  }, [location.state]);

  const infoCards = [
    {
      icon: <DiagnosticListIcon />,
      title: "¿Qué es el diagnóstico?",
      content: (
        <p className="card-text center">
          Un cuestionario de 11 preguntas diseñado para evaluar el cumplimiento
          de los principios y obligaciones de la Ley 1581 de 2012.
        </p>
      ),
    },
    {
      icon: <TargetIcon />,
      title: "¿Qué obtendrás?",
      content: (
        <ul className="card-list">
          {["Resultado en porcentaje","Identificación de brechas","Análisis detallado por categoría","Recomendaciones con IA"].map((item) => (
            <li key={item}><CheckIcon /><span>{item}</span></li>
          ))}
        </ul>
      ),
    },
    {
      icon: <ClockIcon />,
      title: "Tiempo estimado",
      content: (
        <div className="time-content">
          <p className="time-big">5 - 10 minutos</p>
          <p className="card-text center">Responde las preguntas con la información de tu empresa.</p>
        </div>
      ),
    },
    {
      icon: <ShieldCheckIcon />,
      title: "Confidencialidad",
      content: (
        <p className="card-text center">
          Tu información está 100% protegida.<br/>No compartimos tus datos con terceros.
        </p>
      ),
    },
  ];

  return (
    <div className="dashboard-root">
      {/* ── Topbar ── */}
      <header className="topbar">
        <div className="topbar-right">
          <button className="notif-btn">
            <BellIcon />
            {notifCount > 0 && <span className="notif-badge">{notifCount}</span>}
          </button>
          <div className="user-info" style={{ position: 'relative' }}>
            {userAvatar ? (
              <img src={userAvatar} alt="avatar" style={{ width: 40, height: 40, borderRadius: 20, objectFit: 'cover', marginRight: 10 }} />
            ) : (
              <UserIcon />
            )}
            <div className="user-text">
              <span className="user-name">{userName || 'Usuario'}</span>
              {empresa && <span className="user-empresa">{empresa}</span>}
            </div>
            <div className="user-dropdown" style={{ position: 'absolute', top: 48, right: 0 }}>
              {/* simple logout button */}
              <button
                onClick={() => {
                  window.localStorage.removeItem('access_token');
                  window.localStorage.removeItem('user');
                  setIsLoggedIn(false);
                  navigate('/');
                }}
                style={{ background: 'white', border: '1px solid #eee', padding: '8px 12px', borderRadius: 6, cursor: 'pointer' }}
              >Cerrar sesión</button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Contenido ── */}
      <main className="dashboard-main">
        {/* Saludo */}
        <div className="welcome-section">
          <h1 className="welcome-title">¡Bienvenido, <span className="name-highlight">{userName || 'Usuario'}</span>!</h1>
          {!isLoggedIn && (
            <p className="welcome-sub">No se detectó sesión activa. Por favor inicia sesión o regístrate.</p>
          )}
        </div>

        {diagnostico ? (
          <section className="resultado-card">
            <h2 className="resultado-title">Resultado del último diagnóstico</h2>
            <div className="resultado-kpis">
              <div className="resultado-kpi">
                <span className="resultado-kpi-label">Cumplimiento total</span>
                <strong className="resultado-kpi-value">{diagnostico.totalPorcentaje}%</strong>
              </div>
              <div className="resultado-kpi">
                <span className="resultado-kpi-label">Promedio por bloques</span>
                <strong className="resultado-kpi-value">{diagnostico.promedioBloquesPorcentaje}%</strong>
              </div>
            </div>
            <div className="resultado-nivel">
              <span className="resultado-nivel-label">Nivel:</span>
              <strong className={claseNivel}>{diagnostico.nivelDiagnostico.etiqueta}</strong>
              <p className="resultado-nivel-desc">{diagnostico.nivelDiagnostico.descripcion}</p>
            </div>
            <div className="resultado-bloques">
              <p><strong>Política de datos:</strong> {diagnostico.bloques.politicaDatos.obtenido}% / 40%</p>
              <p><strong>Privacidad desde el diseño:</strong> {diagnostico.bloques.privacidadDisenio.obtenido}% / 36%</p>
              <p><strong>Gobernanza:</strong> {diagnostico.bloques.gobernanza.obtenido}% / 24%</p>
            </div>
          </section>
        ) : (
          <section className="resultado-card">
            <h2 className="resultado-title">Aún no hay diagnóstico</h2>
            <p style={{ color: '#475569', marginTop: '8px' }}>
              Para ver tu resultado debes completar el diagnóstico desde el botón inferior.
            </p>
          </section>
        )}

        {/* Hero Card */}
        <div className="hero-card">
          <div className="hero-left">
            <h2 className="hero-title">
              Realiza el autodiagnóstico de cumplimiento Ley 1581 de 2012
            </h2>
            <p className="hero-desc">
              Evalúa el nivel de cumplimiento de tu empresa frente a la Ley 1581
              de Protección de Datos Personales en Colombia. Responde un
              cuestionario sencillo y obtén un diagnóstico completo con
              recomendaciones personalizadas generadas por nuestra IA.
            </p>
            <button className="cta-btn" onClick={() => {
              Swal.fire({
                icon: 'question',
                title: '¿Iniciar diagnóstico?',
                text: 'Te tomará 5-10 minutos.',
                showCancelButton: true,
                confirmButtonText: 'Comenzar',
                cancelButtonText: 'Ahora no',
              }).then((r) => { if (r.isConfirmed) navigate('/diagnostico'); });
            }}>
              <ClipboardIcon />
              <span>Iniciar Diagnóstico</span>
              <ArrowRight />
            </button>
            <div className="privacy-note">
              <LockIcon />
              <span>Tu información está protegida y será utilizada únicamente para fines de diagnóstico.</span>
            </div>
          </div>
          <div className="hero-right">
            <img src={heroImg} alt="Diagnóstico" className="hero-img" />
          </div>
        </div>

        {/* Info Cards */}
        <div className="info-grid">
          {infoCards.map((card, i) => (
            <div key={i} className={`info-card ${i < 3 ? "has-divider" : ""}`}>
              <div className="card-icon-wrap">{card.icon}</div>
              <h3 className="card-title">{card.title}</h3>
              {card.content}
            </div>
          ))}
        </div>

        {/* Footer banner */}
        <div className="footer-banner">
          <ShieldBadgeIcon />
          <div>
            <p className="banner-title">¡Comienza ahora y fortalece la protección de los datos personales en tu empresa!</p>
            <p className="banner-sub">Un diagnóstico preciso es el primer paso hacia el cumplimiento y la confianza.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
