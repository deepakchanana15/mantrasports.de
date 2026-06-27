'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { subscribeNewsletter } from '@/lib/actions/newsletter'
import {
  Star,
  ShieldCheck,
  Truck,
  Award,
  Headphones,
  RefreshCw,
  Package,
  ChevronRight,
  ArrowRight,
  Quote,
} from 'lucide-react'

// ── Types ─────────────────────────────────────────────────────────────────────

export interface CategoryDisplay {
  id: string
  name: string
  slug: string
  imageUrl: string | null
  productCount: number
}

export interface ProductDisplay {
  id: string
  name: string
  brand: string
  slug: string
  price: number | null
  salePrice: number | null
  imageUrl: string | null
  imageAlt: string
}

export interface HeroProduct {
  name: string
  slug: string
  price: number | null
  imageUrl: string | null
}

interface Props {
  heroImageUrl: string
  heroProduct: HeroProduct | null
  willowImageUrl: string | null
  categories: CategoryDisplay[]
  tabProducts: {
    neue: ProductDisplay[]
    bestseller: ProductDisplay[]
    willow: ProductDisplay[]
    sale: ProductDisplay[]
  }
}

// ── Static data ───────────────────────────────────────────────────────────────

const PLACEHOLDER_PRODUCTS = [
  { id: '1', name: 'Magnitude Legend Schläger', brand: 'Magnitude Serie', price: 1299, comparePrice: 1699, badge: 'SPARE 24%', badgeColor: '#e85d1a', stars: 5, reviews: 12, href: '/shop/magnitude-legend', emoji: '🏏', tab: 'neue' },
  { id: '2', name: 'Cobra Ultimate Schläger', brand: 'Cobra Serie', price: 388, comparePrice: 550, badge: 'BESTSELLER', badgeColor: '#111111', stars: 5, reviews: 34, href: '/shop/cobra-ultimate', emoji: '🏏', tab: 'bestseller' },
  { id: '3', name: 'Raptor Batting Handschuhe', brand: 'Raptor Serie', price: 188, comparePrice: 230, badge: 'NEU', badgeColor: '#059669', stars: 4, reviews: 8, href: '/shop/raptor-gloves', emoji: '🧤', tab: 'neue' },
  { id: '4', name: 'Magnitude Batting Pads', brand: 'Magnitude Serie', price: 138, comparePrice: 190, badge: 'BELIEBT', badgeColor: '#7c3aed', stars: 5, reviews: 21, href: '/shop/magnitude-pads', emoji: '🛡️', tab: 'bestseller' },
  { id: '5', name: 'Englisches Weidenholz Pro', brand: 'Premium Serie', price: 1899, comparePrice: null, badge: 'ENGLISH WILLOW', badgeColor: '#92400e', stars: 5, reviews: 5, href: '/shop/english-willow-pro', emoji: '🏏', tab: 'willow' },
  { id: '6', name: 'Heritage Willow Reserve', brand: 'Heritage Serie', price: 2499, comparePrice: null, badge: 'LIMITIERT', badgeColor: '#be185d', stars: 5, reviews: 3, href: '/shop/heritage-willow', emoji: '🏏', tab: 'willow' },
  { id: '7', name: 'Defender Helm', brand: 'Defender Serie', price: 149, comparePrice: 199, badge: 'SALE', badgeColor: '#e85d1a', stars: 4, reviews: 16, href: '/shop/defender-helmet', emoji: '⛑️', tab: 'sale' },
  { id: '8', name: 'Mantra Cricketball 6er Pack', brand: 'Match Serie', price: 79, comparePrice: 110, badge: 'SALE', badgeColor: '#e85d1a', stars: 4, reviews: 44, href: '/shop/cricket-balls-6pack', emoji: '🔴', tab: 'sale' },
]

const TABS = [
  { key: 'neue', label: 'Neue Arrivals' },
  { key: 'bestseller', label: 'Bestseller' },
  { key: 'willow', label: 'Englisches Weidenholz' },
  { key: 'sale', label: 'Im Angebot' },
]

