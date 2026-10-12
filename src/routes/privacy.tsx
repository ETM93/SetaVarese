import { createFileRoute, Link } from "@tanstack/react-router";
import logoBianco from "@/assets/seta/logo-bianco.png";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Seta Beauty Varese" },
      {
        name: "description",
        content:
          "Informativa sul trattamento dei dati personali ai sensi dell'art. 13 del GDPR per il modulo di contatto di Seta Beauty Varese.",
      },
      { property: "og:title", content: "Privacy Policy — Seta Beauty Varese" },
      {
        property: "og:description",
        content:
          "Informativa sul trattamento dei dati personali ai sensi dell'art. 13 del GDPR.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return (
    <div className="min-h-dvh bg-[var(--seta-night)] text-white antialiased">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-[var(--seta-teal)] focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:font-semibold"
      >
        Salta al contenuto
      </a>

      <header className="sticky top-0 z-40 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/85 text-white border-b border-white/5">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--seta-teal)] rounded">
            <img src={logoBianco} alt="Seta Beauty" className="h-7 sm:h-8 w-auto shrink-0" />
            <span className="hidden xs:inline text-[10px] sm:text-xs tracking-[0.3em] text-white/60 border-l border-white/15 pl-3 truncate">
              CLINIC · VARESE
            </span>
          </Link>
          <Link
            to="/"
            className="text-sm font-medium text-white/80 hover:text-[var(--seta-teal)] focus-visible:text-[var(--seta-teal)] focus-visible:outline-none transition"
          >
            Torna alla home
          </Link>
        </div>
      </header>

      <main id="main" className="py-16 sm:py-24">
        <article className="mx-auto max-w-3xl px-5 sm:px-8">
          <p className="text-[var(--seta-teal)] tracking-[0.3em] text-xs font-semibold mb-4">
            PRIVACY
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4">
            Informativa sul trattamento dei dati personali
          </h1>
          <p className="text-white/60 text-sm sm:text-base mb-12">
            Ex art. 13 del Regolamento UE 2016/679 – GDPR
          </p>

          <div className="prose prose-invert prose-sm sm:prose-base max-w-none text-white prose-headings:text-white prose-p:text-white prose-strong:text-white prose-a:text-[var(--seta-teal)] prose-a:hover:text-white">
            <p className="lead">
              La presente informativa descrive le modalità di trattamento dei dati personali degli utenti che compilano il modulo di contatto su questa pagina.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-white mt-10 mb-4">
              1. Titolare del Trattamento
            </h2>
            <p>
              Il Titolare del trattamento dei dati è{" "}
              <strong className="text-white">Tommy’s srls</strong>, con sede in{" "}
              <span className="text-white">Via Roma 12/G, Novate Milanese, 20026</span>, P.IVA{" "}
              <strong className="text-white">IT10911570967</strong>. Email di contatto:{" "}
              <a
                href="mailto:varese@setabeauty.com"
                className="text-[var(--seta-teal)] hover:underline"
              >
                varese@setabeauty.com
              </a>
              .
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-white mt-10 mb-4">
              2. Dati raccolti e Finalità
            </h2>
            <p>
              Tramite il modulo di contatto raccogliamo esclusivamente i dati forniti volontariamente dall'utente (nome, cognome, e-mail e numero di telefono). Tali dati vengono trattati esclusivamente per rispondere alla richiesta di contatto o per concordare un appuntamento presso il centro.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-white mt-10 mb-4">
              3. Base giuridica
            </h2>
            <p>
              Il trattamento dei dati si fonda sull'esecuzione di misure precontrattuali adottate su richiesta dell'interessato.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-white mt-10 mb-4">
              4. Modalità di trattamento e conservazione
            </h2>
            <p>
              I dati sono trattati con strumenti informatici e telematici. Per garantire l'invio tecnico dei messaggi, ci avvaliamo di piattaforme informatiche e fornitori di servizi tecnici terzi, i cui sistemi cancellano automaticamente i dati di transito a breve termine. I dati non saranno diffusi né ceduti a terzi estranei all'erogazione del servizio.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-white mt-10 mb-4">
              5. Diritti dell'interessato
            </h2>
            <p>
              Gli utenti possono esercitare in qualsiasi momento i diritti di accesso, rettifica o cancellazione dei propri dati rivolgendosi direttamente al Titolare all'indirizzo email sopra indicato.
            </p>
          </div>

          <div className="mt-14 pt-8 border-t border-white/10">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full bg-[var(--seta-teal)] hover:bg-[var(--seta-teal-dark)] text-white font-semibold px-6 py-3 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              Torna alla home
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}
