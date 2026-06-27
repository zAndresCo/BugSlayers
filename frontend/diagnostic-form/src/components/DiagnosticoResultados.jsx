import { useState, useMemo } from "react";
import {
  PieChart,
  Pie,
  ResponsiveContainer,
} from "recharts";
import {
  calcularMetricas,
  obtenerRecomendaciones,
  obtenerMensajeInicialIA,
} from "../utils/calculosDiagnostico";
import bannerImage from "../assets/logo-grafica.png";
import "./DiagnosticoResultados.css";

const RESPONSE_IA = {
  "¿Qué debo priorizar para mejorar mi cumplimiento?":
    "Basado en tu diagnóstico, te recomiendo priorizar las áreas con menor puntuación. Enfócate en fortalecer los procesos documentales, implementar evaluaciones de impacto y establecer controles de riesgo. Revisa la sección de recomendaciones para más detalles.",
  "¿Cómo puedo implementar un PIA?":
    "Para implementar una Evaluación de Impacto (PIA): 1) Identifica los tratamientos de datos de alto riesgo, 2) Describe el flujo de datos, 3) Evalúa la necesidad y proporcionalidad, 4) Identifica y gestiona los riesgos, 5) Documenta los resultados y medidas adoptadas.",
  "¿Qué documentos necesito tener?":
    "Los documentos esenciales son: 1) Política de tratamiento de datos personales, 2) Procedimientos para atención de derechos ARCO, 3) Matriz de riesgos, 4) Evaluaciones de impacto (PIA), 5) Contratos con encargados del tratamiento, 6) Registro de actividades de tratamiento.",
};

function GaugeChart({ porcentaje, nivel }) {
  const data = [
    { name: "Cumplimiento", value: porcentaje, fill: "#0066FF" },
    { name: "Restante", value: 100 - porcentaje, fill: "#E2E8F0" },
  ];

  return (
    <div className="gauge-wrapper">
      <ResponsiveContainer width="100%" height={150}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="100%"
            startAngle={180}
            endAngle={0}
            innerRadius={65}
            outerRadius={100}
            dataKey="value"
            stroke="none"
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="gauge-label">
        <span className="gauge-porcentaje">{porcentaje}%</span>
        <span className="gauge-nivel">{nivel}</span>
      </div>
    </div>
  );
}

