import { FiFolder, FiUsers, FiCheckCircle } from 'react-icons/fi';
import './KpiCards.css';

const kpiData = [
  {
    title: 'Empresas Registradas',
    value: '128',
    change: '+12 este mes',
    icon: FiFolder,
    color: '#1A66FF',
  },
  {
    title: 'Usuarios Activos',
    value: '342',
    change: '+28 este mes',
    icon: FiUsers,
    color: '#12B76A',
  },
  {
    title: 'Evaluaciones Realizadas',
    value: '1,248',
    change: '+156 este mes',
    icon: FiCheckCircle,
    color: '#FFA043',
  },
  {
    title: 'Cumplimiento Promedio',
    value: '78%',
    change: '+5% este mes',
    isDonut: true,
    donutValue: 78,
    color: '#1A66FF',
  },
];

const CircularDonut = ({ percentage }) => {
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg width="56" height="56" viewBox="0 0 56 56">
      <circle
        cx="28" cy="28" r={radius}
        fill="none" stroke="#EFF3F7" strokeWidth="6"
      />
      <circle
        cx="28" cy="28" r={radius}
        fill="none" stroke="#1A66FF" strokeWidth="6"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 28 28)"
        style={{ transition: 'stroke-dashoffset 0.8s ease' }}
      />
      <text
        x="28" y="28"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="13"
        fontWeight="700"
        fill="#1E293B"
      >
        {percentage}%
      </text>
    </svg>
  );
};

const KpiCards = () => {
  return (
    <div className="kpi-grid">
      {kpiData.map((kpi, index) => {
        const Icon = kpi.icon;
        return (
          <div className="kpi-card" key={index}>
            <div className="kpi-content">
              <span className="kpi-label">{kpi.title}</span>
              <span className="kpi-value">{kpi.value}</span>
              <span className="kpi-change">{kpi.change}</span>
            </div>
            <div className="kpi-icon-wrapper">
              {kpi.isDonut ? (
                <CircularDonut percentage={kpi.donutValue} />
              ) : (
                <div className="kpi-icon-bg" style={{ background: `${kpi.color}12` }}>
                  <Icon style={{ color: kpi.color, fontSize: 22 }} />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KpiCards;
