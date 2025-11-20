import { useEffect, useState } from 'react'
import Navbar from '../components/navbar'
import api from '../services/api'

export default function Patients() {
  const [patients, setPatients] = useState([])
  const [form, setForm] = useState({ rut: '', nombre: '', diagnostico: '', telefono: '' })

  const fetchData = async () => {
    const { data } = await api.get('/patients')
    setPatients(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await api.post('/patients', form)
    setForm({ rut: '', nombre: '', diagnostico: '', telefono: '' })
    fetchData()
  }

  return (
    <>
      <Navbar />
      <div style={{ padding: '1rem' }}>
        <h2>Pacientes</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <input placeholder="RUT" value={form.rut} onChange={e=>setForm({...form, rut: e.target.value})} />
          <input placeholder="Nombre" value={form.nombre} onChange={e=>setForm({...form, nombre: e.target.value})} />
          <input placeholder="Diagnóstico" value={form.diagnostico} onChange={e=>setForm({...form, diagnostico: e.target.value})} />
          <input placeholder="Teléfono" value={form.telefono} onChange={e=>setForm({...form, telefono: e.target.value})} />
          <button>Agregar</button>
        </form>

        <ul>
          {patients.map(p => (
            <li key={p.id}>{p.rut} - {p.nombre} - {p.diagnostico}</li>
          ))}
        </ul>
      </div>
    </>
  )
}
