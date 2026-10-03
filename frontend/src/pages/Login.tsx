import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'

import { FormField, TextInput } from '../components/ui/FormField'
import { cn } from '../lib/cn'
import { isValidEmail } from '../lib/validation'

interface LoginValues {
  email: string
  password: string
  remember: boolean
}

type LoginErrors = Partial<Record<keyof LoginValues, string>>

const EMPTY: LoginValues = { email: '', password: '', remember: true }

/**
 * Client-side validation for the login form.
 *
 * Kept next to the page for now; when the auth service lands it moves into
 * `services/api.ts` so the rule is enforced in one place.
 */
function validate(values: LoginValues): LoginErrors {
  const errors: LoginErrors = {}

  if (!values.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Enter a valid email address.'
  }

  if (!values.password) {
    errors.password = 'Password is required.'
  } else if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters.'
  }

  return errors
}

export default function Login() {
  const [values, setValues] = useState<LoginValues>(EMPTY)
  const [errors, setErrors] = useState<LoginErrors>({})
  const [submitted, setSubmitted] = useState(false)

  function update<K extends keyof LoginValues>(key: K, value: LoginValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }))
    // Only clear an error once the field has been touched and then corrected.
    if (submitted) {
      setErrors(validate({ ...values, [key]: value }))
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)

    const nextErrors = validate(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      // Move focus to the first invalid control for keyboard/screen-reader users.
      const firstInvalid = event.currentTarget.querySelector<HTMLElement>('[aria-invalid="true"]')
      firstInvalid?.focus()
      return
    }

    // INT-01 (Developer 5) wires this to POST /api/login.
    alert('Authentication is not wired up yet (ticket INT-01).')
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="card p-8">
          <div className="text-center">
            <span
              aria-hidden="true"
              className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600 text-lg font-bold text-white"
            >
              M
            </span>
            <h1 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">
              Welcome back
            </h1>
            <p className="mt-1.5 text-sm text-slate-500">
              Log in to manage your records.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
            <FormField label="Email address" error={errors.email}>
              {({ id, describedBy, invalid }) => (
                <TextInput
                  id={id}
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={values.email}
                  invalid={invalid}
                  aria-describedby={describedBy}
                  onChange={(e) => update('email', e.target.value)}
                />
              )}
            </FormField>

            <FormField label="Password" error={errors.password}>
              {({ id, describedBy, invalid }) => (
                <TextInput
                  id={id}
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={values.password}
                  invalid={invalid}
                  aria-describedby={describedBy}
                  onChange={(e) => update('password', e.target.value)}
                />
              )}
            </FormField>

            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={values.remember}
                  onChange={(e) => update('remember', e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                />
                Remember me
              </label>
              <button
                type="button"
                className="text-sm font-medium text-brand-600 hover:text-brand-700"
              >
                Forgot password?
              </button>
            </div>

            <button type="submit" className={cn('btn-primary w-full')}>
              Log in
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-slate-600">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="font-semibold text-brand-600 hover:text-brand-700">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}