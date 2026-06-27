const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:8000').replace(/\/+$/, '').replace(/\/api\/v1\/?$/, '');

/**
 * Explica una pregunta del diagnóstico en lenguaje simple.
 * @param {number} questionId
 * @param {string} questionText
 * @returns {Promise<string>} explicación
 */
export async function explicarPregunta(questionId, questionText) {
  const res = await fetch(`${API_BASE}/api/v1/ai/explain-question`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question_id: questionId, question_text: questionText }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || 'Error al consultar IA');
  }
  const data = await res.json();
  return data.explanation;
}

/**
 * Genera recomendaciones personalizadas basadas en el resultado del diagnóstico.
 * @param {number} porcentajeTotal
 * @param {object} bloques   { politica: 45.0, privacidad: 62.0, gobernanza: 70.0 }
 * @param {string[]} preguntasFallidas  textos de preguntas con respuesta negativa
 * @returns {Promise<{nivel: string, resumen: string, recomendaciones: Array}>}
 */
export async function obtenerRecomendacionesIA(porcentajeTotal, bloques, preguntasFallidas) {
  const res = await fetch(`${API_BASE}/api/v1/ai/recommendations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      porcentaje_total: porcentajeTotal,
      bloques,
      preguntas_fallidas: preguntasFallidas,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || 'Error al obtener recomendaciones de IA');
  }
  return res.json();
}
