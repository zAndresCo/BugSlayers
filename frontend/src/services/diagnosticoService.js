const STORAGE_KEY = 'diagnostico-respuestas';
const RESULT_STORAGE_KEY = 'diagnostico-resultado';
const API_URL = import.meta.env.VITE_API_URL || '';
const DIAGNOSTICS_PATH = '/api/v1/diagnostics';

const PESOS_POR_PREGUNTA = {
  2: 10,
  3: 10,
  4: 10,
  5: 10,
  6: 12,
  7: 12,
  8: 12,
  9: 16,
  10: 8,
};

function round2(value) {
  return Math.round(value * 100) / 100;
}

function obtenerNivelDiagnostico(totalPorcentaje) {
  if (totalPorcentaje >= 80) {
    return {
      etiqueta: 'Alto',
      descripcion: 'Cumplimiento sólido con oportunidades de mejora puntual.',
    };
  }
  if (totalPorcentaje >= 60) {
    return {
      etiqueta: 'Medio',
      descripcion: 'Cumplimiento parcial; se recomienda cerrar brechas clave.',
    };
  }
  if (totalPorcentaje >= 40) {
    return {
      etiqueta: 'Bajo',
      descripcion: 'Se evidencian brechas relevantes en el cumplimiento.',
    };
  }
  return {
    etiqueta: 'Crítico',
    descripcion: 'Riesgo alto de incumplimiento; requiere plan de acción urgente.',
  };
}

function respuestaANumero(valor) {
  if (valor === true) return 1;
  if (valor === false || valor === null || valor === undefined) return 0;
  if (typeof valor === 'number') return valor > 0 ? 1 : 0;
  if (typeof valor === 'string') {
    const limpio = valor.trim().toLowerCase();
    if (['1', 'si', 's', 'yes', 'true', 'verdadero', 'sí'].includes(limpio)) return 1;
  }
  return 0;
}

function normalizarBaseApi(apiUrl) {
  if (!apiUrl) return '';
  const sinSlashFinal = apiUrl.replace(/\/+$/, '');
  const idx = sinSlashFinal.indexOf(DIAGNOSTICS_PATH);
  if (idx >= 0) return sinSlashFinal.slice(0, idx);
  return sinSlashFinal;
}

function mapearRespuestasAApi(respuestas = {}) {
  return Object.entries(respuestas).map(([questionId, valor]) => ({
    question_id: String(questionId),
    answer: valor === true ? 2 : valor === false ? 0 : 1,
  }));
}

export function calcularDiagnostico(respuestas = {}) {
  const respuestasNumericas = {};
  for (let i = 1; i <= 11; i += 1) {
    respuestasNumericas[i] = respuestaANumero(respuestas[i]);
  }

  const tienePolitica = respuestasNumericas[1] === 1;
  const politicaDatos = tienePolitica
    ? [2, 3, 4, 5].reduce((acc, id) => acc + respuestasNumericas[id] * PESOS_POR_PREGUNTA[id], 0)
    : 0;

  const privacidadDisenio = [6, 7, 8].reduce(
    (acc, id) => acc + respuestasNumericas[id] * PESOS_POR_PREGUNTA[id],
    0
  );

  const gobernanza = [9, 10].reduce(
    (acc, id) => acc + respuestasNumericas[id] * PESOS_POR_PREGUNTA[id],
    0
  );

  const totalPorcentaje = round2(Math.min(100, politicaDatos + privacidadDisenio + gobernanza));
  const nivelDiagnostico = obtenerNivelDiagnostico(totalPorcentaje);
  const promedioBloquesPorcentaje = round2(
    ((politicaDatos / 40 + privacidadDisenio / 36 + gobernanza / 24) / 3) * 100
  );

  return {
    generadoEn: new Date().toISOString(),
    totalPorcentaje,
    nivelDiagnostico,
    promedioBloquesPorcentaje,
    bloques: {
      politicaDatos: {
        obtenido: round2(politicaDatos),
        maximo: 40,
        porcentaje: round2((politicaDatos / 40) * 100),
      },
      privacidadDisenio: {
        obtenido: round2(privacidadDisenio),
        maximo: 36,
        porcentaje: round2((privacidadDisenio / 36) * 100),
      },
      gobernanza: {
        obtenido: round2(gobernanza),
        maximo: 24,
        porcentaje: round2((gobernanza / 24) * 100),
      },
    },
    respuestasNumericas,
  };
}

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

export async function guardarDiagnostico(respuestas, meta = {}) {
  const diagnostico = calcularDiagnostico(respuestas);
  const payload = { respuestas, enviadoEn: new Date().toISOString(), diagnostico, ...meta };
  guardarRespuestasParcial(respuestas);
  guardarResultadoDiagnostico(diagnostico);

  if (!API_URL) return { ok: true, modo: 'localStorage', data: payload };

  const apiBase = normalizarBaseApi(API_URL);
  const companyName =
    meta.company_name ||
    meta.companyName ||
    meta.empresa ||
    'Empresa Demo';

  try {
    const crear = await fetch(`${apiBase}${DIAGNOSTICS_PATH}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ company_name: companyName }),
    });
    if (!crear.ok) throw new Error(`Error al crear diagnóstico: ${crear.status}`);

    const creado = await crear.json();
    const diagnosticId = creado?.diagnostic_id;
    if (!diagnosticId) throw new Error('La API no devolvió diagnostic_id');

    const enviarRespuestas = await fetch(
      `${apiBase}${DIAGNOSTICS_PATH}/${diagnosticId}/answers`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: mapearRespuestasAApi(respuestas) }),
      }
    );
    if (!enviarRespuestas.ok) {
      throw new Error(`Error al guardar respuestas: ${enviarRespuestas.status}`);
    }

    return {
      ok: true,
      modo: 'api',
      data: payload,
      backend: { diagnosticId },
    };
  } catch (error) {
    console.error('No se pudo enviar a la API. Se guardó en localStorage.', error);
    return {
      ok: true,
      modo: 'localStorage',
      warning: true,
      error: error.message,
      data: payload,
    };
  }
}

export function limpiarRespuestasGuardadas() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(STORAGE_KEY);
}
