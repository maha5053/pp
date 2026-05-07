import { useMemo, useState } from 'react'
import { useSession } from '../features/auth/useSession'
import { readProfile, writeProfile, type UserProfile } from '../features/profile/profile'

export function LkProfilePage() {
  const { session } = useSession()

  if (!session) return null

  const initialProfile = useMemo<UserProfile>(() => {
    const stored = readProfile(session.phone)
    return (
      stored ?? {
        fullName: '',
        phone: session.phone,
        region: '',
        address: '',
        lastName: '',
        firstName: '',
        patronymic: '',
        gender: 'female',
        birthDate: '',
        email: '',
        membership: '',
      }
    )
  }, [session.phone])

  const [profile, setProfile] = useState<UserProfile>(initialProfile)
  const [savedAt, setSavedAt] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-zinc-200 bg-white p-6">
        <div className="text-sm font-semibold text-zinc-900">Профиль</div>

        <form
          className="mt-4 grid gap-4"
          onSubmit={(e) => {
            e.preventDefault()
            const fullName = [profile.lastName, profile.firstName, profile.patronymic]
              .map((s) => (s ?? '').trim())
              .filter(Boolean)
              .join(' ')
            writeProfile({
              ...profile,
              phone: session.phone,
              fullName,
              email: profile.email?.trim() || undefined,
              region: profile.region?.trim() || undefined,
              address: profile.address?.trim() || undefined,
              lastName: profile.lastName?.trim() || undefined,
              firstName: profile.firstName?.trim() || undefined,
              patronymic: profile.patronymic?.trim() || undefined,
              birthDate: profile.birthDate?.trim() || undefined,
              membership: profile.membership?.trim() || undefined,
            })
            setSavedAt(new Date().toISOString())
          }}
        >
          <label className="grid gap-1 sm:grid-cols-[240px_1fr] sm:items-center">
            <div className="text-sm text-zinc-700">Регион *</div>
            <select
              value={profile.region ?? ''}
              onChange={(e) => setProfile((s) => ({ ...s, region: e.target.value }))}
              className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
              required
            >
              <option value="" disabled>
                Выберите регион
              </option>
              <option>Иркутская область</option>
              <option>Москва</option>
              <option>Санкт-Петербург</option>
              <option>Краснодарский край</option>
              <option>Республика Татарстан</option>
            </select>
          </label>

          <label className="grid gap-1 sm:grid-cols-[240px_1fr] sm:items-center">
            <div className="text-sm text-zinc-700">Адрес *</div>
            <input
              value={profile.address ?? ''}
              onChange={(e) => setProfile((s) => ({ ...s, address: e.target.value }))}
              className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
              placeholder="Например, 664042, Иркутская обл., Иркутский р-н…"
              required
            />
          </label>

          <div className="grid gap-1 sm:grid-cols-[240px_1fr] sm:items-center">
            <div className="text-sm text-zinc-700">Фамилия, имя, отчество *</div>
            <div className="grid gap-3 sm:grid-cols-3">
              <input
                value={profile.lastName ?? ''}
                onChange={(e) => setProfile((s) => ({ ...s, lastName: e.target.value }))}
                className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
                placeholder="Фамилия"
                required
              />
              <input
                value={profile.firstName ?? ''}
                onChange={(e) => setProfile((s) => ({ ...s, firstName: e.target.value }))}
                className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
                placeholder="Имя"
                required
              />
              <input
                value={profile.patronymic ?? ''}
                onChange={(e) =>
                  setProfile((s) => ({ ...s, patronymic: e.target.value }))
                }
                className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
                placeholder="Отчество"
                required
              />
            </div>
          </div>

          <label className="grid gap-1 sm:grid-cols-[240px_1fr] sm:items-center">
            <div className="text-sm text-zinc-700">Пол *</div>
            <select
              value={profile.gender ?? 'female'}
              onChange={(e) =>
                setProfile((s) => ({
                  ...s,
                  gender: e.target.value === 'male' ? 'male' : 'female',
                }))
              }
              className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
              required
            >
              <option value="female">Женский</option>
              <option value="male">Мужской</option>
            </select>
          </label>

          <label className="grid gap-1 sm:grid-cols-[240px_1fr] sm:items-center">
            <div className="text-sm text-zinc-700">Дата рождения *</div>
            <input
              type="date"
              value={profile.birthDate ?? ''}
              onChange={(e) => setProfile((s) => ({ ...s, birthDate: e.target.value }))}
              className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
              required
            />
          </label>

          <label className="grid gap-1 sm:grid-cols-[240px_1fr] sm:items-center">
            <div className="text-sm text-zinc-700">Электронная почта *</div>
            <input
              inputMode="email"
              value={profile.email ?? ''}
              onChange={(e) => setProfile((s) => ({ ...s, email: e.target.value }))}
              className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
              placeholder="name@example.com"
              required
            />
          </label>

          <label className="grid gap-1 sm:grid-cols-[240px_1fr] sm:items-center">
            <div className="text-sm text-zinc-700">Являюсь *</div>
            <select
              value={profile.membership ?? ''}
              onChange={(e) =>
                setProfile((s) => ({ ...s, membership: e.target.value }))
              }
              className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
              required
            >
              <option value="" disabled>
                Выберите вариант
              </option>
              <option>Сторонником ВПП «Единая Россия»</option>
              <option>Членом ВПП «Единая Россия»</option>
              <option>Волонтёром</option>
              <option>Участником проекта</option>
            </select>
          </label>

          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="text-xs text-zinc-500">
              {savedAt
                ? `Сохранено: ${new Date(savedAt).toLocaleString()}`
                : 'Измените поля и нажмите «Сохранить». '}
            </div>
            <button
              type="submit"
              className="rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
            >
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

