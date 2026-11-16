import type { Metadata } from 'next'
import { SimplePage } from '@/components/layout/SimplePage'

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Impressum und Anbieterkennzeichnung von Mantra Sports Deutschland (Mantra Corporation Pty Ltd).',
  alternates: { canonical: '/impressum' },
}

export default function ImpressumPage() {
  return (
    <SimplePage
      crumb="Impressum"
      eyebrow="Rechtliches"
      title="Impressum"
      sections={[
        {
          title: 'Anbieter',
          paragraphs: [
            'Mantra Corporation Pty Ltd',
            'Unit 2, 5 Ford Court, Newnham TAS 7248, Australien',
            'Australian Business Number (ABN): 13 675 757 838',
            'Die Mantra Corporation Pty Ltd ist eine in Australien eingetragene Gesellschaft. In Deutschland besteht keine Niederlassung.',
          ],
        },
        {
          title: 'Kontakt',
          paragraphs: [
            'E-Mail: support@mantrasports.com.au',
            'Telefon: +1 (385) 601-3759',
            'WhatsApp: +1 (267) 901-6382',
          ],
        },
        {
          title: 'Verbraucherstreitbeilegung',
          paragraphs: [
            'Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.',
          ],
        },
      ]}
    />
  )
}
