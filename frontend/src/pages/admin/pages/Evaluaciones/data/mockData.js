const empresas = [
  'TechSolutions S.A.S.', 'Universidad Nacional', 'Hospital San Jos&eacute;',
  'Comercial del Norte', 'Innovatech S.A.S.', 'Soluciones Integrales S.A.S.',
  'DataCenter Colombia Ltda.', 'Global Logistics S.A.S.', 'Inversiones Beta Group',
  'Corporaci&oacute;n Financiera del Sur', 'Grupo Empresarial Sigma', 'Constructora del Valle',
  'BioSalud Colombia', 'EduTech Foundation', 'Agroinsumos del Campo',
  'PetroCol Energy', 'Telecom Networks S.A.S.', 'Transportes R&aacute;pido Ltda.',
  'Farmac&eacute;utica Nacional', 'Hotelera Tur&iacute;stica S.A.S.',
];

const evaluadores = [
  'Ana Rodr&iacute;guez', 'Mar&iacute;a Gonz&aacute;lez', 'Jorge Ram&iacute;rez',
  'Carlos P&eacute;rez', 'Luisa Fernanda Torres', 'Andr&eacute;s Mart&iacute;nez',
  'Carolina L&oacute;pez', 'Fernando Vargas', 'Diana Medina', 'Roberto Quintero',
];

const niveles = ['Alto', 'Medio', 'Bajo'];
const estados = ['Completada', 'En Proceso', 'Pendiente'];

function randomDate(start, end) {
  const d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return { string: `${day}/${month}/${year}`, date: d };
}

function getNivel(puntaje) {
  if (puntaje >= 80) return 'Alto';
  if (puntaje >= 50) return 'Medio';
  return 'Bajo';
}

const generateEvaluaciones = () => {
  const list = [];

  const exactas = [
    { empresa: 'TechSolutions S.A.S.', fecha: '15/05/2024', evaluador: 'Ana Rodr&iacute;guez', puntaje: 85, nivel: 'Alto', estado: 'Completada' },
    { empresa: 'Universidad Nacional', fecha: '14/05/2024', evaluador: 'Mar&iacute;a Gonz&aacute;lez', puntaje: 72, nivel: 'Medio', estado: 'Completada' },
    { empresa: 'Hospital San Jos&eacute;', fecha: '13/05/2024', evaluador: 'Jorge Ram&iacute;rez', puntaje: 45, nivel: 'Bajo', estado: 'Completada' },
    { empresa: 'Comercial del Norte', fecha: '12/05/2024', evaluador: 'Ana Rodr&iacute;guez', puntaje: 38, nivel: 'Bajo', estado: 'Completada' },
    { empresa: 'Innovatech S.A.S.', fecha: '11/05/2024', evaluador: 'Carlos P&eacute;rez', puntaje: 90, nivel: 'Alto', estado: 'Completada' },
  ];

  exactas.forEach((e, i) => {
    list.push({ id: i + 1, ...e });
  });

  const startDate = new Date(2023, 0, 1);
  const endDate = new Date(2024, 11, 31);

  for (let i = 5; i < 1248; i++) {
    const empresa = empresas[Math.floor(Math.random() * empresas.length)];
    const evaluador = evaluadores[Math.floor(Math.random() * evaluadores.length)];
    const puntaje = Math.floor(Math.random() * 60) + 25 + (Math.random() > 0.7 ? 15 : 0);
    const puntajeFinal = Math.min(100, Math.max(10, puntaje));
    const { string: fecha } = randomDate(startDate, endDate);
    const nivel = getNivel(puntajeFinal);
    const estado = estados[Math.floor(Math.random() * estados.length)];

    list.push({
      id: i + 1,
      empresa,
      fecha,
      evaluador,
      puntaje: puntajeFinal,
      nivel,
      estado,
    });
  }

  return list;
};

export default generateEvaluaciones;
