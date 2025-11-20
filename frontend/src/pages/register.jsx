import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('tecnico');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await api.post('/auth/register', { username, password, role });
      setSuccess('Usuario creado correctamente. Redirigiendo al login...');
      setTimeout(() => {
        nav('/admin/login');
      }, 2000);
    } catch (err) {
      console.error('Error en registro:', err);
      const msg =
        err.response?.data?.message ||
        'Error al registrar usuario.';
      setError(Array.isArray(msg) ? msg.join(', ') : msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-content fade-in">
        <div className="card" style={{ maxWidth: '400px', margin: '0 auto' }}>
          <div className="text-center mb-3">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👤</div>
            <h2>Registro de Funcionario</h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              Crear nueva cuenta administrativa
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Usuario</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nombre de usuario"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña segura"
                required
                minLength="6"
              />
            </div>

            <div className="form-group">
              <label htmlFor="role">Rol</label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="tecnico">Técnico</option>
                <option value="admin">Administrador</option>
              </select>
            </div>

            {error && (
              <div className="status-message status-error">
                {error}
              </div>
            )}

            {success && (
              <div className="status-message status-success">
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{ width: '100%', marginBottom: '1rem' }}
            >
              <span>{loading ? 'Registrando...' : 'Crear Cuenta'}</span>
            </button>
          </form>

          <div className="text-center">
            <p style={{ marginBottom: '0.5rem' }}>
              ¿Ya tienes cuenta?{' '}
              <Link to="/admin/login" style={{ color: 'var(--primary-color)' }}>
                Inicia sesión
              </Link>
            </p>
            <p>
              <Link to="/" style={{ color: 'var(--text-secondary)' }}>
                ← Volver al inicio
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
