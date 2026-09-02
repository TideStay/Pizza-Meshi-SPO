import { NavLink } from 'react-router-dom'

const linkClass = ({ isActive }) =>
  [
    'rounded-lg px-5 py-2.5 text-sm font-semibold tracking-wide transition-all duration-200',
    isActive
      ? 'bg-white text-slate-900 shadow-sm'
      : 'text-slate-300 hover:bg-slate-800 hover:text-white',
  ].join(' ')

export default function NavBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-900 shadow-lg">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pizza-500 text-xl shadow-md">
            🍕
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-white sm:text-lg">
              Pizza POS
            </h1>
            <p className="hidden text-xs text-slate-400 sm:block">Order Management</p>
          </div>
        </div>
        <nav
          className="flex gap-1 rounded-xl bg-slate-800/80 p-1"
          aria-label="Main navigation"
        >
          <NavLink to="/" end className={linkClass}>
            Cashier
          </NavLink>
          <NavLink to="/kitchen" className={linkClass}>
            Kitchen
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
