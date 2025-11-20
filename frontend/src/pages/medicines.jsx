import { useEffect, useState } from 'react'
import Navbar from '../components/navbar'
import api from '../services/api'

export default function Medicines() {
  const [meds, setMeds] = useState([])
  const [form, setForm] = useState({ nombre: '', lote: '', vencimiento: '', stock_actual: 0, stock_minimo: 0 })

  const fetchData = async () => {
    const { data } = await api.get('/medicines')
    setMeds(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await api.post('/medicines', form)
    setForm({ nombre: '', lote: '', vencimiento: '', stock_actual: 0, stock_minimo: 0 })
    fetchData()
  }

  return (
    <>
      <Navbar />
      <div style={{ padding: '1rem' }}>
        <h2>Medicamentos</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <input placeholder="Nombre" value={form.nombre} onChange={e=>setForm({...form, nombre: e.target.value})} />
          <input placeholder="Lote" value={form.lote} onChange={e=>setForm({...form, lote: e.target.value})} />
          <input type="date" value={form.vencimiento} onChange={e=>setForm({...form, vencimiento: e.target.value})} />
          <input type="number" placeholder="Stock" value={form.stock_actual} onChange={e=>setForm({...form, stock_actual: e.target.value})} />
          <input type="number" placeholder="Stock mín" value={form.stock_minimo} onChange={e=>setForm({...form, stock_minimo: e.target.value})} />
          <button>Agregar</button>
        </form>

        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Lote</th>
              <th>Vence</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {meds.map(m => (
              <tr key={m.id}>
                <td>{m.nombre}</td>
                <td>{m.lote}</td>
                <td>{m.vencimiento}</td>
                <td>{m.stock_actual}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
