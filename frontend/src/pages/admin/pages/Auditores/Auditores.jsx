import { FiUserCheck, FiUserPlus, FiSearch } from 'react-icons/fi';
import '../_shared.css';
import './Auditores.css';

const Auditores = () => {
  return (
    <div className="page-view">
      <div className="page-header">
        <div className="page-header-left">
          <div className="page-icon"><FiUserCheck /></div>
          <div>
            <h1 className="page-title">Auditores</h1>
            <p className="page-subtitle">Equipo de auditores del sistema</p>
          </div>
        </div>
        <button className="page-btn-primary"><FiUserPlus /> Nuevo Auditor</button>
      </div>
      <div className="page-search-bar">
        <FiSearch className="search-icon" />
        <input type="text" placeholder="Buscar auditores..." className="page-search-input" />
      </div>
      <div className="page-card">
        <table className="page-table">
          <thead>
            <tr><th>Nombre</th><th>Email</th><th>Especialidad</th><th>Evaluaciones</th><th>Acciones</th></tr>
          </thead>
          <tbody>
            <tr><td>Ana Torres</td><td>ana@securetech.com</td><td>Protección de Datos</td><td>24</td><td><button className="table-action">Ver</button></td></tr>
            <tr><td>Pedro Ramírez</td><td>pedro@securetech.com</td><td>Seguridad Informática</td><td>18</td><td><button className="table-action">Ver</button></td></tr>
            <tr><td>María García</td><td>maria@securetech.com</td><td>Cumplimiento Legal</td><td>15</td><td><button className="table-action">Ver</button></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Auditores;
