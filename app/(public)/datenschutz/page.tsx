import type { Metadata } from 'next'
import { SimplePage } from '@/components/layout/SimplePage'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  description: 'Datenschutzerklärung von Mantra Sports Deutschland (Mantra Corporation Pty Ltd) nach DSGVO.',
  alternates: { canonical: '/datenschutz' },
}

export default function DatenschutzPage() {
  return (
    <SimplePage
      crumb="Datenschutz"
      eyebrow="Rechtliches"
      title="Datenschutzerklärung"
      intro="Stand: November 2026. Hier erfahren Sie, welche personenbezogenen Daten wir auf www.mantrasports.de verarbeiten, wofür und welche Rechte Sie haben."
      sections={[
        {
          title: '1. Verantwortlicher',
          paragraphs: [
            'Mantra Corporation Pty Ltd, Unit 2, 5 Ford Court, Newnham TAS 7248, Australien. Vertreten durch den Director Madhur Shastri.',
            'E-Mail: support@mantrasports.com.au · Telefon: +61 466 242 222',
            'Wir haben keinen Datenschutzbeauftragten benannt. Bei Fragen zum Datenschutz wenden Sie sich bitte an die oben genannte E-Mail-Adresse.',
          ],
        },
        {
          title: '2. Hosting und Server-Logdateien',
          paragraphs: [
            'Diese Website wird bei Vercel Inc. (USA) gehostet. Beim Aufruf der Website werden technisch notwendige Daten verarbeitet, insbesondere IP-Adresse, Datum und Uhrzeit, aufgerufene Seite, Referrer und Browserinformationen. Dies dient der sicheren und stabilen Bereitstellung der Website. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse am sicheren Betrieb).',
            'Bilder werden über Cloudinary Ltd. ausgeliefert. Schriftarten werden von unserem eigenen Server geladen; es findet keine Verbindung zu Google Fonts statt.',
          ],
        },
        {
          title: '3. Kontakt-, Großhandels- und B2B-Anfragen',
          paragraphs: [
            'Wenn Sie uns über ein Formular, per E-Mail, Telefon oder WhatsApp kontaktieren, verarbeiten wir die von Ihnen angegebenen Daten, zum Beispiel Name, Organisation, E-Mail-Adresse, Telefonnummer, Land und Ihre Nachricht, um Ihre Anfrage zu beantworten und Ihnen ein Angebot zu erstellen.',
            'Formularanfragen werden in unserer Datenbank (Neon Inc., USA) gespeichert, per E-Mail an uns weitergeleitet und in unser internes Kundenverwaltungssystem (MantraOS, gehostet bei Vercel) übernommen. Nach einer Großhandelsanfrage stellen wir Ihnen gegebenenfalls unsere B2B-Broschüre zum Download bereit.',
            'Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen auf Ihre Anfrage) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung von Anfragen).',
          ],
        },
        {
          title: '4. Newsletter',
          paragraphs: [
            'Wenn Sie sich für unseren Newsletter anmelden, speichern wir Ihre E-Mail-Adresse, um Ihnen Informationen zu Produkten und Angeboten zu senden. Rechtsgrundlage ist Ihre Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO. Sie können die Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen, zum Beispiel per E-Mail an support@mantrasports.com.au.',
          ],
        },
        {
          title: '5. Cookies und lokale Speicherung',
          paragraphs: [
            'Wir setzen keine Analyse-, Tracking- oder Werbe-Cookies ein. Im lokalen Speicher Ihres Browsers speichern wir lediglich Ihre Auswahl im Cookie-Hinweis und Ihre bevorzugte Darstellung (hell oder dunkel). Diese Informationen verlassen Ihr Gerät nicht. Rechtsgrundlage ist § 25 Abs. 2 TDDDG (technisch erforderlich bzw. von Ihnen ausdrücklich gewünscht).',
          ],
        },
        {
          title: '6. WhatsApp',
          paragraphs: [
            'Auf der Website verlinken wir auf WhatsApp. Erst wenn Sie den Link anklicken, wird WhatsApp (WhatsApp Ireland Limited / Meta) geöffnet; dabei gelten die Datenschutzbestimmungen von WhatsApp. Wenn Sie uns über WhatsApp schreiben, verarbeiten wir Ihre Nachricht und Telefonnummer zur Beantwortung Ihrer Anfrage (Art. 6 Abs. 1 lit. b bzw. f DSGVO).',
          ],
        },
        {
          title: '7. Empfänger und Übermittlung in Drittländer',
          paragraphs: [
            'Wir setzen die genannten Dienstleister als Auftragsverarbeiter ein. Die Mantra Corporation Pty Ltd hat ihren Sitz in Australien; Ihre Anfrage wird daher dort bearbeitet. Für Australien besteht kein Angemessenheitsbeschluss der EU-Kommission. Die Übermittlung Ihrer Anfrage dorthin erfolgt, weil sie zur Durchführung vorvertraglicher Maßnahmen auf Ihren Antrag erforderlich ist (Art. 49 Abs. 1 lit. b DSGVO).',
            'Für Dienstleister in den USA erfolgt die Übermittlung auf Grundlage des EU-US Data Privacy Framework, soweit der Anbieter zertifiziert ist, und im Übrigen auf Grundlage von EU-Standardvertragsklauseln (Art. 46 Abs. 2 lit. c DSGVO).',
          ],
        },
        {
          title: '8. Speicherdauer',
          paragraphs: [
            'Anfragen speichern wir, solange es für die Bearbeitung und eine mögliche Geschäftsbeziehung erforderlich ist, und löschen sie spätestens drei Jahre nach dem letzten Kontakt, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen. Newsletter-Daten speichern wir bis zum Widerruf Ihrer Einwilligung. Server-Logdaten werden vom Hoster nach kurzer Zeit automatisch gelöscht.',
          ],
        },
        {
          title: '9. Ihre Rechte',
          paragraphs: [
            'Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch gegen Verarbeitungen auf Grundlage berechtigter Interessen (Art. 21). Eine erteilte Einwilligung können Sie jederzeit widerrufen (Art. 7 Abs. 3).',
            'Sie haben außerdem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren, insbesondere in dem Mitgliedstaat Ihres Aufenthaltsorts.',
            'Zur Ausübung Ihrer Rechte genügt eine E-Mail an support@mantrasports.com.au.',
          ],
        },
        {
          title: '10. Keine automatisierte Entscheidungsfindung',
          paragraphs: [
            'Wir nutzen keine automatisierte Entscheidungsfindung einschließlich Profiling im Sinne von Art. 22 DSGVO. Die Bereitstellung Ihrer Daten ist freiwillig; ohne Kontaktdaten können wir Ihre Anfrage jedoch nicht beantworten.',
          ],
        },
      ]}
    />
  )
}
