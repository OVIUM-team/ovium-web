import { useState } from 'react'

// Formulario reutilizable.
//
//   <Formulario
//     campos={[
//       { nombre: 'correo', etiqueta: 'Correo', tipo: 'email', requerido: true },
//       { nombre: 'rol', etiqueta: 'Rol', tipo: 'select', opciones: ['admin', 'usuario'] },
//     ]}
//     textoBoton="Entrar"
//     onSubmit={(valores) => api.post('/login', valores)}
//   />
//
// - campos: [{ nombre, etiqueta, tipo = 'text', requerido, placeholder, opciones }]
//   (opciones: ['a', 'b'] o [{ valor, texto }], solo para tipo "select")
// - valoresIniciales: { [nombre]: valor }
// - onSubmit(valores): puede ser async; si lanza error se muestra debajo del formulario
export default function Formulario({
  campos,
  valoresIniciales = {},
  onSubmit,
  textoBoton = 'Guardar',
}) {
  const [valores, setValores] = useState(() =>
    Object.fromEntries(campos.map((c) => [c.nombre, valoresIniciales[c.nombre] ?? ''])),
  )
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState(null)

  function cambiar(evento) {
    const { name, value } = evento.target
    setValores((actuales) => ({ ...actuales, [name]: value }))
  }

  async function enviar(evento) {
    evento.preventDefault()
    setEnviando(true)
    setError(null)
    try {
      await onSubmit?.(valores)
    } catch (err) {
      setError(err.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <form className="formulario" onSubmit={enviar}>
      {campos.map(({ nombre, etiqueta, tipo = 'text', requerido, placeholder, opciones }) => (
        <label key={nombre} className="formulario__campo">
          <span>{etiqueta}</span>
          {tipo === 'select' ? (
            <select name={nombre} value={valores[nombre]} onChange={cambiar} required={requerido}>
              <option value="">Selecciona…</option>
              {opciones?.map((opcion) => {
                const { valor, texto } =
                  typeof opcion === 'object' ? opcion : { valor: opcion, texto: opcion }
                return (
                  <option key={valor} value={valor}>
                    {texto}
                  </option>
                )
              })}
            </select>
          ) : (
            <input
              name={nombre}
              type={tipo}
              value={valores[nombre]}
              onChange={cambiar}
              required={requerido}
              placeholder={placeholder}
            />
          )}
        </label>
      ))}
      {error && (
        <p className="formulario__error" role="alert">
          {error}
        </p>
      )}
      <button type="submit" disabled={enviando}>
        {enviando ? 'Enviando…' : textoBoton}
      </button>
    </form>
  )
}
