from __future__ import annotations

import os
from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from openai import OpenAI

load_dotenv()

router = APIRouter(prefix="/api/v1/ai", tags=["ai"])

_client: OpenAI | None = None


def _get_client() -> OpenAI:
    global _client
    if _client is None:
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            raise HTTPException(status_code=503, detail="IA no configurada: falta OPENAI_API_KEY")
        _client = OpenAI(api_key=api_key)
    return _client


# ── Schemas ──────────────────────────────────────────────────────────────────

class ExplainQuestionRequest(BaseModel):
    question_id: int = Field(..., ge=1, le=11)
    question_text: str = Field(..., min_length=5, max_length=500)


class ExplainQuestionResponse(BaseModel):
    question_id: int
    explanation: str


class RecommendationsRequest(BaseModel):
    porcentaje_total: float = Field(..., ge=0, le=100)
    bloques: dict[str, float]          # {"politica": 45.0, "privacidad": 62.0, "gobernanza": 70.0}
    preguntas_fallidas: list[str]      # textos de preguntas donde la respuesta fue "No" o 0


class RecommendacionItem(BaseModel):
    prioridad: str    # "critica" | "importante" | "mejora"
    accion: str
    articulo_ley: str


class RecommendationsResponse(BaseModel):
    nivel: str
    resumen: str
    recomendaciones: list[RecommendacionItem]


# ── Endpoints ────────────────────────────────────────────────────────────────

@router.post("/explain-question", response_model=ExplainQuestionResponse)
def explain_question(payload: ExplainQuestionRequest) -> ExplainQuestionResponse:
    """
    Recibe el texto de una pregunta del diagnóstico y devuelve una explicación
    en lenguaje simple adaptada para PYMES colombianas.
    """
    client = _get_client()

    prompt = (
        "Eres un experto en protección de datos personales en Colombia (Ley 1581 de 2012). "
        "Explica la siguiente pregunta del diagnóstico de cumplimiento en máximo 3 oraciones, "
        "usando lenguaje simple y ejemplos prácticos para una PYME colombiana. "
        "No uses tecnicismos legales innecesarios. Responde solo la explicación, sin saludos ni encabezados.\n\n"
        f"Pregunta: {payload.question_text}"
    )

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=200,
            temperature=0.4,
        )
        explanation = response.choices[0].message.content.strip()
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"Error al consultar IA: {exc}") from exc

    return ExplainQuestionResponse(question_id=payload.question_id, explanation=explanation)


@router.post("/recommendations", response_model=RecommendationsResponse)
def get_ai_recommendations(payload: RecommendationsRequest) -> RecommendationsResponse:
    """
    Recibe el resultado del diagnóstico y genera un plan de acción priorizado
    con referencias a artículos de la Ley 1581.
    """
    client = _get_client()

    bloques_texto = "\n".join(
        f"  - {bloque}: {pct:.1f}%" for bloque, pct in payload.bloques.items()
    )
    fallidas_texto = (
        "\n".join(f"  - {p}" for p in payload.preguntas_fallidas)
        if payload.preguntas_fallidas
        else "  (Ninguna)"
    )

    prompt = (
        "Eres un consultor experto en cumplimiento de la Ley 1581 de 2012 (protección de datos personales en Colombia). "
        "Una PYME realizó un diagnóstico con los siguientes resultados:\n\n"
        f"Porcentaje total de cumplimiento: {payload.porcentaje_total:.1f}%\n"
        f"Puntaje por bloques:\n{bloques_texto}\n"
        f"Preguntas donde respondió negativamente:\n{fallidas_texto}\n\n"
        "Genera exactamente 5 recomendaciones de mejora, priorizadas (crítica, importante, mejora). "
        "Para cada una incluye: la acción concreta, el artículo de la Ley 1581 que aplica. "
        "Responde en este formato JSON exacto, sin texto adicional:\n"
        "[\n"
        '  {"prioridad": "critica|importante|mejora", "accion": "...", "articulo_ley": "Art. X - Ley 1581"},\n'
        "  ...\n"
        "]"
    )

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=600,
            temperature=0.3,
        )
        raw = response.choices[0].message.content.strip()

        # Extraer JSON del bloque de código si viene envuelto en ```
        if raw.startswith("```"):
            raw = raw.split("```")[1]
            if raw.startswith("json"):
                raw = raw[4:]

        import json
        items = json.loads(raw)
        recomendaciones = [RecommendacionItem(**item) for item in items]
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"Error al procesar respuesta de IA: {exc}") from exc

    if payload.porcentaje_total >= 75:
        nivel, resumen = "Alto", "Tu empresa tiene un buen nivel de cumplimiento. Enfócate en mantener y documentar las prácticas existentes."
    elif payload.porcentaje_total >= 50:
        nivel, resumen = "Medio", "Existen brechas moderadas. Implementa las acciones críticas en los próximos 30 días."
    elif payload.porcentaje_total >= 25:
        nivel, resumen = "Bajo", "Se detectaron brechas significativas. Prioriza las acciones críticas de forma inmediata."
    else:
        nivel, resumen = "Crítico", "El nivel de cumplimiento es crítico. Se recomienda consultar asesoría legal especializada urgentemente."

    return RecommendationsResponse(
        nivel=nivel,
        resumen=resumen,
        recomendaciones=recomendaciones,
    )
