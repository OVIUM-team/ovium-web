import { NavLink, Outlet } from 'react-router-dom'

// Barra superior + contenido. Se usa como ruta padre en App.jsx:
// las páginas hijas se pintan donde está <Outlet />.
// Para agregar una sección al menú, añade un elemento a `enlaces`.
const enlaces = [
  { to: '/login', texto: 'Login' },
  { to: '/ranchos', texto: 'Ranchos' },
]

export default function Layout({ titulo = 'Ovium', children }) {
  return (
    <div className="layout">
      <header className="layout__barra">
        <span className="layout__marca">{titulo}</span>
        <nav className="layout__menu">
          {enlaces.map(({ to, texto }) => (
            <NavLink key={to} to={to} className="layout__enlace">
              {texto}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="layout__contenido">{children ?? <Outlet />}</main>
    </div>
  )
}
