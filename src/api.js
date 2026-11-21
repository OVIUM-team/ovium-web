// Cliente base para llamar a la API de Ovium.
// La URL base sale de VITE_API_URL (ver .env.example).
const API_URL = import.meta.env.VITE_API_URL

export class ApiError extends Error {
  constructor(message, status, data) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

async function request(path, { method = 'GET', body, headers, ...options } = {}) {
  if (!API_URL) {
    throw new Error('Falta VITE_API_URL. Copia .env.example a .env y reinicia npm run dev.')
  }

  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      Accept: 'application/json',
      ...(body !== undefined && { 'Content-Type': 'application/json' }),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    ...options,
  })

  // 204 No Content o cuerpo vacío => null
  const text = await response.text()
  const data = text ? JSON.parse(text) : null

  if (!response.ok) {
    throw new ApiError(`Error ${response.status} en ${method} ${path}`, response.status, data)
  }
  return data
}

export const api = {
  get: (path, options) => request(path, { ...options, method: 'GET' }),
  post: (path, body, options) => request(path, { ...options, method: 'POST', body }),
  put: (path, body, options) => request(path, { ...options, method: 'PUT', body }),
  patch: (path, body, options) => request(path, { ...options, method: 'PATCH', body }),
  delete: (path, options) => request(path, { ...options, method: 'DELETE' }),
}

export default api
