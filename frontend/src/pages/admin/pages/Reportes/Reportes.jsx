import { FiFileText, FiDownload, FiSearch } from 'react-icons/fi';
import '../_shared.css';
import './Reportes.css';

const Reportes = () => {
  return (
    <div className="page-view">
      <div className="page-header">
        <div className="page-header-left">
          <div className="page-icon"><FiFileText /></div>
          <div>
            <h1 className="page-title">Reportes</h1>
            <p className="page-subtitle">Informes y reportes del sistema</p>
          </div>
        </div>
        <button className="page-btn-primary"><FiDownload /> Exportar</button>
      </div>
      <div className="page-search-bar">
        <FiSearch className="search-icon" />
        <input type="text" placeholder="Buscar reportes..." className="page-search-input" />
      </div>
      <div className="page-card">
        <table className="page-table">
          <thead>
            <tr><th>Reporte</th><th>Empresa</th><th>Fecha</th><th>Formato</th><th>Acciones</th></tr>
          </thead>
          <tbody>
            <tr><td>Informe de Cumplimiento</td><td>TechSolutions S.A.S.</td><td>15/06/2026</td><td>PDF</td><td><button className="table-action">Descargar</button></td></tr>
            <tr><td>Diagnóstico General</td><td>Universidad Nacional</td><td>12/06/2026</td><td>PDF</td><td><button className="table-action">Descargar</button></td></tr>
            <tr><td>Evaluación de Riesgos</td><td>Hospital San José</td><td>10/06/2026</td><td>Excel</td><td><button className="table-action">Descargar</button></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reportes;
