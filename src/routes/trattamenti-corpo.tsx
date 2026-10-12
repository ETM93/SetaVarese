import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { BackLink } from "@/components/BackLink";
import { LangProvider, useLang } from "@/lib/lang";

export const Route = createFileRoute("/trattamenti-corpo")({
  head: () => ({
    meta: [
      { title: "Estetica Avanzata Corpo — Seta Beauty Varese" },
      {
        name: "description",
        content:
          "Modella, tonifica e ridisegna la tua silhouette con l'Estetica Avanzata Corpo: Bodypress Infrared, Bodytherm, Bodytone, Bodyshape 360 e Body Sculpt Laser.",
      },
      { property: "og:title", content: "Estetica Avanzata Corpo — Seta Beauty Varese" },
      {
        property: "og:description",
        content: "Scopri i percorsi di rimodellamento hi-tech per il corpo di Seta Beauty Varese.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TrattamentiCorpoPage,
});

function TrattamentiCorpoPage() {
  return (
    <LangProvider>
      <TrattamentiCorpo />
    </LangProvider>
  );
}

function TrattamentiCorpo() {
  const { t } = useLang();
  const p = t.bodyPage;
  return (
    <div className="min-h-dvh bg-[var(--seta-night)] text-white font-sans antialiased">
      <header className="sticky top-0 z-40 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/85 text-white border-b border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 h-16 sm:h-20 flex items-center gap-3">
          <BackLink label={p.backLabel} fallbackTo="/" />
        </div>
      </header>

      <main className="pt-8 pb-16 sm:pt-10 sm:pb-24 px-4 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[var(--seta-teal)] tracking-[0.3em] text-xs font-semibold mb-4 uppercase">
            {p.kicker}
          </p>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.1]">
            {p.title}
          </h1>
          <p className="mt-6 text-base sm:text-lg text-white/70 leading-relaxed">{p.sub}</p>
        </div>

        <div className="mx-auto max-w-3xl mt-16 sm:mt-20">
          <div className="space-y-6">
            {p.treatments.map((tr) => (
              <Link
                key={tr.name}
                to="/prenota"
                search={{ interest: "corpo", service: tr.name }}
                className="group block rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 sm:p-8 transition-all duration-300 hover:border-[var(--seta-teal)]/60 hover:from-white/[0.08] hover:to-white/[0.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--seta-teal)]"
              >
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  {tr.name}
                </h3>
                <p className="mt-3 text-white/70 leading-relaxed text-sm sm:text-base">{tr.desc}</p>
                <div className="mt-5 rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-5">
                  <p className="text-[10px] tracking-[0.28em] text-[var(--seta-teal)] font-semibold uppercase mb-1">
                    {t.promos.kicker}
                  </p>
                  <p className="text-white font-bold text-base sm:text-lg leading-snug">
                    {p.offerLabel}
                  </p>
                </div>
                <div>
                  <Button asChild className="mt-4 min-h-11 pointer-events-none">
                    <span>{p.cta}</span>
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
