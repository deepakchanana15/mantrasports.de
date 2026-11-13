import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export type SimpleSection = { title: string; paragraphs: string[] }

export function SimplePage({
  crumb,
  eyebrow,
  title,
  intro,
  sections,
  children,
}: {
  crumb: string
  eyebrow: string
  title: string
  intro?: string
  sections: SimpleSection[]
  children?: React.ReactNode
}) {
  return (
    <div className="bg-white">
      <div style={{ borderBottom: '1px solid #E0DFDB', padding: '12px 60px', background: '#F8F7F4' }}>
        <nav className="flex items-center gap-2 text-[12px]" style={{ color: '#6B6B6B' }}>
          <Link href="/" className="transition-colors hover:text-[#e85d1a]">Startseite</Link>
          <ChevronRight className="h-3 w-3" />
          <span style={{ color: '#111111' }}>{crumb}</span>
        </nav>
      </div>
      <div style={{ background: '#111111', borderBottom: '1px solid #1c1c1c' }}>
        <div style={{ padding: '64px 60px' }}>
          <p className="mb-3 font-display text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: '#e85d1a' }}>
            {eyebrow}
          </p>
          <h1 className="mb-4 font-display font-bold uppercase leading-tight tracking-[0.01em]" style={{ fontSize: 'clamp(36px, 5vw, 60px)', color: '#ffffff' }}>
            {title}
          </h1>
          {intro && (
            <p className="max-w-[620px] text-[16px] font-light leading-[1.8]" style={{ color: '#A0A0A0' }}>{intro}</p>
          )}
        </div>
      </div>
      <div style={{ padding: '64px 60px' }}>
        <div className="max-w-[820px] space-y-12">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="mb-4 font-display text-[22px] font-bold uppercase leading-tight tracking-[0.02em]" style={{ color: '#111111' }}>
                {section.title}
              </h2>
              <div className="space-y-4">
                {section.paragraphs.map((text, i) => (
                  <p key={i} className="text-[15px] leading-[1.8]" style={{ color: '#333333' }}>{text}</p>
                ))}
              </div>
            </section>
          ))}
          {children}
        </div>
      </div>
    </div>
  )
}
