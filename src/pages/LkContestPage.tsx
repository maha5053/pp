import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ProjectBadge } from '../components/ProjectBadge'
import { useSession } from '../features/auth/useSession'
import { readProfile } from '../features/profile/profile'

type ContestMock = {
  id: string
  title: string
  projectId: string
  scheduledAt: Date
  summary: string
  description: string
  stages?: Array<{
    label: string
    date: string
  }>
  nominations?: string[]
  applications?: Array<{
    id: string
    title: string
    nomination: string
    author: string
    likes: number
  }>
  organizer?: string
  partners?: string[]
  myApplication:
    | null
    | {
        title: string
        nomination: string
        votes: number
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

const mocks: ContestMock[] = [
  {
    id: 'kids-drawing',
    title: 'Детский рисунок',
    projectId: 'kids-sport',
    scheduledAt: new Date('2026-05-20T12:00:00.000Z'),
    summary:
      'Конкурс детских рисунков о спорте, дворе и командном духе. Участвуйте, голосуйте и поддерживайте лучшие работы.',
    description:
      'Описание (wireframe): принимаются рисунки в разных техниках. Оценка проходит по номинациям. Количество победителей в каждой номинации определяется решением организационного комитета.',
    stages: [
      { label: 'Старт конкурса', date: '27 апреля' },
      { label: 'Окончание приема заявок', date: '8 мая' },
      { label: 'Определение победителей', date: '23 мая' },
      { label: 'Награждение победителей', date: '30 мая' },
    ],
    nominations: [
      'Лучшее животное',
      'Лучшая собака',
      'Лучший кот',
      'Мой спортивный день',
      'Командная игра',
      'Спорт и дружба',
      'Семейный спорт',
      'Сила воли',
      'Победа',
      'Честная игра',
    ],
    applications: [
      {
        id: 'a1',
        title: 'Спорт в моём дворе',
        nomination: 'Мой спортивный день',
        author: 'Тестовый1 Алексей Борисович',
        likes: 1,
      },
      {
        id: 'a2',
        title: 'Футбол для всех',
        nomination: 'Командная игра',
        author: 'Тестовый1 Алексей Борисович',
        likes: 0,
      },
      {
        id: 'a3',
        title: 'Команда на старте',
        nomination: 'Спорт и дружба',
        author: 'Тестовый1 Алексей Борисович',
        likes: 2,
      },
    ],
    organizer: 'Российское движение детей и молодежи «Движение первых»',
    partners: ['VK', 'Positive Technologies', 'АО «ЭР-ТЕЛЕКОМ ХОЛДИНГ»'],
    myApplication: {
      title: 'Спорт в моём дворе',
      nomination: '«Мой спортивный день»',
      votes: 17,
      status: 'moderation',
    },
    myVotes: {
      byNomination: [
        { nomination: '«Мой спортивный день»', applicationTitles: ['Спорт в моём дворе'] },
        { nomination: '«Командная игра»', applicationTitles: ['Футбол для всех'] },
        { nomination: '«Спорт и дружба»', applicationTitles: ['Команда на старте'] },
        { nomination: '«Семейный спорт»', applicationTitles: ['Выходные вместе'] },
        { nomination: '«Сила воли»', applicationTitles: ['Последний рывок'] },
        { nomination: '«Победа»', applicationTitles: ['Финишная лента'] },
        { nomination: '«Честная игра»', applicationTitles: ['Игра по правилам'] },
        { nomination: '«Мой тренер»', applicationTitles: ['Совет наставника'] },
        { nomination: '«Школьная секция»', applicationTitles: ['После уроков'] },
        { nomination: '«Спортивный двор»', applicationTitles: ['Турник у дома'] },
      ],
    },
  },
  {
    id: 'best-home-yard',
    title: 'Лучший дом, лучший двор',
    projectId: 'housing-school',
    scheduledAt: new Date('2026-06-02T15:00:00.000Z'),
    summary:
      'Конкурс инициатив по благоустройству: дом, двор, сервис и коммуникация.',
    description:
      'Описание (wireframe): подайте заявку с описанием улучшений. После модерации заявки участвуют в голосовании.',
    stages: [
      { label: 'Старт конкурса', date: '12 мая' },
      { label: 'Окончание приема заявок', date: '2 июня' },
      { label: 'Определение победителей', date: '10 июня' },
      { label: 'Награждение победителей', date: '15 июня' },
    ],
    nominations: [
      'Благоустройство',
      'Чистый подъезд',
      'Двор для детей',
      'Освещение',
      'Сервис и коммуникация',
      'Зелёная зона',
    ],
    applications: [
      {
        id: 'hs-1',
        title: 'Цветущий двор',
        nomination: 'Благоустройство',
        author: 'Ирина В.',
        likes: 9,
      },
      {
        id: 'hs-2',
        title: 'Светлый подъезд',
        nomination: 'Чистый подъезд',
        author: 'Павел С.',
        likes: 5,
      },
      {
        id: 'hs-3',
        title: 'Двор без ям',
        nomination: 'Освещение',
        author: 'Наталья К.',
        likes: 7,
      },
    ],
    organizer: 'Организационный комитет конкурса',
    partners: ['Городской портал', 'УК «Пример»', 'Волонтёры ЖКХ'],
    myApplication: {
      title: 'Цветущий двор',
      nomination: '«Благоустройство»',
      votes: 9,
      award: { place: 1 },
    },
    myVotes: null,
  },
  {
    id: 'best-photo',
    title: 'Лучшее фото кота',
    projectId: 'digital-portal',
    scheduledAt: new Date('2026-06-10T12:00:00.000Z'),
    summary:
      'Фотоконкурс: выбирайте лучшие кадры и поддерживайте участников голосами.',
    description:
      'Описание (wireframe): заявки публикуются после модерации. Голосование доступно авторизованным пользователям.',
    stages: [
      { label: 'Старт конкурса', date: '1 июня' },
      { label: 'Окончание приема заявок', date: '10 июня' },
      { label: 'Определение победителей', date: '20 июня' },
      { label: 'Награждение победителей', date: '25 июня' },
    ],
    nominations: [
      'Кот в кадре',
      'Сонный кот',
      'Кот-исследователь',
      'Кот и человек',
      'Самый смешной момент',
    ],
    applications: [
      {
        id: 'cat-1',
        title: 'Утро на подоконнике',
        nomination: 'Сонный кот',
        author: 'Антон М.',
        likes: 12,
      },
      {
        id: 'cat-2',
        title: 'Проверка пакета',
        nomination: 'Кот-исследователь',
        author: 'Мария К.',
        likes: 8,
      },
      {
        id: 'cat-3',
        title: 'Главный в доме',
        nomination: 'Кот и человек',
        author: 'Елена П.',
        likes: 15,
      },
    ],
    organizer: 'Проекты Партии',
    partners: ['VK', 'Кортекс', 'Фотоклуб'],
    myApplication: null,
    myVotes: {
      byNomination: [
        { nomination: '«Город и люди»', applicationTitles: ['Вечерний сквер'] },
        { nomination: '«Природа рядом»', applicationTitles: ['Утро на набережной'] },
      ],
    },
  },
]

export function LkContestPage() {
  const { contestId } = useParams()
  const { session } = useSession()
  if (!session) return null

  const profile = useMemo(() => readProfile(session.phone), [session.phone])
  void profile
  const [applicationsFilter, setApplicationsFilter] = useState<'all'>('all')

  const contest = mocks.find((c) => c.id === contestId)
  if (!contest) {
    return (
      <div className="rounded-2xl border border-zinc-200 bg-white p-6">
        <div className="text-sm font-semibold text-zinc-900">Конкурс не найден</div>
        <div className="mt-1 text-sm text-zinc-600">
          Проверьте адрес: <span className="font-mono">{contestId}</span>
        </div>
        <div className="mt-4">
          <Link
            to="/lk/contests"
            className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
          >
            ← Назад к конкурсам
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-xs font-semibold text-zinc-500">Конкурс</div>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-900">
            {contest.title}
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-zinc-600">{contest.summary}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
          >
            Принять участие
          </button>
          <Link
            to="/lk/contests"
            className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
          >
            ← Назад
          </Link>
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-6">
        <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-600">
          <ProjectBadge projectId={contest.projectId} />
          <span className="text-zinc-400">•</span>
          <span>Конкурс идет</span>
          <span className="text-zinc-400">•</span>
          <span>{contest.scheduledAt.toLocaleString()}</span>
        </div>

        {contest.stages?.length ? (
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {contest.stages.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-4"
              >
                <div className="text-xs font-semibold text-zinc-500">{s.label}</div>
                <div className="mt-2 text-sm font-semibold text-zinc-900">{s.date}</div>
              </div>
            ))}
          </div>
        ) : null}

        <div className="mt-5 text-sm text-zinc-700">{contest.description}</div>
      </div>

      {contest.nominations?.length ? (
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="text-sm font-semibold text-zinc-900">Номинации конкурса</div>
          <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {contest.nominations.map((n) => (
              <div
                key={n}
                className="rounded-xl border border-zinc-200 bg-zinc-50/50 px-3 py-2 text-sm font-medium text-zinc-900"
              >
                {n}
              </div>
            ))}
          </div>
          <div className="mt-4 text-xs text-zinc-600">
            Количество победителей в каждой номинации определяется решением организационного комитета.
          </div>
        </div>
      ) : null}

      {contest.applications?.length ? (
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="text-sm font-semibold text-zinc-900">Поданные заявки</div>
              <div className="mt-1 text-sm text-zinc-600">
                {contest.applications.length} {contest.applications.length === 1 ? 'заявка' : 'заявки(ок)'}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className={`rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20 ${
                  applicationsFilter === 'all'
                    ? 'bg-zinc-900 text-white'
                    : 'border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50'
                }`}
                onClick={() => setApplicationsFilter('all')}
              >
                Все заявки
              </button>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            {contest.applications.map((a) => (
              <div
                key={a.id}
                className="rounded-2xl border border-zinc-200 bg-white p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-zinc-900">{a.title}</div>
                    <div className="mt-1 text-xs text-zinc-600">
                      <span className="font-medium text-zinc-900">{a.nomination}</span>
                      <span className="text-zinc-400"> • </span>
                      <span>{a.author}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-2 py-1 text-xs font-semibold text-zinc-700">
                      <span aria-hidden="true">❤</span>
                      {a.likes}
                    </div>
                    <button
                      type="button"
                      className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-900 shadow-sm transition hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
                    >
                      Подробнее
                    </button>
                    <button
                      type="button"
                      className="rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
                    >
                      Авторизоваться для голосования
                    </button>
                  </div>
                </div>

                <div className="mt-3 text-xs text-zinc-600">
                  Чтобы проголосовать, нужно авторизоваться.
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {contest.organizer ? (
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="text-sm font-semibold text-zinc-900">Организатор</div>
          <div className="mt-2 text-sm text-zinc-700">{contest.organizer}</div>
        </div>
      ) : null}

      {contest.partners?.length ? (
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="text-sm font-semibold text-zinc-900">Партнеры</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {contest.partners.map((p) => (
              <div
                key={p}
                className="rounded-full border border-zinc-200 bg-zinc-50/50 px-3 py-1.5 text-sm font-medium text-zinc-800"
              >
                {p}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}

