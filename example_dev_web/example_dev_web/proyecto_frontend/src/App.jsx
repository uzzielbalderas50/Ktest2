import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Landing from './pages/Landing';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import CatalogoTurnos from './pages/catalogos/CatalogoTurnos';
import CatalogoAreas from './pages/catalogos/CatalogoAreas';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
            <Route path="/app" element={<AppLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="catalogos/turnos" element={<CatalogoTurnos />} />
              <Route path="catalogos/areas" element={<CatalogoAreas />} /> 
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
export default App;