function DonutChart({ data }) {
  const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, payload }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={11}
        fontWeight={700}
      >
        {`${payload.porcentaje}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={180}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={80}
          dataKey="value"
          label={renderLabel}
          labelLine={false}
          stroke="none"
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

function BannerBienvenida() {
  return (
    <div className="banner-bienvenida">
      <div className="banner-texto">
        <h1 className="banner-titulo">
          ¡Hola, <span className="banner-nombre">Juan</span>!
        </h1>
        <p className="banner-subtitulo">
          Hemos analizado tus respuestas y generado este diagnóstico con base en
          la Ley 1581 de 2012 sobre Protección de Datos Personales.
        </p>
      </div>
      <div className="banner-ilustracion">
        <img src={bannerImage} alt="Diagnóstico" />
      </div>
    </div>
  );
}

function TarjetaCumplimientoGeneral({ cumplimientoGeneral, nivelCumplimiento }) {
  const alerta =
    cumplimientoGeneral >= 80
      ? { icono: "↑", texto: "Estás por encima del promedio de empresas en tu sector." }
      : cumplimientoGeneral >= 50
        ? { icono: "→", texto: "Estás en el promedio de empresas en tu sector." }
        : { icono: "↓", texto: "Estás por debajo del promedio de empresas en tu sector." };

  return (
    <div className="tarjeta tarjeta-gauge">
      <div className="tarjeta-header">
        <span className="tarjeta-titulo">Nivel de cumplimiento general</span>
        <span className="icono-info" title="Porcentaje general de cumplimiento">i</span>
      </div>
      <GaugeChart porcentaje={cumplimientoGeneral} nivel={nivelCumplimiento} />
      <div className="gauge-alerta">
        <span className="gauge-alerta-icono">{alerta.icono}</span>
        <span className="gauge-alerta-texto">{alerta.texto}</span>
      </div>
    </div>
  );
}

function TarjetaResumenRespuestas({
  puntajeTotal,
  maxTotal,
  pesoBloque1,
  maxBloque1,
  pesoBloque2,
  maxBloque2,
  pesoBloque3,
  maxBloque3,
}) {
  return (
    <div className="tarjeta tarjeta-resumen">
      <div className="tarjeta-header">
        <span className="tarjeta-titulo">Puntuación por bloques</span>
      </div>
      <div className="resumen-filas">
        <div className="resumen-fila">
          <div className="resumen-fila-izq">
            <span className="resumen-icono resumen-icono--cumple">✓</span>
            <span>Bloque 1 · Política y Gobierno</span>
          </div>
          <span className="resumen-numero">{pesoBloque1}</span>
          <span className="resumen-porcentaje resumen-porcentaje--cumple">/{maxBloque1}</span>
        </div>
        <div className="resumen-divisor" />
        <div className="resumen-fila">
          <div className="resumen-fila-izq">
            <span className="resumen-icono resumen-icono--no-cumple">!</span>
            <span>Bloque 2 · Gestión de riesgos</span>
          </div>
          <span className="resumen-numero">{pesoBloque2}</span>
          <span className="resumen-porcentaje resumen-porcentaje--no-cumple">/{maxBloque2}</span>
        </div>
        <div className="resumen-divisor" />
        <div className="resumen-fila">
          <div className="resumen-fila-izq">
            <span className="resumen-icono resumen-icono--no-aplica">#</span>
            <span>Bloque 3 · Seguridad y DPO</span>
          </div>
          <span className="resumen-numero">{pesoBloque3}</span>
          <span className="resumen-porcentaje resumen-porcentaje--no-aplica">/{maxBloque3}</span>
        </div>
      </div>
      <div className="resumen-total">
        <span>Puntaje total ponderado</span>
        <span className="resumen-total-numero">{puntajeTotal}/{maxTotal}</span>
      </div>
    </div>
  );
}

function TarjetaCumplimientoCategoria({ donutData }) {
  return (
    <div className="tarjeta tarjeta-categoria">
      <div className="tarjeta-header">
        <span className="tarjeta-titulo">Cumplimiento por categoría</span>
        <span className="icono-info" title="Porcentaje de cumplimiento por categoría">i</span>
      </div>
      <div className="categoria-contenido">
        <div className="categoria-donut">
          <DonutChart data={donutData} />
        </div>
        <div className="categoria-leyenda">
          {donutData.map((item) => (
            <div key={item.name} className="leyenda-item">
              <span
                className="leyenda-color"
                style={{ backgroundColor: item.fill }}
              />
              <span className="leyenda-label">{item.name}</span>
              <span className="leyenda-valor">{item.porcentaje}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TarjetaRecomendacion({ recomendacion }) {
  return (
    <div className="tarjeta tarjeta-recomendacion">
      <div className="recomendacion-header">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" fill="#E8F0FE" stroke="#0066FF" strokeWidth="1.5" />
          <path d="M8 12L11 15L16 9" stroke="#0066FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h3 className="recomendacion-titulo">Recomendación principal</h3>
      </div>
      <div className="recomendacion-cuerpo">
        <span className="recomendacion-etiqueta">Prioridad Media</span>
        <h4 className="recomendacion-accion-titulo">{recomendacion.titulo}</h4>
        <p className="recomendacion-descripcion">{recomendacion.descripcion}</p>
        <div className="recomendacion-acciones">
          <h5 className="recomendacion-acciones-titulo">Acciones sugeridas:</h5>
          <ul className="recomendacion-lista">
            {recomendacion.acciones.map((accion, i) => (
              <li key={i} className="recomendacion-item">
                <span className="recomendacion-check">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" stroke="#0066FF" strokeWidth="1.5" fill="none" />
                    <path d="M5 8L7.5 10.5L11 6" stroke="#0066FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {accion}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function ChatbotIA({ mensajesIA }) {
  const [mensajes, setMensajes] = useState([
    { tipo: "ia", texto: mensajesIA.saludo },
  ]);
  const [inputValue, setInputValue] = useState("");

  const agregarMensaje = (texto, tipo) => {
    setMensajes((prev) => [...prev, { texto, tipo }]);
  };

  const manejarEnvio = (texto) => {
    const pregunta = texto || inputValue;
    if (!pregunta.trim()) return;

    agregarMensaje(pregunta, "usuario");
    setInputValue("");

    setTimeout(() => {
      const respuesta = RESPONSE_IA[pregunta];
      if (respuesta) {
        agregarMensaje(respuesta, "ia");
      } else {
        const respuestasGenericas = [
          "Entiendo tu pregunta. Basado en el diagnóstico, te recomiendo revisar las secciones de recomendaciones para obtener una guía más detallada.",
          "Buena pregunta! Para eso, te sugiero consultar la sección de recomendaciones principales donde encontrarás acciones concretas.",
          "Eso es importante. Te recomiendo empezar por las acciones sugeridas en la recomendación principal de tu diagnóstico.",
        ];
        agregarMensaje(
          respuestasGenericas[Math.floor(Math.random() * respuestasGenericas.length)],
          "ia"
        );
      }
    }, 800);
  };

  const reiniciarChat = () => {
    setMensajes([
      { tipo: "ia", texto: mensajesIA.saludo },
    ]);
  };

  const mostrarRecomendacionIA = () => {
    agregarMensaje("¿Qué debo priorizar para mejorar mi cumplimiento?", "usuario");
    setTimeout(() => {
      agregarMensaje(RESPONSE_IA["¿Qué debo priorizar para mejorar mi cumplimiento?"], "ia");
    }, 800);
  };

  return (
    <div className="tarjeta tarjeta-chat">
      <div className="chat-header">
        <div className="chat-header-izq">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 2L11.5 6.5L16 7.5L13 11L13.5 16L9 14L4.5 16L5 11L2 7.5L6.5 6.5L9 2Z" fill="#0066FF" />
          </svg>
          <span className="chat-titulo">Asistente IA</span>
          <span className="chat-estado">
            <span className="chat-punto" />• En línea
          </span>
        </div>
        <div className="chat-header-der">
          <button className="chat-btn-icono" onClick={reiniciarChat} title="Reiniciar chat">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 8C2 4.68629 4.68629 2 8 2C10.5 2 12.5 3.5 13.5 5.5" stroke="#627D98" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M14 8C14 11.3137 11.3137 14 8 14C5.5 14 3.5 12.5 2.5 10.5" stroke="#627D98" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M13.5 2V5.5H10" stroke="#627D98" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2.5 14V10.5H6" stroke="#627D98" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button className="chat-btn-icono" title="Menú">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="3" r="1.5" fill="#627D98" />
              <circle cx="8" cy="8" r="1.5" fill="#627D98" />
              <circle cx="8" cy="13" r="1.5" fill="#627D98" />
            </svg>
          </button>
        </div>
      </div>
      <div className="chat-mensajes">
        {mensajes.map((msg, i) => (
          <div key={i} className={`chat-burbuja chat-burbuja--${msg.tipo}`}>
            {msg.texto}
          </div>
        ))}
        {mensajes.length === 1 && (
          <div className="chat-acciones-rapidas">
            <button className="chat-btn-rapido" onClick={mostrarRecomendacionIA}>
              ¿Qué debo priorizar?
            </button>
          </div>
        )}
      </div>
      <div className="chat-input-area">
        <input
          className="chat-input"
          type="text"
          placeholder="Escribe tu pregunta..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") manejarEnvio();
          }}
        />
        <button className="chat-btn-enviar" onClick={() => manejarEnvio()} disabled={!inputValue.trim()}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2 9L16 2L11 16L8 10L2 9Z" fill="white" stroke="white" strokeWidth="0.5" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <div className="chat-footer">
        La IA puede cometer errores. Verifica la información.
      </div>
    </div>
  );
}

export default function DiagnosticoResultados({ respuestas, onReiniciar }) {
  const metricas = useMemo(() => calcularMetricas(respuestas), [respuestas]);
  const recomendacion = useMemo(
    () => obtenerRecomendaciones(metricas),
    [metricas]
  );
  const mensajesIA = useMemo(
    () => obtenerMensajeInicialIA(metricas),
    [metricas]
  );

  return (
    <div className="resultados-wrapper">
      <BannerBienvenida />

      <div className="resultados-fila-metricas">
        <TarjetaCumplimientoGeneral
          cumplimientoGeneral={metricas.cumplimientoGeneral}
          nivelCumplimiento={metricas.nivelCumplimiento}
        />
        <TarjetaResumenRespuestas
          puntajeTotal={metricas.puntajeTotal}
          maxTotal={metricas.maxTotal}
          pesoBloque1={metricas.pesoBloque1}
          maxBloque1={metricas.maxBloque1}
          pesoBloque2={metricas.pesoBloque2}
          maxBloque2={metricas.maxBloque2}
          pesoBloque3={metricas.pesoBloque3}
          maxBloque3={metricas.maxBloque3}
          padreCumple={metricas.padreCumple}
          hijasCumple={metricas.hijasCumple}
          totalHijas={metricas.totalHijas}
        />
        <TarjetaCumplimientoCategoria donutData={metricas.donutData} />
      </div>

      <div className="resultados-fila-inferior">
        <TarjetaRecomendacion recomendacion={recomendacion} />
        <ChatbotIA mensajesIA={mensajesIA} />
      </div>

      <div className="resultados-acciones">
        <button className="btn-reiniciar" onClick={onReiniciar}>
          Realizar otro diagnóstico
        </button>
      </div>
    </div>
  );
}
