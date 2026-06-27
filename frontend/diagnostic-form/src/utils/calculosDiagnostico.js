import { preguntas } from "../data/preguntasDiagnostico";

const CATEGORIAS_ORDEN = ["gobernanza", "derechos", "riesgos", "seguridad"];
const COLORES_CATEGORIA = {
  gobernanza: "#22C55E",
  derechos: "#0066FF",
  riesgos: "#F59E0B",
  seguridad: "#8B5CF6",
};

function preguntaPadreCumple(respuestas) {
  const padre = preguntas.find((p) => p.esPadre);
  return respuestas[padre.id] === true;
}

function pesoMaximoCategoria(cat) {
  return preguntas
    .filter((p) => p.categoria === cat && !p.esComplementaria && p.weight > 0)
    .reduce((sum, p) => sum + p.weight, 0);
}

function pesoObtenidoCategoria(respuestas, cat) {
  const padreCumple = preguntaPadreCumple(respuestas);

  return preguntas
    .filter((p) => p.categoria === cat && !p.esComplementaria && p.weight > 0)
    .reduce((sum, p) => {
      if (p.esHijaDe) {
        return sum + (padreCumple && respuestas[p.id] === true ? p.weight : 0);
      }
      return sum + (respuestas[p.id] === true ? p.weight : 0);
    }, 0);
}

export function calcularMetricas(respuestas) {
  const preguntaPadre = preguntas.find((p) => p.esPadre);
  const padreCumple = respuestas[preguntaPadre.id] === true;

  const hijasPadre = preguntas.filter((h) => h.esHijaDe === preguntaPadre.id);
  const hijasCumple = hijasPadre.filter((h) => respuestas[h.id] === true).length;
  const totalHijas = hijasPadre.length;

  const pesoBloque1 = padreCumple
    ? hijasPadre.reduce((s, h) => s + (respuestas[h.id] === true ? h.weight : 0), 0)
    : 0;
  const maxBloque1 = hijasPadre.reduce((s, h) => s + h.weight, 0);

  const preguntasDirectas = preguntas.filter(
    (p) => !p.esPadre && !p.esHijaDe && !p.esComplementaria && p.weight > 0
  );
  const pesoDirecto = preguntasDirectas.reduce(
    (s, p) => s + (respuestas[p.id] === true ? p.weight : 0),
    0
  );
  const maxDirecto = preguntasDirectas.reduce((s, p) => s + p.weight, 0);

  const puntajeTotal = pesoBloque1 + pesoDirecto;
  const maxTotal = maxBloque1 + maxDirecto;

  const cumplimientoGeneral = maxTotal > 0 ? Math.round((puntajeTotal / maxTotal) * 100) : 0;

  const categorias = {};
  for (const cat of CATEGORIAS_ORDEN) {
    const maxCat = pesoMaximoCategoria(cat);
    const obtCat = pesoObtenidoCategoria(respuestas, cat);
    categorias[cat] = {
      max: maxCat,
      obtenido: obtCat,
      porcentaje: maxCat > 0 ? Math.round((obtCat / maxCat) * 100) : 0,
    };
  }

  const categoriaMenor = CATEGORIAS_ORDEN.reduce((menor, cat) =>
    categorias[cat].porcentaje < categorias[menor].porcentaje ? cat : menor
  , CATEGORIAS_ORDEN[0]);

  const donutData = CATEGORIAS_ORDEN.map((cat) => {
    const catData = categorias[cat];
    const numCategorias = CATEGORIAS_ORDEN.length;
    return {
      name: preguntas.find((p) => p.categoria === cat).categoriaLabel,
      value: 100 / numCategorias,
      fill: COLORES_CATEGORIA[cat],
      porcentaje: catData.porcentaje,
    };
  });

  const nivelCumplimiento =
    cumplimientoGeneral >= 80
      ? "Cumplimiento Alto"
      : cumplimientoGeneral >= 50
        ? "Cumplimiento Medio"
        : "Cumplimiento Bajo";

  const pregBloque2 = [6, 7, 8];
  const pesoBloque2 = pregBloque2.reduce(
    (s, id) => s + (respuestas[id] === true ? preguntas.find((p) => p.id === id).weight : 0),
    0
  );
  const maxBloque2 = pregBloque2.reduce(
    (s, id) => s + preguntas.find((p) => p.id === id).weight,
    0
  );

  const pregBloque3 = [9, 10];
  const pesoBloque3 = pregBloque3.reduce(
    (s, id) => s + (respuestas[id] === true ? preguntas.find((p) => p.id === id).weight : 0),
    0
  );
  const maxBloque3 = pregBloque3.reduce(
    (s, id) => s + preguntas.find((p) => p.id === id).weight,
    0
  );

  return {
    totalPreguntas: preguntas.length,
    puntajeTotal,
    maxTotal,
    pesoBloque1,
    maxBloque1,
    pesoBloque2,
    maxBloque2,
    pesoBloque3,
    maxBloque3,
    hijasCumple,
    totalHijas,
    padreCumple,
    cumplimientoGeneral,
    categorias,
    categoriaMenor,
    donutData,
    nivelCumplimiento,
  };
}

