/**
 * Namespaced localStorage helpers.
 *
 * Every key is prefixed so the mock data layer never collides with anything
 * else on the origin, and every access is guarded because localStorage throws
 * in private-browsing modes and when the quota is exceeded.
 */

const PREFIX = 'mms:'

function available(): boolean {
  try {
    const probe = `${PREFIX}__probe`
    window.localStorage.setItem(probe, '1')
    window.localStorage.removeItem(probe)
    return true
  } catch {
    return false
  }
}

const hasStorage = typeof window !== 'undefined' && available()

/** In-memory fallback used when localStorage is unavailable. */
const memory = new Map<string, string>()

export function readStore<T>(key: string, fallback: T): T {
  try {
    const raw = hasStorage ? window.localStorage.getItem(PREFIX + key) : (memory.get(key) ?? null)
    if (raw === null) return fallback
    return JSON.parse(raw) as T
  } catch {
    // Corrupt JSON — treat as "no value" rather than crashing the app.
    return fallback
  }
}

export function writeStore<T>(key: string, value: T): void {
  try {
    const raw = JSON.stringify(value)
    if (hasStorage) window.localStorage.setItem(PREFIX + key, raw)
    else memory.set(key, raw)
  } catch {
    // Quota exceeded or serialisation failure — non-fatal for a prototype.
  }
}

export function removeStore(key: string): void {
  try {
    if (hasStorage) window.localStorage.removeItem(PREFIX + key)
    else memory.delete(key)
  } catch {
    // ignore
  }
}