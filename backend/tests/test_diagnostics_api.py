from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_create_diagnostic_returns_id():
    response = client.post(
        "/api/v1/diagnostics",
        json={"company_name": "Acme S.A."},
    )

    assert response.status_code == 200
    body = response.json()
    assert body["status"] == "created"
    assert body["diagnostic_id"]


def test_submit_answers_updates_diagnostic():
    created = client.post(
        "/api/v1/diagnostics",
        json={"company_name": "Acme S.A."},
    ).json()

    response = client.post(
        f"/api/v1/diagnostics/{created['diagnostic_id']}/answers",
        json={
            "answers": [
                {"question_id": "consent", "answer": 2},
                {"question_id": "security", "answer": 1},
                {"question_id": "retention", "answer": 0},
            ]
        },
    )

    assert response.status_code == 200
    body = response.json()
    assert body["status"] == "in_progress"
    assert body["answers_submitted"] == 3


def test_get_result_returns_score_and_risk_level():
    created = client.post(
        "/api/v1/diagnostics",
        json={"company_name": "Acme S.A."},
    ).json()

    client.post(
        f"/api/v1/diagnostics/{created['diagnostic_id']}/answers",
        json={
            "answers": [
                {"question_id": "consent", "answer": 2},
                {"question_id": "security", "answer": 1},
                {"question_id": "retention", "answer": 0},
                {"question_id": "bases", "answer": 2},
                {"question_id": "rights", "answer": 1},
                {"question_id": "storage", "answer": 2},
            ]
        },
    )

    response = client.get(f"/api/v1/diagnostics/{created['diagnostic_id']}")

    assert response.status_code == 200
    body = response.json()
    assert body["score"] >= 0
    assert body["risk_level"] in {"bajo", "medio", "alto"}


def test_recommendations_endpoint_returns_list():
    created = client.post(
        "/api/v1/diagnostics",
        json={"company_name": "Acme S.A."},
    ).json()

    client.post(
        f"/api/v1/diagnostics/{created['diagnostic_id']}/answers",
        json={
            "answers": [
                {"question_id": "consent", "answer": 0},
                {"question_id": "security", "answer": 1},
                {"question_id": "retention", "answer": 0},
            ]
        },
    )

    response = client.post(
        f"/api/v1/diagnostics/{created['diagnostic_id']}/recommendations"
    )

    assert response.status_code == 200
    body = response.json()
    assert isinstance(body["recommendations"], list)
    assert body["recommendations"]
