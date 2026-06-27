import './DonutChart.css';

const segments = [
  { label: 'Alto (80-100%)', value: '520', percent: '42%', color: '#1A66FF' },
  { label: 'Medio (50-79%)', value: '458', percent: '37%', color: '#FFA043' },
  { label: 'Bajo (0-49%)', value: '270', percent: '21%', color: '#F04438' },
];

const DonutChart = () => {
  const gradientParts = segments
    .map((s, i, arr) => {
      const start = arr.slice(0, i).reduce((acc, cur) => acc + parseFloat(cur.percent), 0);
      const end = start + parseFloat(s.percent);
      return `${s.color} ${start}% ${end}%`;
    })
    .join(', ');

  return (
    <div className="donut-container">
      <div className="donut-chart-wrapper">
        <div
          className="donut-chart"
          style={{ background: `conic-gradient(${gradientParts})` }}
        >
          <div className="donut-hole" />
        </div>
      </div>
      <div className="donut-legend">
        {segments.map((seg, i) => (
          <div className="legend-item" key={i}>
            <div className="legend-left">
              <span className="legend-dot" style={{ background: seg.color }} />
              <span className="legend-label">{seg.label}</span>
            </div>
            <div className="legend-right">
              <span className="legend-value">{seg.value}</span>
              <span className="legend-percent">{seg.percent}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonutChart;
