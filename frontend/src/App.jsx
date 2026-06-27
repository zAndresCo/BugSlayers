import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AppRoutes from './routes/AppRoutes';
import AuthCallback from './pages/AuthCallback';
import Welcome from './pages/welcome';
import DiagnosticoPage from './pages/DiagnosticoPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/:provider/callback" element={<AuthCallback />} />
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
