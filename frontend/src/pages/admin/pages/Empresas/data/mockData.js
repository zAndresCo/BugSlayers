const nombres = [
  'TechSolutions S.A.S.', 'Soluciones Integrales S.A.S.', 'DataCenter Colombia Ltda.',
  'Global Logistics S.A.S.', 'Inversiones Beta Group', 'Comercializadora del Norte',
  'Servicios T&eacute;cnicos Profesionales', 'Constructora del Valle', 'Grupo Empresarial Sigma',
  'Corporaci&oacute;n Financiera del Sur', 'Industrias Met&aacute;licas Unidas',
  'Transportes R&aacute;pido Ltda.', 'BioSalud Colombia', 'EduTech Foundation',
  'Agroinsumos del Campo', 'Minerales Andinos S.A.', 'PetroCol Energy',
  'Telecom Networks S.A.S.', 'Ingenier&iacute;a &amp; Desarrollo', 'Distribuidora del Pac&iacute;fico',
  'Farmac&eacute;utica Nacional', 'Hotelera Tur&iacute;stica S.A.S.', 'Consultor&iacute;a Estrat&eacute;gica',
  'Autopartes del Valle', 'Laboratorios M&eacute;dicos Asociados', 'Servicios P&uacute;blicos del Norte',
  'Inmobiliaria del Centro', 'Seguros Protecci&oacute;n Total', 'Alimentos Gourmet S.A.S.',
  'Tecnolog&iacute;a &amp; Desarrollo', 'Envases Pl&aacute;sticos Ltda.', 'Distribuidora de Papeles',
  'Centro M&eacute;dico Integral', 'Soluciones Ambientales', 'Red de Energ&iacute;a del Sur',
  'Comunicaciones Satelitales', 'Equipos Industriales S.A.S.', 'Log&iacute;stica Integral',
  'Consultor&iacute;a Jur&iacute;dica', 'Centro de Idiomas Global', 'Publicidad &amp; Mercadeo',
  'Seguridad Privada Elite', 'Mantenimiento Industrial', 'Grupo Constructor Beta',
  'Servicios Hoteleros', 'Distribuidora de Alimentos', 'Centro Tecnol&oacute;gico',
  'Procesadora de L&aacute;cteos', 'Transporte de Carga S.A.S.', 'Soluciones de Software',
  'Corporaci&oacute;n Educativa', 'Fondo de Inversi&oacute;n Capital', 'Distribuidora Ferretera',
  'Servicios de Salud Ocupacional', 'Industria Gr&aacute;fica', 'Comercializadora Textil',
  'Planta de Tratamiento', 'Centro de Investigaci&oacute;n', 'Asesor&iacute;a Financiera',
  'Desarrollos Inmobiliarios', 'Grupo Log&iacute;stico del Sur', 'Centro Auditivo Integral',
  'Comercializadora Agr&iacute;cola', 'Tecnolog&iacute;a Educativa', 'Servicios Mar&iacute;timos',
  'Construcciones Met&aacute;licas', 'Grupo de Seguridad Integral', 'Procesadora de Alimentos',
  'Centro Odontol&oacute;gico', 'Distribuidora El&eacute;ctrica', 'Servicios de Ingenier&iacute;a',
  'Compa&ntilde;&iacute;a de Seguros', 'Grupo Automotriz', 'Centro de Diagn&oacute;stico',
  'Comercializadora de Energ&iacute;a', 'Tecnolog&iacute;a Aeroespacial', 'Soluciones Logisticas',
  'Grupo Financiero del Norte', 'Centro Veterinario', 'Distribuidora Qu&iacute;mica',
  'Servicios Postales', 'Construcci&oacute;n Civil Ltda.', 'Industria Pl&aacute;stica',
  'Comercializadora de Caf&eacute;', 'Centro Nutricional', 'Desarrollos Tecnol&oacute;gicos',
  'Grupo de Transporte A&eacute;reo', 'Servicios Contables', 'Centro de Rehabilitaci&oacute;n',
  'Comercializadora de Flores', 'Tecnolog&iacute;a Biom&eacute;dica', 'Soluciones Energ&eacute;ticas',
  'Grupo Minero del Sur', 'Centro de Capacitaci&oacute;n', 'Distribuidora Farmac&eacute;utica',
  'Servicios de Catering', 'Constructora del Caribe', 'Industria Alimenticia',
  'Comercializadora de Muebles', 'Centro de Est&eacute;tica', 'Desarrollo de Software',
  'Grupo de Consultor&iacute;a TI', 'Servicios Ambientales', 'Centro de Negocios',
  'Comercializadora de Calzado', 'Tecnolog&iacute;a Agroindustrial', 'Soluciones de Empaque',
  'Grupo Inversionista', 'Centro de An&aacute;lisis Cl&iacute;nico', 'Distribuidora Textil',
  'Servicios Tur&iacute;sticos', 'Industria del Calzado', 'Comercializadora de Joyas',
  'Centro de Terapia F&iacute;sica', 'Desarrollo Urbano', 'Grupo de Tecnolog&iacute;a',
  'Servicios Funerarios', 'Comercializadora de Equipos', 'Centro de Im&aacute;genes',
  'Grupo Ecol&oacute;gico', 'Soluciones de Limpieza', 'Comercializadora de Veh&iacute;culos',
  'Centro de Estudios', 'Distribuidora de Aseo', 'Grupo de Alimentaci&oacute;n',
];

const sectores = [
  'Tecnolog&iacute;a', 'Consultor&iacute;a', 'Log&iacute;stica', 'Financiero', 'Salud',
  'Educaci&oacute;n', 'Manufactura', 'Comercio', 'Construcci&oacute;n', 'Alimentaci&oacute;n',
  'Agroindustria', 'Transporte', 'Energ&iacute;a', 'Comunicaciones', 'Miner&iacute;a',
];

const tamanos = ['Peque&ntilde;a', 'Mediana', 'Grande'];

const generateNIT = (i) => {
  const base = 900000000 + i * 98765;
  const digit = base % 10;
  return `${String(base).slice(0, 9)}-${digit}`;
};

const generateEmpresas = () => {
  const empresas = [];
  for (let i = 0; i < 129; i++) {
    const nombre = nombres[i % nombres.length];
    const num = Math.floor(i / nombres.length);
    const nombreFinal = num === 0 ? nombre : `${nombre} ${num + 1}`;

    empresas.push({
      id: i + 1,
      nombre: nombreFinal,
      nit: generateNIT(i + 1),
      sector: sectores[i % sectores.length],
      tamano: i === 4 ? 'Grende' : tamanos[i % tamanos.length],
      evaluaciones: Math.floor(Math.random() * 20) + 1,
      estado: 'Activo',
    });
  }
  return empresas;
};

export default generateEmpresas;
