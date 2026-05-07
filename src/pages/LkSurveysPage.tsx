import { useEffect, useMemo, useState } from 'react'
import { ProjectBadge } from '../components/ProjectBadge'
import { useSession } from '../features/auth/useSession'
import {
  addSurveyHistoryEntry,
  listSurveyHistory,
} from '../features/surveysHistory/surveysHistory'

export function LkSurveysPage() {
  const { session } = useSession()
  if (!session) return null
  const [seedVersion, setSeedVersion] = useState(0)

  useEffect(() => {
    const existing = listSurveyHistory(session.phone)
    if (existing.length > 0) return

    const demo: Array<{
      title: string
      projectId: string
      daysAgo: number
      at: { h: number; m: number }
    }> = [
      {
        title: 'Опрос: цифровые сервисы в регионе',
        projectId: 'digital-portal',
        daysAgo: 1,
        at: { h: 19, m: 10 },
      },
      {
        title: 'Опрос: качество услуг и обратная связь',
        projectId: 'housing-school',
        daysAgo: 8,
        at: { h: 12, m: 35 },
      },
      {
        title: 'Опрос: доступность секций для детей',
        projectId: 'kids-sport',
        daysAgo: 21,
        at: { h: 9, m: 5 },
      },
    ]

    for (const item of demo) {
      const d = new Date(Date.now() - item.daysAgo * 24 * 60 * 60 * 1000)
      d.setHours(item.at.h, item.at.m, 0, 0)

      addSurveyHistoryEntry(session.phone, {
        id: `survey-${item.projectId}-${d.getTime()}`,
        title: item.title,
        projectId: item.projectId,
        completedAt: d.toISOString(),
      })
    }
    setSeedVersion((v) => v + 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.phone])

  const items = useMemo(
    () => listSurveyHistory(session.phone),
    [session.phone, seedVersion],
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="text-sm font-semibold text-zinc-900">Опросы</div>
          <div className="mt-1 text-sm text-zinc-600">
            {items.length} {items.length === 1 ? 'прохождение' : 'прохождений'}
          </div>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-600">
          Пока нет истории опросов.
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-zinc-200 bg-white p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-zinc-900">
                    {item.title}
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-zinc-600">
                    <ProjectBadge projectId={item.projectId} />
                    <span className="text-zinc-400">•</span>
                    <span>{new Date(item.completedAt).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <section className="rounded-2xl border border-dashed border-zinc-300 bg-white p-6">
        <div className="text-sm text-zinc-600">
          Вы пока не прошли ни одного опроса. После прохождения опроса история
          появится здесь автоматически.
        </div>
      </section>
    </div>
  )
}

