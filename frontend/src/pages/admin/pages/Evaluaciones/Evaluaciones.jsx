import { useState, useMemo, useCallback, useRef } from 'react';
import { FiSearch, FiEye, FiDownload, FiChevronDown, FiChevronLeft, FiChevronRight, FiCalendar } from 'react-icons/fi';
import Swal from 'sweetalert2';
import generateEvaluaciones from './data/mockData';
import EvaluationDetail from './components/EvaluationDetail';
import { getNivelInfo, getEstadoInfo } from './components/nivelUtils';
import downloadPDF from './utils/pdfGenerator';
import '../_shared.css';
import './Evaluaciones.css';

const PAGE_SIZE = 5;

const Evaluaciones = () => {
  const [evaluaciones, setEvaluaciones] = useState(generateEvaluaciones);
  const [search, setSearch] = useState('');
  const [filterEmpresa, setFilterEmpresa] = useState('');
  const [filterEstado, setFilterEstado] = useState('');
  const [dateFrom, setDateFrom] = useState('2024-01-01');
  const [dateTo, setDateTo] = useState('2024-12-31');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEval, setSelectedEval] = useState(null);

  const empresas = useMemo(() => {
    const set = new Set(evaluaciones.map((e) => e.empresa));
    return Array.from(set).sort();
  }, [evaluaciones]);

  const estados = useMemo(() => {
    const set = new Set(evaluaciones.map((e) => e.estado));
    return Array.from(set);
  }, [evaluaciones]);

  const parseFecha = (fechaStr) => {
    const [d, m, y] = fechaStr.split('/');
    return new Date(+y, +m - 1, +d);
  };

  const filtered = useMemo(() => {
    return evaluaciones.filter((e) => {
      if (filterEmpresa && e.empresa !== filterEmpresa) return false;
      if (filterEstado && e.estado !== filterEstado) return false;
      if (search) {
        const term = search.toLowerCase();
        if (
          !e.empresa.toLowerCase().includes(term) &&
          !e.evaluador.toLowerCase().includes(term)
        ) return false;
      }
      const fecha = parseFecha(e.fecha);
      const from = dateFrom ? new Date(dateFrom) : null;
      const to = dateTo ? new Date(dateTo) : null;
      if (from && fecha < from) return false;
      if (to) {
        const toEnd = new Date(to);
        toEnd.setHours(23, 59, 59, 999);
        if (fecha > toEnd) return false;
      }
      return true;
    });
  }, [evaluaciones, filterEmpresa, filterEstado, search, dateFrom, dateTo]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);

  const paginated = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, safePage]);

  const startItem = (safePage - 1) * PAGE_SIZE + 1;
  const endItem = Math.min(safePage * PAGE_SIZE, filtered.length);
  const showEmpty = filtered.length === 0;

  const getPageNumbers = useCallback(() => {
    const pages = [];
    const total = totalPages;
    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
      return pages;
    }
    pages.push(1, 2, 3, 4, 5);
    if (safePage > 5 && safePage < total - 2) {
      pages.pop();
      pages.push('...', safePage - 1, safePage, safePage + 1);
    }
    if (!pages.includes(total)) {
      if (pages[pages.length - 1] !== '...') pages.push('...');
      pages.push(total);
    }
    return pages;
  }, [safePage, totalPages]);

  const handleSearch = (e) => { setSearch(e.target.value); setCurrentPage(1); };
  const handlePageChange = (p) => { if (p >= 1 && p <= totalPages) setCurrentPage(p); };

  const handleView = (e) => setSelectedEval(e);

  const handleDownload = (evaluacion) => {
    downloadPDF(evaluacion);
    Swal.fire({
      icon: 'success',
      title: 'Reporte descargado',
      text: `PDF de "${evaluacion.empresa}" generado correctamente`,
      timer: 1800,
      showConfirmButton: false,
    });
  };

  return (
    <div className="page-view">
      <div className="eval-header">
        <div>
          <h1 className="eval-title">Evaluaciones</h1>
          <p className="eval-subtitle">Consulta y gestiona las evaluaciones realizadas</p>
        </div>
      </div>

      <div className="filter-bar">
        <div className="filter-select-wrapper">
          <select
            className="filter-select"
            value={filterEmpresa}
            onChange={(e) => { setFilterEmpresa(e.target.value); setCurrentPage(1); }}
          >
            <option value="">Todas las empresas</option>
            {empresas.map((emp) => (
              <option key={emp} value={emp}>{emp}</option>
            ))}
          </select>
          <FiChevronDown className="filter-chevron" />
        </div>

        <div className="filter-select-wrapper">
          <select
            className="filter-select"
            value={filterEstado}
            onChange={(e) => { setFilterEstado(e.target.value); setCurrentPage(1); }}
          >
            <option value="">Todos los estados</option>
            {estados.map((est) => (
              <option key={est} value={est}>{est}</option>
            ))}
          </select>
          <FiChevronDown className="filter-chevron" />
        </div>

        <div className="filter-date-wrapper">
          <FiCalendar className="filter-date-icon" />
          <input
            type="date"
            className="filter-date-input"
            value={dateFrom}
            onChange={(e) => { setDateFrom(e.target.value); setCurrentPage(1); }}
          />
          <span className="filter-date-sep">a</span>
          <input
            type="date"
            className="filter-date-input"
            value={dateTo}
            onChange={(e) => { setDateTo(e.target.value); setCurrentPage(1); }}
          />
        </div>

        <div className="filter-search-wrapper">
          <input
            type="text"
            className="filter-search-input"
            placeholder="Buscar evaluaci&oacute;n..."
            value={search}
            onChange={handleSearch}
          />
          <FiSearch className="filter-search-icon" />
        </div>
      </div>

      <div className="page-card eval-card">
        {showEmpty ? (
          <div className="empty-state">
            <FiSearch className="empty-icon" />
            <p className="empty-text">No se encontraron resultados</p>
            <p className="empty-hint">Intenta con otros filtros de b&uacute;squeda</p>
          </div>
        ) : (
          <table className="eval-table">
            <thead>
              <tr>
                <th>Empresa</th>
                <th>Fecha</th>
                <th>Evaluador</th>
                <th>Puntaje</th>
                <th>Nivel</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((ev) => {
                const nivelInfo = getNivelInfo(ev.nivel);
                const estadoInfo = getEstadoInfo(ev.estado);
                return (
                  <tr key={ev.id}>
                    <td className="td-empresa">{ev.empresa}</td>
                    <td className="td-fecha">{ev.fecha}</td>
                    <td className="td-evaluador">{ev.evaluador}</td>
                    <td className="td-puntaje">{ev.puntaje}%</td>
                    <td>
                      <span className="eval-badge" style={{ background: nivelInfo.bg, color: nivelInfo.text }}>
                        {ev.nivel}
                      </span>
                    </td>
                    <td>
                      <span className="eval-badge" style={{ background: estadoInfo.bg, color: estadoInfo.text }}>
                        {ev.estado}
                      </span>
                    </td>
                    <td className="td-acciones">
                      <button className="action-btn view" title="Ver detalle" onClick={() => handleView(ev)}>
                        <FiEye />
                      </button>
                      <button className="action-btn download" title="Descargar" onClick={() => handleDownload(ev)}>
                        <FiDownload />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {!showEmpty && (
        <div className="pagination-bar">
          <span className="pagination-info">
            Mostrando {startItem} a {endItem} de {filtered.length.toLocaleString()} evaluaciones
          </span>
          <div className="pagination-controls">
            <button className="page-btn" disabled={safePage <= 1} onClick={() => handlePageChange(safePage - 1)}>
              <FiChevronLeft />
            </button>
            {getPageNumbers().map((p, i) =>
              p === '...' ? (
                <span key={`e${i}`} className="page-ellipsis">&hellip;</span>
              ) : (
                <button
                  key={p}
                  className={`page-btn page-num ${p === safePage ? 'active' : ''}`}
                  onClick={() => handlePageChange(p)}
                >
                  {p}
                </button>
              )
            )}
            <button className="page-btn" disabled={safePage >= totalPages} onClick={() => handlePageChange(safePage + 1)}>
              <FiChevronRight />
            </button>
          </div>
        </div>
      )}

      {selectedEval && (
        <EvaluationDetail evaluation={selectedEval} onClose={() => setSelectedEval(null)} />
      )}
    </div>
  );
};

export default Evaluaciones;
