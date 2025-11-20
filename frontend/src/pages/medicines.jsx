import { useEffect, useState } from 'react'
import Navbar from '../components/navbar'
import api from '../services/api'

export default function Medicines() {
  const [meds, setMeds] = useState([])
  const [form, setForm] = useState({ nombre: '', lote: '', vencimiento: '', stock_actual: 0, stock_minimo: 0 })
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    try {
      const { data } = await api.get('/medicines')
      setMeds(data)
    } catch (error) {
      console.error('Error fetching medicines:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const medicineData = {
        nombre: form.nombre.trim(),
        lote: form.lote.trim(),
        vencimiento: form.vencimiento,
        stock_actual: Number(form.stock_actual) || 0,
        stock_minimo: Number(form.stock_minimo) || 0
      }

      console.log('Enviando datos:', medicineData) // Debug

      const response = await api.post('/medicines', medicineData)
      console.log('Respuesta:', response) // Debug

      setForm({ nombre: '', lote: '', vencimiento: '', stock_actual: 0, stock_minimo: 0 })
      fetchData()
    } catch (error) {
      console.error('Error adding medicine:', error)
      alert('Error al agregar medicamento: ' + (error.response?.data?.message || error.message))
    } finally {
      setLoading(false)
    }
  }

  const getStockStatus = (actual, minimo) => {
    if (actual <= minimo) return { status: 'low', text: 'Bajo', color: 'var(--error-color)' }
    if (actual <= minimo * 1.5) return { status: 'medium', text: 'Medio', color: 'var(--warning-color)' }
    return { status: 'good', text: 'Bueno', color: 'var(--success-color)' }
  }

  return (
    <>
      <Navbar />
      <div className="page-container">
        <div className="page-content fade-in">
          <div className="section-header">
            <h1>💊 Gestión de Medicamentos</h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              Control de inventario y stock de medicamentos
            </p>
          </div>

          <div className="card">
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '1.5rem' }}>
              ➕ Agregar Nuevo Medicamento
            </h3>
            <form onSubmit={handleSubmit} className="form-grid">
              <div className="form-group">
                <label htmlFor="nombre">Nombre del Medicamento</label>
                <input
                  id="nombre"
                  type="text"
                  placeholder="Nombre del medicamento"
                  value={form.nombre}
                  onChange={e=>setForm({...form, nombre: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lote">Lote</label>
                <input
                  id="lote"
                  type="text"
                  placeholder="Número de lote"
                  value={form.lote}
                  onChange={e=>setForm({...form, lote: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="vencimiento">Fecha de Vencimiento</label>
                <input
                  id="vencimiento"
                  type="date"
                  value={form.vencimiento}
                  onChange={e=>setForm({...form, vencimiento: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="stock_actual">Stock Actual</label>
                <input
                  id="stock_actual"
                  type="number"
                  min="0"
                  placeholder="Cantidad actual"
                  value={form.stock_actual}
                  onChange={e=>setForm({...form, stock_actual: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="stock_minimo">Stock Mínimo</label>
                <input
                  id="stock_minimo"
                  type="number"
                  min="0"
                  placeholder="Cantidad mínima"
                  value={form.stock_minimo}
                  onChange={e=>setForm({...form, stock_minimo: e.target.value})}
                  required
                />
              </div>
              <div className="form-group" style={{ alignSelf: 'end' }}>
                <button type="submit" disabled={loading}>
                  <span>{loading ? 'Agregando...' : 'Agregar Medicamento'}</span>
                </button>
              </div>
            </form>
          </div>

          <div className="card mt-4">
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '1.5rem' }}>
              📋 Inventario de Medicamentos ({meds.length})
            </h3>
            {meds.length === 0 ? (
              <p style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem' }}>
                No hay medicamentos registrados aún
              </p>
            ) : (
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Medicamento</th>
                      <th>Lote</th>
                      <th>Vencimiento</th>
                      <th>Stock Actual</th>
                      <th>Stock Mínimo</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {meds.map(m => {
                      const stockStatus = getStockStatus(m.stock_actual, m.stock_minimo)
                      return (
                        <tr key={m.id}>
                          <td style={{ fontWeight: '600' }}>{m.nombre}</td>
                          <td>{m.lote}</td>
                          <td>{new Date(m.vencimiento).toLocaleDateString('es-ES')}</td>
                          <td style={{ fontWeight: '600' }}>{m.stock_actual}</td>
                          <td>{m.stock_minimo}</td>
                          <td>
                            <span
                              style={{
                                backgroundColor: stockStatus.color + '20',
                                color: stockStatus.color,
                                padding: '0.25rem 0.5rem',
                                borderRadius: 'var(--border-radius-sm)',
                                fontSize: '0.875rem',
                                fontWeight: '600'
                              }}
                            >
                              {stockStatus.text}
                            </span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
