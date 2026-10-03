import { Link } from 'react-router-dom'

const FEATURES = [
  {
    title: 'Simple navigation',
    description: 'Move between Home, Dashboard and Records from one clear bar.',
  },
  {
    title: 'Dashboard summary',
    description: 'Cards that surface totals and status breakdowns at a glance.',
  },
  {
    title: 'Record management',
    description: 'Add, edit, search, filter and delete records from one table.',
  },
] as const

export function Home() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="text-center">
        <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
          Prototype
        </span>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Manage your records,{' '}
          <span className="text-brand-600">without the clutter.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">
          A small, fast interface for tracking inventory, finance, HR and operations records
          in one place.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link to="/register" className="btn-primary w-full sm:w-auto">
            Get started
          </Link>
          <Link to="/login" className="btn-secondary w-full sm:w-auto">
            Log in
          </Link>
        </div>
      </section>

      {/* Features */}
      <section>
        <h2 className="text-center text-2xl font-semibold text-slate-900">What you can do</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <li key={feature.title} className="card p-6">
              <h3 className="font-semibold text-slate-900">{feature.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{feature.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export function Login() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-slate-50 px-4 py-12">
      <div className="card w-full max-w-md p-8">
        <h1 className="text-2xl font-semibold text-slate-900">Login</h1>
        <p className="mt-2 text-sm text-slate-500">
          Delivered by ticket UI-03.
        </p>
      </div>
    </div>
  )
}

export function Register() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-slate-50 px-4 py-12">
      <div className="card w-full max-w-md p-8">
        <h1 className="text-2xl font-semibold text-slate-900">Create an account</h1>
        <p className="mt-2 text-sm text-slate-500">Delivered by ticket UI-04.</p>
      </div>
    </div>
  )
}

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">Delivered by ticket UI-05.</p>
      </div>
    </div>
  )
}

export function Records() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Records</h1>
        <p className="mt-1 text-sm text-slate-500">Delivered by tickets COMP-01 to COMP-07.</p>
      </div>
    </div>
  )
}

export function NotFound() {
  return (
    <div className="py-16 text-center">
      <p className="text-6xl font-bold text-brand-600">404</p>
      <h1 className="mt-4 text-2xl font-semibold text-slate-900">Page not found</h1>
      <p className="mt-2 text-sm text-slate-600">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link to="/" className="btn-primary mt-6">
        Back to Home
      </Link>
    </div>
  )
}