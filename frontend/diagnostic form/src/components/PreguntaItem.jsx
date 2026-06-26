import "./PreguntaItem.css";

export default function PreguntaItem({ pregunta, respuesta, onChange }) {
  return (
    <div className="pregunta-item">
      <div className="pregunta-numero">{pregunta.id}</div>
      <p className="pregunta-texto">{pregunta.texto}</p>
      <div className="pregunta-botones">
        <button
          type="button"
          className={`btn-respuesta ${respuesta === true ? "activo" : ""}`}
          onClick={() => onChange(pregunta.id, true)}
        >
          Sí
        </button>
        <button
          type="button"
          className={`btn-respuesta ${respuesta === false ? "activo" : ""}`}
          onClick={() => onChange(pregunta.id, false)}
        >
          No
        </button>
      </div>
    </div>
  );
}