import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { logout } = useAuth()
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <div className="navbar-logo">🏥</div>
          <div className="navbar-title">Posta El Ciruelito</div>
        </div>

        <div className="navbar-links">
          <Link to="/dashboard" className="navbar-link">
            <span>🏠 Inicio</span>
          </Link>
          <Link to="/patients" className="navbar-link">
            <span>👥 Pacientes</span>
          </Link>
          <Link to="/medicines" className="navbar-link">
            <span>💊 Medicamentos</span>
          </Link>
          <Link to="/deliveries" className="navbar-link">
            <span>📦 Entregas</span>
          </Link>
          <Link to="/carnet" className="navbar-link">
            <span>🪪 Carnet</span>
          </Link>
        </div>

        <div className="navbar-actions">
          <button onClick={logout} className="navbar-logout">
            <span>🚪 Salir</span>
          </button>
        </div>
      </div>
    </nav>
  )
}
