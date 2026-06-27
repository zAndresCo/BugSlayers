import { FiX, FiDownload, FiCalendar, FiUser, FiHome, FiBarChart2 } from 'react-icons/fi';
import { getNivelInfo } from './nivelUtils';
import downloadPDF from '../utils/pdfGenerator';
import './EvaluationDetail.css';

const EvaluationDetail = ({ evaluation, onClose }) => {
  const nivelInfo = getNivelInfo(evaluation.nivel);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="eval-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Detalle de Evaluaci&oacute;n</h2>
          <button className="modal-close" onClick={onClose}><FiX /></button>
        </div>
        <div className="eval-detail-body">
          <div className="eval-detail-row">
            <FiHome className="detail-icon" />
            <div>
              <span className="detail-label">Empresa</span>
              <span className="detail-value">{evaluation.empresa}</span>
            </div>
          </div>
          <div className="eval-detail-row">
            <FiCalendar className="detail-icon" />
            <div>
              <span className="detail-label">Fecha</span>
              <span className="detail-value">{evaluation.fecha}</span>
            </div>
          </div>
          <div className="eval-detail-row">
            <FiUser className="detail-icon" />
            <div>
              <span className="detail-label">Evaluador</span>
              <span className="detail-value">{evaluation.evaluador}</span>
            </div>
          </div>
          <div className="eval-detail-row">
            <FiBarChart2 className="detail-icon" />
            <div>
              <span className="detail-label">Puntaje</span>
              <span className="detail-value">{evaluation.puntaje}%</span>
            </div>
          </div>
          <div className="eval-detail-row">
            <div className="detail-badge" style={{ background: nivelInfo.bg, color: nivelInfo.text }}>
              {evaluation.nivel}
            </div>
            <div className="detail-badge estado" style={{ background: '#E0F2F1', color: '#004D40' }}>
              {evaluation.estado}
            </div>
          </div>
        </div>
        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>Cerrar</button>
          <button className="btn-save" onClick={() => { downloadPDF(evaluation); onClose(); }}>
            <FiDownload /> Descargar Reporte
          </button>
        </div>
      </div>
    </div>
  );
};

export default EvaluationDetail;
