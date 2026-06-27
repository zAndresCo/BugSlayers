import { FiBell, FiChevronDown } from 'react-icons/fi';
import './Header.css';

const Header = () => {
  return (
    <header className="admin-header">
      <div className="header-left">
        <h1 className="header-title">Bienvenido, Administrador</h1>
        <p className="header-subtitle">Resumen general de la plataforma</p>
      </div>
      <div className="header-right">
        <div className="notification-btn">
          <FiBell className="bell-icon" />
          <span className="notification-dot" />
        </div>
        <div className="header-user">
          <div className="header-avatar">
            <span>AD</span>
          </div>
          <FiChevronDown className="dropdown-icon" />
        </div>
      </div>
    </header>
  );
};

export default Header;
