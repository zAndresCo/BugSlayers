import { useState, useMemo, useCallback } from 'react';
import {
  FiHelpCircle, FiPlus, FiSearch, FiEdit2, FiTrash2,
  FiChevronLeft, FiChevronRight,
} from 'react-icons/fi';
import Swal from 'sweetalert2';
import generatePreguntas from './data/mockData';
import QuestionForm from './components/QuestionForm';
import '../_shared.css';
import './Preguntas.css';

const PAGE_SIZE = 5;

const Preguntas = () => {
  const [preguntas, setPreguntas] = useState(generatePreguntas);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return preguntas;
    const term = search.toLowerCase();
    return preguntas.filter(
      (q) =>
        q.pregunta.toLowerCase().includes(term) ||
        q.categoria.toLowerCase().includes(term)
    );
  }, [preguntas, search]);

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

  const openCreate = () => { setEditingQuestion(null); setShowModal(true); };
  const openEdit = (q) => { setEditingQuestion(q); setShowModal(true); };
  const closeModal = () => { setShowModal(false); setEditingQuestion(null); };

  const handleSave = (formData) => {
    if (editingQuestion) {
      setPreguntas((prev) =>
        prev.map((q) => (q.id === editingQuestion.id ? { ...q, ...formData } : q))
      );
      Swal.fire({ icon: 'success', title: 'Actualizada', text: 'Pregunta actualizada correctamente', timer: 1500, showConfirmButton: false });
    } else {
      const newQ = { id: Date.now(), ...formData };
      setPreguntas((prev) => [...prev, newQ]);
      Swal.fire({ icon: 'success', title: 'Creada', text: 'Pregunta creada correctamente', timer: 1500, showConfirmButton: false });
    }
    closeModal();
  };

  const handleDelete = (q) => {
    Swal.fire({
      title: '&iquest;Eliminar pregunta?',
      html: `Se eliminar&aacute; esta pregunta permanentemente.<br><br><em>"${q.pregunta}"</em>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#F04438',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'S&iacute;, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        setPreguntas((prev) => prev.filter((x) => x.id !== q.id));
        Swal.fire({ icon: 'success', title: 'Eliminada', text: 'Pregunta eliminada correctamente', timer: 1500, showConfirmButton: false });
      }
    });
  };

  return (
    <div className="page-view">
      <div className="preguntas-header">
        <div className="page-header-left">
          <div className="page-icon"><FiHelpCircle /></div>
          <div>
            <h1 className="page-title">Banco de Preguntas</h1>
            <p className="page-subtitle">Gestiona las preguntas del diagn&oacute;stico</p>
          </div>
        </div>
        <div className="preguntas-actions">
          <div className="preguntas-search">
            <FiSearch className="preguntas-search-icon" />
            <input
              type="text"
              placeholder="Buscar pregunta..."
              value={search}
              onChange={handleSearch}
              className="preguntas-search-input"
            />
          </div>
          <button className="page-btn-primary" onClick={openCreate}>
            <FiPlus /> Nueva Pregunta
          </button>
        </div>
      </div>

      <div className="page-card preguntas-card">
        {showEmpty ? (
          <div className="empty-state">
            <FiSearch className="empty-icon" />
            <p className="empty-text">No se encontraron resultados</p>
            <p className="empty-hint">Intenta con otro t&eacute;rmino de b&uacute;squeda</p>
          </div>
        ) : (
          <table className="preguntas-table">
            <thead>
              <tr>
                <th>Pregunta</th>
                <th>Categor&iacute;a</th>
                <th>Peso</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((q) => (
                <tr key={q.id}>
                  <td className="td-pregunta">{q.pregunta}</td>
                  <td className="td-categoria">{q.categoria}</td>
                  <td className="td-peso">{q.peso}</td>
                  <td>
                    <span className={`badge ${q.estado === 'Activa' ? 'badge-active' : 'badge-inactive'}`}>
                      {q.estado}
                    </span>
                  </td>
                  <td className="td-acciones">
                    <button className="action-btn edit" title="Editar" onClick={() => openEdit(q)}>
                      <FiEdit2 />
                    </button>
                    <button className="action-btn delete" title="Eliminar" onClick={() => handleDelete(q)}>
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {!showEmpty && totalPages > 1 && (
        <div className="pagination-bar">
          <span className="pagination-info">
            Mostrando {startItem} a {endItem} de {filtered.length} preguntas
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

      {showModal && (
        <QuestionForm question={editingQuestion} onSave={handleSave} onCancel={closeModal} />
      )}
    </div>
  );
};

export default Preguntas;
