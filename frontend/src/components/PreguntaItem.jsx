import { useState } from 'react';
import { explicarPregunta } from '../services/aiService';
import './PreguntaItem.css';

export default function PreguntaItem({ pregunta, respuesta, onChange }) {
  const [explicacion, setExplicacion] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [abierto, setAbierto] = useState(false);

  const handleAyuda = async () => {
    if (abierto) {
      setAbierto(false);
      return;
    }
    if (explicacion) {
      setAbierto(true);
      return;
    }
    setCargando(true);
    try {
      const texto = await explicarPregunta(pregunta.id, pregunta.texto);
      setExplicacion(texto);
      setAbierto(true);
    } catch {
      setExplicacion('No se pudo obtener la explicación. Verifica la conexión.');
      setAbierto(true);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="pregunta-item">
      <div className="pregunta-numero">{pregunta.id}</div>
      <div className="pregunta-contenido">
        <p className="pregunta-texto">{pregunta.texto}</p>
        {abierto && explicacion && (
          <div className="pregunta-explicacion">
            <span className="explicacion-icono">💡</span>
            {explicacion}
          </div>
        )}
      </div>
      <div className="pregunta-acciones">
        <button
          type="button"
          className={`btn-ayuda ${abierto ? 'activo' : ''}`}
          onClick={handleAyuda}
          title="Explicación IA"
          disabled={cargando}
        >
          {cargando ? '...' : '¿Ayuda?'}
        </button>
        <div className="pregunta-botones">
          <button
            type="button"
            className={`btn-respuesta ${respuesta === true ? 'activo' : ''}`}
            onClick={() => onChange(pregunta.id, true)}
          >
            S&iacute;
          </button>
          <button
            type="button"
            className={`btn-respuesta ${respuesta === false ? 'activo' : ''}`}
            onClick={() => onChange(pregunta.id, false)}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