const CATEGORIES = [
  { name: 'Cricketschläger', slug: 'cricket-bats', emoji: '🏏', href: '/categories/cricket-bats' },
  { name: 'Bälle', slug: 'balls', emoji: '🔴', href: '/categories/balls' },
  { name: 'Schutzausrüstung', slug: 'protective-gear', emoji: '🛡️', href: '/categories/protective-gear' },
  { name: 'Handschuhe', slug: 'accessories', emoji: '🧤', href: '/categories/accessories' },
  { name: 'Sporttaschen', slug: 'sports-bags', emoji: '🎒', href: '/categories/sports-bags' },
  { name: 'Individuelle Bekleidung', slug: 'custom-apparel', emoji: '👕', href: '/categories/custom-apparel' },
]

const TRUST_ITEMS = [
  { icon: Truck, text: 'Kostenloser Versand ab €100' },
  { icon: ShieldCheck, text: 'Sichere Zahlung & Datenschutz' },
  { icon: RefreshCw, text: '30 Tage Rückgaberecht' },
  { icon: Award, text: 'Authentische Premium-Qualität' },
  { icon: Headphones, text: 'Persönlicher Kundenservice' },
]

const WHY_ITEMS = [
  { icon: Award, title: 'Premium Qualität', text: 'Jeder Schläger handgefertigt aus dem besten englischen Weidenholz. Handwerkskunst, die du auf dem Spielfeld spürst.' },
  { icon: Package, title: 'Großhandel & B2B', text: 'Flexible Großhandelspreise für Vereine, Schulen und Händler. Partnerschaft, die skaliert.' },
  { icon: Truck, title: 'EU-weiter Versand', text: 'Schnelle Lieferung in alle EU-Länder. Kostenloser Versand ab €100 Bestellwert.' },
  { icon: Headphones, title: 'Expertenberatung', text: 'Unser Expertenteam hilft dir, die perfekte Ausrüstung für dein Spielniveau zu finden.' },
]

const REVIEWS = [
  { name: 'Rahul M.', location: 'München, DE', rating: 5, text: 'Absolut beeindruckende Qualität! Der Magnitude Legend schlägt sich wie ein Profigerät. Lieferung war schnell und die Verpackung perfekt. Klare Empfehlung!', product: 'Magnitude Legend Schläger' },
  { name: 'Priya S.', location: 'Berlin, DE', rating: 5, text: 'Endlich eine deutsche Anlaufstelle für Cricket! Die Raptor Handschuhe passen perfekt und die Qualität ist auf Weltklasse-Niveau. Werde definitiv wieder bestellen.', product: 'Raptor Batting Handschuhe' },
  { name: 'Arjun K.', location: 'Frankfurt, DE', rating: 5, text: 'Als Vereinskapitän bestelle ich regelmäßig für unser Team. Mantra Sports DE ist zuverlässig, die Großhandelspreise sind fair und der Service ist top.', product: 'Teambestellung — Schutzausrüstung' },
]

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatPrice(n: number) {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(n)
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex" aria-label={`${rating} von 5 Sternen`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5" fill={i < rating ? '#e85d1a' : 'none'} stroke={i < rating ? '#e85d1a' : '#D0CFC8'} />
      ))}
    </div>
  )
}

// ── Unified card type for both DB and placeholder products ────────────────────

type CardProduct = {
  id: string
  name: string
  brand: string
  price: number | null
  comparePrice: number | null
  badge: string
  badgeColor: string
  stars: number
  reviews: number
  href: string
  emoji: string
  imageUrl: string | null
}

function dbToCard(p: ProductDisplay, tab: string): CardProduct {
  const hasSale = p.salePrice !== null && p.salePrice !== undefined
  const badge = hasSale ? 'SALE' : tab === 'neue' ? 'NEU' : tab === 'bestseller' ? 'BESTSELLER' : tab === 'willow' ? 'ENGLISH WILLOW' : ''
  const badgeColor = hasSale || tab === 'sale' ? '#e85d1a' : tab === 'neue' ? '#059669' : tab === 'willow' ? '#92400e' : '#111111'
  return {
    id: p.id,
    name: p.name,
    brand: p.brand || 'Mantra Sports',
    price: p.price,
    comparePrice: hasSale ? p.price : null,
    badge,
    badgeColor,
    stars: 5,
    reviews: 0,
    href: `/shop/${p.slug}`,
    emoji: '🏏',
    imageUrl: p.imageUrl,
  }
}

