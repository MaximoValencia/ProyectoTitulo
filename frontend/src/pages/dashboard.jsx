import Navbar from '../components/navbar'

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="page-container">
        <div className="page-content fade-in">
          <div className="section-header">
            <h1>🏥 Panel Administrativo</h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              Bienvenido al sistema de gestión de la Posta El Ciruelito
            </p>
          </div>

          <div className="grid grid-3">
            <div className="card text-center">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👥</div>
              <h3>Pacientes</h3>
              <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                Gestionar información de pacientes
              </p>
              <button onClick={() => window.location.href = '/pacientes'}>
                <span>Ver Pacientes</span>
              </button>
            </div>

            <div className="card text-center">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💊</div>
              <h3>Medicamentos</h3>
              <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                Control de inventario y stock
              </p>
              <button onClick={() => window.location.href = '/medicines'}>
                <span>Ver Medicamentos</span>
              </button>
            </div>

            <div className="card text-center">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</div>
              <h3>Entregas</h3>
              <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                Registro de entregas de medicamentos
              </p>
              <button onClick={() => window.location.href = '/deliveries'}>
                <span>Ver Entregas</span>
              </button>
            </div>
          </div>

          <div className="card mt-4">
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>
              📊 Estadísticas del Sistema
            </h3>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">0</div>
                <div className="stat-label">Pacientes Registrados</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">0</div>
                <div className="stat-label">Medicamentos en Stock</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">0</div>
                <div className="stat-label">Entregas del Día</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
