import { NavLink } from 'react-router-dom'

import { cn } from '../../lib/cn'

/**
 * Route table for the primary navigation. Kept as data so the same list can
 * drive the desktop bar and the mobile drawer without duplication.
 */
export const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/dashboard', label: 'Dashboard', end: false },
  { to: '/records', label: 'Records', end: false },
] as const

function BrandMark() {
  return (
    <span
      aria-hidden="true"
      className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white"
    >
      M
    </span>
  )
}

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <NavLink to="/" className="flex items-center gap-2.5 rounded-lg">
          <BrandMark />
          <span className="text-base font-semibold tracking-tight text-slate-900">
            Mini<span className="text-brand-600">Management</span>
          </span>
        </NavLink>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  cn(
                    'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-brand-50 text-brand-700'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
                  )
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Auth actions */}
        <div className="hidden items-center gap-2 md:flex">
          <NavLink to="/login" className="btn-secondary">
            Log in
          </NavLink>
          <NavLink to="/register" className="btn-primary">
            Sign up
          </NavLink>
        </div>
      </nav>
    </header>
  )
}