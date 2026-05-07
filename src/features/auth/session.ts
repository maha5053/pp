import { readJson, writeJson } from '../../lib/storage'

export type UserSession = {
  phone: string
  createdAt: string
}

const SESSION_KEY = 'session:user'

export function readSession(): UserSession | undefined {
  return readJson<UserSession>(SESSION_KEY)
}

export function writeSession(phone: string) {
  const session: UserSession = {
    phone,
    createdAt: new Date().toISOString(),
  }
  writeJson(SESSION_KEY, session)
  window.dispatchEvent(new Event('storage'))
}

export function clearSession() {
  try {
    localStorage.removeItem(SESSION_KEY)
  } catch {
    // ignore
  }
  window.dispatchEvent(new Event('storage'))
}

export function normalizePhone(input: string) {
  return input.replace(/\D/g, '')
}

