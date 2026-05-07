export function safeJsonParse<T>(raw: string | null): T | undefined {
  if (!raw) return undefined
  try {
    return JSON.parse(raw) as T
  } catch {
    return undefined
  }
}

export function readJson<T>(key: string): T | undefined {
  try {
    return safeJsonParse<T>(localStorage.getItem(key))
  } catch {
    return undefined
  }
}

export function writeJson(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // ignore quota / security errors in prototype
  }
}

