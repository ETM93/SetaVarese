import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { PromoForm } from "@/components/BookingForm";
import { BackLink } from "@/components/BackLink";
import { CookieSettingsLink } from "@/components/CookieSettingsLink";
import { LangProvider, useLang, PROMO_KEYS, type PromoKey } from "@/lib/lang";

const searchSchema = z.object({
  promo: z.enum([
    "laser-total-donna",
    "laser-total-uomo",
    "laser-6zone",
    "laser-4zone",
    "body-experience",
  ]).optional(),
});

export const Route = createFileRoute("/promo")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Blocca la promo — Seta Beauty Varese" },
      {
        name: "description",
        content:
          "Blocca la tua promozione presso Seta Beauty Varese: lascia i tuoi dati e ti ricontattiamo entro 24h. Nessun impegno.",
      },
      { property: "og:title", content: "Blocca la promo — Seta Beauty Varese" },
      {
        property: "og:description",
        content: "Blocca la tua promozione presso Seta Beauty Varese. Ti ricontattiamo entro 24h.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PromoPage,
});

function PromoPage() {
  return (
    <LangProvider>
      <Promo />
    </LangProvider>
  );
}

function Promo() {
  const { t, lang } = useLang();
  const { promo: promoParam } = Route.useSearch();
  const promo: PromoKey = promoParam && PROMO_KEYS.includes(promoParam) ? promoParam : "laser-total-donna";
  const isBody = promo === "body-experience";
  const card = isBody ? t.promos.bodyExperience : t.promos.cards[PROMO_KEYS.indexOf(promo)];
  const backLabel = lang === "en" ? "Back" : "Indietro";

  return (
    <div className="min-h-dvh bg-[var(--seta-night)] text-white font-sans antialiased">
      <header className="sticky top-0 z-40 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/85 text-white border-b border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 h-16 sm:h-20 flex items-center gap-3">
          <BackLink label={backLabel} fallbackTo="/" />
        </div>
      </header>
      <main className="py-6 sm:py-10 px-4 sm:px-8">
        <div className="mx-auto max-w-2xl space-y-6">
          <div className="rounded-2xl border border-[var(--seta-teal)]/40 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 text-center backdrop-blur-xl">
            <p className="text-[10px] tracking-[0.28em] text-[var(--seta-teal)] font-semibold">{card.kicker}</p>
            {isBody ? (
              <>
                <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-white uppercase">
                  {(card as typeof t.promos.bodyExperience).headline}
                </h1>
                <p className="mt-1 text-sm font-semibold text-white/80 tracking-wide">
                  {(card as typeof t.promos.bodyExperience).sub}
                </p>
                <p className="mt-2 inline-block rounded-full bg-[var(--seta-teal)] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.15em] text-white">
                  {(card as typeof t.promos.bodyExperience).badge}
                </p>
              </>
            ) : (
              <>
                <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  {(card as typeof t.promos.cards[0]).title} · {(card as typeof t.promos.cards[0]).highlight}
                </h1>
                {(card as typeof t.promos.cards[0]).sub && (
                  <p className="mt-1 text-sm font-semibold text-white/80 tracking-wide">{(card as typeof t.promos.cards[0]).sub}</p>
                )}
              </>
            )}
            <p className="mt-3 text-3xl font-extrabold text-[var(--seta-teal)] tracking-tight">
              {card.price}
              {card.priceNote && (
                <span className="ml-2 text-[10px] tracking-[0.28em] text-white/60 font-semibold align-middle">
                  {card.priceNote}
                </span>
              )}
            </p>
            <p className="mt-3 text-[11px] text-white/50">{card.note}</p>
          </div>
          <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <PromoForm promo={promo} formId="promo" />
          </div>
        </div>
      </main>
      <footer className="pb-8 text-center">
        <CookieSettingsLink className="text-xs tracking-[0.18em] uppercase text-white/50 hover:text-[var(--seta-teal)] transition focus-visible:outline-none focus-visible:text-[var(--seta-teal)]" />
      </footer>
    </div>
  );
}
