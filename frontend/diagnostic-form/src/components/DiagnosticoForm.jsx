import { useEffect, useState } from "react";
import { preguntas } from "../data/preguntasDiagnostico";
import PreguntaItem from "./PreguntaItem";
import "./DiagnosticoForm.css";
import heroImage from "../assets/From.jpeg";
import {
  cargarRespuestasGuardadas,
  guardarDiagnostico,
  guardarRespuestasParcial,
} from "../services/diagnosticoService";

export default function DiagnosticoForm({ onFinalizar }) {
  const [respuestas, setRespuestas] = useState(() => {
    const guardadas = cargarRespuestasGuardadas();
    const tieneValidas = Object.values(guardadas || {}).some(
      (v) => v !== null && v !== undefined && v !== ""
    );
    return tieneValidas ? guardadas : {};
  });
  const [alertaAbierta, setAlertaAbierta] = useState(() => {
    const guardadas = cargarRespuestasGuardadas();
    return Object.values(guardadas || {}).some(
      (v) => v !== null && v !== undefined && v !== ""
    );
  });
  const [mensajeAlerta, setMensajeAlerta] = useState(() => {
    const guardadas = cargarRespuestasGuardadas();
    return Object.values(guardadas || {}).some(
      (v) => v !== null && v !== undefined && v !== ""
    ) ? "Respuestas cargadas" : "";
  });
  const [tipoAlerta, setTipoAlerta] = useState("info");

  useEffect(() => {
    if (!alertaAbierta) return;
    const t = setTimeout(() => setAlertaAbierta(false), 4000);
    return () => clearTimeout(t);
  }, []);

  const totalRespondidas = Object.keys(respuestas).length;
  const porcentaje = Math.round((totalRespondidas / preguntas.length) * 100);

  const handleChange = (id, valor) => {
    const nuevasRespuestas = { ...respuestas, [id]: valor };
    setRespuestas(nuevasRespuestas);
    guardarRespuestasParcial(nuevasRespuestas);
  };

  const abrirAlerta = (mensaje, tipo) => {
    setMensajeAlerta(mensaje);
    setTipoAlerta(tipo);
    setAlertaAbierta(true);
    window.setTimeout(() => setAlertaAbierta(false), 4000);
  };

  const handleFinalizar = async () => {
    abrirAlerta("Enviando...", "info");

    const resultado = await guardarDiagnostico(respuestas, {
      formulario: "diagnostico-ley-1581",
    });

    if (resultado.ok) {
      abrirAlerta("Respuestas guardadas correctamente", "success");
      if (onFinalizar) {
        setTimeout(() => onFinalizar(respuestas), 1200);
      }
    } else {
      abrirAlerta("Guardado localmente, revisa la conexión", "error");
    }
  };

  return (
    <div className="diagnostico-wrapper">
      <div className="diagnostico-header">
        <div className="diagnostico-header-texto">
          <h1>Diagnóstico – Fase de Diseño</h1>
          <p>
            Responde las siguientes preguntas para conocer el nivel de
            cumplimiento de tu empresa frente a la Ley 1581 de 2012.
          </p>
        </div>
        <div className="diagnostico-header-icon">
          <img src={heroImage} alt="Diagnóstico" />
        </div>
      </div>

      <div className="progreso-barra-container">
        <span className="progreso-porcentaje">{porcentaje}%</span>
        <div className="progreso-barra">
          <div
            className="progreso-barra-fill"
            style={{ width: `${porcentaje}%` }}
          />
        </div>
        <span className="progreso-texto">
          Progreso: <strong>{totalRespondidas} de {preguntas.length}</strong>
        </span>
      </div>

      <div className="preguntas-lista">
        {preguntas.map((p) => (
          <PreguntaItem
            key={p.id}
            pregunta={p}
            respuesta={respuestas[p.id]}
            onChange={handleChange}
          />
        ))}
      </div>

      <div className="diagnostico-footer">
        <button
          className="btn-finalizar"
          onClick={handleFinalizar}
          disabled={totalRespondidas < preguntas.length}
        >
          Finalizar Diagnóstico
        </button>
      </div>

      {alertaAbierta && (
        <div className="modal-overlay">
          <div className={`alerta-modal alerta-modal--${tipoAlerta}`}>
            <div className="alerta-modal__icon">!</div>
            <div className="alerta-modal__body">
              <h2 className="alerta-modal__title">
                {tipoAlerta === "success" ? "¡Listo!" : tipoAlerta === "error" ? "Error" : "Atención"}
              </h2>
              <p className="alerta-modal__texto">{mensajeAlerta}</p>
            </div>
            <button
              type="button"
              className="alerta-modal__boton"
              onClick={() => setAlertaAbierta(false)}
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}