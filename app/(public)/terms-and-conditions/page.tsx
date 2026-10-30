import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/config/site'

export const metadata: Metadata = {
  title: 'AGB — Mantra Sports DE',
  description:
    'Allgemeine Geschäftsbedingungen (AGB) von Mantra Sports Deutschland für Bestellungen, Angebote und Großhandelsaufträge.',
  alternates: { canonical: '/terms-and-conditions' },
}

// Contracting entity for the German site (Australian company).
// ⚠ TODO: Fill in street, city and ABN before going live.
// These must match the Impressum exactly.
const COMPANY = {
  legalName: 'Mantra Corporation Pty Ltd',
  street: '[Street address]',
  city: '[Suburb State Postcode]',
  country: 'Australien',
  abn: '[ABN]',
  email: 'support@mantrasports.com.au',
  lastUpdated: '30. Oktober 2026',
}

const ADDRESS = `${COMPANY.street}, ${COMPANY.city}, ${COMPANY.country}`

type Section = { title: string; paragraphs: string[] }

const SECTIONS: Section[] = [
  {
    title: '§ 1 Geltungsbereich',
    paragraphs: [
      `Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge über die Lieferung von Waren zwischen ${COMPANY.legalName} (nachfolgend „Mantra Sports“ oder „wir“) und unseren Kundinnen und Kunden (nachfolgend „Kunde“), die über unsere Website ${SITE_CONFIG.url}, per E-Mail, WhatsApp oder Telefon zustande kommen.`,
      'Verbraucher im Sinne dieser AGB ist jede natürliche Person, die ein Rechtsgeschäft zu Zwecken abschließt, die überwiegend weder ihrer gewerblichen noch ihrer selbständigen beruflichen Tätigkeit zugerechnet werden können (§ 13 BGB). Unternehmer ist jede natürliche oder juristische Person oder rechtsfähige Personengesellschaft, die bei Abschluss eines Rechtsgeschäfts in Ausübung ihrer gewerblichen oder selbständigen beruflichen Tätigkeit handelt (§ 14 BGB). Vereine und Akademien, die Ware für ihren Vereins- oder Trainingsbetrieb bestellen, gelten in der Regel als Unternehmer.',
      'Abweichende Bedingungen des Kunden werden nicht anerkannt, es sei denn, wir stimmen ihrer Geltung ausdrücklich in Textform zu.',
    ],
  },
  {
    title: '§ 2 Vertragspartner',
    paragraphs: [
      `Der Vertrag kommt zustande mit: ${COMPANY.legalName}, ${ADDRESS}, ABN: ${COMPANY.abn}, E-Mail: ${COMPANY.email}. ${COMPANY.legalName} ist eine in Australien eingetragene Gesellschaft. Weitere Angaben finden Sie in unserem Impressum.`,
    ],
  },
  {
    title: '§ 3 Vertragsschluss',
    paragraphs: [
      'Die Darstellung der Produkte auf unserer Website stellt kein rechtlich bindendes Angebot dar, sondern eine unverbindliche Aufforderung zur Abgabe einer Anfrage.',
      'Der Kunde kann über das Kontakt- oder Großhandelsformular, per E-Mail oder per WhatsApp eine unverbindliche Anfrage senden. Daraufhin erhält er von uns ein individuelles Angebot in Textform mit Angabe von Produkten, Mengen, Preisen, Versandkosten und voraussichtlicher Lieferzeit.',
      'Der Vertrag kommt zustande, wenn der Kunde unser Angebot in Textform (z. B. per E-Mail oder WhatsApp) annimmt und wir die Bestellung anschließend mit einer Auftragsbestätigung bestätigen. Unsere Angebote sind, sofern nicht anders angegeben, 14 Tage gültig.',
      'Die Vertragssprache ist Deutsch. Den Vertragstext (Angebot, Auftragsbestätigung und diese AGB) senden wir dem Kunden in Textform zu.',
    ],
  },
  {
    title: '§ 4 Preise und Versandkosten',
    paragraphs: [
      'Die Ware wird aus Australien versandt. Bei Lieferungen nach Deutschland und in andere Länder der EU fallen Einfuhrumsatzsteuer und gegebenenfalls Zölle an. Im jeweiligen Angebot geben wir ausdrücklich an, ob diese Abgaben bereits im Preis enthalten sind oder vom Kunden bei der Zustellung an das Transportunternehmen bzw. den Zoll zu entrichten sind.',
      'Zusätzlich anfallende Versandkosten werden im jeweiligen Angebot gesondert ausgewiesen.',
    ],
  },
  {
    title: '§ 5 Zahlung',
    paragraphs: [
      'Die verfügbaren Zahlungsarten werden im Angebot genannt (z. B. Vorkasse per Banküberweisung oder PayPal). Ist Vorkasse vereinbart, ist der Rechnungsbetrag innerhalb von 7 Tagen nach Vertragsschluss fällig; der Versand bzw. die Produktion erfolgt nach Zahlungseingang.',
      'Bei individuell angefertigter Ware (z. B. bedruckte Teamkleidung) können wir eine Anzahlung verlangen, die im Angebot ausgewiesen wird.',
    ],
  },
  {
    title: '§ 6 Lieferung',
    paragraphs: [
      'Die Lieferung erfolgt an die vom Kunden angegebene Lieferadresse. Die voraussichtliche Lieferzeit wird im Angebot genannt. Bei individuell angefertigter Ware beginnt die Lieferzeit erst nach Freigabe des Designs durch den Kunden und ggf. Eingang der Anzahlung.',
      'Ist ein bestelltes Produkt nicht verfügbar, informieren wir den Kunden unverzüglich und erstatten bereits geleistete Zahlungen umgehend.',
      'Bei Verbrauchern geht die Gefahr des zufälligen Untergangs und der Verschlechterung der Ware erst mit Übergabe an den Kunden über. Bei Unternehmern geht die Gefahr mit Übergabe der Ware an das Transportunternehmen über.',
    ],
  },
  {
    title: '§ 7 Eigentumsvorbehalt',
    paragraphs: [
      'Die Ware bleibt bis zur vollständigen Bezahlung unser Eigentum. Gegenüber Unternehmern behalten wir uns das Eigentum an der Ware bis zur vollständigen Begleichung aller Forderungen aus der laufenden Geschäftsbeziehung vor.',
    ],
  },
  {
    title: '§ 8 Widerrufsrecht für Verbraucher',
    paragraphs: [
      'Verbrauchern steht ein gesetzliches Widerrufsrecht zu. Einzelheiten ergeben sich aus der nachfolgenden Widerrufsbelehrung. Unternehmern steht kein Widerrufsrecht zu.',
      'Das Widerrufsrecht besteht nicht bei Verträgen zur Lieferung von Waren, die nicht vorgefertigt sind und für deren Herstellung eine individuelle Auswahl oder Bestimmung durch den Verbraucher maßgeblich ist oder die eindeutig auf die persönlichen Bedürfnisse des Verbrauchers zugeschnitten sind (§ 312g Abs. 2 Nr. 1 BGB) — insbesondere bei individuell bedruckter oder bestickter Bekleidung (z. B. mit Namen, Nummern oder Vereinslogos).',
    ],
  },
  {
    title: 'Widerrufsbelehrung',
    paragraphs: [
      'Widerrufsrecht: Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die Waren in Besitz genommen haben bzw. hat. Bei mehreren Waren im Rahmen einer einheitlichen Bestellung, die getrennt geliefert werden, beginnt die Frist mit Inbesitznahme der letzten Ware.',
      `Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (${COMPANY.legalName}, ${ADDRESS}, E-Mail: ${COMPANY.email}) mittels einer eindeutigen Erklärung (z. B. ein mit der Post versandter Brief oder eine E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren. Sie können dafür das unten stehende Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist. Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.`,
      'Folgen des Widerrufs: Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich daraus ergeben, dass Sie eine andere Art der Lieferung als die von uns angebotene, günstigste Standardlieferung gewählt haben), unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist. Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes vereinbart; in keinem Fall werden Ihnen wegen dieser Rückzahlung Entgelte berechnet. Wir können die Rückzahlung verweigern, bis wir die Waren wieder zurückerhalten haben oder bis Sie den Nachweis erbracht haben, dass Sie die Waren zurückgesandt haben, je nachdem, welches der frühere Zeitpunkt ist.',
      `Sie haben die Waren unverzüglich und in jedem Fall spätestens binnen vierzehn Tagen ab dem Tag, an dem Sie uns über den Widerruf dieses Vertrags unterrichten, an ${COMPANY.legalName}, ${ADDRESS} zurückzusenden oder zu übergeben. Die Frist ist gewahrt, wenn Sie die Waren vor Ablauf der Frist von vierzehn Tagen absenden. Sie tragen die unmittelbaren Kosten der Rücksendung der Waren. Sie müssen für einen etwaigen Wertverlust der Waren nur aufkommen, wenn dieser Wertverlust auf einen zur Prüfung der Beschaffenheit, Eigenschaften und Funktionsweise der Waren nicht notwendigen Umgang mit ihnen zurückzuführen ist.`,
      `Muster-Widerrufsformular (Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus und senden Sie es zurück): An ${COMPANY.legalName}, ${ADDRESS}, E-Mail: ${COMPANY.email} — Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über den Kauf der folgenden Waren (*): … — Bestellt am (*)/erhalten am (*): … — Name des/der Verbraucher(s): … — Anschrift des/der Verbraucher(s): … — Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier) — Datum: … — (*) Unzutreffendes streichen.`,
    ],
  },
  {
    title: '§ 9 Gewährleistung',
    paragraphs: [
      'Es gelten die gesetzlichen Mängelhaftungsrechte. Gegenüber Unternehmern beträgt die Verjährungsfrist für Mängelansprüche bei neuen Waren ein Jahr ab Gefahrübergang; Unternehmer haben die Ware unverzüglich nach Erhalt zu untersuchen und Mängel unverzüglich zu rügen (§ 377 HGB).',
      'Natürlicher Verschleiß, insbesondere bei Cricketschlägern (z. B. Risse durch harte Bälle, fehlendes Einölen oder Einspielen) und Schutzausrüstung durch bestimmungsgemäßen Gebrauch, stellt keinen Mangel dar. Bitte beachten Sie unsere Pflegehinweise.',
    ],
  },
  {
    title: '§ 10 Haftung',
    paragraphs: [
      'Wir haften unbeschränkt für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit, bei Vorsatz und grober Fahrlässigkeit sowie nach dem Produkthaftungsgesetz.',
      'Bei leicht fahrlässiger Verletzung wesentlicher Vertragspflichten (Pflichten, deren Erfüllung die ordnungsgemäße Durchführung des Vertrags überhaupt erst ermöglicht und auf deren Einhaltung der Kunde regelmäßig vertrauen darf) ist unsere Haftung auf den vertragstypischen, vorhersehbaren Schaden begrenzt. Im Übrigen ist die Haftung für leichte Fahrlässigkeit ausgeschlossen.',
    ],
  },
  {
    title: '§ 11 Individuelle Bekleidung und Druckvorlagen',
    paragraphs: [
      'Bei individuell gestalteter Ware stellt uns der Kunde Logos, Namen, Nummern und sonstige Vorlagen zur Verfügung. Der Kunde versichert, dass er zur Nutzung dieser Inhalte berechtigt ist und dadurch keine Rechte Dritter (insbesondere Marken-, Urheber- oder Persönlichkeitsrechte) verletzt werden. Er stellt uns von Ansprüchen Dritter frei, die auf einer solchen Verletzung beruhen.',
      'Vor Produktionsbeginn erhält der Kunde einen Entwurf zur Freigabe. Nach Freigabe sind Änderungen nur gegen gesonderte Vergütung möglich. Geringfügige, technisch bedingte Abweichungen in Farbe und Platzierung gegenüber dem Entwurf stellen keinen Mangel dar.',
    ],
  },
  {
    title: '§ 12 Streitbeilegung',
    paragraphs: [
      'Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.',
    ],
  },
  {
    title: '§ 13 Schlussbestimmungen',
    paragraphs: [
      'Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts (CISG). Bei Verbrauchern gilt diese Rechtswahl nur insoweit, als nicht der gewährte Schutz durch zwingende Bestimmungen des Rechts des Staates, in dem der Verbraucher seinen gewöhnlichen Aufenthalt hat, entzogen wird.',
      'Ist der Kunde Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen, ist ausschließlicher Gerichtsstand für alle Streitigkeiten aus diesem Vertrag unser Geschäftssitz.',
      'Sollten einzelne Bestimmungen dieser AGB unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.',
    ],
  },
]

