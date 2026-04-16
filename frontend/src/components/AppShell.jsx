import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

const AppShell = ({ role, title, children }) => {
  const { logout } = useAuth()

  const navItems =
    role === 'admin'
      ? [
          { to: '/admin/dashboard', label: 'Dashboard' },
        ]
      : [
          { to: '/user/dashboard', label: 'Dashboard' },
          { to: '/user/events', label: 'Browse Events' },
        ]

  return (
    <div className="app-shell">
      <header className="app-header">
        <Link className="brand" to={`/${role}/dashboard`}>
          EventSphere
        </Link>
        <nav className="top-nav">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className="top-link">
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button
          type="button"
          className="ghost-btn"
          onClick={() => {
            logout()
          }}
        >
          Logout
        </button>
      </header>
      <main className="app-main">
        <h1>{title}</h1>
        {children}
      </main>
    </div>
  )
}

export default AppShell
