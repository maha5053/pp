import { useCallback, useMemo, useSyncExternalStore } from 'react'
import { safeJsonParse, writeJson } from '../../lib/storage'

type VotesState = Record<string, boolean>

function key(projectId: string, contestId: string) {
  return `votes:${projectId}:${contestId}`
}

function readRaw(projectId: string, contestId: string) {
  try {
    return localStorage.getItem(key(projectId, contestId)) ?? ''
  } catch {
    return ''
  }
}

function writeState(projectId: string, contestId: string, state: VotesState) {
  writeJson(key(projectId, contestId), state)
  window.dispatchEvent(new Event('storage'))
}

export function useContestVotes(projectId: string, contestId: string) {
  const subscribe = useCallback((onStoreChange: () => void) => {
    window.addEventListener('storage', onStoreChange)
    return () => window.removeEventListener('storage', onStoreChange)
  }, [])

  const getSnapshot = useCallback(
    () => readRaw(projectId, contestId),
    [projectId, contestId],
  )

  const raw = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
  const state = useMemo(
    () => safeJsonParse<VotesState>(raw) ?? {},
    [raw],
  )

  const hasVoted = useCallback(
    (applicationId: string) => Boolean(state[applicationId]),
    [state],
  )

  const toggleVote = useCallback(
    (applicationId: string) => {
      const next = { ...(safeJsonParse<VotesState>(readRaw(projectId, contestId)) ?? {}) }
      next[applicationId] = !next[applicationId]
      if (!next[applicationId]) delete next[applicationId]
      writeState(projectId, contestId, next)
    },
    [projectId, contestId],
  )

  return useMemo(
    () => ({
      hasVoted,
      toggleVote,
    }),
    [hasVoted, toggleVote],
  )
}

