import { useEffect, useState } from 'react'
import Navbar from '../components/navbar'
import api from '../services/api'

export default function Patients() {
  const [patients, setPatients] = useState([])
  const [form, setForm] = useState({ rut: '', nombre: '', diagnostico: '', telefono: '' })
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    try {
      const { data } = await api.get('/patients')
      setPatients(data)
    } catch (error) {
      console.error('Error fetching patients:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post('/patients', form)
      setForm({ rut: '', nombre: '', diagnostico: '', telefono: '' })
      fetchData()
    } catch (error) {
      console.error('Error adding patient:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <div className="page-container">
        <div className="page-content fade-in">
          <div className="section-header">
            <h1>👥 Gestión de Pacientes</h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              Administrar la información de los pacientes registrados
            </p>
          </div>

          <div className="card">
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '2rem', fontSize: '1.5rem' }}>
              ➕ Agregar Nuevo Paciente
            </h3>
            <form onSubmit={handleSubmit} className="form-grid">
              <div className="form-group">
                <label htmlFor="rut">RUT</label>
                <input
                  id="rut"
                  type="text"
                  placeholder="Ej: 12345678-9"
                  value={form.rut}
                  onChange={e=>setForm({...form, rut: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="nombre">Nombre Completo</label>
                <input
                  id="nombre"
                  type="text"
                  placeholder="Nombre del paciente"
                  value={form.nombre}
                  onChange={e=>setForm({...form, nombre: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="diagnostico">Diagnóstico</label>
                <input
                  id="diagnostico"
                  type="text"
                  placeholder="Diagnóstico médico"
                  value={form.diagnostico}
                  onChange={e=>setForm({...form, diagnostico: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label htmlFor="telefono">Teléfono</label>
                <input
                  id="telefono"
                  type="tel"
                  placeholder="Número de teléfono"
                  value={form.telefono}
                  onChange={e=>setForm({...form, telefono: e.target.value})}
                />
              </div>
              <div className="form-group" style={{ alignSelf: 'end', gridColumn: 'span 2' }}>
                <button type="submit" disabled={loading} style={{ width: '100%', minWidth: '200px' }}>
                  <span>{loading ? 'Agregando...' : 'Agregar Paciente'}</span>
                </button>
              </div>
            </form>
          </div>

          <div className="card mt-4">
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '1.5rem' }}>
              📋 Lista de Pacientes ({patients.length})
            </h3>
            {patients.length === 0 ? (
              <p style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem' }}>
                No hay pacientes registrados aún
              </p>
            ) : (
              <div className="patients-list">
                {patients.map(p => (
                  <div key={p.id} className="patient-item">
                    <div className="patient-info">
                      <h4>{p.nombre}</h4>
                      <p><strong>RUT:</strong> {p.rut}</p>
                      <p><strong>Diagnóstico:</strong> {p.diagnostico || 'No registrado'}</p>
                      <p><strong>Teléfono:</strong> {p.telefono || 'No registrado'}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
