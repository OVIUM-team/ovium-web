import { useState } from 'react'
import api from '../api.js'

export default function Login() {
  const [estado, setEstado] = useState(null) // null | 'probando' | 'ok' | 'error'
  const [mensaje, setMensaje] = useState('')

  // Llamada de prueba a la API: GET /health
  async function probarConexion() {
    setEstado('probando')
    setMensaje('')
    try {
      await api.get('/health')
      setEstado('ok')
      setMensaje('Conectado a la API')
    } catch (error) {
      setEstado('error')
      // ApiError: la API respondió con error. Otro error: no hubo respuesta (API apagada, URL o CORS).
      setMensaje(
        error.name === 'ApiError'
          ? error.message
          : `No se pudo conectar con la API (${import.meta.env.VITE_API_URL}). Revisa que esté corriendo y el CORS.`,
      )
    }
  }

  return (
    <section>
      <h1>Login</h1>
      <button type="button" onClick={probarConexion} disabled={estado === 'probando'}>
        {estado === 'probando' ? 'Probando…' : 'Probar conexión'}
      </button>
      {estado === 'ok' && (
        <p className="estado estado--ok" role="status">
          {mensaje}
        </p>
      )}
      {estado === 'error' && (
        <p className="estado estado--error" role="alert">
          {mensaje}
        </p>
      )}
    </section>
  )
}
