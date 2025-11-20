import { useState } from 'react'
import Navbar from '../components/navbar'
import api from '../services/api'

export default function VirtualCard() {
  const [rut, setRut] = useState('')
  const [patient, setPatient] = useState(null)

  const handleSearch = async (e) => {
    e.preventDefault()
    const { data } = await api.get(`/patients?rut=${rut}`)
    setPatient(data)
  }

  return (
    <>
      <Navbar />
      <div style={{ padding: '1rem', maxWidth: 420 }}>
        <h2>Carnet virtual</h2>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '.5rem' }}>
          <input placeholder="RUT paciente" value={rut} onChange={e=>setRut(e.target.value)} />
          <button>Buscar</button>
        </form>

        {patient && (
          <div style={{ marginTop: '1rem', border: '1px solid #ccc', borderRadius: '8px', padding: '1rem' }}>
            <h3>{patient.nombre}</h3>
            <p><b>RUT:</b> {patient.rut}</p>
            <p><b>Diagnóstico:</b> {patient.diagnostico || '—'}</p>
            <p><b>Teléfono:</b> {patient.telefono || '—'}</p>
          </div>
        )}
      </div>
    </>
  )
}
