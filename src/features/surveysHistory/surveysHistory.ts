import { readJson, writeJson } from '../../lib/storage'

export type SurveyHistoryEntry = {
  id: string
  title: string
  projectId: string
  completedAt: string // ISO
}

function key(phone: string) {
  return `surveys:${phone}`
}

export function listSurveyHistory(phone: string): SurveyHistoryEntry[] {
  const items = readJson<SurveyHistoryEntry[]>(key(phone))
  if (!Array.isArray(items)) return []
  return items
    .filter(
      (x): x is SurveyHistoryEntry =>
        Boolean(x && typeof x === 'object') &&
        typeof x.id === 'string' &&
        typeof x.title === 'string' &&
        typeof x.projectId === 'string' &&
        typeof x.completedAt === 'string',
    )
    .slice()
    .sort((a, b) => b.completedAt.localeCompare(a.completedAt))
}

export function addSurveyHistoryEntry(phone: string, entry: SurveyHistoryEntry) {
  const current = listSurveyHistory(phone)
  writeJson(key(phone), [entry, ...current])
}

