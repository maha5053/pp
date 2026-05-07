import { useCallback, useMemo, useSyncExternalStore } from 'react'
import { safeJsonParse } from '../../lib/storage'
import { clearSession, readSession, type UserSession } from './session'

const SESSION_KEY = 'session:user'

function readRaw() {
  try {
    return localStorage.getItem(SESSION_KEY) ?? ''
  } catch {
    return ''
  }
}

export function useSession() {
  const subscribe = useCallback((onStoreChange: () => void) => {
    window.addEventListener('storage', onStoreChange)
    return () => window.removeEventListener('storage', onStoreChange)
  }, [])

  const getSnapshot = useCallback(() => readRaw(), [])

  const raw = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
  const session = useMemo(() => safeJsonParse<UserSession>(raw), [raw])

  const logout = useCallback(() => clearSession(), [])

  return useMemo(
    () => ({
      session,
      isAuthed: Boolean(session?.phone),
      logout,
    }),
    [session, logout],
  )
}

export function requireSession(): UserSession | undefined {
  return readSession()
}

