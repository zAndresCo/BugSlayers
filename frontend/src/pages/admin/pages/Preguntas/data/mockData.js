const preguntas = [
  { pregunta: '&iquest;Cuenta con una pol&iacute;tica de tratamiento de datos personales?',      categoria: 'Pol&iacute;tica de datos', peso: '0-40%',       estado: 'Activa' },
  { pregunta: '&iquest;La pol&iacute;tica est&aacute; documentada y publicada en medio de f&aacute;cil acceso?', categoria: 'Pol&iacute;tica de datos', peso: '10%',         estado: 'Activa' },
  { pregunta: '&iquest;Define las finalidades del tratamiento de datos?',                      categoria: 'Pol&iacute;tica de datos', peso: '10%',         estado: 'Activa' },
  { pregunta: '&iquest;Incluye los derechos de los titulares?',                               categoria: 'Pol&iacute;tica de datos', peso: '10%',         estado: 'Activa' },
  { pregunta: '&iquest;Menciona c&oacute;mo ejercer los derechos de los titulares?',               categoria: 'Pol&iacute;tica de datos', peso: '10%',         estado: 'Activa' },
  { pregunta: '&iquest;Incorpora evaluaciones de impacto (Privacy Impact Assessments)?',       categoria: 'Seguridad',           peso: '12%',         estado: 'Activa' },
  { pregunta: '&iquest;Aplica t&eacute;cnicas de minimizaci&oacute;n de datos?',                        categoria: 'Procedimientos',     peso: '12%',         estado: 'Activa' },
  { pregunta: '&iquest;Configura sus sistemas para recopilar el m&iacute;nimo de datos por defecto?',   categoria: 'Seguridad',           peso: '12%',         estado: 'Activa' },
  { pregunta: '&iquest;Cuenta con un sistema de administraci&oacute;n de riesgos?',                   categoria: 'Organizaci&oacute;n',  peso: '16%',         estado: 'Activa' },
  { pregunta: '&iquest;Cuenta con un oficial de protecci&oacute;n de datos personales?',              categoria: 'Organizaci&oacute;n',  peso: '8%',          estado: 'Activa' },
  { pregunta: '&iquest;Est&aacute; designado formalmente?',                                        categoria: 'Organizaci&oacute;n',  peso: 'Complementaria', estado: 'Activa' },
];

const generatePreguntas = () =>
  preguntas.map((p, i) => ({ id: i + 1, ...p }));

export default generatePreguntas;
