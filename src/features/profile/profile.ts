import { readJson, writeJson } from '../../lib/storage'

export type UserProfile = {
  fullName: string
  phone: string
  region?: string
  address?: string
  lastName?: string
  firstName?: string
  patronymic?: string
  gender?: 'female' | 'male'
  birthDate?: string // YYYY-MM-DD
  email?: string
  membership?: string
}

export function profileKey(phone: string) {
  return `profile:${phone}`
}

export function readProfile(phone: string): UserProfile | undefined {
  return readJson<UserProfile>(profileKey(phone))
}

export function writeProfile(profile: UserProfile) {
  writeJson(profileKey(profile.phone), profile)
  window.dispatchEvent(new Event('storage'))
}

