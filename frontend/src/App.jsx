import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/login.jsx';
import Register from './pages/register.jsx';
import Dashboard from './pages/dashboard.jsx';
import Patients from './pages/patients.jsx';
import Medicines from './pages/medicines.jsx';
import Deliveries from './pages/deliveries.jsx';
import PatientLookup from './pages/PatientLookup.jsx';
import PatientDetail from './pages/PatientDetail.jsx';
import { useAuth } from './context/AuthContext.jsx';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}

export default function App() {
  return (
    <Routes>
      {/* Página inicial */}
      <Route path="/" element={<Home />} />

      {/* Flujo de pacientes (sin login) */}
      <Route path="/paciente" element={<PatientLookup />} />
      <Route path="/paciente/:rut" element={<PatientDetail />} />

      {/* Flujo administración */}
      <Route path="/admin/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/patients"
        element={
          <PrivateRoute>
            <Patients />
          </PrivateRoute>
        }
      />
      <Route
        path="/medicines"
        element={
          <PrivateRoute>
            <Medicines />
          </PrivateRoute>
        }
      />
      <Route
        path="/deliveries"
        element={
          <PrivateRoute>
            <Deliveries />
          </PrivateRoute>
        }
      />

      {/* Cualquier ruta desconocida */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
