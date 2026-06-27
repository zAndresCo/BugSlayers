# Demo del Backend - BugSalyers

Este documento contiene pasos rápidos y ejemplos para demostrar los endpoints del backend.

Requisitos:
- Python 3.11
- Dependencias instaladas (recomendado usar un entorno virtual)

1. Instalar dependencias

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

2. Ejecutar servidor

```bash
python -m uvicorn app.main:app --reload --port 8000
```

3. Probar con curl (ejemplos)

Crear diagnóstico:

```bash
curl -s -X POST "http://localhost:8000/api/v1/diagnostics" -H "Content-Type: application/json" -d '{"company_name": "Acme S.A."}'
```

Enviar respuestas:

```bash
curl -s -X POST "http://localhost:8000/api/v1/diagnostics/diag-001/answers" -H "Content-Type: application/json" -d '{"answers": [{"question_id":"consent","answer":2},{"question_id":"security","answer":1},{"question_id":"retention","answer":0}]}'
```

Consultar resultado:

```bash
curl -s "http://localhost:8000/api/v1/diagnostics/diag-001"
```

Pedir recomendaciones:

```bash
curl -s -X POST "http://localhost:8000/api/v1/diagnostics/diag-001/recommendations"
```
