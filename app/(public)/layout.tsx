import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'
import { CookieBanner } from '@/components/layout/CookieBanner'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Barrierefreiheit: Zum Hauptinhalt springen */}
      <a href="#main-content" className="skip-link">
        Zum Hauptinhalt springen
      </a>

      <Navbar />

      <main id="main-content" tabIndex={-1}>
        {children}
      </main>

      <Footer />

      {/* Floating WhatsApp CTA — visible across all public pages */}
      <WhatsAppButton />

      {/* GDPR cookie consent banner */}
      <CookieBanner />
    </>
  )
}
