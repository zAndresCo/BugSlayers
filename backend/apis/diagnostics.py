from __future__ import annotations

from typing import Any

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

router = APIRouter(prefix="/api/v1/diagnostics", tags=["diagnostics"])


class DiagnosticCreateRequest(BaseModel):
    company_name: str = Field(..., min_length=1)


class AnswerInput(BaseModel):
    question_id: str
    answer: int = Field(..., ge=0, le=2)


class AnswersSubmitRequest(BaseModel):
    answers: list[AnswerInput]


class DiagnosticResponse(BaseModel):
    status: str
    diagnostic_id: str


class AnswersResponse(BaseModel):
    status: str
    diagnostic_id: str
    answers_submitted: int


class ResultResponse(BaseModel):
    diagnostic_id: str
    score: int
    risk_level: str
    summary: str


class RecommendationsResponse(BaseModel):
    diagnostic_id: str
    recommendations: list[str]


class DiagnosticStore:
    def __init__(self) -> None:
        self._items: dict[str, dict[str, Any]] = {}

    def create(self, company_name: str) -> dict[str, Any]:
        diagnostic_id = f"diag-{len(self._items) + 1:03d}"
        self._items[diagnostic_id] = {
            "company_name": company_name,
            "answers": [],
            "score": 0,
        }
        return self._items[diagnostic_id]

    def get(self, diagnostic_id: str) -> dict[str, Any] | None:
        return self._items.get(diagnostic_id)

    def add_answers(self, diagnostic_id: str, answers: list[dict[str, Any]]) -> dict[str, Any] | None:
        diagnostic = self.get(diagnostic_id)
        if diagnostic is None:
            return None
        diagnostic["answers"].extend(answers)
        return diagnostic


store = DiagnosticStore()


@router.post("", response_model=DiagnosticResponse)
def create_diagnostic(payload: DiagnosticCreateRequest) -> DiagnosticResponse:
    diagnostic = store.create(payload.company_name)
    return DiagnosticResponse(
        status="created",
        diagnostic_id=f"diag-{len(store._items):03d}",
    )


@router.post("/{diagnostic_id}/answers", response_model=AnswersResponse)
def submit_answers(diagnostic_id: str, payload: AnswersSubmitRequest) -> AnswersResponse:
    diagnostic = store.add_answers(diagnostic_id, [answer.model_dump() for answer in payload.answers])
    if diagnostic is None:
        raise HTTPException(status_code=404, detail="Diagnostic not found")

    return AnswersResponse(
        status="in_progress",
        diagnostic_id=diagnostic_id,
        answers_submitted=len(diagnostic["answers"]),
    )


@router.get("/{diagnostic_id}", response_model=ResultResponse)
def get_result(diagnostic_id: str) -> ResultResponse:
    diagnostic = store.get(diagnostic_id)
    if diagnostic is None:
        raise HTTPException(status_code=404, detail="Diagnostic not found")

    answers = diagnostic.get("answers", [])
    if not answers:
        score = 0
    else:
        total = sum(answer.get("answer", 0) for answer in answers)
        score = round((total / max(len(answers) * 2, 1)) * 100)

    if score >= 75:
        risk_level = "bajo"
        summary = "Cumplimiento sólido."
    elif score >= 40:
        risk_level = "medio"
        summary = "Se observan riesgos moderados."
    else:
        risk_level = "alto"
        summary = "Riesgo alto de incumplimiento."

    return ResultResponse(
        diagnostic_id=diagnostic_id,
        score=score,
        risk_level=risk_level,
        summary=summary,
    )


@router.post("/{diagnostic_id}/recommendations", response_model=RecommendationsResponse)
def get_recommendations(diagnostic_id: str) -> RecommendationsResponse:
    diagnostic = store.get(diagnostic_id)
    if diagnostic is None:
        raise HTTPException(status_code=404, detail="Diagnostic not found")

    answers = diagnostic.get("answers", [])
    recommendations: list[str] = []

    if not any(answer.get("question_id") == "consent" and answer.get("answer", 0) < 2 for answer in answers):
        recommendations.append("Mantener un proceso claro de consentimiento y revocación.")
    if not any(answer.get("question_id") == "security" and answer.get("answer", 0) < 2 for answer in answers):
        recommendations.append("Fortalecer las medidas de seguridad y control de acceso.")
    if not any(answer.get("question_id") == "retention" and answer.get("answer", 0) < 2 for answer in answers):
        recommendations.append("Definir políticas de conservación y eliminación de datos.")

    if not recommendations:
        recommendations = [
            "Revisar la documentación interna de privacidad.",
            "Mejorar la capacitación del personal.",
        ]

    return RecommendationsResponse(
        diagnostic_id=diagnostic_id,
        recommendations=recommendations,
    )
