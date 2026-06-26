import type { Metadata } from 'next'
import Link from 'next/link'
import { Award, Package, Truck, Headphones, ChevronRight } from 'lucide-react'
import { WholesaleForm } from './WholesaleForm'

export const metadata: Metadata = {
  title: 'Großhandel & B2B — Mantra Sports DE',
  description:
    'Großhandelsanfragen für Vereine, Schulen und Einzelhändler. Premium Cricketausrüstung zu günstigen B2B-Preisen — EU-weit geliefert.',
}

const BENEFITS = [
  {
    icon: Award,
    title: 'Premium Qualität',
    text: 'Dieselben Profi-Produkte, die Nationalspieler verwenden — jetzt für dein Team oder dein Geschäft.',
  },
  {
    icon: Package,
    title: 'Flexible Mengen',
    text: 'Ob 10 oder 500 Einheiten — wir bieten skalierbare Großhandelspreise für jede Bestellgröße.',
  },
  {
    icon: Truck,
    title: 'EU-weiter Versand',
    text: 'Schnelle und zuverlässige Lieferung in alle EU-Länder, direkt an deine Adresse oder dein Lager.',
  },
  {
    icon: Headphones,
    title: 'Persönlicher Service',
    text: 'Unser B2B-Team steht dir für individuelle Anfragen, Sonderanfertigungen und Volumenrabatte zur Verfügung.',
  },
]

const WHO_FOR = [
  'Cricketvereine & Sportclubs',
  'Schulen & Universitäten',
  'Sportgeschäfte & Einzelhändler',
  'Wiederverkäufer & Distributoren',
  'Cricket-Akademien',
  'Nationale & regionale Verbände',
]

export default function WholesalePage() {
  return (
    <div className="bg-white">

      {/* ── Breadcrumb ── */}
      <div style={{ borderBottom: '1px solid #E0DFDB', padding: '12px 60px', background: '#F8F7F4' }}>
        <nav className="flex items-center gap-2 text-[12px]" style={{ color: '#6B6B6B' }}>
          <Link href="/" className="transition-colors hover:text-[#e85d1a]">Startseite</Link>
          <ChevronRight className="h-3 w-3" />
          <span style={{ color: '#111111' }}>Großhandel</span>
        </nav>
      </div>

      {/* ── Hero ── */}
      <div style={{ background: '#111111', borderBottom: '1px solid #1c1c1c' }}>
        <div style={{ padding: '72px 60px' }}>
          <p className="mb-3 font-display text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: '#e85d1a' }}>
            Für Vereine & Händler
          </p>
          <h1 className="mb-4 font-display font-bold uppercase leading-tight tracking-[0.01em]" style={{ fontSize: 'clamp(36px, 5vw, 64px)', color: '#ffffff' }}>
            Großhandel & B2B-Anfragen
          </h1>
          <p className="max-w-[560px] text-[16px] font-light leading-[1.8]" style={{ color: '#A0A0A0' }}>
            Mantra Sports DE liefert Premium-Cricketausrüstung an Vereine, Schulen, Händler und Akademien in ganz Europa — zu fairen Großhandelspreisen und mit persönlichem Service.
          </p>
        </div>
      </div>

      {/* ── Main content ── */}
      <div style={{ padding: '64px 60px' }}>
        <div className="grid gap-16" style={{ gridTemplateColumns: '1fr 1.2fr', alignItems: 'start' }}>

          {/* Left — info */}
          <div>
            <p className="mb-2 font-display text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: '#e85d1a' }}>Warum Mantra Sports</p>
            <h2 className="mb-8 font-display text-[32px] font-bold uppercase leading-tight tracking-[0.02em]" style={{ color: '#111111' }}>
              Dein zuverlässiger Cricket-Partner
            </h2>

            <div className="mb-10 space-y-0" style={{ border: '1px solid #E0DFDB' }}>
              {BENEFITS.map((item, i) => (
                <div key={item.title} className="flex gap-4" style={{ padding: '24px', borderBottom: i < BENEFITS.length - 1 ? '1px solid #E0DFDB' : 'none' }}>
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-[2px]" style={{ background: '#FFF5ED' }}>
                    <item.icon className="h-4 w-4" style={{ color: '#e85d1a' }} />
                  </div>
                  <div>
                    <h3 className="mb-1 font-display text-[15px] font-bold uppercase tracking-[0.04em]" style={{ color: '#111111' }}>{item.title}</h3>
                    <p className="text-[14px] leading-relaxed" style={{ color: '#6B6B6B' }}>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ border: '1px solid #E0DFDB', padding: '24px', background: '#F8F7F4' }}>
              <p className="mb-4 font-display text-[12px] font-semibold uppercase tracking-[0.14em]" style={{ color: '#6B6B6B' }}>Geeignet für</p>
              <ul className="space-y-2">
                {WHO_FOR.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[14px]" style={{ color: '#333333' }}>
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: '#e85d1a' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right — form */}
          <div>
            <WholesaleForm />
          </div>
        </div>
      </div>

    </div>
  )
}
