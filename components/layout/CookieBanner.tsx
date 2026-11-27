'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'
import { GOOGLE_TAG_ID, OPEN_CONSENT_EVENT, readConsent, saveConsent } from '@/lib/analytics/consent'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Without an analytics ID there is nothing optional to consent to
    if (!GOOGLE_TAG_ID) return

    // Show if no decision has been made yet, and whenever the footer link asks
    if (!readConsent()) setVisible(true)
    const open = () => setVisible(true)
    window.addEventListener(OPEN_CONSENT_EVENT, open)
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, open)
  }, [])

  const save = (value: 'accepted' | 'denied') => {
    saveConsent(value === 'accepted')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Cookie-Einstellungen"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: '#111111',
        borderTop: '1px solid #2a2a2a',
        boxShadow: '0 -4px 32px rgba(0,0,0,0.3)',
      }}
    >
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '20px 40px',
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          flexWrap: 'wrap',
        }}
      >
        {/* Text */}
        <div style={{ flex: 1, minWidth: '260px' }}>
          <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.6, color: '#cccccc' }}>
            🍪{' '}
            <strong style={{ color: '#ffffff' }}>Darf Google Analytics mitzählen?</strong>{' '}
            Mit deiner Einwilligung nutzen wir Google Analytics, um zu verstehen, wie unsere Website genutzt wird.
            Dabei werden Cookies gesetzt und Nutzungsdaten an Google (auch in die USA) übermittelt.
            Ohne Einwilligung bleiben Analyse-Cookies aus. Du kannst deine Wahl jederzeit über
            „Cookie-Einstellungen“ im Footer ändern.{' '}
            <Link
              href="/datenschutz"
              style={{ color: '#e85d1a', textDecoration: 'underline', whiteSpace: 'nowrap' }}
            >
              Datenschutzerklärung
            </Link>
          </p>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexShrink: 0, flexWrap: 'wrap' }}>
          {/* Deny — outlined, equally visible */}
          <button
            type="button"
            onClick={() => save('denied')}
            style={{
              height: '44px',
              padding: '0 24px',
              background: 'transparent',
              border: '1px solid #555555',
              color: '#cccccc',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              borderRadius: '2px',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#ffffff'
              e.currentTarget.style.color = '#ffffff'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#555555'
              e.currentTarget.style.color = '#cccccc'
            }}
          >
            Ablehnen
          </button>

          {/* Accept — filled orange */}
          <button
            type="button"
            onClick={() => save('accepted')}
            style={{
              height: '44px',
              padding: '0 24px',
              background: '#e85d1a',
              border: '1px solid #e85d1a',
              color: '#ffffff',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              borderRadius: '2px',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#c44b0f'
              e.currentTarget.style.borderColor = '#c44b0f'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#e85d1a'
              e.currentTarget.style.borderColor = '#e85d1a'
            }}
          >
            Akzeptieren
          </button>

          {/* Dismiss X */}
          <button
            type="button"
            aria-label="Schließen"
            onClick={() => save('denied')}
            style={{
              background: 'none',
              border: 'none',
              color: '#666666',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#666666' }}
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
