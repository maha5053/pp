import { Link, useMatches, useNavigate } from 'react-router-dom'

export type Crumb = {
  label: string
  to?: string
}

type MatchWithHandle = {
  pathname: string
  handle?: {
    crumb?: (match: unknown) => Crumb | Crumb[] | null | undefined
    hideBreadcrumbs?: boolean
  }
}

export function Breadcrumbs() {
  const navigate = useNavigate()
  const matches = useMatches() as unknown as MatchWithHandle[]

  const shouldHide = matches.some((m) => m.handle?.hideBreadcrumbs)
  if (shouldHide) return null

  const crumbs: Crumb[] = matches.flatMap((m) => {
    const out = m.handle?.crumb?.(m)
    if (!out) return []
    return Array.isArray(out) ? out : [out]
  })

  const canGoBack =
    typeof window !== 'undefined' ? window.history.length > 1 : false

  return (
    <div className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-2">
      <a
        href="/"
        className="rounded-md px-1 py-1 text-sm font-medium text-zinc-700 hover:text-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
        aria-label="Назад"
        title="Назад"
        onClick={(e) => {
          e.preventDefault()
          if (canGoBack) navigate(-1)
          else navigate('/', { replace: true })
        }}
      >
        &larr;
      </a>

      <nav aria-label="Хлебные крошки" className="min-w-0">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-zinc-600">
          {crumbs.map((c, idx) => {
            const isLast = idx === crumbs.length - 1
            return (
              <li key={`${c.label}-${idx}`} className="flex items-center gap-2">
                {idx > 0 ? <span className="text-zinc-300">/</span> : null}
                {c.to && !isLast ? (
                  <Link
                    to={c.to}
                    className="max-w-[60vw] truncate rounded-md underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
                    title={c.label}
                  >
                    {c.label}
                  </Link>
                ) : (
                  <span
                    className="max-w-[60vw] truncate text-zinc-900"
                    title={c.label}
                  >
                    {c.label}
                  </span>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </div>
  )
}

