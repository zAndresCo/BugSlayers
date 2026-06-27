import './ActivityTimeline.css';

const activities = [
  {
    title: 'Nueva empresa registrada',
    entity: 'TechSolutions S.A.S.',
    time: 'Hace 5 min',
    color: '#12B76A',
  },
  {
    title: 'Nueva evaluación completada',
    entity: 'Universidad Nacional',
    time: 'Hace 15 min',
    color: '#1A66FF',
  },
  {
    title: 'Nuevo usuario registrado',
    entity: 'auditor@consulting.com',
    time: 'Hace 32 min',
    color: '#12B76A',
  },
  {
    title: 'Evaluación completada',
    entity: 'Hospital San José',
    time: 'Hace 1 h',
    color: '#1A66FF',
  },
];

const ActivityTimeline = () => {
  return (
    <div className="timeline">
      {activities.map((item, i) => (
        <div className="timeline-item" key={i}>
          <div className="timeline-indicator-wrapper">
            <div className="timeline-dot" style={{ background: item.color }} />
            {i < activities.length - 1 && <div className="timeline-line" />}
          </div>
          <div className="timeline-content">
            <span className="timeline-title">{item.title}</span>
            <span className="timeline-entity">{item.entity}</span>
          </div>
          <span className="timeline-time">{item.time}</span>
        </div>
      ))}
    </div>
  );
};

export default ActivityTimeline;
