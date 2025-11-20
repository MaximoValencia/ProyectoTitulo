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
    <div className="page-container">
      <div className="page-content fade-in">
        <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
          <div className="text-center mb-3">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
            <h2>Ingreso de Pacientes</h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              Ingresa tu RUT para acceder a tu información médica y carnet virtual
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="rut">RUT</label>
              <input
                id="rut"
                type="text"
                value={rut}
                onChange={(e) => setRut(e.target.value)}
                placeholder="Ej: 12345678-9 (sin puntos, con guion)"
                required
                pattern="^\d{7,8}-[\dkK]$"
                title="Ingresa un RUT válido (ej: 12345678-9)"
              />
              <small style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>
                Formato: 12345678-9 (sin puntos, con guion)
              </small>
            </div>

            <button
              type="submit"
              style={{ width: '100%', marginBottom: '1rem' }}
            >
              <span>Buscar Paciente</span>
            </button>
          </form>

          <div className="text-center">
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
