'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Instagram, Facebook, Youtube, Linkedin, Mail, ChevronRight } from 'lucide-react'
import { FOOTER_NAV, SITE_CONFIG } from '@/lib/config/site'

export function Footer() {
  const [logoError, setLogoError] = useState(false)
  const currentYear = new Date().getFullYear()

  return (
    <footer style={{ background: '#111111', color: '#E0DFDB' }} aria-label="Seitenfuß">
      {/* ── Main Footer Grid ─────────────────────────────────────── */}
      <div
        className="grid gap-10"
        style={{
          padding: '64px 60px',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '40px',
        }}
      >
        {/* Brand Column */}
        <div>
          <Link href="/" className="mb-6 flex items-center gap-3.5 no-underline">
            {logoError ? (
              <span
                className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded text-xl"
                style={{ background: '#e85d1a' }}
              >
                🏏
              </span>
            ) : (
              <img
                src="/images/brand/logo.png"
                alt="Mantra Sports"
                width={44}
                height={44}
                className="h-[44px] w-[44px] shrink-0 object-contain"
                onError={() => setLogoError(true)}
              />
            )}
            <div className="leading-none">
              <span
                className="block font-display text-[20px] font-semibold tracking-[0.04em]"
                style={{ color: '#ffffff' }}
              >
                MANTRA SPORTS
              </span>
              <span
                className="mt-[2px] block text-[10px] font-medium uppercase tracking-[0.2em]"
                style={{ color: '#e85d1a' }}
              >
                Deutschland
              </span>
            </div>
          </Link>

          <p
            className="mb-6 max-w-[280px] text-[14px] leading-relaxed"
            style={{ color: '#A0A0A0' }}
          >
            Premium Cricketschläger, Schutzausrüstung, Teamkleidung und Zubehör.
            Leistung für Champions auf jedem Level.
          </p>

          {/* Social Icons */}
          <div className="mb-6 flex gap-3" aria-label="Social Media">
            {[
              { icon: Instagram, href: SITE_CONFIG.social.instagram, label: 'Instagram' },
              { icon: Facebook, href: SITE_CONFIG.social.facebook, label: 'Facebook' },
              { icon: Linkedin, href: SITE_CONFIG.social.linkedin, label: 'LinkedIn' },
              { icon: Youtube, href: SITE_CONFIG.social.youtube, label: 'YouTube' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded transition-colors"
                style={{ background: '#1c1c1c', color: '#A0A0A0' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#e85d1a'
                  e.currentTarget.style.color = '#ffffff'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#1c1c1c'
                  e.currentTarget.style.color = '#A0A0A0'
                }}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </a>
            ))}
          </div>

          {/* Contact Email */}
          <a
            href={`mailto:${SITE_CONFIG.contact.email}`}
            className="flex items-center gap-2 text-[13px] transition-colors"
            style={{ color: '#A0A0A0' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#e85d1a' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#A0A0A0' }}
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            {SITE_CONFIG.contact.email}
          </a>
        </div>

        {/* Nav Columns */}
        {[FOOTER_NAV.products, FOOTER_NAV.company, FOOTER_NAV.support].map((col) => (
          <div key={col.title}>
            <h3
              className="mb-5 font-display text-[12px] font-semibold uppercase tracking-[0.18em]"
              style={{ color: '#ffffff' }}
            >
              {col.title}
            </h3>
            <ul className="space-y-3" role="list">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-1.5 text-[13px] transition-colors"
                    style={{ color: '#A0A0A0' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#e85d1a' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = '#A0A0A0' }}
                  >
                    <ChevronRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ── Global Websites ───────────────────────────────────────── */}
      <div className="border-t" style={{ borderColor: '#1c1c1c' }}>
        <div
          className="flex flex-wrap items-center gap-x-0 gap-y-0"
          style={{ padding: '0 60px' }}
        >
          <span
            className="mr-6 shrink-0 font-display text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: '#6B6B6B', padding: '18px 0' }}
          >
            Mantra Sports Weltweit:
          </span>
          {[
            { label: 'Australien', flag: '🇦🇺', href: 'https://www.mantrasports.com.au' },
            { label: 'United States', flag: '🇺🇸', href: 'https://www.mantrasportsusa.com' },
            { label: 'Netherlands', flag: '🇳🇱', href: 'https://www.mantrasports.nl' },
            { label: 'Indien', flag: '🇮🇳', href: 'https://www.mantrasports.co.in' },
            { label: 'Kanada', flag: '🇨🇦', href: 'https://www.mantrasports.ca' },
          ].map((site, i, arr) => (
            <a
              key={site.label}
              href={site.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[12px] transition-colors"
              style={{
                color: '#6B6B6B',
                padding: '18px 20px',
                borderLeft: '1px solid #1c1c1c',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#e85d1a' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#6B6B6B' }}
            >
              <span aria-hidden="true">{site.flag}</span>
              {site.label}
            </a>
          ))}
        </div>
      </div>

      {/* ── Bottom Bar ────────────────────────────────────────────── */}
      <div className="border-t" style={{ borderColor: '#1c1c1c' }}>
        <div
          className="flex flex-col items-center justify-between gap-4 sm:flex-row"
          style={{ padding: '20px 60px' }}
        >
          <p className="text-[12px]" style={{ color: '#6B6B6B' }}>
            © {currentYear} Mantra Sports. Alle Rechte vorbehalten. Deutschland.
          </p>

          {/* Payment badges */}
          <div className="flex items-center gap-2">
            {['VISA', 'MASTERCARD', 'PAYPAL', 'KLARNA'].map((method) => (
              <span
                key={method}
                className="rounded-[2px] px-2.5 py-1 text-[10px] font-bold"
                style={{
                  background: '#1c1c1c',
                  color: '#6B6B6B',
                  border: '1px solid #2a2a2a',
                  letterSpacing: '0.08em',
                }}
              >
                {method}
              </span>
            ))}
          </div>

          {/* Legal mini-links */}
          <div className="flex items-center gap-4">
            {[
              { label: 'Datenschutz', href: '/privacy-policy' },
              { label: 'AGB', href: '/terms-and-conditions' },
              { label: 'Impressum', href: '/impressum' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[12px] transition-colors"
                style={{ color: '#6B6B6B' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#e85d1a' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#6B6B6B' }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
