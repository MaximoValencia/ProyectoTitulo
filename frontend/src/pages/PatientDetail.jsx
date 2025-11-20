import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

export default function PatientDetail() {
  const { rut } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        // Trae todos los pacientes y busca por RUT
        const { data: patients } = await api.get('/patients');
        const found = patients.find((p) => p.rut === rut);
        setPatient(found || null);

        if (found) {
          // Trae las entregas del paciente
          const { data: allDeliveries } = await api.get('/deliveries');
          const patientDeliveries = allDeliveries.filter(d => d.patientId === found.id);
          setDeliveries(patientDeliveries);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [rut]);

  if (loading) {
    return (
      <div className="page-container">
        <div className="page-content fade-in">
          <div className="card text-center">
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
            <p>Cargando información del paciente...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="page-container">
        <div className="page-content fade-in">
          <div className="card text-center">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>❌</div>
            <h2>Paciente No Encontrado</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              No se encontró un paciente con el RUT <strong>{rut}</strong>.
            </p>
            <div>
              <Link to="/paciente">
                <button style={{ marginRight: '1rem' }}>
                  <span>Buscar Otro Paciente</span>
                </button>
              </Link>
              <Link to="/">
                <button style={{ background: 'transparent', border: '2px solid var(--primary-color)', color: 'var(--primary-color)' }}>
                  <span>Volver al Inicio</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-content fade-in">
        <div className="section-header">
          <h1>👤 Ficha del Paciente</h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Información médica y tratamientos
          </p>
        </div>

        <div className="card">
          <h3 style={{ color: 'var(--primary-color)', marginBottom: '1.5rem' }}>
            📋 Información Personal
          </h3>
          <div className="patient-details">
            <div className="detail-row">
              <span className="detail-label">RUT:</span>
              <span className="detail-value">{patient.rut}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Nombre:</span>
              <span className="detail-value">{patient.nombre}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Diagnóstico:</span>
              <span className="detail-value">{patient.diagnostico || 'No registrado'}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Teléfono:</span>
              <span className="detail-value">{patient.telefono || 'No registrado'}</span>
            </div>
          </div>
        </div>

        <div className="card mt-4">
          <h3 style={{ color: 'var(--primary-color)', marginBottom: '1.5rem' }}>
            💊 Historial de Medicamentos ({deliveries.length})
          </h3>
          {deliveries.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem' }}>
              No hay entregas registradas para este paciente
            </p>
          ) : (
            <div className="deliveries-list">
              {deliveries.map(d => (
                <div key={d.id} className="delivery-item">
                  <div className="delivery-info">
                    <div className="delivery-header">
                      <h4>{d.medicine?.nombre}</h4>
                      <span className="delivery-date">
                        {new Date(d.createdAt || Date.now()).toLocaleDateString('es-ES')}
                      </span>
                    </div>
                    <p><strong>Cantidad:</strong> {d.cantidad} unidades</p>
                    <p><strong>Lote:</strong> {d.medicine?.lote}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="text-center mt-4">
          <Link to="/paciente">
            <button style={{ marginRight: '1rem' }}>
              <span>Buscar Otro Paciente</span>
            </button>
          </Link>
          <Link to="/">
            <button style={{ background: 'transparent', border: '2px solid var(--primary-color)', color: 'var(--primary-color)' }}>
              <span>Volver al Inicio</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
