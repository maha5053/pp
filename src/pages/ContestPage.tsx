import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Modal } from '../components/Modal'
import { getContestById } from '../data/projects'
import { useContestApplications } from '../features/applications/useContestApplications'
import { useContestVotes } from '../features/voting/useContestVotes'
import type { Application } from '../types'

export function ContestPage() {
  const { projectId, contestId } = useParams()
  const [applyOpen, setApplyOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const safeProjectId = projectId ?? ''
  const safeContestId = contestId ?? ''

  const contest = useMemo(() => {
    if (!projectId || !contestId) return undefined
    return getContestById(projectId, contestId)
  }, [projectId, contestId])

  const { applications: userApplications, addApplication } =
    useContestApplications(safeProjectId, safeContestId)

  const { hasVoted, toggleVote } = useContestVotes(
    safeProjectId,
    safeContestId,
  )

  const approvedApplications = useMemo(() => {
    const seed = contest?.applications ?? []
    const all = [...userApplications, ...seed]
    return all.filter((a) => a.approved)
  }, [contest?.applications, userApplications])

  const [form, setForm] = useState({
    authorName: '',
    title: '',
    description: '',
  })

  function onSubmit() {
    if (!projectId || !contestId) return
    if (!form.authorName.trim() || !form.title.trim() || !form.description.trim())
      return

    const id =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `u-${Date.now()}`

    const application: Application = {
      id,
      authorName: form.authorName.trim(),
      title: form.title.trim(),
      description: form.description.trim(),
      createdAt: new Date().toISOString(),
      approved: false,
      seedVotes: 0,
    }

    addApplication(application)
    setSubmitted(true)
    setApplyOpen(false)
    setForm({ authorName: '', title: '', description: '' })
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-zinc-600">
        <Link
          to={`/${projectId}`}
          className="rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
        >
          ← Назад к проекту
        </Link>
        <span className="text-zinc-400">/</span>
        <span className="text-zinc-900">{contestId}</span>
      </div>

      {!contest ? (
        <header className="rounded-2xl border border-zinc-200 bg-white p-6">
          <h1 className="text-xl font-semibold tracking-tight">
            Конкурс не найден
          </h1>
          <p className="mt-1 text-sm text-zinc-600">
            Проверьте адрес: <span className="font-mono">{contestId}</span>
          </p>
        </header>
      ) : (
        <header className="rounded-2xl border border-zinc-200 bg-white p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              {contest.title}
            </h1>
            <p className="mt-1 text-sm text-zinc-600">
              {contest.summary}
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
            onClick={() => {
              setSubmitted(false)
              setApplyOpen(true)
            }}
          >
            {contest.ctaLabel}
          </button>
        </div>
      </header>
      )}

      <section className="grid gap-6 lg:grid-cols-12">
        <div className="space-y-3 rounded-2xl border border-zinc-200 bg-white p-6 lg:col-span-7">
          <h2 className="text-base font-semibold tracking-tight">
            Описание конкурса
          </h2>
          <p className="text-sm text-zinc-600">
            {contest?.description ??
              'Описание недоступно (конкурс не найден).'}
          </p>

          {submitted ? (
            <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-950">
              Заявка отправлена и ждёт модерации. В списке ниже отображаются
              только одобренные заявки.
            </div>
          ) : null}
        </div>

        <div className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 lg:col-span-5">
          <h2 className="text-base font-semibold tracking-tight">
            Одобренные заявки
          </h2>
          {approvedApplications.length === 0 ? (
            <p className="text-sm text-zinc-600">
              Пока нет одобренных заявок.
            </p>
          ) : (
            <div className="space-y-3">
              {approvedApplications.map((app) => {
                const voted = hasVoted(app.id)
                const votes = app.seedVotes + (voted ? 1 : 0)

                return (
                  <article
                    key={app.id}
                    className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold text-zinc-900">
                          {app.title}
                        </div>
                        <div className="mt-0.5 text-xs text-zinc-600">
                          Автор: <span className="font-medium">{app.authorName}</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        className={`shrink-0 rounded-lg px-3 py-2 text-sm font-medium shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20 ${
                          voted
                            ? 'bg-zinc-900 text-white hover:bg-zinc-800'
                            : 'bg-white text-zinc-900 hover:bg-zinc-50 border border-zinc-200'
                        }`}
                        onClick={() => toggleVote(app.id)}
                      >
                        {voted ? 'Голос учтён' : 'Голосовать'}
                        <span className="ml-2 text-xs opacity-80">({votes})</span>
                      </button>
                    </div>

                    <p className="mt-2 text-sm text-zinc-700">{app.description}</p>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </section>

      <Modal
        title="Подать заявку"
        open={applyOpen}
        onClose={() => setApplyOpen(false)}
      >
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            onSubmit()
          }}
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="space-y-1">
              <div className="text-xs font-medium text-zinc-700">Ваше имя</div>
              <input
                value={form.authorName}
                onChange={(e) =>
                  setForm((s) => ({ ...s, authorName: e.target.value }))
                }
                className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
                placeholder="Например, Анна"
              />
            </label>

            <label className="space-y-1">
              <div className="text-xs font-medium text-zinc-700">Название</div>
              <input
                value={form.title}
                onChange={(e) =>
                  setForm((s) => ({ ...s, title: e.target.value }))
                }
                className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
                placeholder="Коротко и по делу"
              />
            </label>
          </div>

          <label className="space-y-1">
            <div className="text-xs font-medium text-zinc-700">Описание</div>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm((s) => ({ ...s, description: e.target.value }))
              }
              className="min-h-28 w-full resize-y rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
              placeholder="Что вы предлагаете и какой будет эффект?"
            />
          </label>

          <div className="flex flex-wrap items-center justify-end gap-2">
            <button
              type="button"
              className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
              onClick={() => setApplyOpen(false)}
            >
              Отмена
            </button>
            <button
              type="submit"
              className="rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={
                !form.authorName.trim() ||
                !form.title.trim() ||
                !form.description.trim()
              }
            >
              Отправить
            </button>
          </div>
        </form>
      </Modal>
    </section>
  )
}

