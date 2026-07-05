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
                <p>E-Mail: info@ed-rent.com</p>
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
                2.1 Bei der bloß informatorischen Nutzung unserer Website, also wenn Sie sich nicht registrieren oder uns anderweitig Informationen übermitteln, erheben wir nur solche Daten, die Ihr Browser an den Seitenserver übermittelt (sog. „Server-Logfiles“). Wenn Sie unsere Website aufrufen, erheben wir die folgenden Daten, die für uns technisch erforderlich sind, um Ihnen die Website anzuzeigen:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-4 text-sm">
                <li>Unsere besuchte Website</li>
                <li>Datum und Uhrzeit zum Zeitpunkt des Zugriffes</li>
                <li>Menge der gesendeten Daten in Byte</li>
                <li>Quelle/Verweis, von welchem Sie auf die Seite gelangten</li>
                <li>Verwendeter Browser</li>
                <li>Verwendetes Betriebssystem</li>
                <li>Verwendete IP-Adresse (ggf. in anonymisierter Form)</li>
              </ul>
              <p>
                Die Verarbeitung erfolgt gemäß Art. 6 Abs. 1 lit. f DSGVO auf Basis unseres berechtigten Interesses an der Verbesserung der Stabilität und Funktionalität unserer Website. Eine Weitergabe oder anderweitige Verwendung der Daten findet nicht statt. Wir behalten uns allerdings vor, die Server-Logfiles nachträglich zu überprüfen, sollten konkrete Anhaltspunkte auf eine rechtswidrige Nutzung hinweisen.
              </p>
              <p>
                2.2 Diese Website nutzt aus Sicherheitsgründen und zum Schutz der Übertragung personenbezogener Daten und anderer vertraulicher Inhalte (z.B. Bestellungen oder Anfragen an den Verantwortlichen) eine SSL- bzw. TLS-Verschlüsselung. Sie können eine verschlüsselte Verbindung an der Zeichenfolge „https://“ und dem Schloss-Symbol in Ihrer Browserzeile erkennen.
              </p>
            </section>

            {/* Section 3 */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-brand-navy flex items-center gap-2 border-b border-brand-grey/10 pb-2">
                <Lock className="h-5 w-5 text-brand-cyan" />
                3. Hosting & Content-Delivery-Network
              </h2>
              <p>
                Für das Hosting unserer Website und die Darstellung der Seiteninhalte nutzen wir einen Anbieter, der seine Leistungen selbst oder durch ausgewählte Sub-Unternehmer ausschließlich auf Servern innerhalb der Europäischen Union erbringt. Sämtliche auf unserer Website erhobenen Daten werden auf diesen Servern verarbeitet.
              </p>
              <p>
                Wir haben mit dem Anbieter einen Auftragsverarbeitungsvertrag geschlossen, der den Schutz der Daten unserer Seitenbesucher sicherstellt und eine unberechtigte Weitergabe an Dritte untersagt.
              </p>
            </section>

            {/* Section 4 */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-brand-navy border-b border-brand-grey/10 pb-2">
                4. Cookies
              </h2>
              <p>
                Um den Besuch unserer Website attraktiv zu gestalten und die Nutzung bestimmter Funktionen zu ermöglichen, verwenden wir Cookies, also kleine Textdateien, die auf Ihrem Endgerät abgelegt werden. Teilweise werden diese Cookies nach Schließen des Browsers automatisch wieder gelöscht (sog. „Session-Cookies“), teilweise verbleiben diese Cookies länger auf Ihrem Endgerät und ermöglichen das Speichern von Seiteneinstellungen (sog. „persistente Cookies“).
              </p>
              <p>
                Sofern durch einzelne von uns eingesetzte Cookies auch personenbezogene Daten verarbeitet werden, erfolgt die Verarbeitung gemäß Art. 6 Abs. 1 lit. b DSGVO entweder zur Durchführung des Vertrages, gemäß Art. 6 Abs. 1 lit. a DSGVO im Falle einer erteilten Einwilligung oder gemäß Art. 6 Abs. 1 lit. f DSGVO zur Wahrung unserer berechtigten Interessen an der bestmöglichen Funktionalität der Website sowie einer kundenfreundlichen und effektiven Ausgestaltung des Seitenbesuchs.
              </p>
              <p>
                Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und einzeln über deren Annahme entscheiden oder die Annahme von Cookies für bestimmte Fälle oder generell ausschließen können. Bitte beachten Sie, dass bei Nichtannahme von Cookies die Funktionalität unserer Website eingeschränkt sein kann.
              </p>
            </section>

            {/* Section 5 */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-brand-navy border-b border-brand-grey/10 pb-2">
                5. Kontaktaufnahme
              </h2>
              <p>
                Im Rahmen der Kontaktaufnahme mit uns (z.B. per Kontaktformular oder E-Mail) werden personenbezogene Daten erhoben. Welche Daten im Falle der Nutzung eines Kontaktformulars erhoben werden, ist aus dem jeweiligen Kontaktformular ersichtlich. Diese Daten werden ausschließlich zum Zweck der Beantwortung Ihres Anliegens bzw. für die Kontaktaufnahme und die damit verbundene technische Administration gespeichert und verwendet.
              </p>
              <p>
                Rechtsgrundlage für die Verarbeitung dieser Daten ist unser berechtigtes Interesse an der Beantwortung Ihres Anliegens gemäß Art. 6 Abs. 1 lit. f DSGVO. Zielt Ihre Kontaktierung auf den Abschluss eines Vertrages ab, so ist zusätzliche Rechtsgrundlage für die Verarbeitung Art. 6 Abs. 1 lit. b DSGVO.
              </p>
              <p>
                Ihre Daten werden nach abschließender Bearbeitung Ihrer Anfrage gelöscht. Dies ist der Fall, wenn sich aus den Umständen entnehmen lässt, dass der betroffene Sachverhalt abschließend geklärt ist und sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
              </p>
            </section>

            {/* Section 6 */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-brand-navy border-b border-brand-grey/10 pb-2">
                6. Seitenfunktionalitäten
              </h2>
              <div className="space-y-4 pl-4 border-l-2 border-brand-cyan/30">
                <h3 className="font-bold text-brand-navy">Google Maps</h3>
                <p>
                  Diese Webseite nutzt einen Online-Kartendienst des folgenden Anbieters: Google Maps (API) von Google Ireland Limited, Gordon House, 4 Barrow St, Dublin, D04 E5W5, Irland (“Google”).
                </p>
                <p>
                  Google Maps ist ein Webdienst zur Darstellung von interaktiven (Land-)Karten, um geographische Informationen visuell darzustellen. Über die Nutzung dieses Dienstes wird Ihnen unser Standort angezeigt und eine etwaige Anfahrt erleichtert.
                </p>
                <p>
                  Bereits beim Aufrufen derjenigen Unterseiten, in die die Karte von Google Maps eingebunden ist, werden Informationen über Ihre Nutzung unserer Website (wie z.B. Ihre IP-Adresse) an Server von Google übertragen und dort gespeichert, hierbei kann es auch zu einer Übermittlung an die Server der Google LLC. in den USA kommen. Dies erfolgt unabhängig davon, ob Google ein Nutzerkonto bereitstellt, über das Sie eingeloggt sind oder ob ein Nutzerkonto besteht. Wenn Sie bei Google eingeloggt sind, werden Ihre Daten direkt Ihrem Konto zugeordnet. Wenn Sie die Zuordnung mit Ihrem Profil bei Google nicht wünschen, müssen Sie sich vor Aktivierung des Buttons ausloggen. Google speichert Ihre Daten (selbst für nicht eingeloggte Nutzer) als Nutzungsprofile und wertet diese aus.
                </p>
                <p>
                  Die Verarbeitung Ihrer Daten im Rahmen der Nutzung von Google Maps erfolgt auf Grundlage Ihrer Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO. Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft über die Cookie-Einstellungen auf unserer Website widerrufen.
                </p>
                <p>
                  Ihnen steht ein Widerspruchsrecht gegen die Bildung dieser Nutzerprofile zu, wobei Sie sich für dessen Ausübung an Google wenden müssen. Wenn Sie mit der künftigen Übermittlung Ihrer Daten an Google im Rahmen der Nutzung von Google Maps nicht einverstanden sind, besteht auch die Möglichkeit, den Webdienst von Google Maps vollständig zu deaktivieren, indem Sie die Anwendung JavaScript in Ihrem Browser ausschalten. Google Maps und damit auch die Kartenanzeige auf dieser Internetseite kann dann nicht genutzt werden.
                </p>
                <p>
                  Soweit rechtlich erforderlich, haben wir zur vorstehend dargestellten Verarbeitung Ihrer Daten Ihre Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO eingeholt. Sie können Ihre erteilte Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen. Um Ihren Widerruf auszuüben, befolgen Sie bitte die vorstehend geschilderte Möglichkeit zur Vornahme eines Widerspruchs.
                </p>
                <p>
                  Für Datenübermittlungen in die USA hat sich der Anbieter dem EU-US-Datenschutzrahmen (EU-US Data Privacy Framework) angeschlossen, das auf Basis eines Angemessenheitsbeschlusses der Europäischen Kommission die Einhaltung des europäischen Datenschutzniveaus sicherstellt.
                </p>
                <p>
                  Weitere Hinweise zum Datenschutz von Google finden sich hier:{" "}
                  <a href="https://business.safety.google/intl/de/privacy/" target="_blank" rel="noopener noreferrer" className="text-brand-cyan hover:underline break-all">
                    https://business.safety.google/intl/de/privacy/
                  </a>
                </p>
              </div>
            </section>

            {/* Section 7 */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-brand-navy flex items-center gap-2 border-b border-brand-grey/10 pb-2">
                <Settings className="h-5 w-5 text-brand-cyan" />
                7. Analyse und Marketing-Tools
              </h2>

              <div className="space-y-6 pl-4 border-l-2 border-brand-cyan/30">
                {/* 7.0 */}
                <div className="space-y-2">
                  <h3 className="font-bold text-brand-navy">Google Tag Manager</h3>
                  <p>
                    Diese Website verwendet Google Tag Manager, einen Dienst der Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.
                  </p>
                  <p>
                    Google Tag Manager ist ein System zur Verwaltung von Website-Tags. Tags sind kleine Code-Bausteine, die das Messen von Websiteverkehr und Nutzerverhalten ermöglichen. Der Tag Manager selbst erhebt keine personenbezogenen Daten und setzt keine Cookies. Er ermöglicht lediglich die Verwaltung und Ausspielung anderer Tools (z. B. Google Analytics, Meta Pixel), die in dieser Datenschutzerklärung gesondert beschrieben werden.
                  </p>
                  <p>
                    Die Verarbeitung erfolgt auf Grundlage Ihrer Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO. Sie können Ihre Einwilligung jederzeit über die Cookie-Einstellungen auf unserer Website widerrufen.
                  </p>
                  <p>
                    Wir haben mit Google einen Auftragsverarbeitungsvertrag abgeschlossen. Google hat sich dem EU-US Data Privacy Framework angeschlossen, das ein angemessenes Datenschutzniveau für Datenübermittlungen in die USA sicherstellt. Weitere Informationen:{" "}
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-cyan hover:underline">
                      https://policies.google.com/privacy
                    </a>
                  </p>
                </div>

                {/* 7a */}
                <div className="space-y-2">
                  <h3 className="font-bold text-brand-navy">7a.) Google Analytics 4</h3>
                  <p>
                    Diese Website verwendet Google Analytics 4, einen Webanalysedienst der Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.
                  </p>
                  <p>
                    Google Analytics 4 ermöglicht uns die Analyse des Nutzerverhaltens auf unserer Website. Dabei werden Informationen wie aufgerufene Seiten, Verweildauer, verwendetes Endgerät, ungefährer Standort (Stadtebene) sowie Interaktionen (z. B. Klicks auf Links oder das Absenden von Formularen) erfasst. IP-Adressen werden von Google Analytics 4 nicht gespeichert.
                  </p>
                  <p>
                    Sofern Sie uns über ein Formular Ihre E-Mail-Adresse oder Telefonnummer mitteilen und in die Nutzung von Google Analytics 4 eingewilligt haben, können diese Daten in anonymisierter (gehashter) Form zur verbesserten Zuordnung von Conversions verwendet werden. Eine direkte Identifikation ist durch das Hashing nicht möglich.
                  </p>
                  <p>
                    Die erhobenen Daten werden auf Servern von Google verarbeitet, auch in den USA. Google hat sich dem EU-US Data Privacy Framework angeschlossen.
                  </p>
                  <p>
                    Die Verarbeitung erfolgt ausschließlich auf Grundlage Ihrer Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO. Die Datenaufbewahrung ist auf 14 Monate begrenzt.
                  </p>
                  <p>
                    Sie können der Erfassung durch Google Analytics widersprechen, indem Sie Ihre Einwilligung über die Cookie Einstellungen widerrufen oder das Browser-Add-on nutzen:{" "}
                    <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-brand-cyan hover:underline">
                      https://tools.google.com/dlpage/gaoptout
                    </a>
                  </p>
                </div>

                {/* 7b */}
                <div className="space-y-2">
                  <h3 className="font-bold text-brand-navy">7b.) Meta Pixel und Meta Conversions API</h3>
                  <p>
                    Diese Website verwendet den Meta Pixel sowie die Meta Conversions API, Dienste der Meta Platforms Ireland Ltd., 4 Grand Canal Square, Grand Canal Harbour, Dublin 2, Irland.
                  </p>
                  <p>
                    Der Meta Pixel ist ein JavaScript-Code, der Informationen über das Nutzerverhalten auf unserer Website erfasst (z. B. aufgerufene Seiten, Klicks, abgesendete Formulare). Diese Informationen werden an Meta übermittelt, um den Erfolg unserer Werbeanzeigen bei Facebook und Instagram zu messen und Remarketing-Zielgruppen zu erstellen.
                  </p>
                  <p>
                    Ergänzend zum Meta Pixel verwenden wir die Meta Conversions API. Diese ermöglicht die serverseitige Übermittlung von Conversion-Ereignissen direkt von unserem Server an Meta, ohne Abhängigkeit vom Browser des Nutzers. Beide Kanäle werden zur Messung derselben Ereignisse eingesetzt, um die Genauigkeit der Conversion-Messung zu verbessern.
                  </p>
                  <p>
                    Sofern Sie uns über ein Formular personenbezogene Daten (E-Mail-Adresse, Telefonnummer) mitteilen und in die Nutzung von Meta Pixel eingewilligt haben, können diese Daten in anonymisierter (gehashter) Form an Meta übermittelt werden (sog. Advanced Matching). Eine Identifikation anhand der gehashten Daten ist nicht möglich.
                  </p>
                  <p>
                    Die verarbeiteten Daten können an Server von Meta in den USA übermittelt werden. Meta hat sich dem EU-US Data Privacy Framework angeschlossen.
                  </p>
                  <p>
                    Die Verarbeitung erfolgt auf Grundlage Ihrer Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO. Sie können Ihre Einwilligung jederzeit über die Cookie-Einstellungen widerrufen. Opt-out über Meta-Werbeeinstellungen:{" "}
                    <a href="https://www.facebook.com/adpreferences/" target="_blank" rel="noopener noreferrer" className="text-brand-cyan hover:underline">
                      https://www.facebook.com/adpreferences/
                    </a>
                  </p>
                  <p>
                    Wir haben mit Meta einen Auftragsverarbeitungsvertrag abgeschlossen. Weitere Informationen:{" "}
                    <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer" className="text-brand-cyan hover:underline">
                      https://www.facebook.com/privacy/policy/
                    </a>
                  </p>
                </div>

                {/* 7c */}
                <div className="space-y-2">
                  <h3 className="font-bold text-brand-navy">7c.) Google Ads Conversions-Tracking und Remarketing</h3>
                  <p>
                    Diese Website verwendet Google Ads Conversion-Tracking und Remarketing, Dienste der Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.
                  </p>
                  <p>
                    Google Ads Conversion-Tracking erfasst, welche Aktionen auf unserer Website nach einem Klick auf eine Google Werbeanzeige durchgeführt wurden (z. B. das Absenden einer Miet- oder Verkaufsanfrage). So können wir messen, welche Anzeigen zu tatsächlichen Anfragen geführt haben.
                  </p>
                  <p>
                    Das Remarketing ermöglicht es, Nutzern, die unsere Website besucht haben, bei späteren Google-Suchen oder auf anderen Websites zielgerichtete Werbeanzeigen anzuzeigen.
                  </p>
                  <p>
                    Sofern Sie uns über ein Formular Ihre E-Mail-Adresse mitteilen und in die Nutzung von Google Ads eingewilligt haben, kann diese in gehashter Form zur Verbesserung der Conversion-Messung verwendet werden (sog. Enhanced Conversions). Eine direkte Identifikation ist durch das Hashing nicht möglich.
                  </p>
                  <p>
                    Die verarbeiteten Daten können an Server von Google in den USA übermittelt werden. Google hat sich dem EU-US Data Privacy Framework angeschlossen.
                  </p>
                  <p>
                    Die Verarbeitung erfolgt auf Grundlage Ihrer Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO. Sie können Ihre Einwilligung jederzeit über die Cookie-Einstellungen widerrufen. Opt-out:{" "}
                    <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-brand-cyan hover:underline">
                      https://adssettings.google.com
                    </a>
                  </p>
                  <p>
                    Wir haben mit Google einen Auftragsverarbeitungsvertrag abgeschlossen. Weitere Informationen:{" "}
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-cyan hover:underline">
                      https://policies.google.com/privacy
                    </a>
                  </p>
                </div>
              </div>
            </section>

            {/* Section 8 */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-brand-navy flex items-center gap-2 border-b border-brand-grey/10 pb-2">
                <BarChart2 className="h-5 w-5 text-brand-cyan" />
                8. Tools und Sonstiges
              </h2>
              <div className="space-y-4 pl-4 border-l-2 border-brand-cyan/30">
                <h3 className="font-bold text-brand-navy">Cookie-Consent-Tool (Real Cookie Banner)</h3>
                <p>
                  Diese Website verwendet Real Cookie Banner, ein Consent-Management-Tool zur rechtskonformen Einholung, Verwaltung und Dokumentation von Cookie-Einwilligungen. Anbieter ist die devowl.io GmbH, Tannet 12, 94539 Grafling, Deutschland.
                </p>
                <p>
                  Real Cookie Banner ist vollständig als natives WordPress-Plugin installiert. Alle Einwilligungen und Einstellungen werden ausschließlich auf unserem eigenen Server verarbeitet und gespeichert. Eine Weitergabe Ihrer Daten an devowl.io findet im Normalbetrieb nicht statt.
                </p>
                <p>
                  Das Tool setzt technisch notwendige Cookies, um Ihre Cookie-Präferenzen zu speichern. Diese Cookies enthalten keine personenbezogenen Daten im Sinne der DSGVO.
                </p>
                <p>
                  Die Verarbeitung erfolgt gemäß Art. 6 Abs. 1 lit. c DSGVO (rechtliche Verpflichtung zur Einholung von Einwilligungen) sowie Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem rechtskonformen Consent-Management).
                </p>
                <p>
                  Sie können Ihre Cookie-Einwilligung jederzeit über den Link „Cookie-Einstellungen“ im Footer der Website widerrufen oder anpassen.
                </p>
                <p>
                  Weitere Informationen:{" "}
                  <a href="https://devowl.io/de/rcb/datenverarbeitung/" target="_blank" rel="noopener noreferrer" className="text-brand-cyan hover:underline break-all">
                    https://devowl.io/de/rcb/datenverarbeitung/
                  </a>
                </p>
              </div>
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
