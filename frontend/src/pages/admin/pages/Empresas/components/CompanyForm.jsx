import { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import './CompanyForm.css';

const sectores = [
  'Tecnolog&iacute;a', 'Consultor&iacute;a', 'Log&iacute;stica', 'Financiero', 'Salud',
  'Educaci&oacute;n', 'Manufactura', 'Comercio', 'Construcci&oacute;n', 'Alimentaci&oacute;n',
  'Agroindustria', 'Transporte', 'Energ&iacute;a', 'Comunicaciones', 'Miner&iacute;a',
];

const tamanos = ['Peque&ntilde;a', 'Mediana', 'Grande', 'Grende'];

const CompanyForm = ({ company, onSave, onCancel }) => {
  const [form, setForm] = useState({
    nombre: '',
    nit: '',
    sector: 'Tecnolog&iacute;a',
    tamano: 'Mediana',
    evaluaciones: 0,
    estado: 'Activo',
  });

  useEffect(() => {
    if (company) {
      setForm({
        nombre: company.nombre,
        nit: company.nit,
        sector: company.sector,
        tamano: company.tamano,
        evaluaciones: company.evaluaciones,
        estado: company.estado,
      });
    }
  }, [company]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.nit.trim()) return;
    onSave({ ...form, evaluaciones: Number(form.evaluaciones) });
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {company ? 'Editar Empresa' : 'Nueva Empresa'}
          </h2>
          <button className="modal-close" onClick={onCancel}>
            <FiX />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-row">
            <label className="form-label">Nombre de la empresa</label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              className="form-input"
              placeholder="Ingrese el nombre"
              required
            />
          </div>
          <div className="form-row">
            <label className="form-label">NIT</label>
            <input
              type="text"
              name="nit"
              value={form.nit}
              onChange={handleChange}
              className="form-input"
              placeholder="Ej: 900123456-1"
              required
            />
          </div>
          <div className="form-row">
            <label className="form-label">Sector</label>
            <select name="sector" value={form.sector} onChange={handleChange} className="form-input">
              {sectores.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="form-row">
            <label className="form-label">Tama&ntilde;o</label>
            <select name="tamano" value={form.tamano} onChange={handleChange} className="form-input">
              {tamanos.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="form-row">
            <label className="form-label">Evaluaciones realizadas</label>
            <input
              type="number"
              name="evaluaciones"
              value={form.evaluaciones}
              onChange={handleChange}
              className="form-input"
              min="0"
            />
          </div>
          <div className="form-row">
            <label className="form-label">Estado</label>
            <select name="estado" value={form.estado} onChange={handleChange} className="form-input">
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onCancel}>
              Cancelar
            </button>
            <button type="submit" className="btn-save">
              {company ? 'Guardar Cambios' : 'Crear Empresa'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyForm;
