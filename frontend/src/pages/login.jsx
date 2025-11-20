import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const nav = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await login(username, password); // llama a /auth/login
      nav('/dashboard');
    } catch (err) {
      console.error('Error en login:', err);
      const msg =
        err.response?.data?.message ||
        'Error al iniciar sesión. Revisa usuario o contraseña.';
      setError(Array.isArray(msg) ? msg.join(', ') : msg);
    }
  };

  return (
    <div style={{ maxWidth: 350, margin: '4rem auto', fontFamily: 'sans-serif' }}>
      <h2>Ingreso Administración</h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '.5rem', marginBottom: '1rem' }}
      >
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Usuario"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
        />
        <button type="submit">Entrar</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <p>
        ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
      </p>
      <p style={{ marginTop: '1rem' }}>
        <Link to="/">Volver al inicio</Link>
      </p>
    </div>
  );
}
