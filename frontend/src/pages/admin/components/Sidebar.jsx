import { useNavigate, useLocation } from 'react-router-dom';
import {
  FiShield, FiHome, FiUsers, FiBriefcase, FiClipboard,
  FiUserCheck, FiHelpCircle, FiFileText, FiSettings, FiLogOut
} from 'react-icons/fi';
import './Sidebar.css';

const menuItems = [
  { icon: FiHome, label: 'Dashboard', path: '/admin' },
  { icon: FiUsers, label: 'Usuarios', path: '/admin/usuarios' },
  { icon: FiBriefcase, label: 'Empresas', path: '/admin/empresas' },
  { icon: FiClipboard, label: 'Evaluaciones', path: '/admin/evaluaciones' },
  { icon: FiUserCheck, label: 'Auditores', path: '/admin/auditores' },
  { icon: FiHelpCircle, label: 'Preguntas', path: '/admin/preguntas' },
  { icon: FiFileText, label: 'Reportes', path: '/admin/reportes' },
  { icon: FiSettings, label: 'Configuración', path: '/admin/configuracion' },
  { icon: FiShield, label: 'Roles y Permisos', path: '/admin/roles-permisos' },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <FiShield />
        </div>
        <div className="logo-text">
          <span className="logo-main">SecureTech</span>
          <span className="logo-sub">CIBERSEGURIDAD</span>
        </div>
      </div>

      <div className="sidebar-user">
        <div className="user-avatar">
          <span>AD</span>
        </div>
        <div className="user-info">
          <span className="user-name">Administrador</span>
          <span className="user-email">admin@securetech.com</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <span className="nav-section-title">Navegaci&oacute;n</span>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <button
              key={item.label}
              className={`nav-item ${active ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
            >
              <Icon className="nav-icon" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={() => navigate('/')}>
          <FiLogOut className="logout-icon" />
          <span>Cerrar sesi&oacute;n</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
