import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, ShieldCheck, Eye, Lock, Globe, Settings, BarChart2, Shield, UserCheck, Calendar } from "lucide-react";
import { Link } from "wouter";
import { useLeadFormModal } from "@/contexts/LeadFormModalContext";

export default function Datenschutz() {
  const { openLeadForm } = useLeadFormModal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-brand-light">
      <Header onCtaClick={() => openLeadForm()} />

      <main className="flex-grow py-16 md:py-24">
        <div className="container max-w-4xl">
          {/* Back Button */}
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center text-sm font-bold text-brand-navy hover:text-brand-cyan transition-colors gap-2 group">
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span>Zurück zur Startseite</span>
            </Link>
          </div>

          {/* Page Header */}
          <div className="bg-white rounded-2xl border border-brand-grey/15 p-8 md:p-12 shadow-xl mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/5 rounded-full -mr-16 -mt-16" />
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-navy/5 text-brand-navy">
                <ShieldCheck className="h-6 w-6 text-brand-cyan" />
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-navy">
                Datenschutzerklärung
              </h1>
            </div>
            <p className="text-brand-grey text-lg leading-relaxed max-w-2xl">
              Informationen über die Erhebung, Verarbeitung und Nutzung Ihrer personenbezogenen Daten bei der Nutzung unserer Website.
            </p>
            <p className="text-sm text-brand-grey mt-4">
              Stand: 30. September 2026
            </p>
          </div>

          {/* Privacy Content */}
          <div className="bg-white rounded-2xl border border-brand-grey/15 p-8 md:p-12 shadow-sm space-y-10 text-brand-grey leading-relaxed">

            {/* Section 1 */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-brand-navy flex items-center gap-2 border-b border-brand-grey/10 pb-2">
                <Globe className="h-5 w-5 text-brand-cyan" />
                1. Einleitung und Kontaktdaten des Verantwortlichen
              </h2>
              <p>
                1.1 Wir freuen uns, dass Sie unsere Website besuchen und bedanken uns für Ihr Interesse. Im Folgenden informieren wir Sie über den Umgang mit Ihren personenbezogenen Daten bei der Nutzung unserer Website. Personenbezogene Daten sind hierbei alle Daten, mit denen Sie persönlich identifiziert werden können.
              </p>
              <p>
                1.2 Verantwortlicher für die Datenverarbeitung auf dieser Website im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
              </p>
              <div className="bg-brand-light p-4 rounded-xl border border-brand-grey/10 text-brand-navy text-sm font-medium space-y-1">
                <p className="font-bold">ED Rent & Sale</p>
                <p>Bremsen 13 A</p>
                <p>42799 Leichlingen (Rheinland)</p>
                <p>Deutschland</p>
                <p className="pt-2">Tel.: +49 2175 8845535</p>
                <p>E-Mail: info@ed-rent.de</p>
              </div>
              <p className="text-sm">
                Der für die Verarbeitung von personenbezogenen Daten Verantwortliche ist diejenige natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-brand-navy flex items-center gap-2 border-b border-brand-grey/10 pb-2">
                <Eye className="h-5 w-5 text-brand-cyan" />
                2. Datenerfassung beim Besuch unserer Website
              </h2>
              <p>
                2.1 Bei der bloß informatorischen Nutzung unserer Website, also wenn Sie uns nicht anderweitig Informationen übermitteln, werden nur solche Daten verarbeitet, die Ihr Browser an den Server übermittelt (sog. „Server-Logfiles“). Wenn Sie unsere Website aufrufen, werden die folgenden Daten verarbeitet, die technisch erforderlich sind, um Ihnen die Website anzuzeigen:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-4 text-sm">
                <li>Unsere besuchte Website</li>
                <li>Datum und Uhrzeit zum Zeitpunkt des Zugriffes</li>
                <li>Menge der gesendeten Daten in Byte</li>
                <li>Quelle/Verweis, von welchem Sie auf die Seite gelangten</li>
                <li>Verwendeter Browser</li>
                <li>Verwendetes Betriebssystem</li>
                <li>Verwendete IP-Adresse</li>
              </ul>
              <p>
                Die Server-Logfiles werden von unserem Hosting-Anbieter verarbeitet (siehe Abschnitt 3). Die Verarbeitung erfolgt gemäß Art. 6 Abs. 1 lit. f DSGVO auf Basis unseres berechtigten Interesses an einer sicheren, stabilen und funktionsfähigen Bereitstellung unserer Website. Eine darüber hinausgehende Weitergabe oder anderweitige Verwendung der Daten findet nicht statt.
              </p>
              <p>
                2.2 Diese Website nutzt aus Sicherheitsgründen und zum Schutz der Übertragung personenbezogener Daten und anderer vertraulicher Inhalte (z.B. Anfragen an den Verantwortlichen) eine SSL- bzw. TLS-Verschlüsselung. Sie können eine verschlüsselte Verbindung an der Zeichenfolge „https://“ und dem Schloss-Symbol in Ihrer Browserzeile erkennen.
              </p>
            </section>

            {/* Section 3 */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-brand-navy flex items-center gap-2 border-b border-brand-grey/10 pb-2">
                <Lock className="h-5 w-5 text-brand-cyan" />
                3. Hosting
              </h2>
              <p>
                Unsere Website wird über den Dienst „GitHub Pages“ der GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA, bereitgestellt. Den Dienst setzt unser technischer Dienstleister (siehe Abschnitt 8) in unserem Auftrag ein. Beim Aufruf der Website verarbeitet GitHub die unter 2.1 genannten Daten, insbesondere Ihre IP-Adresse, um die Seiten auszuliefern und einen sicheren Betrieb zu gewährleisten. Dabei können Daten auch auf Servern in den USA verarbeitet werden.
              </p>
              <p>
                Die Verarbeitung erfolgt auf Grundlage unseres berechtigten Interesses an einer sicheren und zuverlässigen Bereitstellung unserer Website gemäß Art. 6 Abs. 1 lit. f DSGVO. Für Übermittlungen in die USA stützt sich GitHub nach eigenen Angaben auf das EU-US Data Privacy Framework sowie auf Standardvertragsklauseln der EU-Kommission.
              </p>
              <p>
                Weitere Informationen:{" "}
                  <a href="https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener noreferrer" className="text-brand-cyan hover:underline break-all">
                    https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement
                  </a>
              </p>
            </section>

            {/* Section 4 */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-brand-navy border-b border-brand-grey/10 pb-2">
                4. Cookies und Speicherung auf Ihrem Endgerät
              </h2>
              <p>
                Wir speichern Informationen auf Ihrem Endgerät oder greifen auf dort gespeicherte Informationen zu (z. B. Cookies, Local Storage, Session Storage) nur, soweit dies für die von Ihnen gewünschte Nutzung unbedingt erforderlich ist (§ 25 Abs. 2 Nr. 2 TDDDG) oder Sie eingewilligt haben (§ 25 Abs. 1 TDDDG in Verbindung mit Art. 6 Abs. 1 lit. a DSGVO). Im Einzelnen:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4 text-sm">
                <li><span className="font-semibold text-brand-navy">„ed_consent_v1“ (Local Storage, erforderlich)</span>: speichert Ihre Auswahl im Cookie-Banner und deren Zeitpunkt, bis Sie Ihre Auswahl ändern oder Ihre Browserdaten löschen.</li>
                <li><span className="font-semibold text-brand-navy">„ed_lead_context“ (Session Storage, nur mit Einwilligung „Statistik“ oder „Marketing“)</span>: speichert während Ihres Besuchs die Kampagnenparameter aus der aufgerufenen Adresse (z. B. utm_source, utm_campaign), die Einstiegsseite und die verweisende Seite, damit diese Angaben auch nach einem Neuladen der Seite mit einer Anfrage übermittelt werden können. Ohne Einwilligung werden diese Angaben nicht auf Ihrem Gerät gespeichert, sondern nur für die Dauer des geöffneten Seitenaufrufs vorgehalten. Die Werte verlassen Ihr Gerät nur, wenn Sie das Anfrageformular absenden, und werden beim Schließen des Browser-Tabs gelöscht.</li>
                <li><span className="font-semibold text-brand-navy">Nur mit Einwilligung „Statistik“</span>: Cookies von Google Analytics (_ga, _ga_[ID]), siehe Abschnitt 6a.</li>
                <li><span className="font-semibold text-brand-navy">Nur mit Einwilligung „Marketing“</span>: Cookies des Meta Pixels (_fbp, _fbc), siehe Abschnitt 6b.</li>
              </ul>
              <p>
                Die Rechtsgrundlage für die anschließende Verarbeitung personenbezogener Daten ergibt sich aus den jeweiligen Abschnitten dieser Erklärung. Sie können Ihre Einwilligung jederzeit über den Link „Cookie-Einstellungen“ im Footer der Website widerrufen. Zusätzlich können Sie Cookies und gespeicherte Websitedaten in Ihrem Browser löschen oder blockieren.
              </p>
            </section>

            {/* Section 5 */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-brand-navy border-b border-brand-grey/10 pb-2">
                5. Kontaktaufnahme
              </h2>
              <p>
                Wenn Sie uns über eines unserer Anfrageformulare oder per E-Mail kontaktieren, verarbeiten wir die von Ihnen mitgeteilten Daten. Beim Anfrageformular sind dies Name, E-Mail-Adresse, Telefonnummer, Unternehmen, Postleitzahl, Ihre Angaben zum Bedarf (z. B. Fahrzeugtyp, Aufbau, Zeitraum, Stückzahl, Liefer- oder Abholwunsch) sowie eine etwaige Nachricht. Ohne die als Pflichtangaben gekennzeichneten Daten können wir Ihre Anfrage nicht bearbeiten.
              </p>
              <p>
                Zusammen mit Ihrer Anfrage werden der Zeitpunkt der Anfrage und die Kampagnenparameter (siehe Abschnitt 4) übermittelt. Haben Sie in die Kategorie „Statistik“ eingewilligt, wird zusätzlich Ihre Google-Analytics-Kennung übermittelt, haben Sie in die Kategorie „Marketing“ eingewilligt, zusätzlich die Meta-Kennungen fbp und fbc.
              </p>
              <p>
                Nach dem Absenden erhalten Sie eine automatische Bestätigung per E-Mail. Anhand Ihrer Angaben zu Bedarf und Zeitrahmen wird Ihre Anfrage automatisch einer Prioritätsstufe zugeordnet, damit wir dringende Anfragen schneller bearbeiten können. Diese Einstufung bestimmt nur die interne Reihenfolge der Bearbeitung; eine automatisierte Entscheidung im Sinne von Art. 22 DSGVO findet nicht statt.
              </p>
              <p>
                Rechtsgrundlage für die Verarbeitung dieser Daten ist unser berechtigtes Interesse an der Beantwortung und strukturierten Bearbeitung Ihres Anliegens gemäß Art. 6 Abs. 1 lit. f DSGVO. Zielt Ihre Anfrage auf den Abschluss eines Vertrages ab, ist zusätzliche Rechtsgrundlage Art. 6 Abs. 1 lit. b DSGVO.
              </p>
              <p>
                Ihre Daten werden nach abschließender Bearbeitung Ihrer Anfrage gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen. Kommt ein Vertrag zustande, speichern wir Ihre Daten für die Dauer der Vertragsbeziehung und der gesetzlichen Aufbewahrungsfristen.
              </p>

              <div className="space-y-4 pl-4 border-l-2 border-brand-cyan/30">
                <h3 className="font-bold text-brand-navy">Technische Weiterleitung über Cloudflare Workers</h3>
                <p>
                  Ihre Formulardaten werden über sogenannte Cloudflare Workers an unser CRM-System Brevo und, soweit Sie eingewilligt haben, an Meta weitergeleitet (siehe unten und Abschnitt 6b). Ein weiterer Worker übermittelt Rückmeldungen über abgeschlossene Aufträge aus unserem CRM-System an Meta (siehe Abschnitt 6b). Cloudflare Workers sind ein serverseitiger Dienst der Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107, USA, den unser technischer Dienstleister (siehe Abschnitt 8) in unserem Auftrag einsetzt.
                </p>
                <p>
                  Dabei verarbeitet Cloudflare Ihre Formulardaten sowie Ihre IP-Adresse und Browserkennung (User-Agent). Die Formulardaten werden nur weitergeleitet und nicht dauerhaft gespeichert. Technische Protokolle ohne Formularinhalte können zur Fehleranalyse für wenige Tage gespeichert werden.
                </p>
                <p>
                  Die Verarbeitung erfolgt auf Grundlage unseres berechtigten Interesses an einer zuverlässigen und sicheren technischen Anbindung unserer Anfrageformulare gemäß Art. 6 Abs. 1 lit. f DSGVO, bei vertragsbezogenen Anfragen zusätzlich gemäß Art. 6 Abs. 1 lit. b DSGVO. Für die Weiterleitung an Meta gilt die in Abschnitt 6b beschriebene Einwilligung.
                </p>
                <p>
                  Cloudflare kann Daten auch auf Servern in den USA verarbeiten. Cloudflare ist nach eigenen Angaben unter dem EU-US Data Privacy Framework zertifiziert; ergänzend besteht mit Cloudflare ein Auftragsverarbeitungsvertrag auf Grundlage der Standardvertragsklauseln der EU-Kommission.
                </p>
                <p>
                  Weitere Informationen:{" "}
                  <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer" className="text-brand-cyan hover:underline break-all">
                    https://www.cloudflare.com/privacypolicy/
                  </a>
                </p>
              </div>

              <div className="space-y-4 pl-4 border-l-2 border-brand-cyan/30">
                <h3 className="font-bold text-brand-navy">Brevo (CRM-System zur Bearbeitung Ihrer Anfrage)</h3>
                <p>
                  Zur Verwaltung und Bearbeitung Ihrer Anfrage nutzen wir das CRM-System Brevo der Brevo SAS, 8 rue de Londres, 75009 Paris, Frankreich. Ihre im Formular angegebenen Daten und die oben genannten technischen Angaben werden dort gespeichert, um Ihr Anliegen zu bearbeiten und Ihnen zu antworten. Über Brevo versenden wir auch die Bestätigung Ihrer Anfrage per E-Mail. Im CRM dokumentieren wir außerdem den Bearbeitungsstand Ihrer Anfrage, z. B. Angebotsstatus, Auftragswert und Abschluss.
                </p>
                <p>
                  Innerhalb von Brevo können anhand Ihrer Angaben automatisierte Vorgänge (z. B. Zuordnung zu einer zuständigen Ansprechperson oder Erinnerungen zur Anfragebearbeitung) ausgelöst werden. Diese dienen ausschließlich der Bearbeitung Ihrer konkreten Anfrage und nicht der Zusendung von Werbung oder Newslettern, sofern Sie einer solchen nicht gesondert zugestimmt haben.
                </p>
                <p>
                  Die Verarbeitung erfolgt auf Grundlage unseres berechtigten Interesses an einer strukturierten und effizienten Bearbeitung eingehender Anfragen gemäß Art. 6 Abs. 1 lit. f DSGVO, bei vertragsbezogenen Anfragen zusätzlich gemäß Art. 6 Abs. 1 lit. b DSGVO.
                </p>
                <p>
                  Wir haben mit Brevo einen Auftragsverarbeitungsvertrag abgeschlossen.
                </p>
                <p>
                  Weitere Informationen:{" "}
                  <a href="https://www.brevo.com/de/legal/privacypolicy/" target="_blank" rel="noopener noreferrer" className="text-brand-cyan hover:underline break-all">
                    https://www.brevo.com/de/legal/privacypolicy/
                  </a>
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-brand-navy flex items-center gap-2 border-b border-brand-grey/10 pb-2">
                <Settings className="h-5 w-5 text-brand-cyan" />
                6. Analyse und Marketing-Tools
              </h2>

              <div className="space-y-6 pl-4 border-l-2 border-brand-cyan/30">
                {/* 6.0 */}
                <div className="space-y-2">
                  <h3 className="font-bold text-brand-navy">Google Tag Manager</h3>
                  <p>
                    Diese Website verwendet den Google Tag Manager der Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Der Tag Manager dient der Verwaltung und Ausspielung der nachfolgend beschriebenen Dienste. Beim Laden des Tag Managers werden Ihre IP-Adresse sowie technische Informationen über Ihr Gerät und Ihren Browser an Google übertragen; dabei ist eine Übermittlung in die USA möglich. Der Tag Manager wird deshalb erst geladen, wenn Sie in die Kategorie „Statistik“ oder „Marketing“ eingewilligt haben.
                  </p>
                  <p>
                    Rechtsgrundlage ist Ihre Einwilligung gemäß § 25 Abs. 1 TDDDG und Art. 6 Abs. 1 lit. a DSGVO. Sie können Ihre Einwilligung jederzeit über die Cookie-Einstellungen auf unserer Website widerrufen.
                  </p>
                  <p>
                    Google hat sich dem EU-US Data Privacy Framework angeschlossen, das auf Grundlage eines Angemessenheitsbeschlusses der EU-Kommission ein angemessenes Datenschutzniveau für Datenübermittlungen in die USA sicherstellt. Weitere Informationen:{" "}
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-cyan hover:underline break-all">
                    https://policies.google.com/privacy
                  </a>
                  </p>
                </div>

                {/* 6a */}
                <div className="space-y-2">
                  <h3 className="font-bold text-brand-navy">6a.) Google Analytics 4</h3>
                  <p>
                    Diese Website verwendet Google Analytics 4, einen Webanalysedienst der Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Google Analytics 4 wird nur mit Ihrer Einwilligung in die Kategorie „Statistik“ geladen.
                  </p>
                  <p>
                    Google Analytics 4 ermöglicht uns die Analyse der Nutzung unserer Website. Dabei werden Informationen wie aufgerufene Seiten, Verweildauer, verwendetes Endgerät, ungefährer Standort (Stadtebene) sowie Interaktionen (z. B. Klicks, erreichte Schritte im Anfrageformular, Art und Prioritätsstufe einer Anfrage) erfasst. Kontaktdaten aus dem Anfrageformular übermitteln wir nicht an Google Analytics. Nach Angaben von Google speichert Google Analytics 4 keine IP-Adressen.
                  </p>
                  <p>
                    Die Google-Analytics-Kennung (Client-ID) speichern wir zusammen mit Ihrer Anfrage in unserem CRM-System, um Anfragen der jeweiligen Kampagne zuordnen zu können (siehe Abschnitt 5).
                  </p>
                  <p>
                    Die erhobenen Daten werden auf Servern von Google verarbeitet, auch in den USA. Google hat sich dem EU-US Data Privacy Framework angeschlossen. Die Aufbewahrung der Daten in Google Analytics ist auf 14 Monate begrenzt.
                  </p>
                  <p>
                    Rechtsgrundlage ist Ihre Einwilligung gemäß § 25 Abs. 1 TDDDG und Art. 6 Abs. 1 lit. a DSGVO. Sie können Ihre Einwilligung jederzeit über die Cookie-Einstellungen widerrufen oder das Browser-Add-on von Google nutzen:{" "}
                    <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-brand-cyan hover:underline break-all">
                    https://tools.google.com/dlpage/gaoptout
                  </a>
                  </p>
                  <p>
                    Wir haben mit Google einen Auftragsverarbeitungsvertrag abgeschlossen.
                  </p>
                </div>

                {/* 6b */}
                <div className="space-y-2">
                  <h3 className="font-bold text-brand-navy">6b.) Meta Pixel und Meta Conversions API</h3>
                  <p>
                    Diese Website verwendet den Meta Pixel sowie die Meta Conversions API, Dienste der Meta Platforms Ireland Ltd., Merrion Road, Dublin 4, D04 X2K5, Irland („Meta“). Beide Dienste werden nur mit Ihrer Einwilligung in die Kategorie „Marketing“ eingesetzt.
                  </p>
                  <p>
                    <span className="font-semibold text-brand-navy">Meta Pixel:</span> Der Pixel erfasst Seitenaufrufe, Schritte im Anfrageformular und das Absenden einer Anfrage und setzt dazu die Cookies _fbp und gegebenenfalls _fbc. Diese Informationen werden an Meta übermittelt, um den Erfolg unserer Werbeanzeigen auf Facebook und Instagram zu messen, die Ausspielung von Anzeigen zu optimieren und Zielgruppen für Werbung zu bilden. Kontaktdaten aus dem Formular übermittelt der Pixel nicht.
                  </p>
                  <p>
                    <span className="font-semibold text-brand-navy">Conversions API:</span> Beim Absenden einer Anfrage übermitteln wir zusätzlich serverseitig über die in Abschnitt 5 genannten Cloudflare Workers ein Ereignis „Lead“ an Meta. Übertragen werden E-Mail-Adresse, Telefonnummer, Vorname, Nachname, Postleitzahl und Land, jeweils vor der Übermittlung mit dem Verfahren SHA-256 gehasht, außerdem Ihre IP-Adresse, Ihre Browserkennung (User-Agent), die Meta-Kennungen fbp und fbc, die Adresse der aufgerufenen Seite sowie eine Ereignis-ID, mit der Meta doppelte Meldungen von Pixel und Server zusammenführt.
                  </p>
                  <p>
                    <span className="font-semibold text-brand-navy">Rückmeldung aus dem CRM-System:</span> Kommt es aufgrund Ihrer Anfrage zu einem Auftrag, melden wir diesen ebenfalls über die Conversions API an Meta (Ereignis „Purchase“); auf dieselbe Weise können wir vergleichbare Fortschritte Ihrer Anfrage, etwa einen vereinbarten Termin, melden. Übertragen werden dabei der Auftragswert, eine interne Auftragsnummer, die Landingpage, über die Sie angefragt haben, sowie E-Mail-Adresse, Telefonnummer, Vorname, Nachname, Postleitzahl, Land und Ihre Kundennummer in unserem CRM-System, jeweils gehasht, und die Meta-Kennungen fbp und fbc. Diese Rückmeldung erfolgt nur, wenn Sie bei Ihrer Anfrage in die Kategorie „Marketing“ eingewilligt hatten.
                  </p>
                  <p>
                    <span className="font-semibold text-brand-navy">Zum Hashing:</span> Beim Hashing wird aus Ihren Daten eine Zeichenfolge berechnet, aus der sich die ursprünglichen Daten nicht unmittelbar ablesen lassen. Meta kann diese Werte jedoch mit den Daten seiner Nutzer abgleichen und Ereignisse so einem Facebook- oder Instagram-Konto zuordnen. Es handelt sich daher um pseudonymisierte, nicht um anonymisierte Daten.
                  </p>
                  <p>
                    Rechtsgrundlage ist Ihre Einwilligung gemäß § 25 Abs. 1 TDDDG und Art. 6 Abs. 1 lit. a DSGVO. Ohne Einwilligung in die Kategorie „Marketing“ findet weder eine Übermittlung durch den Pixel noch durch die Conversions API statt. Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft über die Cookie-Einstellungen widerrufen. Haben Sie bereits eine Anfrage gesendet, können Sie der späteren Rückmeldung aus dem CRM-System zusätzlich per E-Mail an info@ed-rent.de widersprechen.
                  </p>
                  <p>
                    Für die Erhebung der Daten auf unserer Website bzw. im Rahmen der Conversions API und deren Übermittlung an Meta sind wir und Meta gemeinsam verantwortlich (Art. 26 DSGVO). Die Einzelheiten regelt die Vereinbarung über die gemeinsame Verantwortlichkeit von Meta, die mit den Nutzungsbedingungen für Meta Business Tools gilt. Danach ist Meta insbesondere für die Erfüllung der Betroffenenrechte hinsichtlich der bei Meta verarbeiteten Daten zuständig; Sie können Ihre Rechte aber auch uns gegenüber geltend machen. Für die weitere Verarbeitung der übermittelten Daten ist Meta allein verantwortlich. Die Vereinbarung finden Sie hier:{" "}
                    <a href="https://www.facebook.com/legal/controller_addendum" target="_blank" rel="noopener noreferrer" className="text-brand-cyan hover:underline break-all">
                    https://www.facebook.com/legal/controller_addendum
                  </a>
                  </p>
                  <p>
                    Die verarbeiteten Daten können an Server von Meta in den USA übermittelt werden. Meta hat sich dem EU-US Data Privacy Framework angeschlossen.
                  </p>
                  <p>
                    Werbeeinstellungen bei Meta:{" "}
                    <a href="https://www.facebook.com/adpreferences/" target="_blank" rel="noopener noreferrer" className="text-brand-cyan hover:underline break-all">
                    https://www.facebook.com/adpreferences/
                  </a>
                    {" "}· Datenschutzrichtlinie von Meta:{" "}
                    <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer" className="text-brand-cyan hover:underline break-all">
                    https://www.facebook.com/privacy/policy/
                  </a>
                  </p>
                </div>
              </div>
            </section>

            {/* Section 7 */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-brand-navy flex items-center gap-2 border-b border-brand-grey/10 pb-2">
                <BarChart2 className="h-5 w-5 text-brand-cyan" />
                7. Einwilligungsverwaltung (Cookie-Banner)
              </h2>
              <div className="space-y-4 pl-4 border-l-2 border-brand-cyan/30">
                <h3 className="font-bold text-brand-navy">Cookie-Consent-Tool (eigene Umsetzung)</h3>
                <p>
                  Die Einholung und Verwaltung Ihrer Einwilligung erfolgt über eine selbst entwickelte, in die Website integrierte Consent-Verwaltung. Es handelt sich nicht um ein Plugin oder einen Dienst eines externen Anbieters; Ihre Einwilligungsentscheidung wird nicht an Dritte übermittelt.
                </p>
                <p>
                  Ihre Auswahl wird ausschließlich lokal in Ihrem Browser gespeichert (siehe Abschnitt 4). Sie können zwischen den Kategorien „Notwendig“, „Statistik“ und „Marketing“ wählen. Erst nach Ihrer Einwilligung in „Statistik“ oder „Marketing“ wird der Google Tag Manager nachgeladen; die darüber eingebundenen Dienste werden entsprechend Ihrer Auswahl freigeschaltet oder blockiert.
                </p>
                <p>
                  Das Speichern Ihrer Auswahl ist unbedingt erforderlich (§ 25 Abs. 2 Nr. 2 TDDDG). Die Verarbeitung erfolgt gemäß Art. 6 Abs. 1 lit. c DSGVO (rechtliche Verpflichtung zur Einholung und Beachtung von Einwilligungen) sowie Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem rechtskonformen Consent-Management).
                </p>
                <p>
                  Sie können Ihre Einwilligung jederzeit über den Link „Cookie-Einstellungen“ im Footer der Website widerrufen oder anpassen.
                </p>
              </div>
            </section>

            {/* Section 8 */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-brand-navy border-b border-brand-grey/10 pb-2">
                8. Empfänger und Dienstleister
              </h2>
              <p>
                Wir geben Ihre Daten nur weiter, soweit dies in dieser Erklärung beschrieben ist. Für Marketing, Tracking, die Pflege unserer Landingpages und Anfrageformulare sowie den Betrieb der technischen Weiterleitung setzen wir einen externen Dienstleister als Auftragsverarbeiter nach Art. 28 DSGVO ein. Dieser verarbeitet Daten ausschließlich nach unserer Weisung und setzt seinerseits die in den Abschnitten 3 und 5 genannten Anbieter GitHub und Cloudflare als Unterauftragsverarbeiter ein.
              </p>
              <p>
                Weitere Empfänger sind die in dieser Erklärung genannten Anbieter Brevo, Google und Meta im jeweils beschriebenen Umfang.
              </p>
            </section>

            {/* Section 9 */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-brand-navy flex items-center gap-2 border-b border-brand-grey/10 pb-2">
                <UserCheck className="h-5 w-5 text-brand-cyan" />
                9. Rechte des Betroffenen
              </h2>
              <p>
                9.1 Das geltende Datenschutzrecht gewährt Ihnen gegenüber dem Verantwortlichen hinsichtlich der Verarbeitung Ihrer personenbezogenen Daten die nachstehenden Betroffenenrechte (Auskunfts- und Interventionsrechte), wobei für die jeweiligen Ausübungsvoraussetzungen auf die angeführte Rechtsgrundlage verwiesen wird:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4 text-sm">
                <li><span className="font-semibold text-brand-navy">Auskunftsrecht gemäß Art. 15 DSGVO</span>: Sie haben das Recht auf Auskunft über Ihre von uns verarbeiteten Daten.</li>
                <li><span className="font-semibold text-brand-navy">Recht auf Berichtigung gemäß Art. 16 DSGVO</span>: Sie haben das Recht auf unverzügliche Berichtigung unrichtiger Daten.</li>
                <li><span className="font-semibold text-brand-navy">Recht auf Löschung gemäß Art. 17 DSGVO</span>: Sie haben das Recht auf Löschung Ihrer Daten unter bestimmten Voraussetzungen.</li>
                <li><span className="font-semibold text-brand-navy">Recht auf Einschränkung der Verarbeitung gemäß Art. 18 DSGVO</span>: Sie haben das Recht auf Einschränkung der Verarbeitung Ihrer Daten.</li>
                <li><span className="font-semibold text-brand-navy">Recht auf Unterrichtung gemäß Art. 19 DSGVO</span>: Sie haben das Recht auf Mitteilung über Empfänger, denen gegenüber Daten berichtigt oder gelöscht wurden.</li>
                <li><span className="font-semibold text-brand-navy">Recht auf Datenübertragbarkeit gemäß Art. 20 DSGVO</span>: Sie haben das Recht auf Erhalt Ihrer Daten in einem strukturierten Format.</li>
                <li><span className="font-semibold text-brand-navy">Recht auf Widerruf erteilter Einwilligungen gemäß Art. 7 Abs. 3 DSGVO</span>: Sie können Ihre erteilte Einwilligung jederzeit widerrufen.</li>
                <li><span className="font-semibold text-brand-navy">Recht auf Beschwerde gemäß Art. 77 DSGVO</span>: Sie haben das Recht auf Beschwerde bei einer zuständigen Aufsichtsbehörde.</li>
              </ul>
              <p className="text-sm">
                Zuständige Aufsichtsbehörde für uns ist die Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen (LDI NRW), Kavalleriestraße 2–4, 40213 Düsseldorf.
              </p>

              <div className="bg-brand-navy/5 rounded-xl p-6 border border-brand-grey/15 space-y-3 mt-6">
                <h3 className="font-bold text-brand-navy flex items-center gap-2">
                  <Shield className="h-5 w-5 text-brand-cyan" />
                  9.2 WIDERSPRUCHSRECHT
                </h3>
                <p className="text-sm font-bold text-brand-navy">
                  WENN WIR IM RAHMEN EINER INTERESSENABWÄGUNG IHRE PERSONENBEZOGENEN DATEN AUFGRUND UNSERES ÜBERWIEGENDEN BERECHTIGTEN INTERESSES VERARBEITEN, HABEN SIE DAS JEDERZEITIGE RECHT, AUS GRÜNDEN, DIE SICH AUS IHRER BESONDEREN SITUATION ERGEBEN, GEGEN DIESE VERARBEITUNG WIDERSPRUCH MIT WIRKUNG FÜR DIE ZUKUNFT EINZULEGEN.
                </p>
                <p className="text-sm">
                  MACHEN SIE VON IHREM WIDERSPRUCHSRECHT GEBRAUCH, BEENDEN WIR DIE VERARBEITUNG DER BETROFFENEN DATEN. EINE WEITERVERARBEITUNG BLEIBT ABER VORBEHALTEN, WENN WIR ZWINGENDE SCHUTZWÜRDIGE GRÜNDE FÜR DIE VERARBEITUNG NACHWEISEN KÖNNEN, DIE IHRE INTERESSEN, GRUNDRECHTE UND GRUNDFREIHEITEN ÜBERWIEGEN, ODER WENN DIE VERARBEITUNG DER GELTENDMACHUNG, AUSÜBUNG ODER VERTEIDIGUNG VON RECHTSANSPRÜCHEN DIENT.
                </p>
                <p className="text-sm">
                  WERDEN IHRE PERSONENBEZOGENEN DATEN VON UNS VERARBEITET, UM DIREKTWERBUNG ZU BETREIBEN, HABEN SIE DAS RECHT, JEDERZEIT WIDERSPRUCH GEGEN DIE VERARBEITUNG SIE BETREFFENDER PERSONENBEZOGENER DATEN ZUM ZWECKE DERARTIGER WERBUNG EINZULEGEN. SIE KÖNNEN DEN WIDERSPRUCH WIE OBEN BESCHRIEBEN AUSÜBEN.
                </p>
                <p className="text-sm">
                  MACHEN SIE VON IHREM WIDERSPRUCHSRECHT GEBRAUCH, BEENDEN WIR DIE VERARBEITUNG DER BETROFFENEN DATEN ZU DIREKTWERBEZWECKEN.
                </p>
              </div>
            </section>

            {/* Section 10 */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-brand-navy flex items-center gap-2 border-b border-brand-grey/10 pb-2">
                <Calendar className="h-5 w-5 text-brand-cyan" />
                10. Dauer der Speicherung personenbezogener Daten
              </h2>
              <p>
                Die Dauer der Speicherung von personenbezogenen Daten bemisst sich anhand der jeweiligen Rechtsgrundlage, am Verarbeitungszweck und – sofern einschlägig – zusätzlich anhand der jeweiligen gesetzlichen Aufbewahrungsfrist (z.B. handels- und steuerrechtliche Aufbewahrungsfristen).
              </p>
              <p>
                Bei der Verarbeitung von personenbezogenen Daten auf Grundlage einer ausdrücklichen Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO werden die betroffenen Daten so lange gespeichert, bis Sie Ihre Einwilligung widerrufen.
              </p>
              <p>
                Existieren gesetzliche Aufbewahrungsfristen für Daten, die im Rahmen rechtsgeschäftlicher bzw. rechtsgeschäftsähnlicher Verpflichtungen auf der Grundlage von Art. 6 Abs. 1 lit. b DSGVO verarbeitet werden, werden diese Daten nach Ablauf der Aufbewahrungsfristen routinemäßig gelöscht, sofern sie nicht mehr zur Vertragserfüllung oder Vertragsanbahnung erforderlich sind und/oder unsererseits kein berechtigtes Interesse an der Weiterspeicherung fortbesteht.
              </p>
              <p>
                Bei der Verarbeitung von personenbezogenen Daten auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO werden diese Daten so lange gespeichert, bis Sie Ihr Widerspruchsrecht nach Art. 21 Abs. 1 DSGVO ausüben, es sei denn, wir können zwingende schutzwürdige Gründe für die Verarbeitung nachweisen, die Ihre Interessen, Rechte und Freiheiten überwiegen, oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.
              </p>
              <p>
                Bei der Verarbeitung von personenbezogenen Daten zum Zwecke der Direktwerbung auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO werden diese Daten so lange gespeichert, bis Sie Ihr Widerspruchsrecht nach Art. 21 Abs. 2 DSGVO ausüben.
              </p>
              <p>
                Sofern sich aus den sonstigen Informationen dieser Erklärung über spezifische Verarbeitungssituationen nichts anderes ergibt, werden gespeicherte personenbezogene Daten im Übrigen dann gelöscht, wenn sie für die Zwecke, für die sie erhoben oder auf sonstige Weise verarbeitet wurden, nicht mehr notwendig sind.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer onScrollToTop={() => window.scrollTo({ top: 0, behavior: "smooth" })} />
    </div>
  );
}
