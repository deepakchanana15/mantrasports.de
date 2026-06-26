'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { submitEnquiry } from '@/lib/actions/enquiries'

const inputCls =
  'w-full rounded-[2px] border border-neutral-300 bg-white px-4 py-3 text-[14px] text-neutral-900 outline-none transition-colors focus:border-[#e85d1a] focus:ring-1 focus:ring-[#e85d1a] placeholder:text-neutral-400'

const PRODUCT_OPTIONS = [
  'Cricketschläger (English Willow)',
  'Cricketschläger (Kashmir Willow)',
  'Batting Pads',
  'Batting Handschuhe',
  'Helm',
  'Cricketbälle',
  'Teamkleidung',
  'Individuelle Bekleidung',
  'Sporttaschen & Zubehör',
]

export function WholesaleForm() {
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState<string[]>([])

  const toggle = (item: string) =>
    setSelected((prev) => (prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]))

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    const fd = new FormData(e.currentTarget)
    fd.set('type', 'WHOLESALE')
    if (selected.length > 0) {
      const existing = (fd.get('message') as string) || ''
      fd.set('message', `Produkte: ${selected.join(', ')}${existing ? '\n\n' + existing : ''}`)
    }

    const result = await submitEnquiry(fd)
    if (result.ok) {
      setSuccess(true)
    } else {
      setError(result.error ?? 'Fehler beim Senden.')
    }
    setSubmitting(false)
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center rounded-[2px] py-16 text-center" style={{ border: '1px solid #E0DFDB', background: '#ffffff', padding: '48px 32px' }}>
        <CheckCircle2 className="mb-4 h-12 w-12" style={{ color: '#059669' }} />
        <h3 className="mb-2 font-display text-[22px] font-bold uppercase tracking-[0.03em]" style={{ color: '#111111' }}>
          Anfrage erhalten!
        </h3>
        <p className="max-w-[360px] text-[15px] leading-relaxed" style={{ color: '#6B6B6B' }}>
          Vielen Dank für deine Großhandelsanfrage. Wir melden uns in der Regel innerhalb von 24 Stunden per E-Mail oder Telefon.
        </p>
        <p className="mt-4 font-display text-[13px] font-semibold uppercase tracking-wider" style={{ color: '#e85d1a' }}>
          Mantra Sports DE Team
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" style={{ border: '1px solid #E0DFDB', background: '#ffffff', padding: '36px' }}>
      <h3 className="mb-6 font-display text-[20px] font-bold uppercase tracking-[0.04em]" style={{ color: '#111111' }}>
        Großhandelsanfrage stellen
      </h3>

      {error && (
        <div className="rounded-[2px] border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">{error}</div>
      )}

      <div className="grid gap-4" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <div>
          <label className="mb-1.5 block font-display text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color: '#6B6B6B' }}>
            Name <span style={{ color: '#e85d1a' }}>*</span>
          </label>
          <input type="text" name="name" required placeholder="Vor- und Nachname" className={inputCls} />
        </div>
        <div>
          <label className="mb-1.5 block font-display text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color: '#6B6B6B' }}>
            E-Mail <span style={{ color: '#e85d1a' }}>*</span>
          </label>
          <input type="email" name="email" required placeholder="deine@email.de" className={inputCls} />
        </div>
      </div>

      <div className="grid gap-4" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <div>
          <label className="mb-1.5 block font-display text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color: '#6B6B6B' }}>
            Telefon / WhatsApp
          </label>
          <input type="tel" name="phone" placeholder="+49 ..." className={inputCls} />
        </div>
        <div>
          <label className="mb-1.5 block font-display text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color: '#6B6B6B' }}>
            Organisation / Verein / Unternehmen
          </label>
          <input type="text" name="company" placeholder="Name deiner Organisation" className={inputCls} />
        </div>
      </div>

      <div className="grid gap-4" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <div>
          <label className="mb-1.5 block font-display text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color: '#6B6B6B' }}>
            Land
          </label>
          <input type="text" name="country" placeholder="Deutschland, Österreich, Schweiz ..." className={inputCls} />
        </div>
        <div>
          <label className="mb-1.5 block font-display text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color: '#6B6B6B' }}>
            Ungefähre Stückzahl
          </label>
          <input type="number" name="quantity" min="1" placeholder="z.B. 20" className={inputCls} />
        </div>
      </div>

      {/* Product checkboxes */}
      <div>
        <label className="mb-2 block font-display text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color: '#6B6B6B' }}>
          Interessierte Produkte
        </label>
        <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {PRODUCT_OPTIONS.map((opt) => (
            <label key={opt} className="flex cursor-pointer items-center gap-2 rounded-[2px] px-3 py-2 text-[13px] transition-colors" style={{ border: `1px solid ${selected.includes(opt) ? '#e85d1a' : '#E0DFDB'}`, background: selected.includes(opt) ? '#FFF5ED' : '#ffffff', color: '#111111' }}>
              <input
                type="checkbox"
                className="h-3.5 w-3.5 accent-[#e85d1a]"
                checked={selected.includes(opt)}
                onChange={() => toggle(opt)}
              />
              {opt}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-1.5 block font-display text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color: '#6B6B6B' }}>
          Nachricht / weitere Details
        </label>
        <textarea name="message" rows={4} placeholder="Beschreibe deine Anforderungen — Marken, Spezifikationen, Liefertermin, Sonderanfertigungen, etc." className={inputCls} />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="flex w-full items-center justify-center gap-2 rounded-[2px] font-display text-[14px] font-bold uppercase tracking-[0.1em] text-white transition-colors disabled:opacity-60"
        style={{ background: '#e85d1a', padding: '16px 32px', border: 'none', cursor: submitting ? 'wait' : 'pointer' }}
        onMouseEnter={(e) => { if (!submitting) e.currentTarget.style.background = '#c44b0f' }}
        onMouseLeave={(e) => { e.currentTarget.style.background = '#e85d1a' }}
      >
        {submitting ? 'Wird gesendet…' : <>Anfrage absenden <ArrowRight className="h-4 w-4" /></>}
      </button>

      <p className="text-center text-[11px]" style={{ color: '#A0A0A0' }}>
        Deine Daten werden vertraulich behandelt und nicht an Dritte weitergegeben.
      </p>
    </form>
  )
}
