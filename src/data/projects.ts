import type { Contest, Project } from '../types'

export const projects: Project[] = [
  {
    id: 'digital-portal',
    title: 'Цифровая Россия',
    summary:
      'Единая витрина проектов: новости, конкурсы, диктанты и ответственность.',
    about:
      'Прототип страницы проекта: краткое описание, ответственные лица, ленты и переходы к конкурсам.',
    tags: ['цифровизация', 'коммуникации'],
    banner: {
      headline: 'Цифровая Россия',
      subhead: 'Прозрачность, удобство, вовлечение',
    },
    people: [
      {
        id: 'p1',
        name: 'Мария К.',
        role: 'Координатор проекта',
        photoUrl: 'https://i.pravatar.cc/160?img=47',
      },
      {
        id: 'p2',
        name: 'Иван П.',
        role: 'Ответственный за регионы',
        photoUrl: 'https://i.pravatar.cc/160?img=12',
      },
      {
        id: 'p3',
        name: 'Екатерина С.',
        role: 'Коммуникации',
        photoUrl: 'https://i.pravatar.cc/160?img=5',
      },
    ],
    news: [
      {
        id: 'n1',
        title: 'Открыли набор предложений на май',
        summary: 'Собираем идеи по улучшению взаимодействия с гражданами.',
        publishedAt: '2026-04-14T10:00:00.000Z',
      },
      {
        id: 'n2',
        title: 'Обновили структуру лент',
        summary: 'Новости, конкурсы и диктанты теперь в одном месте.',
        publishedAt: '2026-04-18T14:30:00.000Z',
      },
    ],
    contests: [
      {
        id: 'best-initiative-2026',
        title: 'Конкурс “Лучшая инициатива 2026”',
        summary: 'Подайте заявку и соберите голоса поддержки.',
        deadline: '2026-05-31T20:00:00.000Z',
      },
      {
        id: 'regional-grants',
        title: 'Региональные гранты',
        summary: 'Идеи для регионов: финансирование и сопровождение.',
        deadline: '2026-06-20T20:00:00.000Z',
      },
    ],
    dictations: [
      {
        id: 'digital-dictation',
        title: 'Цифровой диктант',
        summary: 'Тест на знание прав и обязанностей.',
        scheduledAt: '2026-05-10T09:00:00.000Z',
      },
      {
        id: 'services-dictation',
        title: 'Диктант по госуслугам',
        summary: 'Короткий формат — 15 минут.',
        scheduledAt: '2026-05-24T09:00:00.000Z',
      },
    ],
  },
  {
    id: 'housing-school',
    title: 'Школа ЖКХ',
    summary: 'Понятные практики для жителей: дом, услуги, тарифы, обращения.',
    about:
      'Проект о грамотном взаимодействии жителей с управляющими организациями: типовые ситуации, полезные инструкции и проверка знаний.',
    tags: ['жкх', 'образование', 'жители'],
    banner: {
      headline: 'Школа ЖКХ',
      subhead: 'Знать. Понимать. Действовать',
    },
    people: [
      {
        id: 'p4',
        name: 'Сергей Л.',
        role: 'Куратор направления',
        photoUrl: 'https://i.pravatar.cc/160?img=33',
      },
      {
        id: 'p5',
        name: 'Ольга Н.',
        role: 'Методист',
        photoUrl: 'https://i.pravatar.cc/160?img=22',
      },
    ],
    news: [
      {
        id: 'n3',
        title: 'Запустили базовый курс для жителей',
        summary: 'Короткие уроки: начисления, ОДН, заявки и обращения.',
        publishedAt: '2026-04-20T12:10:00.000Z',
      },
      {
        id: 'n4',
        title: 'Памятки по типовым ситуациям',
        summary: 'Собрали чек-листы: протечки, отопление, дворовые работы.',
        publishedAt: '2026-04-27T09:40:00.000Z',
      },
    ],
    contests: [
      {
        id: 'best-yard-initiative',
        title: 'Конкурс “Лучший двор”',
        summary: 'Предложите улучшения и соберите поддержку соседей.',
        deadline: '2026-06-05T20:00:00.000Z',
      },
    ],
    dictations: [
      {
        id: 'housing-dictation',
        title: 'Диктант по ЖКХ',
        summary: 'Проверка базовых знаний: услуги, права, обращения.',
        scheduledAt: '2026-05-18T09:00:00.000Z',
      },
    ],
  },
  {
    id: 'kids-sport',
    title: 'Детский спорт',
    summary: 'Доступные секции и мероприятия: участие, поддержка, развитие.',
    about:
      'Проект про вовлечение детей в спорт: инфраструктура, секции, события и поддержка тренеров.',
    tags: ['спорт', 'дети', 'здоровье'],
    banner: {
      headline: 'Детский спорт',
      subhead: 'Движение и команда',
    },
    people: [
      {
        id: 'p6',
        name: 'Екатерина М.',
        role: 'Координатор региональных секций',
        photoUrl: 'https://i.pravatar.cc/160?img=15',
      },
      {
        id: 'p7',
        name: 'Андрей В.',
        role: 'Ответственный за мероприятия',
        photoUrl: 'https://i.pravatar.cc/160?img=9',
      },
    ],
    news: [
      {
        id: 'n5',
        title: 'Стартовал календарь спортивных событий',
        summary: 'Добавили городские турниры и семейные старты на май–июнь.',
        publishedAt: '2026-04-22T08:20:00.000Z',
      },
    ],
    contests: [
      {
        id: 'open-sections',
        title: 'Конкурс “Открытые секции”',
        summary: 'Идеи по доступности и вовлечению — от школ до дворов.',
        deadline: '2026-06-15T20:00:00.000Z',
      },
    ],
    dictations: [
      {
        id: 'sport-dictation',
        title: 'Спортивный диктант',
        summary: 'Безопасность, режим и базовые принципы тренировок.',
        scheduledAt: '2026-05-26T09:00:00.000Z',
      },
    ],
  },
]

