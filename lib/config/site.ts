import type { NavItem } from '@/types'

// ─── Core Site Configuration ─────────────────────────────────────────────────
export const SITE_CONFIG = {
  name: 'Mantra Sports DE',
  tagline: 'Ohne Grenzen spielen.',
  description:
    'Mantra Sports DE — Premium Cricketschläger, Schutzausrüstung, Bälle, Teamkleidung und Zubehör. Für Leistung gebaut. Weltweit vertraut.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mantrasports.de',
  locale: 'de-DE',
  region: 'de',
  currency: 'EUR',
  currencySymbol: '€',

  contact: {
    email: process.env.EMAIL_TO ?? 'info@mantrasports.de',
    phone: 'TO_BE_PROVIDED',
    address: 'TO_BE_PROVIDED',
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? 'TO_BE_PROVIDED',
  },

  social: {
    instagram: '#',
    facebook: '#',
    linkedin: '#',
    youtube: '#',
  },

  seo: {
    titleTemplate: '%s | Mantra Sports DE',
    defaultTitle: 'Mantra Sports DE — Premium Cricket Ausrüstung',
    defaultDescription:
      'Premium Cricketschläger, Schutzausrüstung, Teamkleidung und Zubehör bei Mantra Sports Deutschland. Großhandel & B2B-Anfragen willkommen.',
    defaultOgImage: '/images/og-default.jpg',
    twitterHandle: '@mantrasports',
  },
} as const

// ─── WhatsApp Helpers ─────────────────────────────────────────────────────────

export function getWhatsAppUrl(message?: string): string {
  const number = SITE_CONFIG.contact.whatsapp.replace(/\D/g, '')
  const encoded = encodeURIComponent(
    message ?? 'Hallo, ich möchte mich zu Mantra Sports Produkten erkundigen.'
  )
  return `https://wa.me/${number}?text=${encoded}`
}

export function getProductWhatsAppUrl(productName: string): string {
  const message = `Hallo, ich interessiere mich für ${productName}. Könnten Sie mir bitte weitere Details mitteilen?`
  return getWhatsAppUrl(message)
}

// ─── Navigation (German frontend) ─────────────────────────────────────────────

export const MAIN_NAV: NavItem[] = [
  {
    label: 'Shop',
    href: '/shop',
    children: [
      { label: 'Alle Produkte', href: '/shop' },
      { label: 'Cricketschläger', href: '/categories/cricket-bats' },
      { label: 'Schutzausrüstung', href: '/categories/protective-gear' },
      { label: 'Bälle', href: '/categories/balls' },
      { label: 'Zubehör', href: '/categories/accessories' },
      { label: 'Teamkleidung', href: '/categories/teamwear' },
      { label: 'Individuelle Bekleidung', href: '/categories/custom-apparel' },
    ],
  },
  {
    label: 'Kollektionen',
    href: '/collections',
  },
  {
    label: 'Großhandel',
    href: '/wholesale',
    children: [
      { label: 'Großhandelsanfrage', href: '/wholesale' },
      { label: 'B2B-Partnerschaften', href: '/b2b' },
      { label: 'Händler werden', href: '/become-a-dealer' },
    ],
  },
  {
    label: 'Über uns',
    href: '/about',
  },
  {
    label: 'Blog',
    href: '/blog',
  },
  {
    label: 'Kontakt',
    href: '/contact',
  },
]

export const FOOTER_NAV = {
  products: {
    title: 'Produkte',
    links: [
      { label: 'Cricketschläger', href: '/categories/cricket-bats' },
      { label: 'Schutzausrüstung', href: '/categories/protective-gear' },
      { label: 'Bälle', href: '/categories/balls' },
      { label: 'Zubehör', href: '/categories/accessories' },
      { label: 'Teamkleidung', href: '/categories/teamwear' },
      { label: 'Individuelle Bekleidung', href: '/categories/custom-apparel' },
    ],
  },
  company: {
    title: 'Unternehmen',
    links: [
      { label: 'Über uns', href: '/about' },
      { label: 'Großhandel', href: '/wholesale' },
      { label: 'B2B-Partnerschaften', href: '/b2b' },
      { label: 'Händler werden', href: '/become-a-dealer' },
      { label: 'Blog', href: '/blog' },
      { label: 'Kontakt', href: '/contact' },
    ],
  },
  support: {
    title: 'Hilfe & Support',
    links: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Versandrichtlinien', href: '/shipping-policy' },
      { label: 'Rückgaberichtlinien', href: '/returns-policy' },
      { label: 'Datenschutz', href: '/privacy-policy' },
      { label: 'AGB', href: '/terms-and-conditions' },
      { label: 'Sitemap', href: '/sitemap.xml' },
    ],
  },
}

// ─── Product Categories ───────────────────────────────────────────────────────

export const DEFAULT_CATEGORIES = [
  { name: 'Cricket Bats', slug: 'cricket-bats', sortOrder: 1 },
  { name: 'Protective Gear', slug: 'protective-gear', sortOrder: 2 },
  { name: 'Balls', slug: 'balls', sortOrder: 3 },
  { name: 'Accessories', slug: 'accessories', sortOrder: 4 },
  { name: 'Teamwear', slug: 'teamwear', sortOrder: 5 },
  { name: 'Custom Apparel', slug: 'custom-apparel', sortOrder: 6 },
] as const

// ─── Default Site Settings ────────────────────────────────────────────────────

export const DEFAULT_SITE_SETTINGS = {
  site_name: 'Mantra Sports DE',
  site_tagline: 'Ohne Grenzen spielen.',
  site_description: SITE_CONFIG.description,
  contact_email: 'info@mantrasports.de',
  contact_phone: 'TO_BE_PROVIDED',
  contact_address: 'TO_BE_PROVIDED',
  whatsapp_number: 'TO_BE_PROVIDED',
  social_instagram: '',
  social_facebook: '',
  social_linkedin: '',
  social_youtube: '',
  footer_text: `© ${new Date().getFullYear()} Mantra Sports. Alle Rechte vorbehalten.`,
  meta_title: SITE_CONFIG.seo.defaultTitle,
  meta_description: SITE_CONFIG.seo.defaultDescription,
} as const
