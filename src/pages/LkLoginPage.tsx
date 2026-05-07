import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { normalizePhone, writeSession } from '../features/auth/session'

export function LkLoginPage() {
  const navigate = useNavigate()
  const [rawPhone, setRawPhone] = useState('')

  const phone = useMemo(() => normalizePhone(rawPhone), [rawPhone])
  const isValid = phone.length >= 10

  return (
    <section className="mx-auto max-w-lg space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Вход в ЛК</h1>
        <p className="text-sm text-zinc-600">
          Это имитация входа. Данные сохраняются локально в браузере.
        </p>
      </header>

      <div className="rounded-2xl border border-zinc-200 bg-white p-6">
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            if (!isValid) return
            writeSession(phone)
            navigate('/lk')
          }}
        >
          <label className="space-y-1">
            <div className="text-xs font-medium text-zinc-700">
              Номер телефона
            </div>
            <input
              inputMode="tel"
              value={rawPhone}
              onChange={(e) => setRawPhone(e.target.value)}
              placeholder="+7 (999) 000-00-00"
              className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
            />
            <div className="text-xs text-zinc-500">
              Будут сохранены только цифры: <span className="font-mono">{phone || '—'}</span>
            </div>
          </label>

          <div className="flex flex-wrap items-center justify-between gap-2">
            <Link
              to="/"
              className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
            >
              На главную
            </Link>
            <button
              type="submit"
              disabled={!isValid}
              className="rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Войти
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

