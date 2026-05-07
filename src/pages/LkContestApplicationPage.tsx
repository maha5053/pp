import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Modal } from '../components/Modal'
import { useSession } from '../features/auth/useSession'
import { readProfile } from '../features/profile/profile'
import { getProjectById } from '../data/projects'

const applicationImageDataUrl =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="720" height="480" viewBox="0 0 720 480">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#fafafa"/>
          <stop offset="1" stop-color="#f4f4f5"/>
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="720" height="480" rx="28" fill="url(#g)"/>
      <rect x="40" y="40" width="640" height="400" rx="20" fill="#ffffff" stroke="#e4e4e7"/>
      <path d="M140 340c52-86 118-112 196-80 38-54 98-86 168-96" fill="none" stroke="#a1a1aa" stroke-width="12" stroke-linecap="round"/>
      <circle cx="220" cy="170" r="28" fill="#d4d4d8"/>
      <text x="360" y="420" text-anchor="middle" font-family="system-ui, -apple-system, Segoe UI, Roboto, Arial" font-size="22" fill="#71717a">
        Эскиз изображения заявки
      </text>
    </svg>`,
  )

const essayDataUrl =
  'data:text/plain;charset=utf-8,' +
  encodeURIComponent(
    [
      'Эссе (wireframe)',
      '',
      'Тема: Почему я хочу участвовать в конкурсе',
      '',
      'Короткий текст, который можно скачать как файл.',
    ].join('\n'),
  )

type MediaItem =
  | { type: 'image'; src: string; alt: string }
  | { type: 'video'; src: string; posterSrc?: string; title: string }

type ContestApplicationMock = {
  contestId: string
  contestTitle: string
  projectId: string
  scheduledAt: Date
  submittedAt: Date
  region: string
  municipality: string
  applicationData: {
    address: string
    builtYear: number
    floors: number
    apartments: number
  }
  media: MediaItem[]
  essay: { fileName: string; href: string }
  mediaLinks: Array<{ title: string; href: string }>
  application: {
    title: string
    nomination: string
    votes: number
    description: string
    status?: 'moderation'
    award?: { place: 1 }
  }
}

const mocks: ContestApplicationMock[] = [
  {
    contestId: 'kids-drawing',
    contestTitle: 'Детский рисунок',
    projectId: 'kids-sport',
    scheduledAt: new Date('2026-05-20T12:00:00.000Z'),
    submittedAt: new Date('2026-05-18T09:40:00.000Z'),
    region: 'Ханты-Мансийский автономный округ — Югра',
    municipality: 'город-герой Волгоград',
    applicationData: {
      address: 'г. Химки, ул. Примерная, 12',
      builtYear: 1988,
      floors: 9,
      apartments: 110,
    },
    media: [
      { type: 'image', src: applicationImageDataUrl, alt: 'Рисунок участника — 1' },
      { type: 'image', src: applicationImageDataUrl, alt: 'Рисунок участника — 2' },
      {
        type: 'video',
        src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
        posterSrc: applicationImageDataUrl,
        title: 'Видео-презентация',
      },
    ],
    essay: { fileName: 'Эссе.txt', href: essayDataUrl },
    mediaLinks: [
      { title: 'Публикация в районной газете', href: 'https://example.com' },
      { title: 'Сюжет на городском портале', href: 'https://example.com' },
    ],
    application: {
      title: 'Спорт в моём дворе',
      nomination: '«Мой спортивный день»',
      votes: 17,
      description:
        'Короткое описание заявки (wireframe): идея рисунка про спортивный двор и командные игры.',
      status: 'moderation',
    },
  },
  {
    contestId: 'best-home-yard',
    contestTitle: 'Лучший дом, лучший двор',
    projectId: 'housing-school',
    scheduledAt: new Date('2026-06-02T15:00:00.000Z'),
    submittedAt: new Date('2026-05-28T12:15:00.000Z'),
    region: 'Республика Татарстан',
    municipality: 'г. Казань',
    applicationData: {
      address: 'г. Казань, ул. К. Маркса, 44',
      builtYear: 2004,
      floors: 12,
      apartments: 180,
    },
    media: [
      { type: 'image', src: applicationImageDataUrl, alt: 'Фотография двора — 1' },
      { type: 'image', src: applicationImageDataUrl, alt: 'Фотография двора — 2' },
    ],
    essay: { fileName: 'Эссе.txt', href: essayDataUrl },
    mediaLinks: [{ title: 'Упоминание в СМИ (пример)', href: 'https://example.com' }],
    application: {
      title: 'Цветущий двор',
      nomination: '«Благоустройство»',
      votes: 9,
      description:
        'Короткое описание заявки (wireframe): озеленение, клумбы и аккуратные дорожки.',
      award: { place: 1 },
    },
  },
]

export function LkContestApplicationPage() {
  const { contestId } = useParams()
  const { session } = useSession()
  if (!session) return null

  const profile = useMemo(() => readProfile(session.phone), [session.phone])
  const fullName = profile?.fullName?.trim() || 'Участник'

  const mock = mocks.find((m) => m.contestId === contestId)

  if (!mock) {
    return (
      <div className="rounded-2xl border border-zinc-200 bg-white p-6">
        <div className="text-sm font-semibold text-zinc-900">Заявка не найдена</div>
        <div className="mt-1 text-sm text-zinc-600">
          Проверьте адрес: <span className="font-mono">{contestId}</span>
        </div>
      </div>
    )
  }

  const projectTitle = getProjectById(mock.projectId)?.title ?? mock.projectId

  return (
    <div className="space-y-4">
      <header className="space-y-2">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900">
          {mock.application.title}
        </h2>

        <div className="flex flex-wrap items-center gap-2">
          {mock.application.award?.place === 1 ? (
            <div className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-900">
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
          {mock.application.status === 'moderation' ? (
            <div className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-900">
              На модерации
            </div>
          ) : null}
        </div>

        <div className="text-sm text-zinc-600">
          Дата подачи:{' '}
          <span className="font-medium text-zinc-900">
            {mock.submittedAt.toLocaleString()}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-600">
          <Link
            to={`/lk/contests/${mock.contestId}`}
            className="font-medium text-zinc-900 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
          >
            {mock.contestTitle}
          </Link>
          <span className="text-zinc-300">/</span>
          <Link
            to={`/${mock.projectId}`}
            className="font-medium text-zinc-900 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
          >
            {projectTitle}
          </Link>
        </div>
      </header>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6">
        <div className="grid gap-4 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <MediaGallery media={mock.media} />
          </div>

          <div className="space-y-3 lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center rounded-full bg-zinc-800 px-3 py-1 text-xs font-semibold text-white">
                {mock.application.nomination.replace(/^«|»$/g, '')}
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-700 shadow-sm">
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
                  <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {mock.region}
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-700 shadow-sm">
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
                  <path d="M3 10h18" />
                  <path d="M5 10V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3" />
                  <path d="M6 10v9" />
                  <path d="M18 10v9" />
                  <path d="M10 14h4" />
                </svg>
                {mock.municipality}
              </div>
            </div>
            <div className="inline-flex w-fit items-center rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-semibold text-zinc-900">
              Голосов: {mock.application.votes}
            </div>

            <ApplicationDataSection
              region={mock.region}
              municipality={mock.municipality}
              address={mock.applicationData.address}
              builtYear={mock.applicationData.builtYear}
              floors={mock.applicationData.floors}
              apartments={mock.applicationData.apartments}
            />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="text-sm font-semibold text-zinc-900">Эссе</div>
          </div>
          <a
            href={mock.essay.href}
            download={mock.essay.fileName}
            className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
          >
            Скачать {mock.essay.fileName}
          </a>
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6">
        <div className="text-sm font-semibold text-zinc-900">Ссылки СМИ</div>
        {mock.mediaLinks.length ? (
          <ul className="mt-3 space-y-2">
            {mock.mediaLinks.map((l) => (
              <li key={`${l.href}-${l.title}`}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-zinc-900 underline underline-offset-4 hover:text-zinc-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
                >
                  {l.title}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-2 text-sm text-zinc-600">Пока нет ссылок.</div>
        )}
      </section>
    </div>
  )
}

function ApplicationDataSection(props: {
  region: string
  municipality: string
  address: string
  builtYear: number
  floors: number
  apartments: number
}) {
  return (
    <section className="mt-5">
      <div className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
        <Field label="Год постройки" value={String(props.builtYear)} />
        <Field label="Количество этажей" value={String(props.floors)} />
        <Field label="Количество квартир" value={String(props.apartments)} />
      </div>
    </section>
  )
}

function Field(props: { label: string; value: string }) {
  return (
    <div className="border-b border-zinc-200 pb-3">
      <div className="text-xs font-medium text-zinc-500">{props.label}</div>
      <div className="mt-1 text-sm font-medium text-zinc-900">{props.value}</div>
    </div>
  )
}

function MediaGallery({ media }: { media: MediaItem[] }) {
  const ordered = useMemo(() => {
    const vids = media.filter((m) => m.type === 'video')
    const imgs = media.filter((m) => m.type === 'image')
    return [...vids, ...imgs]
  }, [media])

  const [activeIdx, setActiveIdx] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const active = ordered[activeIdx] ?? ordered[0]
  if (!active) return null

  return (
    <div>
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
        {active.type === 'image' ? (
          <button
            type="button"
            className="block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
            onClick={() => setLightboxOpen(true)}
            aria-label="Открыть фото в большом размере"
          >
            <img
              src={active.src}
              alt={active.alt}
              className="h-auto w-full object-cover"
              loading="lazy"
            />
          </button>
        ) : (
          <video
            className="h-auto w-full"
            controls
            preload="metadata"
            poster={active.posterSrc}
            aria-label={active.title}
          >
            <source src={active.src} />
          </video>
        )}
      </div>

      <Modal
        title="Фото"
        open={lightboxOpen && active.type === 'image'}
        onClose={() => setLightboxOpen(false)}
      >
        {active.type === 'image' ? (
          <img
            src={active.src}
            alt={active.alt}
            className="max-h-[75vh] w-full rounded-xl object-contain"
          />
        ) : (
          <div />
        )}
      </Modal>

      {ordered.length > 1 ? (
        <div className="mt-3 grid grid-cols-4 gap-2">
          {ordered.slice(0, 8).map((m, idx) => {
            const isActive = idx === activeIdx
            return (
              <button
                key={`${m.type}-${idx}`}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`group relative overflow-hidden rounded-lg border bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20 ${
                  isActive
                    ? 'border-zinc-900'
                    : 'border-zinc-200 hover:border-zinc-300'
                }`}
                aria-label={m.type === 'video' ? `Видео: ${m.title}` : m.alt}
              >
                {m.type === 'image' ? (
                  <img
                    src={m.src}
                    alt=""
                    className="aspect-[4/3] w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="relative aspect-[4/3] w-full bg-zinc-950">
                    {m.posterSrc ? (
                      <img
                        src={m.posterSrc}
                        alt=""
                        className="h-full w-full object-cover opacity-80"
                        loading="lazy"
                      />
                    ) : null}
                    <div className="absolute inset-0 grid place-items-center">
                      <div className="rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-zinc-900 shadow-sm">
                        Видео
                      </div>
                    </div>
                  </div>
                )}
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

