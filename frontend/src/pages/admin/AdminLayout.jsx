import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import './AdminLayout.css';

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <Sidebar />
      <main className="admin-main">
        <Outlet />
        <div className="admin-footer-text">
          SecureTech &copy; 2026 &mdash; Plataforma de Cumplimiento en Protecci&oacute;n de Datos
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
