import { createFileRoute, Link } from "@tanstack/react-router";
import logoBianco from "@/assets/seta/logo-bianco.png";

export const Route = createFileRoute("/cookie-policy")({
  head: () => ({
    meta: [
      { title: "Cookie Policy — Seta Beauty Varese" },
      {
        name: "description",
        content:
          "Informativa estesa sull'uso dei cookie sul sito di Seta Beauty Varese.",
      },
      { property: "og:title", content: "Cookie Policy — Seta Beauty Varese" },
      {
        property: "og:description",
        content: "Informativa estesa sull'uso dei cookie sul sito di Seta Beauty Varese.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CookiePolicyPage,
});

function CookiePolicyPage() {
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
            COOKIE
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4">
            Cookie Policy
          </h1>
          <p className="text-white/60 text-sm sm:text-base mb-12">
            Informativa estesa sull'uso dei cookie e tecnologie simili
          </p>

          <div className="prose prose-invert prose-sm sm:prose-base max-w-none text-white prose-headings:text-white prose-p:text-white prose-strong:text-white prose-a:text-[var(--seta-teal)] prose-a:hover:text-white">
            <p className="lead">
              La presente Cookie Policy descrive l'utilizzo dei cookie e di tecnologie simili sul sito web di <strong className="text-white">Seta Beauty Varese</strong> (di seguito "il sito").
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-white mt-10 mb-4">
              1. Cosa sono i cookie
            </h2>
            <p>
              I cookie sono piccoli file di testo che i siti visitati inviano al terminale dell'utente, dove vengono memorizzati, per poi essere ritrasmessi agli stessi siti alla visita successiva.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-white mt-10 mb-4">
              2. Tipologie di cookie utilizzati da questo sito
            </h2>
            <p className="mb-4">
              Il nostro sito utilizza le seguenti categorie di cookie, gestite tramite l'apposito banner di consenso:
            </p>
            <ul className="text-white space-y-6">
              <li>
                <strong className="text-white">Cookie Essenziali (Necessari)</strong>
                <br />
                Sono indispensabili per il corretto funzionamento del sito e per permettere la navigazione e l'utilizzo delle funzioni di base (come la gestione delle preferenze sulla privacy). Non possono essere disattivati.
              </li>
              <li>
                <strong className="text-white">Cookie Analytics (Statistici)</strong>
                <br />
                Utilizzati per raccogliere informazioni in forma aggregata sul numero degli utenti e su come questi visitano il sito stesso, aiutandoci a migliorarne la struttura e le prestazioni (es. Google Analytics). Vengono attivati solo previo consenso dell'utente.
              </li>
              <li>
                <strong className="text-white">Cookie di Marketing / Profilazione</strong>
                <br />
                Utilizzati per tracciare i visitatori attraverso i siti web allo scopo di mostrare annunci pertinenti e coinvolgenti per il singolo utente (es. Meta Pixel / Google Ads). Vengono attivati solo previo consenso esplicito dell'utente.
              </li>
            </ul>

            <h2 className="text-xl sm:text-2xl font-bold text-white mt-10 mb-4">
              3. Come gestire o revocare le preferenze sui cookie
            </h2>
            <p>
              Puoi modificare o revocare il tuo consenso in qualsiasi momento cliccando sull'icona o sul pulsante flessibile dei cookie presente in basso a destra (floating button) sulle pagine del nostro sito, oppure modificando le impostazioni del tuo browser.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-white mt-10 mb-4">
              4. Titolare del Trattamento
            </h2>
            <p>
              Il Titolare del trattamento dei dati correlati all'uso del sito è{" "}
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
