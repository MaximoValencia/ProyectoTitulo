import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function PatientLookup() {
  const [rut, setRut] = useState('');
  const nav = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rut.trim()) return;
    nav(`/paciente/${rut.trim()}`);
  };

  return (
    <div style={{ maxWidth: 400, margin: '4rem auto', fontFamily: 'sans-serif' }}>
      <h2>Ingreso de Pacientes</h2>
      <p>Ingresa tu RUT para ver tu información y carnet virtual.</p>

      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '.5rem', marginTop: '1rem' }}
      >
        <input
          placeholder="RUT (sin puntos, con guion)"
          value={rut}
          onChange={(e) => setRut(e.target.value)}
        />
        <button type="submit">Ver mis datos</button>
      </form>

      <p style={{ marginTop: '1rem' }}>
        <Link to="/">Volver al inicio</Link>
      </p>
    </div>
  );
}
