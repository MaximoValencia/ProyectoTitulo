import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('tecnico'); // admin | tecnico | paciente
  const [error, setError] = useState('');
  const [ok, setOk] = useState('');
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setOk('');

    try {
      await api.post('/auth/register', { username, password, role });
      setOk('Usuario creado correctamente. Ahora puedes iniciar sesión.');
      setTimeout(() => {
        nav('/admin/login');
      }, 1500);
    } catch (err) {
      console.error('Error en registro:', err);
      const msg =
        err.response?.data?.message ||
        'Error al registrar usuario.';
      setError(Array.isArray(msg) ? msg.join(', ') : msg);
    }
  };

  return (
    <div style={{ maxWidth: 350, margin: '4rem auto', fontFamily: 'sans-serif' }}>
      <h2>Registro de funcionario</h2>

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

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="tecnico">Técnico</option>
          <option value="admin">Administrador</option>
        </select>

        <button type="submit">Registrarse</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {ok && <p style={{ color: 'green' }}>{ok}</p>}

      <p>
        ¿Ya tienes cuenta? <Link to="/admin/login">Inicia sesión</Link>
      </p>
      <p style={{ marginTop: '1rem' }}>
        <Link to="/">Volver al inicio</Link>
      </p>
    </div>
  );
}
