const STORAGE_KEY = "diagnostico-respuestas";
const API_URL = import.meta.env.VITE_API_URL || "";

export function cargarRespuestasGuardadas() {
  if (typeof window === "undefined") {
    return {};
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return {};
  }

  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export function guardarRespuestasParcial(respuestas) {
  if (typeof window === "undefined") {
    return respuestas;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(respuestas));
  return respuestas;
}

export async function guardarDiagnostico(respuestas, meta = {}) {
  const payload = {
    respuestas,
    enviadoEn: new Date().toISOString(),
    ...meta,
  };

  guardarRespuestasParcial(respuestas);

  if (!API_URL) {
    return {
      ok: true,
      modo: "localStorage",
      data: payload,
    };
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Error al guardar: ${response.status}`);
    }

    return {
      ok: true,
      modo: "api",
      data: payload,
    };
  } catch (error) {
    console.error("No se pudo enviar a la API. Se guardó en localStorage.", error);
    return {
      ok: false,
      modo: "localStorage",
      error: error.message,
      data: payload,
    };
  }
}

export function limpiarRespuestasGuardadas() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(STORAGE_KEY);
}
