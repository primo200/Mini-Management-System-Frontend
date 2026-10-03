/**
 * Auth-specific validation rules.
 *
 * Declared here (rather than inline in each page) so the registration form and
 * the backend team's USR-02 validator work from the same limits.
 */
export const AUTH_VALIDATION = {
  name: { required: true, minLength: 2, maxLength: 60 },
  email: { required: true },
  password: { required: true, minLength: 6, maxLength: 72 },
} as const