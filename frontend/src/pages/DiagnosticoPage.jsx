import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { preguntas } from '../data/preguntasDiagnostico';
import PreguntaItem from '../components/PreguntaItem';
import {
  calcularDiagnostico,
  cargarRespuestasGuardadas,
  guardarResultadoDiagnostico,
  guardarDiagnostico,
  guardarRespuestasParcial,
} from '../services/diagnosticoService';
import './DiagnosticoPage.css';

export default function DiagnosticoPage() {
  const navigate = useNavigate();
  const [respuestas, setRespuestas] = useState({});

  useEffect(() => {
    const guardadas = cargarRespuestasGuardadas();
    const tieneValidas = Object.values(guardadas).some(
      (v) => v !== null && v !== undefined && v !== ''
    );
    setRespuestas(guardadas);
    if (tieneValidas) {
      Swal.fire({ icon: 'info', title: 'Respuestas cargadas', text: 'Se retomaron tus respuestas guardadas.', timer: 3000, showConfirmButton: false });
    }
  }, []);

  const totalRespondidas = Object.keys(respuestas).length;
  const porcentaje = Math.round((totalRespondidas / preguntas.length) * 100);

  const handleChange = (id, valor) => {
    const nuevas = { ...respuestas, [id]: valor };
    setRespuestas(nuevas);
    guardarRespuestasParcial(nuevas);
  };

  const handleFinalizar = async () => {
    const result = await Swal.fire({
      icon: 'question',
      title: '¿Finalizar diagnóstico?',
      text: 'Asegúrate de haber respondido todas las preguntas.',
      showCancelButton: true,
      confirmButtonText: 'Sí, finalizar',
      cancelButtonText: 'Cancelar',
    });
    if (!result.isConfirmed) return;

    const diagnostico = calcularDiagnostico(respuestas);
    Swal.fire({ icon: 'info', title: 'Enviando...', text: 'Guardando tus respuestas', timer: 2000, showConfirmButton: false });
    const resultado = await guardarDiagnostico(respuestas, {
      formulario: 'diagnostico-ley-1581',
      diagnostico,
    });
    if (resultado.ok) {
      guardarResultadoDiagnostico(diagnostico);
      await Swal.fire({ icon: 'success', title: '¡Completado!', text: 'Diagnóstico guardado correctamente.', confirmButtonText: 'Ver resultados' });
      navigate('/welcome', { state: { diagnostico } });
    } else {
      Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo guardar. Revisa la conexión.' });
    }
  };

  const handleVolver = () => navigate('/welcome');

  return (
    <div className="diagnostico-page">
      <div className="diagnostico-header">
        <div className="diagnostico-header-texto">
          <h1>Diagn&oacute;stico &ndash; Fase de Dise&ntilde;o</h1>
          <p>Responde las siguientes preguntas para conocer el nivel de cumplimiento de tu empresa frente a la Ley 1581 de 2012.</p>
        </div>
      </div>

      <div className="progreso-barra-container">
        <span className="progreso-porcentaje">{porcentaje}%</span>
        <div className="progreso-barra">
          <div className="progreso-barra-fill" style={{ width: `${porcentaje}%` }} />
        </div>
        <span className="progreso-texto">Progreso: <strong>{totalRespondidas} de {preguntas.length}</strong></span>
      </div>

      <div className="preguntas-lista">
        {preguntas.map((p) => (
          <PreguntaItem key={p.id} pregunta={p} respuesta={respuestas[p.id]} onChange={handleChange} />
        ))}
      </div>

      <div className="diagnostico-footer">
        <button className="btn-volver" onClick={handleVolver}>Volver</button>
        <button className="btn-finalizar" onClick={handleFinalizar} disabled={totalRespondidas < preguntas.length}>
          Finalizar Diagn&oacute;stico
        </button>
      </div>
    </div>
  );
}
