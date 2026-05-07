import { Link, useNavigate } from 'react-router-dom'
import { useSession } from '../features/auth/useSession'
import { readProfile } from '../features/profile/profile'

export function Header() {
  const { isAuthed, session, logout } = useSession()
  const navigate = useNavigate()
  const profileName =
    session?.phone ? readProfile(session.phone)?.fullName?.trim() : undefined
  const userLabel = profileName || session?.phone || 'Пользователь'

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

