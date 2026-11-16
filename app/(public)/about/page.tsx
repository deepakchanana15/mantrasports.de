import type { Metadata } from 'next'
import Link from 'next/link'
import { SimplePage } from '@/components/layout/SimplePage'

export const metadata: Metadata = {
  title: 'Über uns – Cricket-Großhandel',
  description:
    'Mantra Sports beliefert Cricketvereine, Akademien, Schulen und Händler in Deutschland mit Schlägern aus englischer Weide, Schutzausrüstung, Bällen und Performance-Sportbekleidung.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <SimplePage
      crumb="Über uns"
      eyebrow="Unsere Geschichte"
      title="Über Mantra Sports"
      intro="Cricket-Ausrüstung im Großhandel für Vereine, Akademien, Schulen und Händler in Deutschland."
      sections={[
        {
          title: 'Wer wir sind',
          paragraphs: [
            'Mantra Sports ist eine Cricketmarke für Schläger aus englischer Weide, Schutzausrüstung, Bälle, Performance-Sportbekleidung und Zubehör. Die Marke wird von der Mantra Corporation Pty Ltd mit Sitz in Tasmanien, Australien, betrieben und ist auch in Australien und den USA aktiv.',
            'Diese Website ist unser Anlaufpunkt für Geschäftskunden in Deutschland: Vereine, Akademien, Schulen, Universitäten und Fachhändler, die ein ganzes Team ausstatten oder unsere Produkte führen möchten.',
          ],
        },
        {
          title: 'Unser Sortiment',
          paragraphs: [
            'Cricketschläger aus englischer Weide von Players’ Grade bis Grade III (Magnitude-, Raptor- und Cobra-Serie), Batting- und Wicket-Keeping-Handschuhe, Beinschützer, Oberschenkelschützer, Helme, Lederbälle in Rot, Weiß, Pink und Gelb, Performance-Sportbekleidung für Teams sowie Zubehör wie Griffe, Taschen und Stümpfe.',
          ],
        },
        {
          title: 'So arbeiten wir',
          paragraphs: [
            'Bestellungen laufen über ein individuelles Angebot: Sie senden uns eine Anfrage mit Produkten und Mengen, wir antworten mit Preisen, Versandkosten und Lieferzeit. Einen Online-Checkout gibt es auf dieser Website nicht.',
            'Herstellungsfehler ersetzen wir. Bei Fragen zu Größen, Gewichten oder dem passenden Schläger antwortet Ihnen ein Mensch – kein Ticketsystem.',
          ],
        },
      ]}
    >
      <p className="text-[15px] leading-[1.8]" style={{ color: '#333333' }}>
        <Link href="/wholesale" className="font-semibold text-[#e85d1a] hover:underline">Großhandelsanfrage senden →</Link>
      </p>
    </SimplePage>
  )
}
