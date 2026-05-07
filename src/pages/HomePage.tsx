import { Link } from 'react-router-dom'
import { projects } from '../data/projects'

export function HomePage() {
  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          Проекты партии
        </h1>
        <p className="max-w-2xl text-sm text-zinc-600">
          Вайрфрейм: список проектов, страницы проектов и конкурсов, заявки и
          голосование.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link
            key={project.id}
            to={`/${project.id}`}
            className="group rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="text-sm font-semibold text-zinc-900">
                  {project.title}
                </div>
                <div className="text-xs text-zinc-500">{project.id}</div>
              </div>
              <div className="text-xs text-zinc-500 transition group-hover:text-zinc-700">
                Открыть →
              </div>
            </div>

            <p className="mt-3 text-sm text-zinc-600">{project.summary}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-zinc-100 px-2 py-1 text-xs text-zinc-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

