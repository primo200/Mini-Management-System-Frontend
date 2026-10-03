import {
  RECORD_VALIDATION,
  type CreateRecordInput,
  type UpdateRecordInput,
} from '../types'

export type FieldErrors<T> = Partial<Record<keyof T, string>>

/**
 * Client-side validation for the record form.
 *
 * The backend performs its own validation (Developer 3/4, SEC-03); this exists
 * to give immediate feedback in the UI. Both use the limits declared in
 * `RECORD_VALIDATION` so the rules stay in one place.
 */
export function validateRecord(input: CreateRecordInput | UpdateRecordInput): FieldErrors<CreateRecordInput> {
  const errors: FieldErrors<CreateRecordInput> = {}

  if ('title' in input) {
    const title = input.title?.trim() ?? ''
    if (!title) {
      errors.title = 'Title is required.'
    } else if (title.length < RECORD_VALIDATION.title.minLength) {
      errors.title = `Title must be at least ${RECORD_VALIDATION.title.minLength} characters.`
    } else if (title.length > RECORD_VALIDATION.title.maxLength) {
      errors.title = `Title must be ${RECORD_VALIDATION.title.maxLength} characters or fewer.`
    }
  }

  if ('description' in input && input.description) {
    if (input.description.length > RECORD_VALIDATION.description.maxLength) {
      errors.description = `Description must be ${RECORD_VALIDATION.description.maxLength} characters or fewer.`
    }
  }

  if ('owner' in input) {
    const owner = input.owner?.trim() ?? ''
    if (!owner) {
      errors.owner = 'Owner is required.'
    } else if (owner.length < RECORD_VALIDATION.owner.minLength) {
      errors.owner = `Owner must be at least ${RECORD_VALIDATION.owner.minLength} characters.`
    } else if (owner.length > RECORD_VALIDATION.owner.maxLength) {
      errors.owner = `Owner must be ${RECORD_VALIDATION.owner.maxLength} characters or fewer.`
    }
  }

  if ('amount' in input) {
    const amount = input.amount
    if (amount === undefined || Number.isNaN(amount)) {
      errors.amount = 'Amount is required.'
    } else if (amount < RECORD_VALIDATION.amount.min) {
      errors.amount = 'Amount cannot be negative.'
    } else if (amount > RECORD_VALIDATION.amount.max) {
      errors.amount = `Amount must be at most ${RECORD_VALIDATION.amount.max.toLocaleString()}.`
    }
  }

  return errors
}

export function hasErrors(errors: FieldErrors<CreateRecordInput>): boolean {
  return Object.keys(errors).length > 0
}

/** Basic email shape check used by the login and registration forms. */
export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}