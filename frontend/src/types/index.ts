/**
 * Shared domain types for the Mini Management System.
 *
 * These mirror the JSON the backend team will expose, so swapping the mock
 * service for real REST calls does not require touching component code.
 */

export type RecordStatus = 'active' | 'pending' | 'archived'

export type RecordCategory = 'inventory' | 'finance' | 'hr' | 'operations'

export interface ManagementRecord {
  id: string
  title: string
  description: string
  category: RecordCategory
  status: RecordStatus
  amount: number
  owner: string
  /** ISO-8601 date string (YYYY-MM-DD). */
  date: string
  createdAt: string
  updatedAt: string
}

/** Payload accepted by the create endpoint. */
export type CreateRecordInput = Omit<ManagementRecord, 'id' | 'createdAt' | 'updatedAt'>

/** Payload accepted by the update endpoint — every field optional. */
export type UpdateRecordInput = Partial<Omit<ManagementRecord, 'id' | 'createdAt'>>

export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
}

export interface Paginated<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

/** Query options accepted by `records.list()`. */
export interface ListRecordsParams {
  page?: number
  pageSize?: number
  /** Free-text search across title, description and owner. */
  search?: string
  status?: RecordStatus | 'all'
  category?: RecordCategory | 'all'
  /** Sort key; falls back to `date` server-side. */
  sortBy?: 'title' | 'date' | 'amount' | 'status'
  sortDir?: 'asc' | 'desc'
}

export const RECORD_STATUSES: readonly RecordStatus[] = ['active', 'pending', 'archived']

export const RECORD_CATEGORIES: readonly RecordCategory[] = [
  'inventory',
  'finance',
  'hr',
  'operations',
]

/** Human-readable labels for the select filters and status badges. */
export const STATUS_LABELS: Record<RecordStatus, string> = {
  active: 'Active',
  pending: 'Pending',
  archived: 'Archived',
}

export const CATEGORY_LABELS: Record<RecordCategory, string> = {
  inventory: 'Inventory',
  finance: 'Finance',
  hr: 'Human Resources',
  operations: 'Operations',
}

/** Field-level validation shared by the Add and Edit forms. */
export const RECORD_VALIDATION = {
  title: { required: true, minLength: 3, maxLength: 80 },
  description: { required: false, maxLength: 300 },
  owner: { required: true, minLength: 2, maxLength: 60 },
  amount: { required: true, min: 0, max: 1_000_000 },
} as const