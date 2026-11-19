// Tabla reutilizable.
//
//   <Tabla
//     columnas={[
//       { clave: 'nombre', titulo: 'Nombre' },
//       { clave: 'estado', titulo: 'Estado', render: (fila) => <b>{fila.estado}</b> },
//     ]}
//     datos={ranchos}
//   />
//
// - columnas: [{ clave, titulo, render? }]  (render recibe la fila completa)
// - datos: arreglo de objetos
// - clavefila: campo único de cada fila (por defecto "id")
export default function Tabla({
  columnas,
  datos = [],
  clavefila = 'id',
  vacio = 'No hay datos para mostrar.',
}) {
  return (
    <table className="tabla">
      <thead>
        <tr>
          {columnas.map((columna) => (
            <th key={columna.clave}>{columna.titulo}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {datos.length === 0 ? (
          <tr>
            <td className="tabla__vacio" colSpan={columnas.length}>
              {vacio}
            </td>
          </tr>
        ) : (
          datos.map((fila, indice) => (
            <tr key={fila[clavefila] ?? indice}>
              {columnas.map((columna) => (
                <td key={columna.clave}>
                  {columna.render ? columna.render(fila) : fila[columna.clave]}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  )
}
