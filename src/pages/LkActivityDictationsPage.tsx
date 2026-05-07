import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ProjectBadge } from '../components/ProjectBadge'
import { useSession } from '../features/auth/useSession'
import { listDictationResults } from '../features/dictations/listResults'

export function LkActivityDictationsPage() {
  const { session } = useSession()
  if (!session) return null

  const results = useMemo(() => listDictationResults(session.phone), [session.phone])

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="text-sm font-semibold text-zinc-900">Все диктанты</div>
          <div className="mt-1 text-sm text-zinc-600">
            {results.length} {results.length === 1 ? 'результат' : 'результата(ов)'}
          </div>
        </div>
        <Link
          to="/lk/dictations"
          className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
        >
          ← Назад
        </Link>
      </div>

      {results.length === 0 ? (
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-600">
          Пока нет результатов.
        </div>
      ) : (
        <div className="space-y-3">
          {results.map((item) => (
            <div
              key={`${item.projectId}:${item.result.dictationId}`}
              className="rounded-2xl border border-zinc-200 bg-white p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-zinc-900">
                    {item.dictationTitle}
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-zinc-600">
                    <ProjectBadge projectId={item.projectId} />
                    <span className="text-zinc-400">•</span>
                    <span>{new Date(item.result.completedAt).toLocaleString()}</span>
                  </div>
                </div>

                <div className="shrink-0 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm font-semibold text-zinc-900">
                  {item.result.scorePercent}%
                </div>
              </div>

              <div className="mt-4 grid gap-3 lg:grid-cols-12">
                <a
                  href={item.result.certificatePngDataUrl}
                  download={`certificate-${item.result.dictationId}.png`}
                  className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20 lg:col-span-3"
                >
                  Скачать PNG
                </a>
                <div className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-3 lg:col-span-9">
                  <img
                    src={item.result.certificatePngDataUrl}
                    alt="Сертификат"
                    className="h-auto w-full rounded-lg border border-zinc-200 object-contain"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

