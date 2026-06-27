import { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';

const categorias = [
  'Pol&iacute;tica de datos',
  'Seguridad',
  'Procedimientos',
  'Organizaci&oacute;n',
];

const pesos = ['0-40%', '8%', '10%', '12%', '16%', 'Complementaria'];

const QuestionForm = ({ question, onSave, onCancel }) => {
  const [form, setForm] = useState({
    pregunta: '',
    categoria: 'Pol&iacute;tica de datos',
    peso: '10%',
    estado: 'Activa',
  });

  useEffect(() => {
    if (question) {
      setForm({
        pregunta: question.pregunta,
        categoria: question.categoria,
        peso: question.peso,
        estado: question.estado,
      });
    }
  }, [question]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.pregunta.trim()) return;
    onSave(form);
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {question ? 'Editar Pregunta' : 'Nueva Pregunta'}
          </h2>
          <button className="modal-close" onClick={onCancel}><FiX /></button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-row">
            <label className="form-label">Pregunta</label>
            <textarea
              name="pregunta"
              value={form.pregunta}
              onChange={handleChange}
              className="form-input form-textarea"
              placeholder="Ingrese la pregunta"
              rows={3}
              required
            />
          </div>
          <div className="form-row">
            <label className="form-label">Categor&iacute;a</label>
            <select name="categoria" value={form.categoria} onChange={handleChange} className="form-input">
              {categorias.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="form-row">
            <label className="form-label">Peso</label>
            <select name="peso" value={form.peso} onChange={handleChange} className="form-input">
              {pesos.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
          <div className="form-row">
            <label className="form-label">Estado</label>
            <select name="estado" value={form.estado} onChange={handleChange} className="form-input">
              <option value="Activa">Activa</option>
              <option value="Inactiva">Inactiva</option>
            </select>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onCancel}>Cancelar</button>
            <button type="submit" className="btn-save">
              {question ? 'Guardar Cambios' : 'Crear Pregunta'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionForm;
