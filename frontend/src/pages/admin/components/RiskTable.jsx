import './RiskTable.css';

const companies = [
  { name: 'Comercializadora del Norte', risk: '28%', level: 'medium' },
  { name: 'Servicios Integrales S.A.S.', risk: '32%', level: 'medium' },
  { name: 'DataSystems Ltda.', risk: '35%', level: 'medium' },
  { name: 'Global Logistics', risk: '38%', level: 'high' },
  { name: 'Inversiones Beta', risk: '42%', level: 'high' },
];

const RiskTable = () => {
  return (
    <div className="risk-table-wrapper">
      <table className="risk-table">
        <thead>
          <tr>
            <th>Empresa</th>
            <th>Riesgo</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((item, i) => (
            <tr key={i}>
              <td className="company-name">{item.name}</td>
              <td className="risk-cell">
                <span className={`risk-badge ${item.level}`}>
                  <span className={`risk-dot ${item.level}`} />
                  {item.risk}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RiskTable;
