# BugSlayers
Aplicación web para autodiagnóstico de cumplimiento de protección de datos - Reto CAVALTEC.

## Estructura propuesta

- backend/: API con FastAPI
- frontend/: interfaz con React + Vite
- ai-agent/: servicio de IA / agente
- docker-compose.yml: orquestación local de los servicios

## Ejecutar localmente

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Agente de IA
```bash
cd ai-agent
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8001
```

### Con Docker Compose
```bash
docker compose up --build
```

## Demo rápido del backend (API)

Sigue estos pasos para probar los endpoints de diagnóstico en tu máquina local. Se asume que estás en la raíz del proyecto y tienes Python 3.11 instalado.

1. Ejecutar el backend:

```bash
cd backend
python -m uvicorn app.main:app --reload --port 8000
```

2. Abrir Swagger UI en el navegador:

- `http://localhost:8000/docs`

3. Secuencia de ejemplo (curl/HTTP):

- Crear diagnóstico:

```bash
curl -s -X POST "http://localhost:8000/api/v1/diagnostics" -H "Content-Type: application/json" -d '{"company_name": "Acme S.A."}'
```

- Enviar respuestas (ejemplo):

```bash
curl -s -X POST "http://localhost:8000/api/v1/diagnostics/diag-001/answers" -H "Content-Type: application/json" -d '{"answers": [{"question_id":"consent","answer":2},{"question_id":"security","answer":1},{"question_id":"retention","answer":0}]}'
```

- Consultar resultado:

```bash
curl -s "http://localhost:8000/api/v1/diagnostics/diag-001"
```

- Pedir recomendaciones (IA):

```bash
curl -s -X POST "http://localhost:8000/api/v1/diagnostics/diag-001/recommendations"
```

4. Respuestas esperadas (ejemplos):

- Crear diagnóstico:

```json
{"status":"created","diagnostic_id":"diag-001"}
```

- Resultado:

```json
{
	"diagnostic_id":"diag-001",
	"score":50,
	"risk_level":"medio",
	"summary":"Se observan riesgos moderados."
}
```

5. Uso recomendado para la hackatón

- Practica la demo varias veces para que la secuencia entre frontend→backend→IA sea fluida.
- Prepara 1–2 casos reales (empresa ficticia) que ilustren riesgo alto/medio/bajo.

Para más detalles de uso, ver `backend/DEMO.md` y el script de demostración `backend/demo_curl.ps1`.

