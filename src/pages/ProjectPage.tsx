import { Link, useParams } from 'react-router-dom'
import { getProjectById } from '../data/projects'

export function ProjectPage() {
  const { projectId } = useParams()
  const project = projectId ? getProjectById(projectId) : undefined

  return (
    <div className="space-y-8">
      {!project ? (
        <section className="rounded-2xl border border-zinc-200 bg-white p-6">
          <h1 className="text-xl font-semibold tracking-tight">
            Проект не найден
          </h1>
          <p className="mt-1 text-sm text-zinc-600">
            Проверьте адрес: <span className="font-mono">{projectId}</span>
          </p>
          <div className="mt-4">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
            >
              На главную
            </Link>
          </div>
        </section>
      ) : (
        <>
          <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
            <div className="h-36 bg-gradient-to-br from-zinc-950 via-zinc-800 to-zinc-700" />
            <div className="space-y-3 p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
                    {project.banner.headline}
                  </h1>
                  {project.banner.subhead ? (
                    <p className="mt-1 text-sm text-zinc-600">
                      {project.banner.subhead}
                    </p>
                  ) : null}
                </div>
                {project.contests[0] ? (
                  <Link
                    to={`/${project.id}/contests/${project.contests[0].id}`}
                    className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
                  >
                    Открыть конкурс
                  </Link>
                ) : null}
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-zinc-100 px-2 py-1 text-xs text-zinc-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-12">
            <div className="space-y-3 rounded-2xl border border-zinc-200 bg-white p-6 lg:col-span-7">
              <h2 className="text-base font-semibold tracking-tight">
                О проекте
              </h2>
              <p className="text-sm text-zinc-600">{project.about}</p>
            </div>

            <div className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 lg:col-span-5">
              <div>
                <h2 className="text-base font-semibold tracking-tight">
                  Ответственные лица
                </h2>
                <p className="mt-1 text-sm text-zinc-600">
                  Контакты/ссылки можно добавить позже — сейчас важно увидеть
                  структуру.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {project.people.map((person) => (
                  <div
                    key={person.id}
                    className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50/50 p-3"
                  >
                    <img
                      src={person.photoUrl}
                      alt={person.name}
                      className="h-10 w-10 rounded-full object-cover"
                      loading="lazy"
                    />
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium text-zinc-900">
                        {person.name}
                      </div>
                      <div className="truncate text-xs text-zinc-600">
                        {person.role}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6">
              <h2 className="text-base font-semibold tracking-tight">Новости</h2>
              <div className="space-y-3">
                {project.news.map((item) => (
                  <article key={item.id} className="space-y-1">
                    <div className="text-sm font-medium text-zinc-900">
                      {item.title}
                    </div>
                    <div className="text-xs text-zinc-600">{item.summary}</div>
                  </article>
                ))}
              </div>
            </div>

            <div className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6">
              <h2 className="text-base font-semibold tracking-tight">Конкурсы</h2>
              <div className="space-y-3">
                {project.contests.map((contest) => (
                  <Link
                    key={contest.id}
                    to={`/${project.id}/contests/${contest.id}`}
                    className="block rounded-xl border border-zinc-200 bg-zinc-50/50 p-3 transition hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
                  >
                    <div className="text-sm font-medium text-zinc-900">
                      {contest.title}
                    </div>
                    <div className="mt-1 text-xs text-zinc-600">
                      {contest.summary}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6">
              <h2 className="text-base font-semibold tracking-tight">Диктанты</h2>
              <div className="space-y-3">
                {project.dictations.map((item) => (
                  <article key={item.id} className="space-y-1">
                    <div className="text-sm font-medium text-zinc-900">
                      {item.title}
                    </div>
                    <div className="text-xs text-zinc-600">{item.summary}</div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

    </div>
  )
}

