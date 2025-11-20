import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(username, password);
      nav('/dashboard');
    } catch (err) {
      console.error('Error en login:', err);
      const msg =
        err.response?.data?.message ||
        'Error al iniciar sesión. Revisa usuario o contraseña.';
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
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔐</div>
            <h2>Ingreso Administración</h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              Accede al panel administrativo
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
                placeholder="Ingresa tu usuario"
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
                placeholder="Ingresa tu contraseña"
                required
              />
            </div>

            {error && (
              <div className="status-message status-error">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{ width: '100%', marginBottom: '1rem' }}
            >
              <span>{loading ? 'Ingresando...' : 'Iniciar Sesión'}</span>
            </button>
          </form>

          <div className="text-center">
            <p style={{ marginBottom: '0.5rem' }}>
              ¿No tienes cuenta?{' '}
              <Link to="/register" style={{ color: 'var(--primary-color)' }}>
                Regístrate
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
