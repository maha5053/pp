import { safeJsonParse } from '../../lib/storage'
import type { Contest } from '../../types'

export type VotesHistoryEntry = {
  contest: Contest
  votedApplicationIds: string[]
}

function votesKey(projectId: string, contestId: string) {
  return `votes:${projectId}:${contestId}`
}

export function readContestVotes(projectId: string, contestId: string) {
  try {
    const raw = localStorage.getItem(votesKey(projectId, contestId)) ?? ''
    const parsed = safeJsonParse<Record<string, boolean>>(raw) ?? {}
    return Object.keys(parsed).filter((k) => parsed[k])
  } catch {
    return []
  }
}

export function buildVotesHistory(contests: Contest[]): VotesHistoryEntry[] {
  const entries = contests
    .map((contest) => ({
      contest,
      votedApplicationIds: readContestVotes(contest.projectId, contest.id),
    }))
    .filter((e) => e.votedApplicationIds.length > 0)

  return entries
}

