from fastapi import FastAPI

from apis.diagnostics import router as diagnostics_router

app = FastAPI(title="BugSalyers Backend")
app.include_router(diagnostics_router)


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok", "service": "backend"}
