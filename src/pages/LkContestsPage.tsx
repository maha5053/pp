import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ProjectBadge } from '../components/ProjectBadge'
import { useSession } from '../features/auth/useSession'
import { readProfile } from '../features/profile/profile'

type ContestListItem = {
  id: string
  title: string
  projectId: string
  scheduledAt: Date
  myApplication:
    | null
    | {
        title: string
        nomination: string
        votes: number
        imageUrl: string
        status?: 'moderation'
        award?: { place: 1 }
      }
  myVotes:
    | null
    | {
        byNomination: Array<{
          nomination: string
          applicationTitles: string[]
        }>
      }
}

export function LkContestsPage() {
  const { session } = useSession()
  if (!session) return null

  const profile = useMemo(() => readProfile(session.phone), [session.phone])
  const fullName = profile?.fullName?.trim() || 'Участник'
  const [expandedVotes, setExpandedVotes] = useState<Record<string, boolean>>({})

  const applicationImageDataUrl =
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="360" height="240" viewBox="0 0 360 240">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#fafafa"/>
            <stop offset="1" stop-color="#f4f4f5"/>
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="360" height="240" rx="18" fill="url(#g)"/>
        <rect x="22" y="22" width="316" height="196" rx="14" fill="#ffffff" stroke="#e4e4e7"/>
        <path d="M85 167c24-44 54-58 90-42 16-28 44-44 84-49" fill="none" stroke="#a1a1aa" stroke-width="8" stroke-linecap="round"/>
        <circle cx="130" cy="96" r="18" fill="#d4d4d8"/>
        <path d="M210 84l26 26-54 54-28 6 6-28 50-58Z" fill="#18181b" opacity="0.12"/>
        <path d="M214 84l26 26" stroke="#a1a1aa" stroke-width="10" stroke-linecap="round"/>
        <text x="180" y="206" text-anchor="middle" font-family="system-ui, -apple-system, Segoe UI, Roboto, Arial" font-size="14" fill="#71717a">
          Эскиз рисунка
        </text>
      </svg>`,
    )

  const contests: ContestListItem[] = [
    {
      id: 'kids-drawing',
      title: 'Детский рисунок',
      projectId: 'kids-sport',
      scheduledAt: new Date('2026-05-20T12:00:00.000Z'),
      myApplication: {
        title: 'Спорт в моём дворе',
        nomination: '«Мой спортивный день»',
        votes: 17,
        imageUrl: applicationImageDataUrl,
        status: 'moderation',
      },
      myVotes: {
        byNomination: [
          {
            nomination: '«Мой спортивный день»',
            applicationTitles: ['Спорт в моём дворе'],
          },
          {
            nomination: '«Командная игра»',
            applicationTitles: ['Футбол для всех'],
          },
          {
            nomination: '«Спорт и дружба»',
            applicationTitles: ['Команда на старте'],
          },
          {
            nomination: '«Семейный спорт»',
            applicationTitles: ['Выходные вместе'],
          },
          {
            nomination: '«Сила воли»',
            applicationTitles: ['Последний рывок'],
          },
          {
            nomination: '«Победа»',
            applicationTitles: ['Финишная лента'],
          },
          {
            nomination: '«Честная игра»',
            applicationTitles: ['Игра по правилам'],
          },
          {
            nomination: '«Мой тренер»',
            applicationTitles: ['Совет наставника'],
          },
          {
            nomination: '«Школьная секция»',
            applicationTitles: ['После уроков'],
          },
          {
            nomination: '«Спортивный двор»',
            applicationTitles: ['Турник у дома'],
          },
        ],
      },
    },
    {
      id: 'best-home-yard',
      title: 'Лучший дом, лучший двор',
      projectId: 'housing-school',
      scheduledAt: new Date('2026-06-02T15:00:00.000Z'),
      myApplication: {
        title: 'Цветущий двор',
        nomination: '«Благоустройство»',
        votes: 9,
        imageUrl: applicationImageDataUrl,
        award: { place: 1 },
      },
      myVotes: null,
    },
    {
      id: 'best-photo',
      title: 'Лучшее фото кота',
      projectId: 'digital-portal',
      scheduledAt: new Date('2026-06-10T12:00:00.000Z'),
      myApplication: null,
      myVotes: {
        byNomination: [
          {
            nomination: '«Город и люди»',
            applicationTitles: ['Вечерний сквер'],
          },
          {
            nomination: '«Природа рядом»',
            applicationTitles: ['Утро на набережной'],
          },
        ],
      },
    },
  ]

  return (
    <div className="space-y-4">
      {contests.map((contest) => (
          <div
            key={contest.title}
            className="rounded-2xl border border-zinc-200 bg-white p-6"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <Link
                  to={`/conest/${contest.id}`}
                  className="rounded-md text-sm font-semibold text-zinc-900 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
                >
                  {contest.title}
                </Link>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-zinc-600">
                  <ProjectBadge projectId={contest.projectId} />
                  <span className="text-zinc-400">•</span>
                  <span>{contest.scheduledAt.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-12">
              {contest.myApplication ? (
                <section
                  className={`rounded-xl border p-4 ${
                    contest.myVotes ? 'lg:col-span-7' : 'lg:col-span-12'
                  } ${
                    contest.myApplication.award?.place === 1
                      ? 'border-emerald-200 bg-emerald-50/40 ring-1 ring-emerald-200/50'
                      : 'border-zinc-200 bg-zinc-50/50'
                  }`}
                >
                  <div className="text-sm font-semibold text-zinc-900">
                    Моя заявка
                  </div>
                  <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                    <img
                      src={contest.myApplication.imageUrl}
                      alt="Изображение заявки"
                      className="h-24 w-36 rounded-lg border border-zinc-200 object-cover"
                      loading="lazy"
                    />
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <Link
                          to={`/lk/contests/${contest.id}/application`}
                          className="rounded-md text-sm font-medium text-zinc-900 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
                        >
                          {contest.myApplication.title}
                        </Link>
                        {contest.myApplication.award?.place === 1 ? (
                          <div className="inline-flex w-fit items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-900">
                            <svg
                              viewBox="0 0 24 24"
                              width="14"
                              height="14"
                              aria-hidden="true"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M8 4h8v3a4 4 0 0 1-8 0V4Z" />
                              <path d="M8 7H6a3 3 0 0 0 3 3" />
                              <path d="M16 7h2a3 3 0 0 1-3 3" />
                              <path d="M12 14v3" />
                              <path d="M9 20h6" />
                              <path d="M10 17h4" />
                            </svg>
                            Победитель · 1 место
                          </div>
                        ) : null}
                        {contest.myApplication.status === 'moderation' ? (
                          <div className="inline-flex w-fit items-center rounded-full border border-amber-200 bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-900">
                            На модерации
                          </div>
                        ) : null}
                      </div>
                      <div className="mt-1 text-xs text-zinc-600">
                        Номинация:{' '}
                        <span className="font-medium">
                          {contest.myApplication.nomination}
                        </span>
                      </div>
                      <div className="mt-2 inline-flex items-center rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-semibold text-zinc-900">
                        Голосов: {contest.myApplication.votes}
                      </div>
                    </div>
                  </div>
                </section>
              ) : null}

              {contest.myVotes ? (
                <section
                  className={`rounded-xl border border-zinc-200 bg-zinc-50/50 p-4 ${
                    contest.myApplication
                      ? 'lg:col-span-5'
                      : 'lg:col-span-12'
                  }`}
                >
                  {(() => {
                    const groups = contest.myVotes.byNomination
                    const isExpanded = Boolean(expandedVotes[contest.id])
                    const visible = isExpanded ? groups : groups.slice(0, 2)
                    const rest = groups.slice(2)

                    return (
                      <>
                        <div className="flex items-start justify-between gap-2">
                          <div className="text-sm font-semibold text-zinc-900">
                            Мои голоса
                          </div>
                          {groups.length > 2 ? (
                            <button
                              type="button"
                              className="rounded-md px-2 py-1 text-xs font-semibold text-zinc-700 hover:bg-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
                              aria-expanded={isExpanded}
                              onClick={() =>
                                setExpandedVotes((s) => ({
                                  ...s,
                                  [contest.id]: !isExpanded,
                                }))
                              }
                            >
                              {isExpanded
                                ? 'Свернуть'
                                : `Смотреть все (${groups.length})`}
                            </button>
                          ) : null}
                        </div>

                        <div className="mt-3 space-y-2">
                          {visible.map((group) => (
                            <div key={group.nomination} className="space-y-1">
                              <div className="text-xs font-semibold text-zinc-900">
                                Номинация: {group.nomination}
                              </div>
                              {group.applicationTitles.map((title) => (
                                <div
                                  key={`${group.nomination}:${title}`}
                                  className="text-sm text-zinc-700"
                                  title={fullName}
                                >
                                  {title}
                                </div>
                              ))}
                              <div className="border-t border-zinc-200" />
                            </div>
                          ))}
                        </div>

                        {isExpanded && rest.length > 0 ? (
                          <div className="mt-2 space-y-2">
                            {rest.map((group) => (
                              <div key={group.nomination} className="space-y-1">
                                <div className="text-xs font-semibold text-zinc-900">
                                  Номинация: {group.nomination}
                                </div>
                                {group.applicationTitles.map((title) => (
                                  <div
                                    key={`${group.nomination}:${title}`}
                                    className="text-sm text-zinc-700"
                                    title={fullName}
                                  >
                                    {title}
                                  </div>
                                ))}
                                <div className="border-t border-zinc-200" />
                              </div>
                            ))}
                          </div>
                        ) : null}
                      </>
                    )
                  })()}
                </section>
              ) : null}
            </div>
          </div>
        ))}

      <section className="rounded-2xl border border-dashed border-zinc-300 bg-white p-6">
        <div className="text-sm text-zinc-600">
          Вы пока не участвовали ни в одном конкурсе. После подачи заявки или
          голосования информация появится здесь автоматически.
        </div>
      </section>
    </div>
  )
}

