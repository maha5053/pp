import { NavLink, Navigate, Outlet } from 'react-router-dom'
import { useSession } from '../features/auth/useSession'

const tabBase =
  'inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20'

export function LkLayout() {
  const { session, isAuthed } = useSession()

  if (!isAuthed || !session) return <Navigate to="/lk/login" replace />

  return (
    <section className="space-y-6">
      <header className="space-y-3">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Личный кабинет
            </h1>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <NavLink
            to="/lk/profile"
            className={({ isActive }) =>
              `${tabBase} ${
                isActive
                  ? 'bg-zinc-900 text-white shadow-sm'
                  : 'border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50'
              }`
            }
          >
            Профиль
          </NavLink>
          <NavLink
            to="/lk/dictations"
            className={({ isActive }) =>
              `${tabBase} ${
                isActive
                  ? 'bg-zinc-900 text-white shadow-sm'
                  : 'border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50'
              }`
            }
          >
            Диктанты
          </NavLink>
          <NavLink
            to="/lk/surveys"
            className={({ isActive }) =>
              `${tabBase} ${
                isActive
                  ? 'bg-zinc-900 text-white shadow-sm'
                  : 'border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50'
              }`
            }
          >
            Опросы
          </NavLink>
          <NavLink
            to="/lk/contests"
            className={({ isActive }) =>
              `${tabBase} ${
                isActive
                  ? 'bg-zinc-900 text-white shadow-sm'
                  : 'border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50'
              }`
            }
          >
            Конкурсы
          </NavLink>
        </div>
      </header>

      <Outlet />
    </section>
  )
}

