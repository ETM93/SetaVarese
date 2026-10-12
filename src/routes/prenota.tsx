import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { BookingForm, INTEREST_KEYS, type Interest } from "@/components/BookingForm";
import { BackLink } from "@/components/BackLink";
import { CookieSettingsLink } from "@/components/CookieSettingsLink";
import { LangProvider, useLang } from "@/lib/lang";

const searchSchema = z.object({
  interest: z.enum(INTEREST_KEYS).optional(),
  service: z.string().optional(),
});

export const Route = createFileRoute("/prenota")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Prenota — Seta Beauty Varese" },
      {
        name: "description",
        content: "Prenota la tua consulenza gratuita presso Seta Beauty Varese. Epilazione laser, viso e corpo in centro città.",
      },
      { property: "og:title", content: "Prenota — Seta Beauty Varese" },
      {
        property: "og:description",
        content: "Prenota la tua consulenza gratuita presso Seta Beauty Varese.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PrenotaPage,
});

function PrenotaPage() {
  return (
    <LangProvider>
      <Prenota />
    </LangProvider>
  );
}

function Prenota() {
  const { t, lang } = useLang();
  const { interest, service } = Route.useSearch();
  const preset: Interest = interest && INTEREST_KEYS.includes(interest) ? interest : "laser";
  const backLabel = lang === "en" ? "Back" : "Indietro";
  const offerLabel =
    preset === "corpo" ? t.bodyPage.offerLabel : preset === "viso" ? t.facePage.offerLabel : undefined;

  return (
    <div className="min-h-dvh bg-[var(--seta-night)] text-white font-sans antialiased">
      <header className="sticky top-0 z-40 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/85 text-white border-b border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 h-16 sm:h-20 flex items-center gap-3">
          <BackLink label={backLabel} fallbackTo="/" />
        </div>
      </header>
      <main className="py-6 sm:py-10 px-4 sm:px-8">
        <div className="mx-auto max-w-2xl space-y-6">
          {service && (
            <div className="rounded-2xl border border-[var(--seta-teal)]/40 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 text-center backdrop-blur-xl">
              <p className="text-[10px] tracking-[0.28em] text-[var(--seta-teal)] font-semibold">
                {t.form.interestLabel}
              </p>
              <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                {service}
              </h1>
              {offerLabel && (
                <div className="mt-5 rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-5 text-left">
                  <p className="text-[10px] tracking-[0.28em] text-[var(--seta-teal)] font-semibold uppercase mb-1">
                    {t.promos.kicker}
                  </p>
                  <p className="text-white font-bold text-base sm:text-lg leading-snug">{offerLabel}</p>
                </div>
              )}
            </div>
          )}
          <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <BookingForm dark formId="prenota" preset={preset} defaultNotes={service} />
          </div>
        </div>
      </main>
      <footer className="pb-8 text-center">
        <CookieSettingsLink className="text-xs tracking-[0.18em] uppercase text-white/50 hover:text-[var(--seta-teal)] transition focus-visible:outline-none focus-visible:text-[var(--seta-teal)]" />
      </footer>
    </div>
  );
}
