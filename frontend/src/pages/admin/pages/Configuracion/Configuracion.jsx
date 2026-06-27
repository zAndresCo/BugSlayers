import { FiSettings, FiSave } from 'react-icons/fi';
import '../_shared.css';
import './Configuracion.css';

const Configuracion = () => {
  return (
    <div className="page-view">
      <div className="page-header">
        <div className="page-header-left">
          <div className="page-icon"><FiSettings /></div>
          <div>
            <h1 className="page-title">Configuraci&oacute;n</h1>
            <p className="page-subtitle">Ajustes generales del sistema</p>
          </div>
        </div>
        <button className="page-btn-primary"><FiSave /> Guardar Cambios</button>
      </div>
      <div className="page-card">
        <div className="config-section">
          <h3 className="config-title">Configuraci&oacute;n General</h3>
          <div className="config-row">
            <label>Nombre de la plataforma</label>
            <input type="text" className="config-input" defaultValue="SecureTech" />
          </div>
          <div className="config-row">
            <label>Email de notificaciones</label>
            <input type="email" className="config-input" defaultValue="notificaciones@securetech.com" />
          </div>
          <div className="config-row">
            <label>Porcentaje m&iacute;nimo de cumplimiento</label>
            <input type="number" className="config-input" defaultValue="70" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configuracion;