export function obtenerRecomendaciones(metricas) {
  const { categoriaMenor } = metricas;

  const recomendaciones = {
    gobernanza: {
      titulo: "Fortalece tu marco de gobierno de datos",
      descripcion:
        "Tu diagnóstico muestra oportunidades de mejora en las políticas y estructura de gobierno de datos. Implementar un marco sólido de gobernanza te ayudará a establecer las bases para el cumplimiento normativo.",
      acciones: [
        "Documenta y actualiza tu política de tratamiento de datos personales.",
        "Asegura que la política esté publicada y accesible para todos los interesados.",
        "Define y comunica claramente las finalidades del tratamiento de datos.",
        "Designa formalmente un oficial de protección de datos (DPO).",
      ],
    },
    derechos: {
      titulo: "Refuerza los mecanismos de atención a titulares",
      descripcion:
        "Tu diagnóstico muestra oportunidades de mejora en la gestión de derechos de los titulares. Implementar procedimientos claros para el ejercicio de derechos ARCO te ayudará a garantizar el cumplimiento normativo.",
      acciones: [
        "Incluye explícitamente todos los derechos de los titulares en tu política.",
        "Establece canales claros para que los titulares ejerzan sus derechos.",
        "Designa formalmente un responsable de atención a solicitudes.",
        "Implementa un sistema de registro y seguimiento de solicitudes.",
      ],
    },
    riesgos: {
      titulo: "Fortalece la gestión de riesgos y evaluaciones de impacto",
      descripcion:
        "Tu diagnóstico muestra oportunidades de mejora en la gestión de riesgos y en la realización de evaluaciones de impacto en el tratamiento de datos personales (PIA). Implementar estas prácticas te ayudará a prevenir riesgos y garantizar el cumplimiento normativo.",
      acciones: [
        "Documenta y actualiza tu metodología de gestión de riesgos.",
        "Realiza evaluaciones de impacto (PIA) para los tratamientos de datos críticos.",
        "Establece controles y planes de acción para mitigar los riesgos identificados.",
      ],
    },
    seguridad: {
      titulo: "Consolida tus medidas de seguridad de la información",
      descripcion:
        "Tu diagnóstico muestra que vas por buen camino en seguridad de la información. Continúa fortaleciendo las medidas técnicas y organizativas para proteger los datos personales.",
      acciones: [
        "Mantén actualizados los sistemas de administración de riesgos de seguridad.",
        "Aplica técnicas de minimización de datos en todos los procesos.",
        "Configura los sistemas para recopilar el mínimo de datos por defecto.",
      ],
    },
  };

  return recomendaciones[categoriaMenor] || recomendaciones.riesgos;
}

export function obtenerMensajeInicialIA(metricas) {
  const { categoriaMenor, categorias, cumplimientoGeneral } = metricas;
  const etiquetas = {
    gobernanza: "Política y Gobierno",
    derechos: "Derechos de los titulares",
    riesgos: "Gestión de riesgos",
    seguridad: "Seguridad de la información",
  };
  const nombreCategoria = etiquetas[categoriaMenor];
  const porcentajeCat = categorias[categoriaMenor].porcentaje;

  return {
    saludo: `¡Hola Juan! Soy tu asistente IA. ¿En qué puedo ayudarte hoy?`,
    recomendacion: `Según tu diagnóstico, te recomiendo priorizar:\n• ${nombreCategoria} (${porcentajeCat}%)\n• Evaluaciones de impacto (PIA)\n• Políticas y procedimientos para derechos de los titulares`,
    categoriaBaja: `${nombreCategoria} es tu área con menor puntuación (${porcentajeCat}%). Enfoquemos esfuerzos allí para mejorar tu cumplimiento general del ${cumplimientoGeneral}%.`,
  };
}

export { CATEGORIAS_ORDEN, COLORES_CATEGORIA };
