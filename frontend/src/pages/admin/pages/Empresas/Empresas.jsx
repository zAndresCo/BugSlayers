import { useState, useMemo, useCallback } from 'react';
import { FiBriefcase, FiPlus, FiSearch, FiEye, FiEdit2, FiTrash2, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Swal from 'sweetalert2';
import generateEmpresas from './data/mockData';
import CompanyForm from './components/CompanyForm';
import '../_shared.css';
import './Empresas.css';

const PAGE_SIZE = 5;

const Empresas = () => {
  const [companies, setCompanies] = useState(generateEmpresas);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return companies;
    const term = search.toLowerCase();
    return companies.filter(
      (c) =>
        c.nombre.toLowerCase().includes(term) ||
        c.nit.toLowerCase().includes(term) ||
        c.sector.toLowerCase().includes(term)
    );
  }, [companies, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);

  const paginated = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, safePage]);

  const startItem = (safePage - 1) * PAGE_SIZE + 1;
  const endItem = Math.min(safePage * PAGE_SIZE, filtered.length);

  const getPageNumbers = useCallback(() => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, safePage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }, [safePage, totalPages]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const openCreate = () => {
    setEditingCompany(null);
    setShowModal(true);
  };

  const openEdit = (company) => {
    setEditingCompany(company);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCompany(null);
  };

  const handleSave = (formData) => {
    if (editingCompany) {
      setCompanies((prev) =>
        prev.map((c) => (c.id === editingCompany.id ? { ...c, ...formData } : c))
      );
      Swal.fire({ icon: 'success', title: 'Actualizada', text: 'Empresa actualizada correctamente', timer: 1500, showConfirmButton: false });
    } else {
      const newCompany = { id: Date.now(), ...formData };
      setCompanies((prev) => [...prev, newCompany]);
      Swal.fire({ icon: 'success', title: 'Creada', text: 'Empresa creada correctamente', timer: 1500, showConfirmButton: false });
    }
    closeModal();
  };

  const handleDelete = (company) => {
    Swal.fire({
      title: '&iquest;Eliminar empresa?',
      text: `Se eliminar&aacute; "${company.nombre}" permanentemente.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#F04438',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'S&iacute;, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        setCompanies((prev) => prev.filter((c) => c.id !== company.id));
        Swal.fire({ icon: 'success', title: 'Eliminada', text: 'Empresa eliminada correctamente', timer: 1500, showConfirmButton: false });
      }
    });
  };

  const showEmpty = filtered.length === 0;

  return (
    <div className="page-view">
      <div className="empresas-header">
        <div className="page-header-left">
          <div className="page-icon"><FiBriefcase /></div>
          <div>
            <h1 className="page-title">Empresas</h1>
            <p className="page-subtitle">Administra las empresas registradas</p>
          </div>
        </div>
        <div className="empresas-actions">
          <div className="empresas-search">
            <FiSearch className="empresas-search-icon" />
            <input
              type="text"
              placeholder="Buscar empresa..."
              value={search}
              onChange={handleSearch}
              className="empresas-search-input"
            />
          </div>
          <button className="page-btn-primary" onClick={openCreate}>
            <FiPlus /> Nueva Empresa
          </button>
        </div>
      </div>

      <div className="page-card empresas-card">
        {showEmpty ? (
          <div className="empty-state">
            <FiSearch className="empty-icon" />
            <p className="empty-text">No se encontraron resultados</p>
            <p className="empty-hint">Intenta con otro t&eacute;rmino de b&uacute;squeda</p>
          </div>
        ) : (
          <table className="empresas-table">
            <thead>
              <tr>
                <th>Empresa</th>
                <th>NIT</th>
                <th>Sector</th>
                <th>Tama&ntilde;o</th>
                <th>Evaluaciones</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((emp) => (
                <tr key={emp.id}>
                  <td className="td-empresa">{emp.nombre}</td>
                  <td className="td-nit">{emp.nit}</td>
                  <td className="td-sector">{emp.sector}</td>
                  <td className="td-tamano">{emp.tamano}</td>
                  <td className="td-evaluaciones">{emp.evaluaciones}</td>
                  <td className="td-estado">
                    <span className="badge badge-active">{emp.estado}</span>
                  </td>
                  <td className="td-acciones">
                    <button className="action-btn view" title="Ver detalles"><FiEye /></button>
                    <button className="action-btn edit" title="Editar" onClick={() => openEdit(emp)}><FiEdit2 /></button>
                    <button className="action-btn delete" title="Eliminar" onClick={() => handleDelete(emp)}><FiTrash2 /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {!showEmpty && (
        <div className="pagination-bar">
          <span className="pagination-info">
            Mostrando {startItem} a {endItem} de {filtered.length} empresas
          </span>
          <div className="pagination-controls">
            <button
              className="page-btn"
              disabled={safePage <= 1}
              onClick={() => handlePageChange(safePage - 1)}
            >
              <FiChevronLeft />
            </button>
            {getPageNumbers().map((p) => (
              <button
                key={p}
                className={`page-btn page-num ${p === safePage ? 'active' : ''}`}
                onClick={() => handlePageChange(p)}
              >
                {p}
              </button>
            ))}
            <button
              className="page-btn"
              disabled={safePage >= totalPages}
              onClick={() => handlePageChange(safePage + 1)}
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      )}

      {showModal && (
        <CompanyForm
          company={editingCompany}
          onSave={handleSave}
          onCancel={closeModal}
        />
      )}
    </div>
  );
};

export default Empresas;
