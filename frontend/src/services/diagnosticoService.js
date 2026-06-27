const STORAGE_KEY = 'diagnostico-respuestas';
const RESULT_STORAGE_KEY = 'diagnostico-resultado';
const API_URL = import.meta.env.VITE_API_URL || '';

export function cargarRespuestasGuardadas() {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function cargarResultadoDiagnostico() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(RESULT_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function guardarRespuestasParcial(respuestas) {
  if (typeof window === 'undefined') return respuestas;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(respuestas));
  return respuestas;
}

export function guardarResultadoDiagnostico(resultado) {
  if (typeof window === 'undefined') return resultado;
  window.localStorage.setItem(RESULT_STORAGE_KEY, JSON.stringify(resultado));
  return resultado;
}

export function calcularDiagnostico(respuestas) {
  const totalPreguntas = Object.keys(respuestas).length;
  const respuestasValidas = Object.values(respuestas).filter((value) => value === true || value === false);
  const aciertos = respuestasValidas.filter((value) => value === true).length;
  const totalPorcentaje = totalPreguntas > 0 ? Math.round((aciertos / totalPreguntas) * 100) : 0;

  const nivelDiagnostico = totalPorcentaje >= 80
    ? { etiqueta: 'Alto', descripcion: 'Cumplimiento sólido con oportunidades de mejora puntual.' }
    : totalPorcentaje >= 60
      ? { etiqueta: 'Medio', descripcion: 'Cumplimiento parcial; se recomienda cerrar brechas clave.' }
      : totalPorcentaje >= 40
        ? { etiqueta: 'Bajo', descripcion: 'Se evidencian brechas relevantes en el cumplimiento.' }
        : { etiqueta: 'Crítico', descripcion: 'Riesgo alto de incumplimiento; requiere plan de acción urgente.' };

  return {
    totalPorcentaje,
    respuestasContadas: totalPreguntas,
    respuestasPositivas: aciertos,
    nivelDiagnostico,
    generadoEn: new Date().toISOString(),
  };
}

export async function guardarDiagnostico(respuestas, meta = {}) {
  const diagnostico = calcularDiagnostico(respuestas);
  const payload = { respuestas, enviadoEn: new Date().toISOString(), diagnostico, ...meta };
  guardarRespuestasParcial(respuestas);
  guardarResultadoDiagnostico(diagnostico);

  if (!API_URL) return { ok: true, modo: 'localStorage', data: payload };
  try {
    // Primero, crear un diagnóstico en el backend
    const createResp = await fetch(`${API_URL.replace(/\/$/, '')}/api/v1/diagnostics`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ company_name: meta.company_name || 'Empresa Demo' }),
    });
    if (!createResp.ok) throw new Error(`Error al crear diagnóstico: ${createResp.status}`);
    const createData = await createResp.json();
    const diagnosticId = createData.diagnostic_id;

    // Mapear respuestas (true=>2, false=>0, fallback=>1)
    const answers = Object.entries(respuestas).map(([question_id, value]) => ({
      question_id: String(question_id),
      answer: value === true ? 2 : value === false ? 0 : 1,
    }));

    // Enviar respuestas al endpoint correspondiente
    const answersResp = await fetch(`${API_URL.replace(/\/$/, '')}/api/v1/diagnostics/${diagnosticId}/answers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers }),
    });
    if (!answersResp.ok) throw new Error(`Error al enviar respuestas: ${answersResp.status}`);

    return { ok: true, modo: 'api', data: { diagnosticId, answers, diagnostico } };
  } catch (error) {
    console.error('No se pudo enviar a la API. Se guardó en localStorage.', error);
    return { ok: false, modo: 'localStorage', error: error.message, data: payload };
  }
}

export function limpiarRespuestasGuardadas() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(STORAGE_KEY);
}
