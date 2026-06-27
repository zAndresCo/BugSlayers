const nivelColors = {
  Alto: { bg: '#E0F2F1', text: '#004D40' },
  Medio: { bg: '#FEF3C7', text: '#D97706' },
  Bajo: { bg: '#FEE2E2', text: '#991B1B' },
};

const estadoColors = {
  Completada: { bg: '#E0F2F1', text: '#004D40' },
  'En Proceso': { bg: '#EFF6FF', text: '#1D4ED8' },
  Pendiente: { bg: '#FEF3C7', text: '#D97706' },
};

export const getNivelInfo = (nivel) => nivelColors[nivel] || { bg: '#F3F4F6', text: '#6B7280' };
export const getEstadoInfo = (estado) => estadoColors[estado] || { bg: '#F3F4F6', text: '#6B7280' };
