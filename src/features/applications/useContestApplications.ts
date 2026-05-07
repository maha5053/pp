import { useCallback, useMemo, useSyncExternalStore } from 'react'
import type { Application } from '../../types'
import { safeJsonParse, writeJson } from '../../lib/storage'

function key(projectId: string, contestId: string) {
  return `applications:${projectId}:${contestId}`
}

function readRaw(projectId: string, contestId: string) {
  try {
    return localStorage.getItem(key(projectId, contestId)) ?? ''
  } catch {
    return ''
  }
}

function writeState(projectId: string, contestId: string, apps: Application[]) {
  writeJson(key(projectId, contestId), apps)
  window.dispatchEvent(new Event('storage'))
}

export function useContestApplications(projectId: string, contestId: string) {
  const subscribe = useCallback((onStoreChange: () => void) => {
    window.addEventListener('storage', onStoreChange)
    return () => window.removeEventListener('storage', onStoreChange)
  }, [])

  const getSnapshot = useCallback(
    () => readRaw(projectId, contestId),
    [projectId, contestId],
  )

  const raw = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
  const applications = useMemo(
    () => safeJsonParse<Application[]>(raw) ?? [],
    [raw],
  )

  const addApplication = useCallback(
    (app: Application) => {
      const next = [app, ...(safeJsonParse<Application[]>(readRaw(projectId, contestId)) ?? [])]
      writeState(projectId, contestId, next)
    },
    [projectId, contestId],
  )

  return useMemo(
    () => ({
      applications,
      addApplication,
    }),
    [applications, addApplication],
  )
}

