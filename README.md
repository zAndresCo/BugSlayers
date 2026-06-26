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
