import type { Metadata } from 'next'
import { SimplePage } from '@/components/layout/SimplePage'
import { FAQSchema } from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  title: 'FAQ – Häufige Fragen zum Cricket-Großhandel',
  description:
    'Antworten zu Großhandelsbestellungen, Angeboten, Versand nach Deutschland, Zahlung, Gewährleistung und Schlägerqualitäten bei Mantra Sports.',
  alternates: { canonical: '/faq' },
}

const FAQS = [
  { question: 'Kann ich direkt online bestellen?', answer: 'Nein. Mantra Sports Deutschland arbeitet im B2B- und Großhandelsbereich. Sie senden uns eine Anfrage über das Großhandelsformular, per E-Mail oder WhatsApp und erhalten ein individuelles Angebot.' },
  { question: 'Wer kann bei Mantra Sports Deutschland bestellen?', answer: 'Cricketvereine, Akademien, Schulen, Universitäten und Fachhändler. Auch Teambestellungen für eine ganze Mannschaft sind möglich.' },
  { question: 'Wie schnell erhalte ich ein Angebot?', answer: 'In der Regel innerhalb eines Werktags. Das Angebot enthält Produkte, Mengen, Preise, Versandkosten und die voraussichtliche Lieferzeit und ist 14 Tage gültig.' },
  { question: 'Von wo wird versendet und wie lange dauert die Lieferung?', answer: 'Wir versenden aus Australien, in der Regel innerhalb von 1 bis 4 Werktagen nach Zahlungseingang. Die Zustellung nach Deutschland dauert danach üblicherweise 5 bis 14 Werktage.' },
  { question: 'Welche Zahlungsarten gibt es?', answer: 'Die Zahlungsarten werden im Angebot genannt, zum Beispiel Vorkasse per Banküberweisung oder PayPal.' },
  { question: 'Welche Holzqualitäten haben die Schläger?', answer: 'Unsere Schläger aus englischer Weide reichen von Players’ Grade, der höchsten Qualität, über Grade I und Grade II bis Grade III.' },
  { question: 'Was passiert bei einem Herstellungsfehler?', answer: 'Herstellungsfehler ersetzen wir. Melden Sie sich mit Fotos und Ihrer Bestellnummer bei uns.' },
  { question: 'Wie erreiche ich Mantra Sports?', answer: 'Telefon: +1 (385) 601-3759, WhatsApp: +1 (267) 901-6382, oder über das Kontakt- und Großhandelsformular auf dieser Website.' },
]

export default function FaqPage() {
  return (
    <>
      <FAQSchema items={FAQS} />
      <SimplePage
        crumb="FAQ"
        eyebrow="Hilfe"
        title="Häufige Fragen"
        intro="Alles Wichtige zu Großhandelsbestellungen, Angeboten, Versand und Gewährleistung."
        sections={FAQS.map((f) => ({ title: f.question, paragraphs: [f.answer] }))}
      />
    </>
  )
}
