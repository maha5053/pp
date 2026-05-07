import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ProjectBadge } from '../components/ProjectBadge'
import { contests } from '../data/projects'
import { useSession } from '../features/auth/useSession'
import { buildVotesHistory } from '../features/votesHistory/votesHistory'

export function LkActivityVotesPage() {
  const { session } = useSession()
  if (!session) return null

  const votesHistory = useMemo(() => buildVotesHistory(contests), [])

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="text-sm font-semibold text-zinc-900">Все голоса</div>
          <div className="mt-1 text-sm text-zinc-600">
            {votesHistory.length} {votesHistory.length === 1 ? 'конкурс' : 'конкурса(ов)'}
          </div>
        </div>
        <Link
          to="/lk/dictations"
          className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
        >
          ← Назад
        </Link>
      </div>

      {votesHistory.length === 0 ? (
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-600">
          Пока нет голосований.
        </div>
      ) : (
        <div className="space-y-3">
          {votesHistory.map((entry) => (
            <div
              key={`${entry.contest.projectId}:${entry.contest.id}`}
              className="rounded-2xl border border-zinc-200 bg-white p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-zinc-900">
                    {entry.contest.title}
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-zinc-600">
                    <ProjectBadge projectId={entry.contest.projectId} />
                    <span className="text-zinc-400">•</span>
                    <span>Заявок: {entry.votedApplicationIds.length}</span>
                  </div>
                </div>

                <Link
                  to={`/${entry.contest.projectId}/contests/${entry.contest.id}`}
                  className="shrink-0 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-900 shadow-sm transition hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
                >
                  Открыть конкурс
                </Link>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {entry.votedApplicationIds.map((id) => (
                  <span
                    key={id}
                    className="rounded-full bg-zinc-100 px-2 py-1 text-xs text-zinc-700"
                  >
                    {id}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

