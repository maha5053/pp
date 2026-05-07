import { useEffect, useMemo, useState } from 'react'
import { ProjectBadge } from '../components/ProjectBadge'
import { Link } from 'react-router-dom'
import { useSession } from '../features/auth/useSession'
import { renderCertificateToPngDataUrl } from '../features/dictations/certificate'
import { listDictationResults } from '../features/dictations/listResults'
import { writeDictationResult } from '../features/dictations/results'
import { readProfile } from '../features/profile/profile'
import { projects } from '../data/projects'

export function LkActivityPage() {
  const { session } = useSession()
  if (!session) return null

  const profile = useMemo(() => readProfile(session.phone), [session.phone])
  const [seedVersion, setSeedVersion] = useState(0)

  // seed a few dictation results so “many items” layout is testable
  useEffect(() => {
    const existing = listDictationResults(session.phone)
    if (existing.length > 0) return

    const phone = session.phone
    const fullName = profile?.fullName?.trim() || 'Участник'

    const demo: Array<{ dictationId: string; scorePercent: number; daysAgo: number }> =
      [
        { dictationId: 'digital-dictation', scorePercent: 86, daysAgo: 2 },
        { dictationId: 'housing-dictation', scorePercent: 91, daysAgo: 12 },
        { dictationId: 'sport-dictation', scorePercent: 78, daysAgo: 28 },
      ]

    for (const item of demo) {
      const completedAt = new Date(Date.now() - item.daysAgo * 24 * 60 * 60 * 1000).toISOString()
      const dictationTitle =
        projects
          .flatMap((p) => p.dictations)
          .find((d) => d.id === item.dictationId)?.title ?? 'Диктант'

      const png = renderCertificateToPngDataUrl({
        fullName,
        phone,
        dictationTitle,
        scorePercent: item.scorePercent,
        completedAt,
        certificateNo: `PR-${phone.slice(-4)}-${new Date(completedAt).getFullYear()}`,
      })

      if (!png) continue
      writeDictationResult(phone, {
        dictationId: item.dictationId,
        scorePercent: item.scorePercent,
        completedAt,
        certificatePngDataUrl: png,
      })
    }
    setSeedVersion((v) => v + 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.phone])

  const dictationResults = useMemo(
    () => listDictationResults(session.phone),
    [session.phone, seedVersion],
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <div className="text-sm font-semibold text-zinc-900">Все диктанты</div>
          <div className="mt-1 text-sm text-zinc-600">
            {dictationResults.length}{' '}
            {dictationResults.length === 1 ? 'результат' : 'результата(ов)'}
          </div>
        </div>
      </div>

      {dictationResults.length === 0 ? (
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-600">
          Пока нет результатов.
        </div>
      ) : (
        <div className="space-y-3">
          {dictationResults.map((item) => (
            <div
              key={`${item.projectId}:${item.result.dictationId}`}
              className="rounded-2xl border border-zinc-200 bg-white p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <Link
                    to={`/${item.projectId}`}
                    className="rounded-md text-sm font-semibold text-zinc-900 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
                  >
                    {item.dictationTitle}
                  </Link>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-zinc-600">
                    <ProjectBadge projectId={item.projectId} />
                    <span className="text-zinc-400">•</span>
                    <span>{new Date(item.result.completedAt).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 text-sm text-zinc-700">
                {(() => {
                  const total = 30
                  const correct = Math.round((total * item.result.scorePercent) / 100)
                  return `Ваш результат: ${correct} из ${total} (${item.result.scorePercent}%)`
                })()}
              </div>

              <div className="mt-4 flex flex-wrap items-start gap-3">
                <a
                  href={item.result.certificatePngDataUrl}
                  download={`certificate-${item.result.dictationId}.png`}
                  className="group relative block overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50/50 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
                  title="Скачать сертификат"
                >
                  <img
                    src={item.result.certificatePngDataUrl}
                    alt="Сертификат"
                    className="h-24 w-40 object-cover"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-zinc-900/0 opacity-0 transition group-hover:bg-zinc-900/35 group-hover:opacity-100">
                    <span className="rounded-lg bg-white/90 px-3 py-1.5 text-xs font-semibold text-zinc-900 shadow-sm">
                      Скачать сертификат
                    </span>
                  </div>
                </a>

                <div className="text-xs text-zinc-600">
                  Наведите на сертификат, чтобы скачать. По клику загрузится полное PNG.
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <section className="rounded-2xl border border-dashed border-zinc-300 bg-white p-6">
        <div className="text-sm text-zinc-600">
          Вы пока не прошли ни одного диктанта. После прохождения диктанта
          сертификат появится здесь автоматически.
        </div>
      </section>
    </div>
  )
}

