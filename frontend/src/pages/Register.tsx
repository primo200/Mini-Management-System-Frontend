import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'

import { FormField, TextInput } from '../components/ui/FormField'
import { AUTH_VALIDATION } from '../lib/authRules'
import { isValidEmail } from '../lib/validation'

interface RegisterValues {
  name: string
  email: string
  password: string
  confirmPassword: string
  terms: boolean
}

type RegisterErrors = Partial<Record<keyof RegisterValues, string>>

const EMPTY: RegisterValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  terms: false,
}

/** Simple strength score, 0-4, used only to drive the hint bar. */
function passwordStrength(password: string): number {
  let score = 0
  if (password.length >= AUTH_VALIDATION.password.minLength) score += 1
  if (password.length >= 12) score += 1
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1
  if (/\d/.test(password) || /[^\w\s]/.test(password)) score += 1
  return score
}

const STRENGTH_LABELS = ['Too short', 'Weak', 'Fair', 'Good', 'Strong']
const STRENGTH_COLORS = ['bg-red-500', 'bg-red-500', 'bg-amber-500', 'bg-lime-500', 'bg-emerald-500']

function validate(values: RegisterValues): RegisterErrors {
  const errors: RegisterErrors = {}

  const name = values.name.trim()
  if (!name) {
    errors.name = 'Full name is required.'
  } else if (name.length < AUTH_VALIDATION.name.minLength) {
    errors.name = `Name must be at least ${AUTH_VALIDATION.name.minLength} characters.`
  } else if (name.length > AUTH_VALIDATION.name.maxLength) {
    errors.name = `Name must be ${AUTH_VALIDATION.name.maxLength} characters or fewer.`
  }

  if (!values.email.trim()) {
    errors.email = 'Email address is required.'
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Enter a valid email address.'
  }

  if (!values.password) {
    errors.password = 'Password is required.'
  } else if (values.password.length < AUTH_VALIDATION.password.minLength) {
    errors.password = `Password must be at least ${AUTH_VALIDATION.password.minLength} characters.`
  } else if (values.password.length > AUTH_VALIDATION.password.maxLength) {
    errors.password = `Password must be ${AUTH_VALIDATION.password.maxLength} characters or fewer.`
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password.'
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Passwords do not match.'
  }

  if (!values.terms) {
    errors.terms = 'You must accept the terms to continue.'
  }

  return errors
}

export default function Register() {
  const [values, setValues] = useState<RegisterValues>(EMPTY)
  const [errors, setErrors] = useState<RegisterErrors>({})
  const [submitted, setSubmitted] = useState(false)

  const strength = passwordStrength(values.password)

  function update<K extends keyof RegisterValues>(key: K, value: RegisterValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }))
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
      const firstInvalid = event.currentTarget.querySelector<HTMLElement>('[aria-invalid="true"]')
      firstInvalid?.focus()
      return
    }

    // INT-02 (Developer 5) wires this to POST /api/register.
    alert('Registration is not wired up yet (ticket INT-02).')
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
              Create your account
            </h1>
            <p className="mt-1.5 text-sm text-slate-500">
              Start managing your records in under a minute.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
            <FormField label="Full name" error={errors.name}>
              {({ id, describedBy, invalid }) => (
                <TextInput
                  id={id}
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Juan Dela Cruz"
                  value={values.name}
                  invalid={invalid}
                  aria-describedby={describedBy}
                  onChange={(e) => update('name', e.target.value)}
                />
              )}
            </FormField>

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

            <div>
              <FormField
                label="Password"
                error={errors.password}
                hint={`At least ${AUTH_VALIDATION.password.minLength} characters.`}
              >
                {({ id, describedBy, invalid }) => (
                  <TextInput
                    id={id}
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="••••••••"
                    value={values.password}
                    invalid={invalid}
                    aria-describedby={describedBy}
                    onChange={(e) => update('password', e.target.value)}
                  />
                )}
              </FormField>

              {/* Strength meter — advisory only, not a validation rule. */}
              {values.password && !errors.password && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex h-1.5 flex-1 gap-1" aria-hidden="true">
                    {[0, 1, 2, 3].map((i) => (
                      <span
                        key={i}
                        className={`h-full flex-1 rounded-full ${
                          i < strength ? STRENGTH_COLORS[strength] : 'bg-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-medium text-slate-500">
                    {STRENGTH_LABELS[strength]}
                  </span>
                </div>
              )}
            </div>

            <FormField label="Confirm password" error={errors.confirmPassword}>
              {({ id, describedBy, invalid }) => (
                <TextInput
                  id={id}
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  placeholder="••••••••"
                  value={values.confirmPassword}
                  invalid={invalid}
                  aria-describedby={describedBy}
                  onChange={(e) => update('confirmPassword', e.target.value)}
                />
              )}
            </FormField>

            <div>
              <label className="flex cursor-pointer items-start gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={values.terms}
                  onChange={(e) => update('terms', e.target.checked)}
                  aria-invalid={errors.terms ? true : undefined}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                />
                <span>
                  I agree to the{' '}
                  <span className="font-medium text-brand-600">Terms of Service</span> and{' '}
                  <span className="font-medium text-brand-600">Privacy Policy</span>.
                </span>
              </label>
              {errors.terms && (
                <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">
                  {errors.terms}
                </p>
              )}
            </div>

            <button type="submit" className="btn-primary w-full">
              Create account
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-brand-600 hover:text-brand-700">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}