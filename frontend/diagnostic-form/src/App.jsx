import { useState } from "react";
import DiagnosticoForm from "./components/DiagnosticoForm";
import DiagnosticoResultados from "./components/DiagnosticoResultados";

export default function App() {
  const [vista, setVista] = useState("form");
  const [respuestas, setRespuestas] = useState({});

  const handleFinalizar = (respuestasFinales) => {
    setRespuestas(respuestasFinales);
    setVista("resultados");
  };

  const handleReiniciar = () => {
    setRespuestas({});
    setVista("form");
  };

  if (vista === "resultados") {
    return <DiagnosticoResultados respuestas={respuestas} onReiniciar={handleReiniciar} />;
  }

  return <DiagnosticoForm onFinalizar={handleFinalizar} />;
}