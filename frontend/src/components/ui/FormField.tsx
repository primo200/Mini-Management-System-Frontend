import { useId } from 'react'

import { cn } from '../../lib/cn'

interface FormFieldProps {
  label: string
  error?: string
  hint?: string
  className?: string
}

/**
 * Label + control + error/hint row.
 *
 * The control is passed as a render prop so this wrapper works for text,
 * email, password, select and textarea without duplicating the a11y wiring
 * (label association, `aria-invalid`, and `aria-describedby` for errors).
 */
export function FormField({
  label,
  error,
  hint,
  className,
  children,
}: FormFieldProps & {
  children: (props: { id: string; describedBy?: string; invalid: boolean }) => React.ReactNode
}) {
  const id = useId()
  const errorId = `${id}-error`
  const hintId = `${id}-hint`
  const describedBy = [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(' ') || undefined

  return (
    <div className={className}>
      <label htmlFor={id} className="label-base">
        {label}
      </label>

      {children({ id, describedBy, invalid: Boolean(error) })}

      {hint && !error && (
        <p id={hintId} className="mt-1.5 text-xs text-slate-500">
          {hint}
        </p>
      )}

      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}

/** Standard text-style input used by the auth and record forms. */
export function TextInput({
  invalid,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }) {
  return (
    <input
      {...props}
      aria-invalid={invalid || undefined}
      className={cn('input-base', invalid && 'border-red-400 focus:border-red-500 focus:ring-red-500/30', className)}
    />
  )
}