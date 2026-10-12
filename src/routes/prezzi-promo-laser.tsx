import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BackLink } from "@/components/BackLink";
import { LangProvider, useLang } from "@/lib/lang";

export const Route = createFileRoute("/prezzi-promo-laser")({
  head: () => ({
    meta: [
      { title: "Listino e Promozioni Epilazione Laser — Seta Beauty Varese" },
      {
        name: "description",
        content:
          "Scopri il listino epilazione laser uomo e donna, le promo Epil Laser, l'offerta Prova Costume e la Skin Promo di Seta Beauty Varese.",
      },
      { property: "og:title", content: "Listino e Promozioni Epilazione Laser — Seta Beauty Varese" },
      {
        property: "og:description",
        content: "Prezzi e promozioni epilazione laser del centro Seta Beauty Varese.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PrezziPromoLaserPage,
});

const PROMO_SLUGS = ["laser-total-donna", "laser-total-uomo", "laser-6zone", "laser-4zone"] as const;

function PrezziPromoLaserPage() {
  return (
    <LangProvider>
      <PrezziPromoLaser />
    </LangProvider>
  );
}

function PrezziPromoLaser() {
  const { t } = useLang();
  const p = t.laserPage;
  const laserCard = t.treatments.cards[0];
  const [gender, setGender] = useState<"donna" | "uomo">("donna");

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
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.1]">{p.title}</h1>
          <p className="mt-6 text-base sm:text-lg text-white/70 leading-relaxed">{p.sub}</p>
        </div>

        {/* Prezzi */}
        <div className="mx-auto max-w-2xl mt-8">
          <div className="rounded-2xl border border-white/10 bg-black/30 p-6 sm:p-8">
            <div className="mb-5 grid grid-cols-2 gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1">
              {(["donna", "uomo"] as const).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGender(g)}
                  className={`rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors ${
                    gender === g ? "bg-[var(--seta-teal)] text-white" : "text-white/60 hover:text-white"
                  }`}
                >
                  {g === "donna" ? laserCard.chips[1] : laserCard.chips[0]}
                </button>
              ))}
            </div>
            <ul className="space-y-2.5 text-sm">
              {laserCard.prices
                ?.filter((_, rowIdx) => (gender === "donna" ? rowIdx !== 6 : rowIdx !== 5))
                .map((row) => (
                  <li key={row.label} className="flex justify-between items-center gap-4">
                    <span className="text-white/80">{row.label}</span>
                    <span className="text-[var(--seta-teal)] font-bold tabular-nums whitespace-nowrap">
                      {row.price}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        {/* Promo Epil Laser */}
        <div className="mx-auto max-w-3xl mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-center">{p.promoTitle}</h2>
          <div className="mt-10 space-y-8">
            {t.promos.cards.map((c, idx) => {
              const isFeatured = idx === 0 || idx === 1;
              return (
                <Link
                  key={`${c.title}-${idx}`}
                  to="/promo"
                  search={{ promo: PROMO_SLUGS[idx] }}
                  className={`group relative block rounded-3xl border p-6 sm:p-8 backdrop-blur-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--seta-teal)] ${
                    isFeatured
                      ? "border-[var(--seta-teal)] bg-gradient-to-b from-[var(--seta-teal)]/15 to-black/40 hover:from-[var(--seta-teal)]/25 hover:to-black/50"
                      : "border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] hover:border-[var(--seta-teal)]/60 hover:from-white/[0.08] hover:to-white/[0.02]"
                  }`}
                >
                  <p className="text-[10px] tracking-[0.28em] text-[var(--seta-teal)] font-semibold text-center">
                    {c.kicker}
                  </p>
                  <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-center">
                    {c.title} · {c.highlight}
                  </h3>
                  {c.sub && (
                    <p className="mt-1 text-sm font-semibold text-white/70 text-center tracking-wide">{c.sub}</p>
                  )}
                  <div className="mt-5 text-center">
                    <p className="text-[10px] tracking-[0.28em] text-white/60 font-semibold uppercase">
                      {c.priceLabel}
                    </p>
                    <p className="mt-1 text-4xl font-extrabold text-[var(--seta-teal)] tracking-tight">
                      {c.price}
                    </p>
                    {c.originalPrice && (
                      <p className="mt-1 text-sm text-white/40 line-through">
                        {c.priceNote ? `${c.priceNote} ${c.originalPrice}` : c.originalPrice}
                      </p>
                    )}
                  </div>
                  <p className="mt-4 text-[11px] text-white/50 text-center">{c.note}</p>
                  <div className="mt-4 space-y-2">
                    {t.promos.laserBonuses.map((b) => (
                      <div
                        key={b.label}
                        className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/30 px-3 py-2"
                      >
                        <Check className="w-3.5 h-3.5 text-[var(--seta-teal)] shrink-0" />
                        <div className="flex-1 min-w-0 text-left">
                          <p className="text-xs text-white/80 leading-tight">{b.label}</p>
                          {b.sub && <p className="text-[10px] text-white/40 mt-0.5">{b.sub}</p>}
                        </div>
                        <span className="rounded bg-[var(--seta-teal)]/20 px-2 py-0.5 text-[10px] font-extrabold text-[var(--seta-teal)] whitespace-nowrap shrink-0">
                          {b.value}
                        </span>
                      </div>
                    ))}
                  </div>
                  {c.savings && (
                    <p className="mt-4 text-sm font-bold tracking-tight uppercase text-center text-[var(--seta-teal)]">
                      {c.savings}
                    </p>
                  )}
                  <Button asChild className="mt-4 w-full min-h-11 pointer-events-none">
                    <span>{t.promos.cta}</span>
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Prova costume */}
        <div className="mx-auto max-w-2xl mt-8">
          <Link
            to="/promo"
            search={{ promo: "body-experience" }}
            className="group mt-8 block rounded-3xl border-2 border-[var(--seta-teal)] bg-gradient-to-b from-[var(--seta-teal)]/15 to-black/40 p-6 sm:p-8 text-center transition-all duration-300 hover:from-[var(--seta-teal)]/25 hover:to-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--seta-teal)]"
          >
            <span className="inline-block rounded bg-[var(--seta-teal)] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-white">
              {t.promos.bodyExperience.kicker}
            </span>
            <h3 className="mt-4 text-2xl sm:text-3xl font-extrabold tracking-tight uppercase leading-[1.1]">
              {t.promos.bodyExperience.headline}
            </h3>
            <p className="mt-3 text-sm sm:text-base text-white/80 leading-relaxed">
              {t.promos.bodyExperience.sub}
            </p>
            <p className="mt-4 text-xs tracking-[0.28em] text-white/60 font-semibold uppercase">
              {t.promos.bodyExperience.priceLabel}
            </p>
            <div className="mt-2 flex items-baseline justify-center gap-3">
              <p className="text-4xl sm:text-5xl font-extrabold text-[var(--seta-teal)] tracking-tight">
                {t.promos.bodyExperience.price}
              </p>
              <p className="text-lg text-white/40 line-through">{t.promos.bodyExperience.originalPrice}</p>
            </div>
            <p className="mt-2 text-lg font-bold tracking-tight text-white uppercase">
              {t.promos.bodyExperience.savings}
            </p>
            <Button asChild className="mt-6 min-h-11 px-8 pointer-events-none">
              <span>{t.promos.bodyExperience.cta}</span>
            </Button>
          </Link>
        </div>

        {/* Skin Promo */}
        <div className="mx-auto max-w-2xl mt-8">
          <Link
            to="/prenota"
            search={{ interest: "laser", service: laserCard.cat }}
            className="group mt-8 block rounded-3xl border-2 border-[var(--seta-teal)] bg-black/50 p-6 sm:p-8 text-center transition-all duration-300 hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--seta-teal)]"
          >
            <span className="inline-block rounded-full bg-[var(--seta-teal)] px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.2em] text-white">
              {t.hero.offerLabel}
            </span>
            <h3 className="mt-4 text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
              {t.hero.laserMainTitle}
            </h3>
            <p className="mt-3 text-sm sm:text-base text-white/70 leading-relaxed max-w-lg mx-auto">
              {(() => {
                const parts = t.hero.laserMainSub.split(t.hero.laserMainSubHighlight);
                return (
                  <>
                    {parts[0]}
                    {parts.length > 1 && (
                      <span className="text-[var(--seta-teal)] font-semibold">{t.hero.laserMainSubHighlight}</span>
                    )}
                    {parts[1]}
                  </>
                );
              })()}
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 max-w-lg mx-auto">
              <div className="rounded-2xl border border-[var(--seta-teal)] bg-black/40 p-4 text-center">
                <p className="text-[10px] tracking-[0.2em] text-white/60 font-semibold uppercase">
                  {t.hero.priceBox1Label}
                </p>
                <p className="mt-1 text-3xl sm:text-4xl font-extrabold text-[var(--seta-teal)] tracking-tight">
                  {t.hero.priceBox1Price}
                </p>
                <p className="mt-1 text-xs text-white/70 uppercase tracking-wide">{t.hero.priceBox1Sub}</p>
              </div>
              <div className="rounded-2xl border border-[var(--seta-teal)] bg-black/40 p-4 text-center">
                <p className="text-[10px] tracking-[0.2em] text-white/60 font-semibold uppercase">
                  {t.hero.priceBox2Label}
                </p>
                <p className="mt-1 text-3xl sm:text-4xl font-extrabold text-[var(--seta-teal)] tracking-tight">
                  {t.hero.priceBox2Price}
                </p>
                <p className="mt-1 text-xs text-white/70 uppercase tracking-wide">{t.hero.priceBox2Sub}</p>
              </div>
            </div>
            <Button size="lg" className="mt-6 w-full max-w-xs h-12 text-sm font-semibold pointer-events-none">
              {t.hero.consultCta}
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
