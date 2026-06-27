from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.schemas import EmpresaCreate, EmpresaResponse
from app.database import get_db
from app.models import Empresa, Usuario
from app.auth import verify_token

router = APIRouter(prefix="/api/v1/companies", tags=["companies"])


@router.post("", response_model=EmpresaResponse)
def create_company(payload: EmpresaCreate, db: Session = Depends(get_db), current_user: Usuario = Depends(verify_token)):
    # Crear la empresa
    company = Empresa(
        nombre=payload.nombre,
        nit=payload.nit,
        sector=payload.sector,
        tamano=payload.tamano,
        maneja_datos_sensibles=payload.maneja_datos_sensibles,
    )
    db.add(company)
    db.commit()
    db.refresh(company)

    # Asociar la empresa al usuario actual si no tiene
    if current_user.empresa_id is None:
        current_user.empresa_id = company.id
        db.add(current_user)
        db.commit()
        db.refresh(current_user)

    return company


@router.get("/me", response_model=EmpresaResponse)
def get_my_company(db: Session = Depends(get_db), current_user: Usuario = Depends(verify_token)):
    if not current_user.empresa_id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Empresa no registrada para el usuario")
    company = db.query(Empresa).filter(Empresa.id == current_user.empresa_id).first()
    if not company:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Empresa no encontrada")
    return company
