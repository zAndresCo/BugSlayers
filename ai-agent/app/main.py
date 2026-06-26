from fastapi import FastAPI

app = FastAPI(title="BugSalyers AI Agent")


@app.get("/health")
def health_check():
    return {"status": "ok", "service": "ai-agent"}