export default function TermsPage() {
  return (
    <div className="bg-white">

      {/* Breadcrumb */}
      <div style={{ borderBottom: '1px solid #E0DFDB', padding: '12px 60px', background: '#F8F7F4' }}>
        <nav className="flex items-center gap-2 text-[12px]" style={{ color: '#6B6B6B' }}>
          <Link href="/" className="transition-colors hover:text-[#e85d1a]">Startseite</Link>
          <ChevronRight className="h-3 w-3" />
          <span style={{ color: '#111111' }}>AGB</span>
        </nav>
      </div>

      {/* Hero */}
      <div style={{ background: '#111111', borderBottom: '1px solid #1c1c1c' }}>
        <div style={{ padding: '64px 60px' }}>
          <p
            className="mb-3 font-display text-[11px] font-semibold uppercase tracking-[0.22em]"
            style={{ color: '#e85d1a' }}
          >
            Rechtliches
          </p>
          <h1
            className="mb-4 font-display font-bold uppercase leading-tight tracking-[0.01em]"
            style={{ fontSize: 'clamp(36px, 5vw, 60px)', color: '#ffffff' }}
          >
            Allgemeine Geschäftsbedingungen
          </h1>
          <p className="max-w-[500px] text-[16px] font-light leading-[1.8]" style={{ color: '#A0A0A0' }}>
            Stand: {COMPANY.lastUpdated}
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '64px 60px' }}>
        <div className="max-w-[820px] space-y-12">
          {SECTIONS.map((section) => (
            <section key={section.title}>
              <h2
                className="mb-4 font-display text-[22px] font-bold uppercase leading-tight tracking-[0.02em]"
                style={{ color: '#111111' }}
              >
                {section.title}
              </h2>
              <div className="space-y-4">
                {section.paragraphs.map((text, i) => (
                  <p key={i} className="text-[15px] leading-[1.8]" style={{ color: '#333333' }}>
                    {text}
                  </p>
                ))}
              </div>
            </section>
          ))}

          {/* Questions */}
          <div style={{ border: '1px solid #e85d1a', padding: '20px 24px', background: '#FFF5ED' }}>
            <p
              className="mb-1 font-display text-[12px] font-semibold uppercase tracking-[0.1em]"
              style={{ color: '#e85d1a' }}
            >
              Fragen zu unseren AGB?
            </p>
            <p className="mb-3 text-[13px]" style={{ color: '#333333' }}>
              Schreib uns an <a href={`mailto:${COMPANY.email}`} className="underline">{COMPANY.email}</a> oder nutze unser Kontaktformular.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 font-display text-[12px] font-bold uppercase tracking-wider"
              style={{ color: '#e85d1a' }}
            >
              Zum Kontakt <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>

    </div>
  )
}
