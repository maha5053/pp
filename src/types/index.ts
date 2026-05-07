export type Id = string

export type Person = {
  id: Id
  name: string
  role: string
  photoUrl?: string
}

export type FeedItem = {
  id: Id
  title: string
  summary: string
  publishedAt: string // ISO
}

export type ContestSummary = {
  id: Id
  title: string
  summary: string
  deadline?: string // ISO
}

export type DictationSummary = {
  id: Id
  title: string
  summary: string
  scheduledAt?: string // ISO
}

export type Project = {
  id: Id
  title: string
  summary: string
  about: string
  tags: string[]
  banner: {
    headline: string
    subhead?: string
  }
  people: Person[]
  news: FeedItem[]
  contests: ContestSummary[]
  dictations: DictationSummary[]
}

export type Application = {
  id: Id
  authorName: string
  title: string
  description: string
  createdAt: string // ISO
  approved: boolean
  seedVotes: number
}

export type Contest = {
  id: Id
  projectId: Id
  title: string
  summary: string
  description: string
  ctaLabel: string
  applications: Application[]
}

