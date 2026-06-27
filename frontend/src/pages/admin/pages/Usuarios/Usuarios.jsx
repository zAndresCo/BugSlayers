import { FiUsers, FiUserPlus, FiSearch } from 'react-icons/fi';
import '../_shared.css';
import './Usuarios.css';

const Usuarios = () => {
  return (
    <div className="page-view">
      <div className="page-header">
        <div className="page-header-left">
          <div className="page-icon"><FiUsers /></div>
          <div>
            <h1 className="page-title">Usuarios</h1>
            <p className="page-subtitle">Gesti&oacute;n de usuarios del sistema</p>
          </div>
        </div>
        <button className="page-btn-primary">
          <FiUserPlus /> Nuevo Usuario
        </button>
      </div>
      <div className="page-search-bar">
        <FiSearch className="search-icon" />
        <input type="text" placeholder="Buscar usuarios..." className="page-search-input" />
      </div>
      <div className="page-card">
        <table className="page-table">
          <thead>
            <tr><th>Nombre</th><th>Email</th><th>Rol</th><th>Estado</th><th>Acciones</th></tr>
          </thead>
          <tbody>
            <tr><td>Carlos M&eacute;ndez</td><td>carlos@email.com</td><td>Admin</td><td><span className="badge badge-active">Activo</span></td><td><button className="table-action">Editar</button></td></tr>
            <tr><td>Ana Torres</td><td>ana@email.com</td><td>Auditor</td><td><span className="badge badge-active">Activo</span></td><td><button className="table-action">Editar</button></td></tr>
            <tr><td>Luis Rojas</td><td>luis@email.com</td><td>Usuario</td><td><span className="badge badge-inactive">Inactivo</span></td><td><button className="table-action">Editar</button></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Usuarios;
