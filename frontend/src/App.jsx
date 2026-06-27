import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AppRoutes from './routes/AppRoutes';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/pages/Dashboard/Dashboard';
import Usuarios from './pages/admin/pages/Usuarios/Usuarios';
import Empresas from './pages/admin/pages/Empresas/Empresas';
import Evaluaciones from './pages/admin/pages/Evaluaciones/Evaluaciones';
import Auditores from './pages/admin/pages/Auditores/Auditores';
import Preguntas from './pages/admin/pages/Preguntas/Preguntas';
import Reportes from './pages/admin/pages/Reportes/Reportes';
import Configuracion from './pages/admin/pages/Configuracion/Configuracion';
import RolesPermisos from './pages/admin/pages/RolesPermisos/RolesPermisos';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="usuarios" element={<Usuarios />} />
          <Route path="empresas" element={<Empresas />} />
          <Route path="evaluaciones" element={<Evaluaciones />} />
          <Route path="auditores" element={<Auditores />} />
          <Route path="preguntas" element={<Preguntas />} />
          <Route path="reportes" element={<Reportes />} />
          <Route path="configuracion" element={<Configuracion />} />
          <Route path="roles-permisos" element={<RolesPermisos />} />
        </Route>
        <Route path="*" element={<Layout><AppRoutes /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
