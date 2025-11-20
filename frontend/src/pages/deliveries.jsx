import { useEffect, useState } from 'react'
import Navbar from '../components/navbar'
import api from '../services/api'

export default function Deliveries() {
  const [patients, setPatients] = useState([])
  const [meds, setMeds] = useState([])
  const [deliveries, setDeliveries] = useState([])
  const [form, setForm] = useState({ patientId: '', medicineId: '', cantidad: 1 })
  const [loading, setLoading] = useState(false)

  const fetchAll = async () => {
    try {
      const [p, m, d] = await Promise.all([
        api.get('/patients'),
        api.get('/medicines'),
        api.get('/deliveries'),
      ])
      setPatients(p.data)
      setMeds(m.data)
      setDeliveries(d.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchAll()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post('/deliveries', {
        patientId: Number(form.patientId),
        medicineId: Number(form.medicineId),
        cantidad: Number(form.cantidad),
      })
      setForm({ patientId: '', medicineId: '', cantidad: 1 })
      fetchAll()
    } catch (error) {
      console.error('Error creating delivery:', error)
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
            <h1>📦 Gestión de Entregas</h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              Registro y seguimiento de entregas de medicamentos a pacientes
            </p>
          </div>

          <div className="card">
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '2rem', fontSize: '1.5rem' }}>
              ➕ Registrar Nueva Entrega
            </h3>
            <form onSubmit={handleSubmit} className="form-grid">
              <div className="form-group">
                <label htmlFor="patientId">Paciente</label>
                <select
                  id="patientId"
                  value={form.patientId}
                  onChange={e=>setForm({...form, patientId: e.target.value})}
                  required
                >
                  <option value="">Seleccionar paciente</option>
                  {patients.map(p => (
                    <option key={p.id} value={p.id}>{p.nombre} - {p.rut}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="medicineId">Medicamento</label>
                <select
                  id="medicineId"
                  value={form.medicineId}
                  onChange={e=>setForm({...form, medicineId: e.target.value})}
                  required
                >
                  <option value="">Seleccionar medicamento</option>
                  {meds.map(m => (
                    <option key={m.id} value={m.id}>{m.nombre} - Lote: {m.lote}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="cantidad">Cantidad</label>
                <input
                  id="cantidad"
                  type="number"
                  min="1"
                  value={form.cantidad}
                  onChange={e=>setForm({...form, cantidad: e.target.value})}
                  placeholder="Cantidad a entregar"
                  required
                />
              </div>

              <div className="form-group" style={{ alignSelf: 'end', gridColumn: 'span 3' }}>
                <button type="submit" disabled={loading} style={{ width: '100%', minWidth: '200px' }}>
                  <span>{loading ? 'Registrando...' : 'Registrar Entrega'}</span>
                </button>
              </div>
            </form>
          </div>

          <div className="card mt-4">
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '1.5rem' }}>
              📋 Historial de Entregas ({deliveries.length})
            </h3>
            {deliveries.length === 0 ? (
              <p style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem' }}>
                No hay entregas registradas aún
              </p>
            ) : (
              <div className="deliveries-history">
                {deliveries.map(d => (
                  <div key={d.id} className="delivery-history-item">
                    <div className="delivery-history-header">
                      <div className="delivery-patient">
                        <strong>{d.patient?.nombre}</strong>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                          RUT: {d.patient?.rut}
                        </span>
                      </div>
                      <span className="delivery-date">
                        {new Date(d.createdAt || Date.now()).toLocaleDateString('es-ES')}
                      </span>
                    </div>
                    <div className="delivery-details">
                      <span className="delivery-medicine">{d.medicine?.nombre}</span>
                      <span className="delivery-quantity">Cantidad: {d.cantidad} unidades</span>
                      <span className="delivery-lote">Lote: {d.medicine?.lote}</span>
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
