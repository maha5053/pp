import type { DictationResult } from './results'
import { readDictationResult } from './results'
import { projects } from '../../data/projects'

export type DictationResultWithProject = {
  result: DictationResult
  projectId: string
  dictationTitle: string
}

export function listDictationResults(phone: string): DictationResultWithProject[] {
  const out: DictationResultWithProject[] = []

  for (const project of projects) {
    for (const dictation of project.dictations) {
      const result = readDictationResult(phone, dictation.id)
      if (!result) continue
      out.push({
        result,
        projectId: project.id,
        dictationTitle: dictation.title,
      })
    }
  }

  out.sort(
    (a, b) =>
      new Date(b.result.completedAt).getTime() -
      new Date(a.result.completedAt).getTime(),
  )

  return out
}

