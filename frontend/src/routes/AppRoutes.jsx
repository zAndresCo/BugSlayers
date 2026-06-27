import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import AuthCallback from '../pages/AuthCallback';
import Welcome from '../pages/welcome';
import DiagnosticoPage from '../pages/DiagnosticoPage';
import CompanyOnboarding from '../pages/info-company/CompanyOnboarding';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/auth/:provider/callback" element={<AuthCallback />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/diagnostico" element={<DiagnosticoPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/onboarding" element={<CompanyOnboarding />} />
    </Routes>
  );
};

export default AppRoutes;