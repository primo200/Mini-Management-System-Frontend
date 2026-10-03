/**
 * Tiny class-name joiner. Falsy values are dropped so callers can write
 * conditional classes inline without pulling in a dependency.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}