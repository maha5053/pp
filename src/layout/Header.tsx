import { useEffect, useId, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSession } from '../features/auth/useSession'
import { readProfile } from '../features/profile/profile'
import { lkContests } from '../data/lkContests'

type HeaderNotification = {
  id: string
  isRead: boolean
  createdAt: string
  title: string
  contestTitle: string
  to: string
  nominationTitle?: string
  applicationTitle?: string
}

export function Header() {
  const { isAuthed, session, logout } = useSession()
  const navigate = useNavigate()
  const profileName =
    session?.phone ? readProfile(session.phone)?.fullName?.trim() : undefined
  const userLabel = profileName || session?.phone || 'Пользователь'
  const notificationsButtonId = useId()
  const notificationsPanelId = useId()
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const exampleContest = useMemo(() => lkContests[0], [])
  const exampleContest2 = useMemo(() => lkContests[1], [])
  const exampleContest3 = useMemo(() => lkContests[2], [])

  const formatNotificationDateTime = (value: string) => {
    const d = new Date(value)
    return d.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const initialNotifications = useMemo<HeaderNotification[]>(() => {
    const winnerContest =
      lkContests.find((c) => c.myApplication?.award?.place === 1) ??
      lkContests.find((c) => c.myApplication) ??
      lkContests[1]

    const approvedContest =
      lkContests.find((c) => c.id === 'best-photo') ??
      lkContests.find((c) => c.myApplication?.status === 'approved') ??
      lkContests.find((c) => c.myApplication) ??
      lkContests[2]

    return [
      {
        id: 'n1',
        isRead: false,
        createdAt: '2026-05-07T12:25:00.000Z',
        title: 'Ваша заявка одобрена',
        contestTitle: exampleContest?.title ?? 'Конкурс',
        nominationTitle: exampleContest?.myApplication?.nomination,
        applicationTitle: exampleContest?.myApplication?.title,
        to: `/conest/${exampleContest?.id ?? ''}`,
      },
      {
        id: 'n-win',
        isRead: false,
        createdAt: '2026-05-07T12:31:00.000Z',
        title: 'Ваша заявка победила в конкурсе',
        contestTitle: winnerContest?.title ?? 'Конкурс',
        nominationTitle: winnerContest?.myApplication?.nomination,
        applicationTitle: winnerContest?.myApplication?.title,
        to: `/conest/${winnerContest?.id ?? ''}`,
      },
      {
        id: 'n-approved',
        isRead: true,
        createdAt: '2026-05-06T09:10:00.000Z',
        title: 'Ваша заявка одобрена',
        contestTitle: approvedContest?.title ?? 'Конкурс',
        nominationTitle: approvedContest?.myApplication?.nomination,
        applicationTitle: approvedContest?.myApplication?.title,
        to: `/conest/${approvedContest?.id ?? ''}`,
      },
    ]
  }, [exampleContest, exampleContest2, exampleContest3])

  const [notifications, setNotifications] =
    useState<HeaderNotification[]>(initialNotifications)

  const markNotificationRead = (id: string) => {
    setNotifications((list) =>
      list.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    )
  }

  const hasUnreadNotifications = notifications.some((n) => !n.isRead)

  useEffect(() => {
    if (!isNotificationsOpen) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsNotificationsOpen(false)
    }
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      const panel = document.getElementById(notificationsPanelId)
      const button = document.getElementById(notificationsButtonId)
      if (!panel || !button) return

      if (panel.contains(target) || button.contains(target)) return
      setIsNotificationsOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [isNotificationsOpen, notificationsButtonId, notificationsPanelId])

  return (
    <header className="sticky top-0 z-10 border-b border-zinc-200/70 bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link
          to="/"
          className="rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
          aria-label="На главную"
        >
          <img
            src="/er-logo.png"
            alt="Единая Россия"
            className="h-16 w-auto"
            loading="eager"
          />
        </Link>

        {!isAuthed ? (
          <Link
            to="/lk/login"
            className="inline-flex items-center justify-center rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-900 shadow-sm transition hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
          >
            Войти
          </Link>
        ) : (
          <div className="flex items-center gap-1">
            <Link
              to="/lk/profile"
              className="max-w-[52vw] truncate rounded-lg px-3 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
              title={userLabel}
            >
              {userLabel}
            </Link>
            <div className="relative">
              <button
                id={notificationsButtonId}
                type="button"
                className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
                aria-label="Уведомления"
                title="Уведомления"
                aria-haspopup="menu"
                aria-expanded={isNotificationsOpen}
                aria-controls={notificationsPanelId}
                onClick={() => setIsNotificationsOpen((v) => !v)}
              >
                {hasUnreadNotifications ? (
                  <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
                ) : null}
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 8a6 6 0 10-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
                  <path d="M13.73 21a2 2 0 01-3.46 0" />
                </svg>
              </button>

              {isNotificationsOpen ? (
                <div
                  id={notificationsPanelId}
                  role="menu"
                  aria-labelledby={notificationsButtonId}
                  className="absolute right-0 mt-2 w-[min(360px,calc(100vw-2rem))] overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg"
                >
                  <div className="flex items-center justify-between gap-3 border-b border-zinc-100 px-4 py-3">
                    <div className="text-sm font-semibold text-zinc-900">
                      Уведомления
                    </div>
                    <button
                      type="button"
                      className="rounded-md px-2 py-1 text-xs font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
                      onClick={() => setIsNotificationsOpen(false)}
                    >
                      Закрыть
                    </button>
                  </div>

                  <div className="px-2 py-2">
                    <div className="grid gap-1">
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          role="group"
                          className={[
                            'block cursor-pointer rounded-lg px-3 py-2 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20',
                            n.isRead
                              ? 'hover:bg-zinc-50'
                              : 'bg-zinc-50 hover:bg-zinc-100',
                          ].join(' ')}
                          onClick={() => markNotificationRead(n.id)}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div
                              className={[
                                'text-sm font-medium',
                                n.isRead ? 'text-zinc-800' : 'text-zinc-900',
                              ].join(' ')}
                            >
                              {n.title}
                            </div>
                            {n.isRead ? (
                              <span className="mt-0.5 shrink-0 rounded-full border border-zinc-200 bg-white px-2 py-0.5 text-[11px] font-medium text-zinc-500">
                                Прочитано
                              </span>
                            ) : (
                              <span className="mt-1 shrink-0 h-2 w-2 rounded-full bg-rose-500" />
                            )}
                          </div>
                          {'createdAt' in n && n.createdAt ? (
                            <div className="mt-0.5 text-xs text-zinc-500">
                              {formatNotificationDateTime(n.createdAt)}
                            </div>
                          ) : null}
                          <div
                            className={[
                              'mt-0.5 text-sm',
                              n.isRead ? 'text-zinc-600' : 'text-zinc-700',
                            ].join(' ')}
                          >
                            <Link
                              to={n.to}
                              role="menuitem"
                              className="rounded-md font-medium underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
                              onClick={() => {
                                markNotificationRead(n.id)
                                setIsNotificationsOpen(false)
                              }}
                            >
                              {n.contestTitle}
                            </Link>
                          </div>
                          {'applicationTitle' in n && n.applicationTitle ? (
                            <div className="mt-0.5 text-sm text-zinc-600">
                              Заявка:{' '}
                              <span className="font-medium text-zinc-700">
                                {n.applicationTitle}
                              </span>
                            </div>
                          ) : null}
                          {'nominationTitle' in n && n.nominationTitle ? (
                            <div className="mt-0.5 text-sm text-zinc-600">
                              Номинация:{' '}
                              <span className="font-medium text-zinc-700">
                                {n.nominationTitle}
                              </span>
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
              aria-label="Выйти"
              title="Выйти"
              onClick={() => {
                logout()
                navigate('/', { replace: true })
              }}
            >
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10 7V6a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2v-1" />
                <path d="M3 12h12" />
                <path d="M11 8l4 4-4 4" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </header>
  )
}