export const contests: Contest[] = [
  {
    id: 'best-initiative-2026',
    projectId: 'digital-portal',
    title: 'Конкурс “Лучшая инициатива 2026”',
    summary: 'Подайте заявку и соберите голоса поддержки.',
    description:
      'Расскажите о вашей инициативе: цель, план, бюджет (опционально) и ожидаемый эффект. В прототипе достаточно короткого текста и пары полей.',
    ctaLabel: 'Подать заявку',
    applications: [
      {
        id: 'dp-a1',
        authorName: 'Анна',
        title: 'Семейные консультации онлайн',
        description:
          'Сервис записи к специалистам и подбор материалов по запросу.',
        createdAt: '2026-04-10T09:00:00.000Z',
        approved: true,
        seedVotes: 12,
      },
      {
        id: 'dp-a2',
        authorName: 'Дмитрий',
        title: 'Субботники в один клик',
        description:
          'Календарь мероприятий и волонтёрские команды на карте города.',
        createdAt: '2026-04-12T09:00:00.000Z',
        approved: true,
        seedVotes: 8,
      },
      {
        id: 'dp-a3',
        authorName: 'Светлана',
        title: 'Школьные мастер-классы',
        description: 'Сеть коротких встреч с практиками разных профессий.',
        createdAt: '2026-04-16T09:00:00.000Z',
        approved: false,
        seedVotes: 0,
      },
    ],
  },
  {
    id: 'regional-grants',
    projectId: 'digital-portal',
    title: 'Региональные гранты',
    summary: 'Идеи для регионов: финансирование и сопровождение.',
    description:
      'Заявка: кратко опишите проблему, решение и ожидаемый результат. Далее — модерация и голосование.',
    ctaLabel: 'Подать заявку',
    applications: [
      {
        id: 'dp-rg-a1',
        authorName: 'Ирина',
        title: 'Точки доступа к сервисам',
        description: 'Небольшие киоски в МФЦ и библиотеках.',
        createdAt: '2026-04-11T09:00:00.000Z',
        approved: true,
        seedVotes: 3,
      },
    ],
  },
  {
    id: 'best-yard-initiative',
    projectId: 'housing-school',
    title: 'Конкурс “Лучший двор”',
    summary: 'Предложите улучшения и соберите поддержку соседей.',
    description:
      'Опишите, что вы хотите улучшить: безопасность, освещение, спортплощадка, благоустройство. Заявка проходит модерацию, дальше — голосование.',
    ctaLabel: 'Подать заявку',
    applications: [
      {
        id: 'hs-a1',
        authorName: 'Павел',
        title: 'Светлый подъезд',
        description: 'Замена освещения и навигации, единый стиль табличек.',
        createdAt: '2026-04-13T09:00:00.000Z',
        approved: true,
        seedVotes: 5,
      },
      {
        id: 'hs-a2',
        authorName: 'Наталья',
        title: 'Двор без ям',
        description: 'План работ по ремонту дорожек и установке бордюров.',
        createdAt: '2026-04-15T09:00:00.000Z',
        approved: true,
        seedVotes: 9,
      },
    ],
  },
  {
    id: 'open-sections',
    projectId: 'kids-sport',
    title: 'Конкурс “Открытые секции”',
    summary: 'Идеи по доступности и вовлечению — от школ до дворов.',
    description:
      'Предложите идею: где и как открыть/поддержать секцию, кого привлечь, какие ресурсы нужны. Затем — модерация и голосование.',
    ctaLabel: 'Подать заявку',
    applications: [
      {
        id: 'ks-a1',
        authorName: 'Артём',
        title: 'Бесплатные тренировки по выходным',
        description: 'Открытые занятия для новичков на школьном стадионе.',
        createdAt: '2026-04-19T09:00:00.000Z',
        approved: true,
        seedVotes: 11,
      },
    ],
  },
]

export function getProjectById(projectId: string) {
  return projects.find((p) => p.id === projectId)
}

export function getContestById(projectId: string, contestId: string) {
  return contests.find((c) => c.projectId === projectId && c.id === contestId)
}

export function getDictationById(dictationId: string) {
  for (const project of projects) {
    const found = project.dictations.find((d) => d.id === dictationId)
    if (found) return found
  }
  return undefined
}

