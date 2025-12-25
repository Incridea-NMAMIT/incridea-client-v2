import { Link, NavLink, Outlet } from 'react-router-dom'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Form', to: '/form' },
]

function Layout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link to="/" className="text-lg font-semibold text-sky-300">
            Incridea Client
          </Link>
          <nav className="flex items-center gap-3 text-sm font-medium text-slate-200">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 transition hover:bg-slate-800 hover:text-sky-200 ${
                    isActive ? 'bg-slate-800 text-sky-300' : ''
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10">
        <Outlet />
      </main>

      <footer className="border-t border-slate-800 bg-slate-900/70">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 text-sm text-slate-400">
          <span>React 18 · Vite · TypeScript</span>
          <span className="text-slate-500">Tailwind · React Query · Router</span>
        </div>
      </footer>
    </div>
  )
}

export default Layout
