'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { submitEnquiry } from '@/lib/actions/enquiries'

const inputCls =
  'w-full rounded-[2px] border border-neutral-300 bg-white px-4 py-3 text-[14px] text-neutral-900 outline-none transition-colors focus:border-[#e85d1a] focus:ring-1 focus:ring-[#e85d1a] placeholder:text-neutral-400'

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    const fd = new FormData(e.currentTarget)
    fd.set('type', 'GENERAL')

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
      <div
        className="flex flex-col items-center justify-center text-center"
        style={{ border: '1px solid #E0DFDB', background: '#ffffff', padding: '56px 32px' }}
      >
        <CheckCircle2 className="mb-4 h-12 w-12" style={{ color: '#059669' }} />
        <h3
          className="mb-2 font-display text-[22px] font-bold uppercase tracking-[0.03em]"
          style={{ color: '#111111' }}
        >
          Nachricht erhalten!
        </h3>
        <p className="max-w-[360px] text-[15px] leading-relaxed" style={{ color: '#6B6B6B' }}>
          Vielen Dank für deine Anfrage. Wir melden uns so schnell wie möglich — in der Regel innerhalb von 24 Stunden.
        </p>
        <p className="mt-4 font-display text-[13px] font-semibold uppercase tracking-wider" style={{ color: '#e85d1a' }}>
          Mantra Sports DE Team
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
      style={{ border: '1px solid #E0DFDB', background: '#ffffff', padding: '36px' }}
    >
      <h3
        className="mb-6 font-display text-[20px] font-bold uppercase tracking-[0.04em]"
        style={{ color: '#111111' }}
      >
        Schreib uns
      </h3>

      {error && (
        <div className="rounded-[2px] border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-4" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <div>
          <label
            className="mb-1.5 block font-display text-[11px] font-semibold uppercase tracking-[0.12em]"
            style={{ color: '#6B6B6B' }}
          >
            Name <span style={{ color: '#e85d1a' }}>*</span>
          </label>
          <input type="text" name="name" required placeholder="Vor- und Nachname" className={inputCls} />
        </div>
        <div>
          <label
            className="mb-1.5 block font-display text-[11px] font-semibold uppercase tracking-[0.12em]"
            style={{ color: '#6B6B6B' }}
          >
            E-Mail <span style={{ color: '#e85d1a' }}>*</span>
          </label>
          <input type="email" name="email" required placeholder="deine@email.de" className={inputCls} />
        </div>
      </div>

      <div className="grid gap-4" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <div>
          <label
            className="mb-1.5 block font-display text-[11px] font-semibold uppercase tracking-[0.12em]"
            style={{ color: '#6B6B6B' }}
          >
            Telefon / WhatsApp
          </label>
          <input type="tel" name="phone" placeholder="+49 ..." className={inputCls} />
        </div>
        <div>
          <label
            className="mb-1.5 block font-display text-[11px] font-semibold uppercase tracking-[0.12em]"
            style={{ color: '#6B6B6B' }}
          >
            Organisation / Verein (optional)
          </label>
          <input type="text" name="company" placeholder="Deine Organisation" className={inputCls} />
        </div>
      </div>

      <div>
        <label
          className="mb-1.5 block font-display text-[11px] font-semibold uppercase tracking-[0.12em]"
          style={{ color: '#6B6B6B' }}
        >
          Nachricht <span style={{ color: '#e85d1a' }}>*</span>
        </label>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Wie können wir dir helfen? Beschreibe deine Anfrage so detailliert wie möglich."
          className={inputCls}
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="flex w-full items-center justify-center gap-2 rounded-[2px] font-display text-[14px] font-bold uppercase tracking-[0.1em] text-white transition-colors disabled:opacity-60"
        style={{
          background: '#e85d1a',
          padding: '16px 32px',
          border: 'none',
          cursor: submitting ? 'wait' : 'pointer',
        }}
        onMouseEnter={(e) => { if (!submitting) e.currentTarget.style.background = '#c44b0f' }}
        onMouseLeave={(e) => { e.currentTarget.style.background = '#e85d1a' }}
      >
        {submitting ? 'Wird gesendet…' : <>Nachricht senden <ArrowRight className="h-4 w-4" /></>}
      </button>

      <p className="text-center text-[11px]" style={{ color: '#A0A0A0' }}>
        Deine Daten werden vertraulich behandelt und nicht an Dritte weitergegeben.
      </p>
    </form>
  )
}
