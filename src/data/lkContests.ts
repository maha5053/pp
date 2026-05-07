export type LkContestListItem = {
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
        status?: 'moderation' | 'approved'
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

export const applicationImageDataUrl =
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

export const lkContests: LkContestListItem[] = [
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
    myApplication: {
      title: 'Вечерний сквер',
      nomination: '«Город и люди»',
      votes: 0,
      imageUrl: applicationImageDataUrl,
      status: 'approved',
    },
    myVotes: {
      byNomination: [
        { nomination: '«Город и люди»', applicationTitles: ['Вечерний сквер'] },
        { nomination: '«Природа рядом»', applicationTitles: ['Утро на набережной'] },
      ],
    },
  },
]

