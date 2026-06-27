import jsPDF from 'jspdf';
import 'jspdf-autotable';

const PRIMARY = '#1A66FF';
const DARK = '#1E293B';
const GRAY = '#64748B';
const LIGHT_BG = '#F8FAFC';

const downloadPDF = (evaluacion) => {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageW = doc.internal.pageSize.getWidth();
  const margin = 20;

  let y = margin;

  // --- Header bar ---
  doc.setFillColor(10, 25, 49);
  doc.rect(0, 0, pageW, 38, 'F');

  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.text('SecureTech', margin, 18);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(180, 190, 210);
  doc.text('PLATAFORMA DE CIBERSEGURIDAD Y PROTECCION DE DATOS', margin, 27);

  // --- Title ---
  y = 52;
  doc.setFontSize(20);
  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'bold');
  doc.text('Reporte de Evaluacion', margin, y);

  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'normal');
  doc.text(`Generado el: ${new Date().toLocaleDateString('es-CO')}`, margin, y + 7);

  // --- Divider ---
  y += 16;
  doc.setDrawColor(26, 102, 255);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageW - margin, y);

  // --- Info card background ---
  y += 10;
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(margin, y, pageW - 2 * margin, 70, 3, 3, 'F');

  // --- Info fields ---
  const fields = [
    { label: 'Empresa', value: evaluacion.empresa },
    { label: 'Fecha de evaluacion', value: evaluacion.fecha },
    { label: 'Evaluador asignado', value: evaluacion.evaluador },
    { label: 'Puntaje obtenido', value: `${evaluacion.puntaje}%` },
  ];

  const col1X = margin + 8;
  const col2X = pageW / 2 + 6;
  const startY = y + 10;
  const rowH = 16;

  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'normal');

  fields.forEach((f, i) => {
    const x = i < 2 ? col1X : col2X;
    const row = i < 2 ? i : i - 2;
    const cy = startY + row * rowH;

    doc.text(f.label, x, cy);
    doc.setFontSize(11);
    doc.setTextColor(30, 41, 59);
    doc.setFont('helvetica', 'bold');
    doc.text(f.value, x, cy + 5);
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.setFont('helvetica', 'normal');
  });

  // --- Nivel badge ---
  const nivelColors = {
    Alto: { bg: '#E0F2F1', text: '#004D40' },
    Medio: { bg: '#FEF3C7', text: '#D97706' },
    Bajo: { bg: '#FEE2E2', text: '#991B1B' },
  };
  const nc = nivelColors[evaluacion.nivel] || { bg: '#F3F4F6', text: '#6B7280' };

  y = startY + 2 * rowH + 6;
  doc.setFillColor(224, 242, 241);
  doc.roundedRect(col2X, y - 4, 28, 10, 3, 3, 'F');
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 77, 64);
  doc.text(evaluacion.estado, col2X + 4, y + 3);

  // --- Compliance section ---
  y += 24;
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.line(margin, y, pageW - margin, y);

  y += 10;
  doc.setFontSize(13);
  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'bold');
  doc.text('Resultados de la evaluacion', margin, y);

  y += 6;
  const pct = evaluacion.puntaje;
  const barW = pageW - 2 * margin - 60;
  const barH = 12;
  const barY = y;
  const fillW = Math.max(0, Math.min(barW, (pct / 100) * barW));

  // Bar background
  doc.setFillColor(226, 232, 240);
  doc.roundedRect(margin, barY, barW, barH, 2, 2, 'F');

  // Bar fill
  const barColor = pct >= 80 ? [18, 183, 106] : pct >= 50 ? [255, 160, 67] : [240, 68, 56];
  doc.setFillColor(...barColor);
  doc.roundedRect(margin, barY, fillW, barH, 2, 2, 'F');

  // Percentage text
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...barColor);
  doc.text(`${pct}%`, margin + barW + 10, barY + 9);

  // --- Nivel label ---
  y += 24;
  doc.setFontSize(11);
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'normal');
  doc.text('Nivel de cumplimiento:', margin, y);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(nc.text === '#004D40' ? 0 : nc.text === '#D97706' ? 217 : 153, nc.text === '#004D40' ? 77 : nc.text === '#D97706' ? 119 : 27, nc.text === '#004D40' ? 64 : nc.text === '#D97706' ? 6 : 27);
  doc.text(evaluacion.nivel, margin + 50, y);

  // --- Footer ---
  const footerY = doc.internal.pageSize.getHeight() - 20;
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.line(margin, footerY, pageW - margin, footerY);
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.setFont('helvetica', 'normal');
  doc.text('SecureTech - Plataforma de Cumplimiento en Proteccion de Datos', margin, footerY + 6);
  doc.text(`Pagina 1 de 1 | Documento generado el ${new Date().toLocaleString('es-CO')}`, margin, footerY + 12);

  doc.save(`evaluacion-${evaluacion.empresa.replace(/\s+/g, '_')}.pdf`);
};

export default downloadPDF;
