'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import {
  GOOGLE_TAG_ID,
  CONSENT_CHANGE_EVENT,
  readConsent,
  clearAnalyticsCookies,
  type Consent,
} from '@/lib/analytics/consent'

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

// Set up the dataLayer once per page load with every consent type denied.
// Runs before any consent update and before gtm.js is requested.
function initGtag() {
  if (typeof window.gtag === 'function') return
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    // The Google tag expects the Arguments object, not an array
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments)
  }
  window.gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
  })
  window.gtag('set', 'ads_data_redaction', true)
  window.gtag('js', new Date())
}

/**
 * Google tag (GTM container → GA4) with Consent Mode v2, basic implementation.
 *
 * - All consent types default to "denied" before any Google code runs.
 * - gtm.js is only downloaded after the visitor allows statistics, so nothing
 *   is sent to Google — not even cookieless pings — without consent.
 * - Ads signals (ad_storage, ad_user_data, ad_personalization) stay denied:
 *   the site runs no Google Ads tags, and the banner only asks about statistics.
 * - Page views on client-side navigation come from GA4 enhanced measurement
 *   ("page changes based on browser history events"), which is on by default.
 */
export function GoogleAnalytics() {
  const [granted, setGranted] = useState(false)

  useEffect(() => {
    if (!GOOGLE_TAG_ID) return
    initGtag()

    function apply(consent: Consent | null) {
      const allowed = !!consent?.analytics
      window.gtag('consent', 'update', {
        analytics_storage: allowed ? 'granted' : 'denied',
      })
      if (allowed) {
        setGranted(true)
      } else {
        clearAnalyticsCookies()
      }
    }

    apply(readConsent())
    const onChange = (e: Event) => apply((e as CustomEvent<Consent>).detail)
    window.addEventListener(CONSENT_CHANGE_EVENT, onChange)
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onChange)
  }, [])

  if (!GOOGLE_TAG_ID || !granted) return null

  return (
    <Script
      id="google-tag"
      src={`https://www.googletagmanager.com/gtm.js?id=${GOOGLE_TAG_ID}`}
      strategy="afterInteractive"
    />
  )
}
