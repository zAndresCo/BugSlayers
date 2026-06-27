import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AppRoutes from './routes/AppRoutes';
import AuthCallback from './pages/AuthCallback';
import Welcome from './pages/welcome';
import DiagnosticoPage from './pages/DiagnosticoPage';
import CompanyOnboarding from './pages/info-company/CompanyOnboarding';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/:provider/callback" element={<AuthCallback />} />
        <Route path="/onboarding" element={<CompanyOnboarding />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/diagnostico" element={<DiagnosticoPage />} />
        <Route path="/*" element={
          <Layout>
            <AppRoutes />
          </Layout>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
