export type CertificateInput = {
  fullName: string
  phone: string
  dictationTitle: string
  scorePercent: number
  completedAt: string // ISO
  certificateNo: string
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  } catch {
    return iso
  }
}

export function renderCertificateToPngDataUrl(input: CertificateInput) {
  const width = 1400
  const height = 900

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const ctx = canvas.getContext('2d')
  if (!ctx) return ''

  // background
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, width, height)

  // border
  ctx.strokeStyle = '#0a0a0a'
  ctx.lineWidth = 6
  ctx.strokeRect(40, 40, width - 80, height - 80)

  // subtle inner frame
  ctx.strokeStyle = 'rgba(0,0,0,0.15)'
  ctx.lineWidth = 2
  ctx.strokeRect(70, 70, width - 140, height - 140)

  // header bar
  ctx.fillStyle = '#0a0a0a'
  ctx.fillRect(70, 70, width - 140, 110)

  ctx.fillStyle = '#ffffff'
  ctx.font = '600 34px system-ui, -apple-system, Segoe UI, Roboto, Arial'
  ctx.fillText('СЕРТИФИКАТ', 110, 140)

  ctx.font = '400 18px system-ui, -apple-system, Segoe UI, Roboto, Arial'
  ctx.fillStyle = 'rgba(255,255,255,0.85)'
  ctx.fillText('О прохождении диктанта', 110, 170)

  // main text
  ctx.fillStyle = '#0a0a0a'
  ctx.font = '700 46px system-ui, -apple-system, Segoe UI, Roboto, Arial'
  ctx.fillText(input.dictationTitle, 110, 270)

  ctx.font = '400 22px system-ui, -apple-system, Segoe UI, Roboto, Arial'
  ctx.fillStyle = '#27272a'
  ctx.fillText('Настоящим подтверждается, что', 110, 330)

  ctx.font = '700 34px system-ui, -apple-system, Segoe UI, Roboto, Arial'
  ctx.fillStyle = '#0a0a0a'
  ctx.fillText(input.fullName || 'Участник', 110, 380)

  ctx.font = '400 18px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'
  ctx.fillStyle = '#3f3f46'
  ctx.fillText(`Телефон: ${input.phone}`, 110, 415)

  // score block
  ctx.fillStyle = '#0a0a0a'
  ctx.fillRect(110, 455, 420, 120)
  ctx.fillStyle = '#ffffff'
  ctx.font = '600 18px system-ui, -apple-system, Segoe UI, Roboto, Arial'
  ctx.fillText('Результат', 140, 495)
  ctx.font = '800 56px system-ui, -apple-system, Segoe UI, Roboto, Arial'
  ctx.fillText(`${input.scorePercent}%`, 140, 555)

  // meta
  ctx.fillStyle = '#27272a'
  ctx.font = '500 20px system-ui, -apple-system, Segoe UI, Roboto, Arial'
  ctx.fillText(`Дата: ${formatDate(input.completedAt)}`, 580, 505)
  ctx.fillText(`Сертификат № ${input.certificateNo}`, 580, 545)

  // footer
  ctx.fillStyle = 'rgba(0,0,0,0.55)'
  ctx.font = '400 16px system-ui, -apple-system, Segoe UI, Roboto, Arial'
  ctx.fillText('Wireframe prototype • Данные сохранены локально', 110, 820)

  return canvas.toDataURL('image/png')
}

