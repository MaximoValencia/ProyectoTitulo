import { useNavigate } from 'react-router-dom';

export default function Home() {
  const nav = useNavigate();

  return (
    <div style={{ maxWidth: 400, margin: '4rem auto', fontFamily: 'sans-serif' }}>
      <h1>Ingreso Posta El Ciruelito</h1>
      <p>Selecciona una opción:</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
        <button onClick={() => nav('/paciente')}>Pacientes</button>
        <button onClick={() => nav('/admin/login')}>Administración</button>
      </div>
    </div>
  );
}
