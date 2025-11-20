import { useEffect, useState } from 'react'
import Navbar from '../components/navbar'
import api from '../services/api'

export default function Deliveries() {
  const [patients, setPatients] = useState([])
  const [meds, setMeds] = useState([])
  const [deliveries, setDeliveries] = useState([])
  const [form, setForm] = useState({ patientId: '', medicineId: '', cantidad: 1 })

  const fetchAll = async () => {
    const [p, m, d] = await Promise.all([
      api.get('/patients'),
      api.get('/medicines'),
      api.get('/deliveries'),
    ])
    setPatients(p.data)
    setMeds(m.data)
    setDeliveries(d.data)
  }

  useEffect(() => {
    fetchAll()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await api.post('/deliveries', {
      patientId: Number(form.patientId),
      medicineId: Number(form.medicineId),
      cantidad: Number(form.cantidad),
    })
    setForm({ patientId: '', medicineId: '', cantidad: 1 })
    fetchAll()
  }

  return (
    <>
      <Navbar />
      <div style={{ padding: '1rem' }}>
        <h2>Entregas</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
          <select value={form.patientId} onChange={e=>setForm({...form, patientId: e.target.value})}>
            <option value="">Paciente</option>
            {patients.map(p => (
              <option key={p.id} value={p.id}>{p.nombre}</option>
            ))}
          </select>
          <select value={form.medicineId} onChange={e=>setForm({...form, medicineId: e.target.value})}>
            <option value="">Medicamento</option>
            {meds.map(m => (
              <option key={m.id} value={m.id}>{m.nombre}</option>
            ))}
          </select>
          <input type="number" min="1" value={form.cantidad} onChange={e=>setForm({...form, cantidad: e.target.value})} />
          <button>Registrar</button>
        </form>

        <h3 style={{ marginTop: '1rem' }}>Historial</h3>
        <ul>
          {deliveries.map(d => (
            <li key={d.id}>
              {d.patient?.nombre} → {d.medicine?.nombre} ({d.cantidad})
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
