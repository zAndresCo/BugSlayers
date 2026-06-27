import { FiShield, FiPlus, FiSearch } from 'react-icons/fi';
import '../_shared.css';
import './RolesPermisos.css';

const RolesPermisos = () => {
  return (
    <div className="page-view">
      <div className="page-header">
        <div className="page-header-left">
          <div className="page-icon"><FiShield /></div>
          <div>
            <h1 className="page-title">Roles y Permisos</h1>
            <p className="page-subtitle">Gesti&oacute;n de roles y permisos del sistema</p>
          </div>
        </div>
        <button className="page-btn-primary"><FiPlus /> Nuevo Rol</button>
      </div>
      <div className="page-search-bar">
        <FiSearch className="search-icon" />
        <input type="text" placeholder="Buscar roles..." className="page-search-input" />
      </div>
      <div className="page-card">
        <table className="page-table">
          <thead>
            <tr><th>Rol</th><th>Usuarios</th><th>Descripci&oacute;n</th><th>Estado</th><th>Acciones</th></tr>
          </thead>
          <tbody>
            <tr><td>Administrador</td><td>3</td><td>Acceso total al sistema</td><td><span className="badge badge-active">Activo</span></td><td><button className="table-action">Editar</button></td></tr>
            <tr><td>Auditor</td><td>5</td><td>Puede realizar evaluaciones</td><td><span className="badge badge-active">Activo</span></td><td><button className="table-action">Editar</button></td></tr>
            <tr><td>Usuario</td><td>12</td><td>Acceso b&aacute;sico de consulta</td><td><span className="badge badge-active">Actｉvo</span></td><td><button className="table-action">Editar</button></td></tr>
            <tr><td>Supervisor</td><td>2</td><td>Puede aprobar evaluaciones</td><td><span className="badge badge-inactive">Inactivo</span></td><td><button className="table-action">Editar</button></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RolesPermisos;
