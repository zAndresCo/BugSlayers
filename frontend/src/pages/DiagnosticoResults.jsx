import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DiagnosticoResultados from '../../diagnostic-form/src/components/DiagnosticoResultados';
import { cargarRespuestasGuardadas } from '../services/diagnosticoService';

export default function DiagnosticoResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [respuestas, setRespuestas] = useState({});

  useEffect(() => {
    const stateRespuestas = location.state?.respuestas;
    if (stateRespuestas && Object.keys(stateRespuestas).length > 0) {
      setRespuestas(stateRespuestas);
      return;
    }

    const guardadas = cargarRespuestasGuardadas();
    setRespuestas(guardadas);
  }, [location.state]);

  const handleReiniciar = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('diagnostico-respuestas');
    }
    navigate('/diagnostico');
  };

  return <DiagnosticoResultados respuestas={respuestas} onReiniciar={handleReiniciar} />;
}
