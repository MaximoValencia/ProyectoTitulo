import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { logout } = useAuth()
  return (
    <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', background: '#0f766e', color: '#fff' }}>
      <Link to="/dashboard" style={{ color: '#fff' }}>Inicio</Link>
      <Link to="/patients" style={{ color: '#fff' }}>Pacientes</Link>
      <Link to="/medicines" style={{ color: '#fff' }}>Medicamentos</Link>
      <Link to="/deliveries" style={{ color: '#fff' }}>Entregas</Link>
      <Link to="/carnet" style={{ color: '#fff' }}>Carnet</Link>
      <button onClick={logout} style={{ marginLeft: 'auto' }}>Salir</button>
    </nav>
  )
}
