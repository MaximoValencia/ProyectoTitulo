import { useNavigate } from 'react-router-dom';

export default function Home() {
  const nav = useNavigate();

  return (
    <div className="page-container">
      <div className="page-content fade-in">
        <div className="section-header">
          <h1 className="section-title">🏥 Posta El Ciruelito</h1>
          <p className="section-subtitle">
            Sistema de gestión médica para pacientes y administración
          </p>
        </div>

        <div className="grid grid-2" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="card text-center">
            <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>👤</div>
            <h3>Pacientes</h3>
            <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)', fontSize: '1.125rem' }}>
              Accede a tu información médica y carnet virtual
            </p>
            <button onClick={() => nav('/paciente')} style={{ width: '100%', minWidth: '200px' }}>
              <span>Ingresar como Paciente</span>
            </button>
          </div>

          <div className="card text-center">
            <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>⚕️</div>
            <h3>Administración</h3>
            <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)', fontSize: '1.125rem' }}>
              Gestión de pacientes, medicamentos y entregas
            </p>
            <button onClick={() => nav('/admin/login')} style={{ width: '100%', minWidth: '200px' }}>
              <span>Panel Administrativo</span>
            </button>
          </div>
        </div>

        <div className="text-center mt-4">
          <p style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>
            Sistema seguro y confidencial • Posta El Ciruelito 2024
          </p>
        </div>
      </div>
    </div>
  );
}
