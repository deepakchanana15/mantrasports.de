// Cookie consent state shared by the banner, the footer link and Google Analytics.
// Stored in localStorage only — nothing leaves the device until analytics is granted.

// Google tag (Tag Manager container) for the "Mantra Sports DE" GA4 property.
// The GA4 settings live inside the container, not in this code.
export const GOOGLE_TAG_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID ?? 'GTM-P72LD5SX'

// Bump the version whenever the banner text or the tools it covers change,
// so every visitor is asked again.
const CONSENT_KEY = 'mantra_consent_v2'
const LEGACY_KEY = 'mantra_cookie_consent'

export const CONSENT_CHANGE_EVENT = 'mantra:consent-change'
export const OPEN_CONSENT_EVENT = 'mantra:open-consent'

export type Consent = { analytics: boolean; updatedAt: string }

export function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY)
    return raw ? (JSON.parse(raw) as Consent) : null
  } catch {
    return null
  }
}

export function saveConsent(analytics: boolean) {
  const consent: Consent = { analytics, updatedAt: new Date().toISOString() }
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent))
    localStorage.removeItem(LEGACY_KEY)
  } catch {
    // private browsing — consent then only lasts for this page view
  }
  window.dispatchEvent(new CustomEvent<Consent>(CONSENT_CHANGE_EVENT, { detail: consent }))
}

export function openConsentSettings() {
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))
}

// Remove Google Analytics cookies (_ga, _ga_XXXX) after consent is withdrawn.
export function clearAnalyticsCookies() {
  const host = window.location.hostname
  const domains = ['', host, `.${host.replace(/^www\./, '')}`]
  for (const cookie of document.cookie.split(';')) {
    const name = cookie.split('=')[0].trim()
    if (!name.startsWith('_ga')) continue
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ''}`
    }
  }
}
