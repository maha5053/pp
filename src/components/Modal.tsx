import { type ReactNode, useEffect } from 'react'

export function Modal(props: {
  title: string
  open: boolean
  onClose: () => void
  children: ReactNode
}) {
  useEffect(() => {
    if (!props.open) return
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') props.onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [props.open, props.onClose])

  if (!props.open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/30 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={props.title}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) props.onClose()
      }}
    >
      <div className="w-full max-w-xl rounded-2xl border border-zinc-200 bg-white shadow-xl">
        <div className="flex items-start justify-between gap-4 border-b border-zinc-200/70 px-5 py-4">
          <div>
            <div className="text-sm font-semibold text-zinc-900">
              {props.title}
            </div>
          </div>
          <button
            type="button"
            className="rounded-lg px-2 py-1 text-sm text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
            onClick={props.onClose}
          >
            Закрыть
          </button>
        </div>

        <div className="px-5 py-4">{props.children}</div>
      </div>
    </div>
  )
}

