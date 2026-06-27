from sqlalchemy import Column, Integer, String, DateTime, Boolean, Float, Text, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base


class Empresa(Base):
    __tablename__ = "empresas"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    nit = Column(String, nullable=False, index=True)
    sector = Column(String, nullable=True)
    tamano = Column(String, nullable=True)  # pequeña, mediana, grande
    maneja_datos_sensibles = Column(Boolean, default=False)
    creado_en = Column(DateTime, default=datetime.utcnow)

    # Relaciones
    usuarios = relationship("Usuario", back_populates="empresa")
    diagnosticos = relationship("Diagnostico", back_populates="empresa")


class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    proveedor_auth = Column(String, nullable=False)  # "google", "microsoft"
    proveedor_user_id = Column(String, nullable=False)  # ID del proveedor (sub de OAuth)
    nombre_completo = Column(String, nullable=False)
    rol = Column(String, default="user")  # "admin", "user"
    empresa_id = Column(Integer, ForeignKey("empresas.id"), nullable=True)
    activo = Column(Boolean, default=True)
    creado_en = Column(DateTime, default=datetime.utcnow)

    # Relaciones
    empresa = relationship("Empresa", back_populates="usuarios")
    diagnosticos = relationship("Diagnostico", back_populates="usuario")


class Bloque(Base):
    __tablename__ = "bloques"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    peso_maximo = Column(Float, default=100.0)
    orden = Column(Integer, nullable=False)

    # Relaciones
    preguntas = relationship("Pregunta", back_populates="bloque")


class Pregunta(Base):
    __tablename__ = "preguntas"

    id = Column(Integer, primary_key=True, index=True)
    numero = Column(Integer, nullable=False)
    texto = Column(Text, nullable=False)
    peso = Column(Float, nullable=False)
    suma_al_total = Column(Boolean, default=True)
    es_padre = Column(Boolean, default=False)
    bloque_id = Column(Integer, ForeignKey("bloques.id"), nullable=False)
    pregunta_padre_id = Column(Integer, ForeignKey("preguntas.id"), nullable=True)

    # Relaciones
    bloque = relationship("Bloque", back_populates="preguntas")
    preguntas_hijas = relationship("Pregunta", remote_side=[id], backref="padre")
    respuestas = relationship("Respuesta", back_populates="pregunta")


class Diagnostico(Base):
    __tablename__ = "diagnosticos"

    id = Column(Integer, primary_key=True, index=True)
    empresa_id = Column(Integer, ForeignKey("empresas.id"), nullable=False)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    porcentaje_resultado = Column(Float, nullable=True)
    creado_en = Column(DateTime, default=datetime.utcnow)

    # Relaciones
    empresa = relationship("Empresa", back_populates="diagnosticos")
    usuario = relationship("Usuario", back_populates="diagnosticos")
    respuestas = relationship("Respuesta", back_populates="diagnostico")


class Respuesta(Base):
    __tablename__ = "respuestas"

    id = Column(Integer, primary_key=True, index=True)
    diagnostico_id = Column(Integer, ForeignKey("diagnosticos.id"), nullable=False)
    pregunta_id = Column(Integer, ForeignKey("preguntas.id"), nullable=False)
    valor = Column(String, nullable=False)
    puntaje_obtenido = Column(Float, nullable=True)

    # Relaciones
    diagnostico = relationship("Diagnostico", back_populates="respuestas")
    pregunta = relationship("Pregunta", back_populates="respuestas")
