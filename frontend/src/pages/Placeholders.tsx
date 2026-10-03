/**
 * Placeholder pages for UI-01.
 *
 * The real page implementations arrive in later tickets:
 *   - UI-03 Login · UI-04 Registration · UI-05 Dashboard · COMP-02 Records
 */

function Placeholder({ title }: { title: string }) {
  return (
    <div className="card p-8">
      <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
      <p className="mt-2 text-sm text-slate-500">
        This page is a placeholder. Its full implementation is delivered by a later ticket.
      </p>
    </div>
  )
}

export function Home() {
  return <Placeholder title="Home" />
}

export function Login() {
  return <Placeholder title="Login" />
}

export function Register() {
  return <Placeholder title="Register" />
}

export function Dashboard() {
  return <Placeholder title="Dashboard" />
}

export function Records() {
  return <Placeholder title="Records" />
}

export function NotFound() {
  return <Placeholder title="404 — Page not found" />
}