import Header from '../../components/Header';
import KpiCards from '../../components/KpiCards';
import DonutChart from '../../components/DonutChart';
import ActivityTimeline from '../../components/ActivityTimeline';
import RiskTable from '../../components/RiskTable';
import { FiBarChart2, FiClock, FiAlertTriangle } from 'react-icons/fi';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <>
      <Header />
      <KpiCards />

      <div className="bottom-grid">
        <div className="bottom-card">
          <div className="card-header">
            <FiBarChart2 className="card-header-icon" />
            <h3 className="card-title">Evaluaciones por nivel de cumplimiento</h3>
          </div>
          <div className="card-body">
            <DonutChart />
          </div>
        </div>

        <div className="bottom-card">
          <div className="card-header">
            <FiClock className="card-header-icon" />
            <h3 className="card-title">Actividad reciente</h3>
          </div>
          <div className="card-body">
            <ActivityTimeline />
          </div>
        </div>

        <div className="bottom-card">
          <div className="card-header">
            <FiAlertTriangle className="card-header-icon" />
            <h3 className="card-title">Empresas con mayor riesgo</h3>
          </div>
          <div className="card-body">
            <RiskTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