function placeholderToCard(p: typeof PLACEHOLDER_PRODUCTS[0]): CardProduct {
  return {
    id: p.id,
    name: p.name,
    brand: p.brand,
    price: p.price,
    comparePrice: p.comparePrice,
    badge: p.badge,
    badgeColor: p.badgeColor,
    stars: p.stars,
    reviews: p.reviews,
    href: p.href,
    emoji: p.emoji,
    imageUrl: null,
  }
}

// ── Product Card ──────────────────────────────────────────────────────────────

function ProductCard({ product }: { product: CardProduct }) {
  return (
    <Link href={product.href} className="group flex flex-col" style={{ border: '1px solid #E0DFDB', background: '#ffffff' }}>
      {/* Image area */}
      <div className="relative flex items-center justify-center overflow-hidden" style={{ background: '#F8F7F4', height: '260px' }}>
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-contain p-4"
          />
        ) : (
          <span className="select-none text-7xl" aria-hidden="true">{product.emoji}</span>
        )}

        {product.badge && (
          <span
            className="absolute left-3 top-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white"
            style={{ background: product.badgeColor }}
          >
            {product.badge}
          </span>
        )}

        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: 'rgba(17,17,17,0.6)' }}
        >
          <span className="border px-5 py-2 font-display text-[13px] font-semibold uppercase tracking-widest text-white" style={{ borderColor: 'white' }}>
            Anfrage stellen
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-4" style={{ borderTop: '1px solid #E0DFDB' }}>
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.15em]" style={{ color: '#6B6B6B' }}>
          {product.brand}
        </p>
        <h3 className="mb-2 flex-1 font-display text-[16px] font-semibold uppercase leading-tight tracking-[0.02em]" style={{ color: '#111111' }}>
          {product.name}
        </h3>

        {product.reviews > 0 && (
          <div className="mb-3 flex items-center gap-2">
            <StarRating rating={product.stars} />
            <span className="text-[11px]" style={{ color: '#6B6B6B' }}>({product.reviews})</span>
          </div>
        )}

        <div className="flex items-baseline gap-2">
          {product.price !== null ? (
            <>
              <span className="font-display text-[20px] font-semibold" style={{ color: '#e85d1a' }}>
                {formatPrice(product.price)}
              </span>
              {product.comparePrice && product.comparePrice !== product.price && (
                <span className="text-[13px] line-through" style={{ color: '#A0A0A0' }}>
                  {formatPrice(product.comparePrice)}
                </span>
              )}
            </>
          ) : (
            <span className="font-display text-[14px] font-semibold uppercase tracking-wider" style={{ color: '#6B6B6B' }}>
              Auf Anfrage
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export function HomePageClient({ heroImageUrl, heroProduct, willowImageUrl, categories, tabProducts }: Props) {
  const [activeTab, setActiveTab] = useState('neue')
  const [email, setEmail] = useState('')
  const [newsletterSent, setNewsletterSent] = useState(false)
  const [newsletterError, setNewsletterError] = useState('')
  const [newsletterLoading, setNewsletterLoading] = useState(false)

  // Build category image lookup: slug → imageUrl from DB
  const catImageBySlug: Record<string, string | null> = {}
  const catCountBySlug: Record<string, number> = {}
  for (const cat of categories) {
    catImageBySlug[cat.slug] = cat.imageUrl
    catCountBySlug[cat.slug] = cat.productCount
  }

  // Resolve products for active tab — use DB data if available, fall back to placeholders
  function getTabCards(tab: string): CardProduct[] {
    const dbList = tabProducts[tab as keyof typeof tabProducts]
    if (dbList && dbList.length > 0) return dbList.map((p) => dbToCard(p, tab))
    return PLACEHOLDER_PRODUCTS.filter((p) => p.tab === tab).map(placeholderToCard)
  }

  const filteredProducts = getTabCards(activeTab)

  // Hero visual
  const heroVisualUrl = heroImageUrl || heroProduct?.imageUrl || null
  const heroName = heroProduct?.name || 'Magnitude Legend'
  const heroPrice = heroProduct?.price !== null && heroProduct?.price !== undefined ? heroProduct.price : 1299

  return (
    <div className="overflow-x-hidden bg-white">

      {/* ══════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════ */}
      <section aria-labelledby="hero-heading" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '88vh', borderBottom: '1px solid #E0DFDB' }}>
        {/* Left — Text */}
        <div className="flex flex-col justify-center" style={{ padding: '80px 60px 80px 80px', borderRight: '1px solid #E0DFDB' }}>
          <span className="mb-7 inline-flex items-center gap-2 self-start rounded-[2px] px-[14px] py-[6px] font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-white" style={{ background: '#e85d1a' }}>
            🏏 Neu in Deutschland
          </span>

          <h1 id="hero-heading" className="mb-6 font-display font-bold uppercase leading-[0.93] tracking-[-0.01em]" style={{ fontSize: 'clamp(52px, 7vw, 88px)', color: '#111111' }}>
            OHNE <span style={{ color: '#e85d1a' }}>GRENZEN</span><br />SPIELEN
          </h1>

          <p className="mb-10 max-w-[420px] text-[16px] font-light leading-[1.7]" style={{ color: '#6B6B6B' }}>
            Premium Cricketschläger, Schutzausrüstung und Teamkleidung — direkt nach Deutschland geliefert. Vertraut von Spielern in ganz Europa.
          </p>

          <div className="mb-14 flex flex-wrap gap-3">
            <Link href="/shop" className="inline-flex items-center gap-2 rounded-[2px] font-display text-[15px] font-medium uppercase tracking-[0.1em] text-white transition-colors" style={{ background: '#e85d1a', padding: '16px 36px', border: '2px solid #e85d1a' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#c44b0f'; e.currentTarget.style.borderColor = '#c44b0f' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#e85d1a'; e.currentTarget.style.borderColor = '#e85d1a' }}>
              Jetzt shoppen <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-[2px] font-display text-[15px] font-medium uppercase tracking-[0.1em] transition-colors" style={{ color: '#111111', padding: '15px 36px', border: '2px solid #111111', background: 'transparent' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#111111'; e.currentTarget.style.color = '#ffffff' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#111111' }}>
              Anfrage stellen
            </Link>
          </div>

          <div className="flex" style={{ borderTop: '1px solid #E0DFDB' }}>
            {[{ num: '500+', label: 'Kunden' }, { num: '50+', label: 'Produkte' }, { num: 'EU-weit', label: 'Lieferung' }].map((stat, i) => (
              <div key={stat.num} className="flex-1 pt-6" style={{ borderRight: i < 2 ? '1px solid #E0DFDB' : 'none', paddingRight: i < 2 ? '24px' : '0', paddingLeft: i > 0 ? '24px' : '0' }}>
                <div className="font-display text-[32px] font-semibold leading-none" style={{ color: '#e85d1a' }}>{stat.num}</div>
                <div className="mt-1 text-[11px] font-medium uppercase tracking-[0.12em]" style={{ color: '#6B6B6B' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Visual */}
        <div className="relative flex items-center justify-center overflow-hidden" style={{ background: '#F8F7F4' }}>
          <div aria-hidden="true" className="absolute rounded-full" style={{ width: '520px', height: '520px', border: '1px solid #E0DFDB', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
          <div aria-hidden="true" className="absolute rounded-full" style={{ width: '380px', height: '380px', border: '1px solid #E0DFDB', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />

          {/* Hero visual: full-panel product image or emoji fallback */}
          {heroVisualUrl ? (
            /* Image fills the usable area — cleared above by the badge and below by the info card */
            <div className="absolute z-10" style={{ top: '72px', left: '32px', right: '32px', bottom: '168px' }}>
              <div className="relative w-full h-full">
                <Image
                  src={heroVisualUrl}
                  alt={heroName}
                  fill
                  sizes="50vw"
                  priority
                  className="object-contain"
                  style={{ filter: 'drop-shadow(0 24px 48px rgba(0,0,0,0.13))' }}
                />
              </div>
            </div>
          ) : (
            <div className="relative z-10 flex flex-col items-center text-center">
              <span className="mb-4 select-none" style={{ fontSize: '120px', lineHeight: 1 }} aria-hidden="true">🏏</span>
              <span className="font-display text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: '#6B6B6B' }}>
                {heroProduct?.name || 'Magnitude Legend'}
              </span>
              <span className="font-display text-[13px] font-semibold uppercase tracking-[0.1em]" style={{ color: '#e85d1a' }}>
                Ab {formatPrice(heroPrice)}
              </span>
            </div>
          )}

          {/* Info card */}
          <div className="absolute bottom-8 right-8" style={{ background: '#ffffff', border: '1px solid #E0DFDB', padding: '16px 20px', maxWidth: '200px' }}>
            <p className="mb-1 font-display text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color: '#6B6B6B' }}>Neue Saison 2025</p>
            <p className="font-display text-[15px] font-bold uppercase leading-tight tracking-[0.04em]" style={{ color: '#111111' }}>
              {heroProduct?.name || 'Magnitude Legend Serie'}
            </p>
            <p className="mt-1 text-[12px]" style={{ color: '#6B6B6B' }}>Englisches Weidenholz Klasse I</p>
            <Link href="/shop" className="mt-3 flex items-center gap-1 text-[12px] font-semibold uppercase tracking-wider" style={{ color: '#e85d1a' }}>
              Entdecken <ChevronRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="absolute left-8 top-8 px-3 py-1.5 font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-white" style={{ background: '#111111' }}>
            Premium Cricket
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          TRUST BAR
      ══════════════════════════════════════════════════════════════ */}
      <section aria-label="Vertrauensmerkmale" style={{ borderBottom: '1px solid #E0DFDB' }}>
        <div className="flex flex-wrap items-center justify-center" style={{ padding: '0 60px' }}>
          {TRUST_ITEMS.map((item, i) => (
            <div key={item.text} className="flex items-center gap-3" style={{ padding: '18px 32px', borderRight: i < TRUST_ITEMS.length - 1 ? '1px solid #E0DFDB' : 'none' }}>
              <item.icon className="h-4 w-4 shrink-0" style={{ color: '#e85d1a' }} aria-hidden="true" />
              <span className="whitespace-nowrap text-[13px] font-medium" style={{ color: '#333333' }}>{item.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          CATEGORIES GRID
      ══════════════════════════════════════════════════════════════ */}
      <section aria-labelledby="categories-heading" style={{ padding: '80px 60px', borderBottom: '1px solid #E0DFDB' }}>
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-2 font-display text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: '#e85d1a' }}>Kollektionen</p>
            <h2 id="categories-heading" className="font-display font-bold uppercase leading-tight tracking-[0.01em]" style={{ fontSize: 'clamp(34px, 4vw, 52px)', color: '#111111' }}>
              Alle Kategorien
            </h2>
          </div>
          <Link href="/shop" className="flex items-center gap-2 font-display text-[13px] font-semibold uppercase tracking-widest transition-colors" style={{ color: '#e85d1a' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#c44b0f' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#e85d1a' }}>
            Alle anzeigen <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid" style={{ gridTemplateColumns: 'repeat(6, 1fr)', border: '1px solid #E0DFDB' }}>
          {CATEGORIES.map((cat, i) => {
            const dbImage = catImageBySlug[cat.slug] ?? null
            const count = catCountBySlug[cat.slug] ?? null
            return (
              <Link key={cat.name} href={cat.href} className="group flex flex-col items-center justify-center text-center transition-colors" style={{ padding: '36px 16px', borderRight: i < CATEGORIES.length - 1 ? '1px solid #E0DFDB' : 'none', background: '#ffffff' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#e85d1a'
                  e.currentTarget.querySelectorAll<HTMLElement>('span').forEach((s) => { s.style.color = '#ffffff' })
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#ffffff'
                  e.currentTarget.querySelectorAll<HTMLElement>('span').forEach((s, si) => { s.style.color = si === 0 ? '#111111' : '#6B6B6B' })
                }}
              >
                {/* Category image or emoji */}
                {dbImage ? (
                  <div className="relative mb-4 overflow-hidden rounded" style={{ width: '96px', height: '96px' }}>
                    <Image src={dbImage} alt={cat.name} fill sizes="96px" className="object-cover" />
                  </div>
                ) : (
                  <span className="mb-4 block select-none transition-colors" style={{ fontSize: '64px', lineHeight: 1 }} aria-hidden="true">
                    {cat.emoji}
                  </span>
                )}
                <span className="block font-display text-[13px] font-semibold uppercase leading-tight tracking-[0.06em] transition-colors" style={{ color: '#111111' }}>
                  {cat.name}
                </span>
                <span className="mt-1 block text-[11px] transition-colors" style={{ color: '#6B6B6B' }}>
                  {count !== null ? `${count} Produkte` : cat.slug === 'custom-apparel' ? 'Individuelle Bestellungen' : ''}
                </span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          FEATURED PRODUCTS
      ══════════════════════════════════════════════════════════════ */}
      <section aria-labelledby="products-heading" style={{ padding: '80px 60px', background: '#F8F7F4', borderBottom: '1px solid #E0DFDB' }}>
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="mb-2 font-display text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: '#e85d1a' }}>Unsere Produkte</p>
            <h2 id="products-heading" className="font-display font-bold uppercase leading-tight tracking-[0.01em]" style={{ fontSize: 'clamp(34px, 4vw, 52px)', color: '#111111' }}>
              Ausgewählte Ausrüstung
            </h2>
          </div>
          <Link href="/shop" className="hidden items-center gap-2 font-display text-[13px] font-semibold uppercase tracking-widest transition-colors md:flex" style={{ color: '#e85d1a' }}>
            Alle Produkte <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mb-8 flex gap-0" role="tablist" aria-label="Produkt-Kategorien" style={{ borderBottom: '1px solid #E0DFDB' }}>
          {TABS.map((tab) => (
            <button key={tab.key} type="button" role="tab" aria-selected={activeTab === tab.key} onClick={() => setActiveTab(tab.key)}
              className="font-display text-[13px] font-medium uppercase tracking-[0.06em] transition-colors"
              style={{ padding: '14px 24px', color: activeTab === tab.key ? '#e85d1a' : '#6B6B6B', borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderBottom: activeTab === tab.key ? '2px solid #e85d1a' : '2px solid transparent', background: 'none', cursor: 'pointer' }}>
              {tab.label}
            </button>
          ))}
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid gap-0" style={{ gridTemplateColumns: 'repeat(4, 1fr)', border: '1px solid #E0DFDB' }}>
            {filteredProducts.map((product, i) => (
              <div key={product.id} style={{ borderRight: i < filteredProducts.length - 1 ? '1px solid #E0DFDB' : 'none' }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center py-20 font-display text-[13px] uppercase tracking-widest" style={{ color: '#6B6B6B', border: '1px solid #E0DFDB', background: '#ffffff' }}>
            Demnächst verfügbar
          </div>
        )}

        <div className="mt-8 text-center">
          <Link href="/shop" className="inline-flex items-center gap-2 rounded-[2px] font-display text-[14px] font-medium uppercase tracking-[0.1em] text-white transition-colors" style={{ background: '#111111', padding: '14px 36px' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#e85d1a' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#111111' }}>
            Alle Produkte ansehen <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          ENGLISH WILLOW — Dark section
      ══════════════════════════════════════════════════════════════ */}
      <section aria-labelledby="willow-heading" style={{ background: '#111111', borderBottom: '1px solid #1c1c1c' }}>
        <div className="grid items-center" style={{ gridTemplateColumns: '1fr 1fr', minHeight: '520px' }}>
          <div className="relative flex items-center justify-center overflow-hidden" style={{ background: '#1c1c1c', height: '520px', borderRight: '1px solid #2a2a2a' }}>
            <div aria-hidden="true" className="absolute rounded-full" style={{ width: '400px', height: '400px', border: '1px solid #2a2a2a', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
            {willowImageUrl ? (
              <div className="absolute z-10" style={{ top: '32px', left: '32px', right: '32px', bottom: '56px' }}>
                <Image
                  src={willowImageUrl}
                  alt="Magnitude Legend — English Willow Cricketschläger"
                  fill
                  sizes="50vw"
                  className="object-contain"
                  style={{ filter: 'drop-shadow(0 16px 40px rgba(0,0,0,0.5))' }}
                />
              </div>
            ) : (
              <span style={{ fontSize: '100px', zIndex: 10, position: 'relative' }} aria-hidden="true">🏏</span>
            )}
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-6 py-4" style={{ background: 'rgba(232,93,26,0.15)', borderTop: '1px solid rgba(232,93,26,0.3)', zIndex: 20 }}>
              <span className="font-display text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: '#e85d1a' }}>Handgefertigt</span>
              <span className="font-display text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: '#e85d1a' }}>English Willow Klasse I</span>
            </div>
          </div>

          <div style={{ padding: '60px 80px' }}>
            <span className="mb-6 inline-block font-display text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: '#e85d1a' }}>Premium Collection</span>
            <h2 id="willow-heading" className="mb-6 font-display font-bold uppercase leading-tight tracking-[0.01em]" style={{ fontSize: 'clamp(30px, 3.5vw, 46px)', color: '#ffffff' }}>
              English Willow<br /><span style={{ color: '#e85d1a' }}>Cricketschläger</span>
            </h2>
            <p className="mb-8 text-[15px] leading-[1.8]" style={{ color: '#A0A0A0', maxWidth: '400px' }}>
              Gefertigt aus dem feinsten englischen Weidenholz — jeder Schläger ein Unikat. Handpicked grain, handcrafted blade, professional performance.
            </p>
            <ul className="mb-8 space-y-3">
              {['Englisches Weidenholz Klasse I–III', 'Handgefertigte Klingenverarbeitung', 'Professionell aufgeklopft & ölgetränkt', 'Individuelle Gewichts- und Grip-Auswahl'].map((feat) => (
                <li key={feat} className="flex items-start gap-3 text-[14px]" style={{ color: '#A0A0A0' }}>
                  <ChevronRight className="mt-0.5 h-4 w-4 shrink-0" style={{ color: '#e85d1a' }} />{feat}
                </li>
              ))}
            </ul>
            <Link href="/categories/cricket-bats" className="inline-flex items-center gap-2 rounded-[2px] font-display text-[14px] font-medium uppercase tracking-[0.1em] text-white transition-colors" style={{ background: '#e85d1a', padding: '14px 32px', border: '2px solid #e85d1a' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'transparent' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#e85d1a' }}>
              Kollektion entdecken <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          WHY MANTRA
      ══════════════════════════════════════════════════════════════ */}
      <section aria-labelledby="why-heading" style={{ padding: '80px 60px', background: '#ffffff', borderBottom: '1px solid #E0DFDB' }}>
        <div className="mb-12 text-center">
          <p className="mb-2 font-display text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: '#e85d1a' }}>Warum Mantra Sports</p>
          <h2 id="why-heading" className="font-display font-bold uppercase leading-tight tracking-[0.01em]" style={{ fontSize: 'clamp(34px, 4vw, 52px)', color: '#111111' }}>Der Mantra-Unterschied</h2>
        </div>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', border: '1px solid #E0DFDB' }}>
          {WHY_ITEMS.map((item, i) => (
            <div key={item.title} className="group flex flex-col transition-colors" style={{ padding: '40px 32px', borderRight: i < WHY_ITEMS.length - 1 ? '1px solid #E0DFDB' : 'none', background: '#ffffff' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#F8F7F4' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#ffffff' }}>
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-[2px]" style={{ background: '#FFF5ED' }}>
                <item.icon className="h-5 w-5" style={{ color: '#e85d1a' }} aria-hidden="true" />
              </div>
              <h3 className="mb-3 font-display text-[18px] font-semibold uppercase tracking-[0.04em]" style={{ color: '#111111' }}>{item.title}</h3>
              <p className="text-[14px] leading-relaxed" style={{ color: '#6B6B6B' }}>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          REVIEWS
      ══════════════════════════════════════════════════════════════ */}
      <section aria-labelledby="reviews-heading" style={{ padding: '80px 60px', background: '#F8F7F4', borderBottom: '1px solid #E0DFDB' }}>
        <div className="mb-12 text-center">
          <p className="mb-2 font-display text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: '#e85d1a' }}>Kundenstimmen</p>
          <h2 id="reviews-heading" className="font-display font-bold uppercase leading-tight tracking-[0.01em]" style={{ fontSize: 'clamp(34px, 4vw, 52px)', color: '#111111' }}>Was unsere Kunden sagen</h2>
        </div>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', border: '1px solid #E0DFDB' }}>
          {REVIEWS.map((review, i) => (
            <div key={review.name} className="flex flex-col bg-white" style={{ padding: '36px 32px', borderRight: i < REVIEWS.length - 1 ? '1px solid #E0DFDB' : 'none' }}>
              <Quote className="mb-4 h-8 w-8" style={{ color: '#E0DFDB' }} aria-hidden="true" />
              <div className="mb-4"><StarRating rating={review.rating} /></div>
              <p className="mb-6 flex-1 text-[14px] leading-[1.75]" style={{ color: '#333333' }}>"{review.text}"</p>
              <div style={{ borderTop: '1px solid #F2F1EE', paddingTop: '16px' }}>
                <p className="font-display text-[15px] font-semibold uppercase tracking-[0.04em]" style={{ color: '#111111' }}>{review.name}</p>
                <p className="text-[12px]" style={{ color: '#6B6B6B' }}>{review.location}</p>
                <p className="mt-1 text-[11px] font-medium uppercase tracking-wider" style={{ color: '#e85d1a' }}>{review.product}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          WHOLESALE BANNER
      ══════════════════════════════════════════════════════════════ */}
      <section aria-labelledby="wholesale-heading" style={{ background: '#F8F7F4', borderBottom: '1px solid #E0DFDB' }}>
        <div className="flex items-center justify-between" style={{ padding: '40px 60px', borderBottom: '1px solid #E0DFDB' }}>
          <div>
            <p className="mb-1 font-display text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: '#e85d1a' }}>Für Vereine & Händler</p>
            <h2 id="wholesale-heading" className="font-display text-[28px] font-bold uppercase tracking-[0.02em]" style={{ color: '#111111' }}>Großhandel & B2B-Anfragen</h2>
            <p className="mt-2 text-[14px]" style={{ color: '#6B6B6B' }}>Günstige Großhandelspreise für Vereine, Schulen und Einzelhändler.</p>
          </div>
          <Link href="/wholesale" className="inline-flex shrink-0 items-center gap-2 rounded-[2px] font-display text-[14px] font-medium uppercase tracking-[0.1em] text-white transition-colors" style={{ background: '#111111', padding: '14px 32px' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#e85d1a' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#111111' }}>
            Großhandelsanfrage stellen <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          NEWSLETTER
      ══════════════════════════════════════════════════════════════ */}
      <section aria-labelledby="newsletter-heading" style={{ background: '#e85d1a' }}>
        <div className="flex flex-col items-center text-center" style={{ padding: '64px 60px' }}>
          <p className="mb-2 font-display text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: 'rgba(255,255,255,0.7)' }}>Newsletter</p>
          <h2 id="newsletter-heading" className="mb-3 font-display text-[36px] font-bold uppercase leading-tight tracking-[0.01em] text-white">Immer auf dem neuesten Stand</h2>
          <p className="mb-8 max-w-[460px] text-[15px] text-white" style={{ opacity: 0.85 }}>
            Erhalte exklusive Angebote, neue Produktneuheiten und Cricket-News direkt in deinen Posteingang.
          </p>

          {newsletterSent ? (
            <div className="flex items-center gap-3 rounded-[2px] px-8 py-4 font-display text-[14px] font-semibold uppercase tracking-wider text-white" style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)' }}>
              ✓ Vielen Dank! Du bist angemeldet.
            </div>
          ) : (
            <form
              className="flex items-stretch gap-0"
              style={{ maxWidth: '480px', width: '100%' }}
              onSubmit={async (e) => {
                e.preventDefault()
                if (!email) return
                setNewsletterLoading(true)
                setNewsletterError('')
                const result = await subscribeNewsletter(email)
                if (result.ok) {
                  setNewsletterSent(true)
                } else {
                  setNewsletterError(result.error ?? 'Fehler')
                }
                setNewsletterLoading(false)
              }}
            >
              <label htmlFor="newsletter-email" className="sr-only">E-Mail-Adresse</label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Deine E-Mail-Adresse"
                style={{ flex: 1, height: '52px', padding: '0 16px', fontSize: '14px', outline: 'none', background: '#ffffff', color: '#111111', border: 'none', fontFamily: 'var(--font-inter)' }}
              />
              <button
                type="submit"
                disabled={newsletterLoading}
                style={{ height: '52px', padding: '0 28px', background: '#111111', border: 'none', cursor: newsletterLoading ? 'wait' : 'pointer', color: '#ffffff', fontFamily: 'var(--font-oswald), Oswald, sans-serif', fontSize: '13px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', whiteSpace: 'nowrap', flexShrink: 0, opacity: newsletterLoading ? 0.7 : 1 }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#1c1c1c' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#111111' }}
              >
                {newsletterLoading ? '…' : 'Anmelden'}
              </button>
            </form>
            {newsletterError && (
              <p className="mt-2 text-[12px]" style={{ color: 'rgba(255,255,255,0.9)' }}>{newsletterError}</p>
            )}
          )}

          <p className="mt-4 text-[12px]" style={{ color: 'rgba(255,255,255,0.6)' }}>Kein Spam. Abmeldung jederzeit möglich.</p>
        </div>
      </section>

    </div>
  )
}
