import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

export default function PatientDetail() {
  const { rut } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        // Trae todos los pacientes y busca por RUT
        const { data } = await api.get('/patients');
        const found = data.find((p) => p.rut === rut);
        setPatient(found || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [rut]);

  return (
    <div style={{ maxWidth: 500, margin: '4rem auto', fontFamily: 'sans-serif' }}>
      <h2>Ficha del Paciente</h2>

      {loading && <p>Cargando información...</p>}

      {!loading && !patient && (
        <p>
          No se encontró un paciente con el RUT <strong>{rut}</strong>.
        </p>
      )}

      {!loading && patient && (
        <div style={{ marginTop: '1rem', border: '1px solid #ccc', padding: '1rem' }}>
          <p><strong>RUT:</strong> {patient.rut}</p>
          <p><strong>Nombre:</strong> {patient.nombre}</p>
          <p><strong>Diagnóstico:</strong> {patient.diagnostico || 'No registrado'}</p>
          <p><strong>Teléfono:</strong> {patient.telefono || 'No registrado'}</p>

          {/* Aquí después podemos agregar carnet virtual, historial de medicamentos, etc. */}
        </div>
      )}

      <p style={{ marginTop: '1rem' }}>
        <Link to="/paciente">Buscar otro paciente</Link> {' | '}
        <Link to="/">Volver al inicio</Link>
      </p>
    </div>
  );
}
