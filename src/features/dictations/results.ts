import { safeJsonParse, writeJson } from '../../lib/storage'

export type DictationResult = {
  dictationId: string
  scorePercent: number
  completedAt: string // ISO
  certificatePngDataUrl: string
}

export function dictationResultKey(phone: string, dictationId: string) {
  return `dictationResult:${phone}:${dictationId}`
}

export function readDictationResult(
  phone: string,
  dictationId: string,
): DictationResult | undefined {
  try {
    const raw = localStorage.getItem(dictationResultKey(phone, dictationId)) ?? ''
    return safeJsonParse<DictationResult>(raw)
  } catch {
    return undefined
  }
}

export function writeDictationResult(phone: string, result: DictationResult) {
  writeJson(dictationResultKey(phone, result.dictationId), result)
  window.dispatchEvent(new Event('storage'))
}

