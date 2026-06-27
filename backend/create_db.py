from pathlib import Path
from sqlalchemy import text
from app.database import engine
from app.models import Base

DB_FILE = Path(__file__).resolve().parent / "bugslayers.db"

print(f"Archivo de base de datos: {DB_FILE}")
if DB_FILE.exists():
    print("Archivo existente detectado. Actualizando esquema y eliminando tablas obsoletas si es necesario...")

with engine.begin() as connection:
    connection.execute(text("DROP TABLE IF EXISTS users"))
    Base.metadata.create_all(bind=connection)

print("Base de datos creada/actualizada correctamente.")
