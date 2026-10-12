import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef, type RefObject } from "react";
import { Mail, Phone, Menu, X, Check } from "lucide-react";
import { LangProvider, useLang, type Lang } from "@/lib/lang";
import { CENTER } from "@/lib/center";
import { saveScrollPosition, restoreScrollPosition } from "@/lib/scroll-preserve";
import { Button } from "@/components/ui/button";
import { CookieSettingsLink } from "@/components/CookieSettingsLink";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, type CarouselApi } from "@/components/ui/carousel";
import { BookingForm, WhatsAppIcon, INTEREST_KEYS, type Interest } from "@/components/BookingForm";

import monza1 from "@/assets/seta/monza-1.jpg";
import biolift from "@/assets/seta/biolift.png";
import logoBianco from "@/assets/seta/logo-bianco.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Seta Beauty Varese: Specialisti in Epilazione Laser ed Estetica Avanzata" },
      {
        name: "description",
        content:
          "Il metodo Seta in centro Varese. Scopri la tecnologia, la sicurezza e la personalizzazione dei percorsi di bellezza di Seta Beauty.",
      },
      { property: "og:title", content: "Seta Beauty Varese" },
      {
        property: "og:description",
        content:
          "Epilazione laser, viso e corpo. Via Camillo Benso Conte di Cavour 33, 21100 Varese. Consulenza gratuita.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: SetaVaresePage,
});



function SetaVaresePage() {
  return (
    <LangProvider>
      <SetaVarese />
    </LangProvider>
  );
}

function SetaVarese() {
  const { t } = useLang();
  const navigate = useNavigate();
  const [preset, setPreset] = useState<Interest>("laser");
  const bookingRef = useRef<HTMLElement>(null);

  useEffect(() => {
    restoreScrollPosition();
  }, []);

  const scrollToBooking = () => {
    bookingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const goToBookingPage = (interest?: Interest) => {
    saveScrollPosition();
    navigate({
      to: "/prenota",
      search: interest ? { interest, service: t.form.interests[interest] } : {},
    });
  };
  const handleBookingClick = (interest?: Interest) => {
    if (interest) setPreset(interest);
    goToBookingPage(interest);
  };
  return (
    <div className="min-h-dvh bg-[var(--seta-night)] font-sans text-white antialiased">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-[var(--seta-teal)] focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:font-semibold"
      >
        {t.skip}
      </a>
      <Nav onBookingClick={() => handleBookingClick()} />
      <main id="main" className="pb-24 sm:pb-0">
        <Hero onOpenBooking={(interest) => handleBookingClick(interest ?? "laser")} />
        <Treatments onBookingClick={handleBookingClick} />
        <Promos />
        <BodyExperience />
        <About />
        <WhyUs />
        <Booking bookingRef={bookingRef} preset={preset} />
        <Visit />
      </main>
      <Footer onBookingClick={() => handleBookingClick()} />
      <StickyMobileCTA onOpenBooking={() => goToBookingPage()} />
    </div>
  );
}


function LangSwitch({ className = "" }: { className?: string }) {
  const { t, lang, setLang } = useLang();
  return (
    <div
      role="group"
      aria-label={t.footer.langLabel}
      className={`inline-flex items-center rounded-full border border-white/15 p-0.5 text-[11px] font-semibold ${className}`}
    >
      {(["it", "en"] as Lang[]).map((l) => (
        <button
          key={l}
          type="button"
          aria-pressed={lang === l}
          onClick={() => setLang(l)}
          className={`px-2.5 py-1.5 rounded-full transition uppercase tracking-[0.15em] ${
            lang === l ? "bg-[var(--seta-teal)] text-white" : "text-white/60 hover:text-white"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

function Nav({ onBookingClick }: { onBookingClick: () => void }) {
  const { t } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const handleBooking = (e: React.MouseEvent) => {
    e.preventDefault();
    closeMenu();
    onBookingClick();
  };
  return (
    <header className="sticky top-0 z-40 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/85 text-white border-b border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            aria-label={menuOpen ? t.nav.mobileMenuClose : t.nav.mobileMenuOpen}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/15 text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--seta-teal)] transition"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <a href="#top" className="flex items-center gap-2 sm:gap-3 min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--seta-teal)] rounded">
            <img src={logoBianco} alt="Seta Beauty" className="h-7 sm:h-8 w-auto shrink-0" />
            <span className="hidden xs:inline text-[10px] sm:text-xs tracking-[0.3em] text-white/60 border-l border-white/15 pl-2 sm:pl-3 truncate">
              CLINIC · VARESE
            </span>
          </a>
        </div>
        <nav aria-label={t.nav.ariaNav} className="hidden lg:flex items-center gap-8 text-sm font-medium">
          {t.nav.links.map(([l, h]) => (
            h === "#promo" ? (
              <a
                key={h}
                href={h}
                className="text-[var(--seta-teal)] font-bold uppercase tracking-[0.12em] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--seta-teal)] transition"
              >
                {l}
              </a>
            ) : (
              <a key={h} href={h} className="text-white/80 hover:text-[var(--seta-teal)] focus-visible:text-[var(--seta-teal)] focus-visible:outline-none transition">
                {l}
              </a>
            )
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Button
            onClick={(e: React.MouseEvent) => { e.preventDefault(); onBookingClick(); }}
            className="hidden sm:inline-flex min-h-11"
          >
            {t.nav.book}
          </Button>
          <LangSwitch />
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 sm:top-20 z-50 h-[calc(100dvh-64px)] sm:h-[calc(100dvh-80px)] bg-[var(--seta-night)] border-t border-white/5">
          <nav aria-label={t.nav.ariaNav} className="flex flex-col items-center justify-start h-full pt-24 sm:pt-28 px-6 pb-16 space-y-6">
            {t.nav.links.map(([l, h]) => (
              <a
                key={h}
                href={h}
                onClick={closeMenu}
                className={`text-2xl font-semibold tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--seta-teal)] rounded px-3 py-1 transition ${
                  h === "#promo" ? "text-[var(--seta-teal)]" : "text-white/90 hover:text-[var(--seta-teal)]"
                }`}
              >
                {l}
              </a>
            ))}
            <Button
              onClick={handleBooking}
              size="lg"
              className="mt-4 inline-flex min-h-12 text-base"
            >
              {t.nav.book}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero({ onOpenBooking }: { onOpenBooking: (interest?: Interest) => void }) {
  const { t } = useLang();
  return (
    <section id="top" className="relative text-white overflow-hidden">
      <div className="absolute inset-0">
        <img src={monza1} alt="" aria-hidden="true" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 pt-10 sm:pt-14 lg:pt-20 pb-16 sm:pb-20">
        <div className="flex flex-col items-center text-center space-y-6 lg:space-y-8">
          <p className="text-[var(--seta-teal)] tracking-[0.35em] text-[11px] font-semibold">
            {t.hero.kicker}
          </p>

          <div className="relative w-full max-w-3xl">
            <div className="absolute -inset-3 rounded-[28px] bg-[var(--seta-teal)]/25 blur-2xl" aria-hidden="true" />
            <div
              className="relative rounded-3xl border-2 border-[var(--seta-teal)] bg-black/50 backdrop-blur-md overflow-hidden shadow-[0_0_60px_-10px_var(--seta-teal)] cursor-pointer"
              role="button"
              tabIndex={0}
              onClick={() => onOpenBooking("laser")}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpenBooking("laser"); } }}
            >
              <span className="absolute -top-px left-1/2 -translate-x-1/2 rounded-b-xl bg-[var(--seta-teal)] px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.2em] text-white shadow-lg shadow-[var(--seta-teal)]/50">
                {t.hero.offerLabel}
              </span>
              <div className="pt-10 pb-7 px-6 sm:px-10 text-center">
                <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase">
                  {t.hero.laserMainTitle}
                </p>
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
                    <p className="text-[10px] tracking-[0.2em] text-white/60 font-semibold uppercase">{t.hero.priceBox1Label}</p>
                    <p className="mt-1 text-3xl sm:text-4xl font-extrabold text-[var(--seta-teal)] tracking-tight">{t.hero.priceBox1Price}</p>
                    <p className="mt-1 text-xs text-white/70 uppercase tracking-wide">{t.hero.priceBox1Sub}</p>
                  </div>
                  <div className="rounded-2xl border border-[var(--seta-teal)] bg-black/40 p-4 text-center">
                    <p className="text-[10px] tracking-[0.2em] text-white/60 font-semibold uppercase">{t.hero.priceBox2Label}</p>
                    <p className="mt-1 text-3xl sm:text-4xl font-extrabold text-[var(--seta-teal)] tracking-tight">{t.hero.priceBox2Price}</p>
                    <p className="mt-1 text-xs text-white/70 uppercase tracking-wide">{t.hero.priceBox2Sub}</p>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="mt-6 w-full max-w-xs h-12 text-sm font-semibold shadow-xl shadow-[var(--seta-teal)]/40 pointer-events-none"
                >
                  {t.hero.consultCta}
                </Button>
              </div>
            </div>
          </div>

          <div
            className="w-full max-w-3xl rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 sm:p-8 text-center shadow-2xl cursor-pointer"
            role="button"
            tabIndex={0}
            onClick={() => { const el = document.getElementById("promo"); el?.scrollIntoView({ behavior: "smooth" }); }}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); const el = document.getElementById("promo"); el?.scrollIntoView({ behavior: "smooth" }); } }}
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.05] tracking-tight text-white select-none">
              {t.hero.title}
              {t.hero.titleAccent && <span className="text-white">{t.hero.titleAccent}</span>}
            </h1>
            <p className="mt-3 text-base sm:text-lg text-white/75 leading-relaxed font-light max-w-xl mx-auto">
              {t.hero.sub}
            </p>
            <a
              href="#promo"
              className="mt-5 inline-flex items-center justify-center w-full max-w-xs h-12 rounded-full border border-white/30 bg-transparent px-6 text-sm font-semibold text-white transition hover:border-[var(--seta-teal)] hover:text-[var(--seta-teal)] hover:bg-[var(--seta-teal)]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--seta-teal)] pointer-events-none"
            >
              {t.hero.discoverPromos}
            </a>
          </div>

          <div className="flex items-center gap-3 text-sm text-white/80">
            <div className="flex items-center gap-0.5" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="text-[var(--seta-teal)] text-base leading-none">★</span>
              ))}
            </div>
            <span className="tracking-wide">
              <strong className="text-white font-semibold">{CENTER.rating}</strong>
              <span className="text-white/40 mx-2" aria-hidden="true">·</span>
              {t.hero.reviews}
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}

function About() {
  const { t } = useLang();
  return (
    <section id="centro" className="py-20 bg-[var(--seta-night)]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <p className="text-[var(--seta-teal)] tracking-[0.3em] text-xs font-semibold mb-4">
            {t.about.kicker}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
            {t.about.title1}<br />
            <span className="text-white/60">{t.about.title2}</span>
          </h2>
          <p className="mt-6 text-white/70 leading-relaxed text-lg whitespace-pre-line">
            {t.about.text}
          </p>
          <div className="mt-12">
            <p className="text-[var(--seta-teal)] tracking-[0.3em] text-[11px] font-semibold mb-3">
              {t.about.listKicker}
            </p>
            <div className="border-t border-white/10">
              {t.about.items.map((item, i) => (
                <div
                  key={item.title}
                  className="group flex items-start gap-6 sm:gap-8 py-6 sm:py-7 border-b border-white/10 hover:bg-white/[0.02] transition-colors"
                >
                  <span
                    className="shrink-0 text-3xl sm:text-4xl font-extrabold text-[var(--seta-teal)]/40 group-hover:text-[var(--seta-teal)] tracking-tight tabular-nums transition-colors leading-none pt-1"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-white text-base sm:text-lg tracking-tight">
                      {item.title}
                    </h4>
                    <p className="text-sm text-white/60 leading-relaxed mt-1.5">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <img
            src={biolift}
            alt={t.about.imgAlt}
            className="w-full max-w-md rounded-2xl border border-white/10"
          />
        </div>
      </div>
    </section>
  );
}

function Treatments({ onBookingClick }: { onBookingClick: (interest?: Interest) => void }) {
  const { t } = useLang();
  const navigate = useNavigate();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <section id="trattamenti" className="bg-[var(--seta-coal)] text-white py-20 border-y border-white/5">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="text-[var(--seta-teal)] tracking-[0.3em] text-xs font-semibold mb-4">
            {t.treatments.kicker}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">{t.treatments.title}</h2>
        </div>
        <Carousel opts={{ align: "start" }} setApi={setApi} className="mt-14">
          <CarouselContent className="pt-4 lg:grid lg:grid-cols-2 lg:gap-6 lg:ml-0">
          {t.treatments.cards.map((c, idx) => {
            const isLaser = idx === 0;
            const isCorpo = idx === 2;
            const isViso = idx === 1;
            const handleCardActivate = () => {
              if (isCorpo) return navigate({ to: "/trattamenti-corpo" });
              if (isViso) return navigate({ to: "/trattamenti-viso" });
              if (isLaser) return navigate({ to: "/prezzi-promo-laser" });
              return onBookingClick(INTEREST_KEYS[idx]);
            };
            return (
              <CarouselItem key={c.cat} className={`basis-[88%] sm:basis-1/2 lg:basis-auto lg:pl-0 ${isLaser ? "lg:col-span-2" : ""}`}>
              <article
                role="button"
                tabIndex={0}
                onClick={handleCardActivate}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleCardActivate(); } }}
                className="group relative h-full rounded-3xl border border-white/20 bg-gradient-to-b from-white/[0.04] to-white/[0.01] hover:from-white/[0.08] hover:to-white/[0.02] hover:border-[var(--seta-teal)]/60 transition-all duration-300 p-6 flex flex-col backdrop-blur-sm cursor-pointer shadow-lg shadow-black/20"
              >
                {c.highlight && (
                  <span className="absolute top-4 right-4 inline-flex items-center rounded-full bg-[var(--seta-teal)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white shadow-lg">
                    {c.highlight}
                  </span>
                )}
                <p className="text-[10px] tracking-[0.28em] text-[var(--seta-teal)] font-semibold">
                  {c.tag.toUpperCase()}
                </p>
                <h3 className="text-2xl font-bold mt-3 tracking-tight">{c.cat}</h3>
                {!isLaser && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {c.chips.map((chip) => (
                      <span
                        key={chip}
                        className="inline-flex items-center rounded-full border border-[var(--seta-teal)]/40 bg-[var(--seta-teal)]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--seta-teal)]"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                )}

                {isLaser ? (
                  <p className="text-white/70 mt-4 leading-relaxed text-sm max-w-2xl">{c.desc}</p>
                ) : (
                  <p className="text-white/70 mt-4 leading-relaxed text-sm">{c.desc}</p>
                )}

                {c.items && c.items.length > 0 && (
                  <ul className="mt-4 space-y-2 text-sm text-white/80 border-t border-white/10 pt-4 px-0">
                    {c.items.map((i) => (
                      <li key={i} className="flex justify-between items-center">
                        <span>{i}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-auto pt-6">
                  <Button
                    variant="outline"
                    onClick={(e) => e.stopPropagation()}
                    className="self-start pointer-events-none border-white/30 bg-transparent text-white hover:border-[var(--seta-teal)] hover:text-[var(--seta-teal)] hover:bg-[var(--seta-teal)]/10"
                  >
                    {c.cta}
                  </Button>
                </div>
              </article>
              </CarouselItem>
            );
          })}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex lg:hidden" />
          <CarouselNext className="hidden sm:flex lg:hidden" />
        </Carousel>
        <div className="mt-6 flex items-center justify-center gap-2 lg:hidden">
          {t.treatments.cards.map((c, idx) => (
            <button
              key={`${c.cat}-dot`}
              type="button"
              aria-label={`Vai al trattamento ${idx + 1}`}
              onClick={() => api?.scrollTo(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === current ? "w-6 bg-[var(--seta-teal)]" : "w-2 bg-white/25 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const PROMO_SLUGS = [
  "laser-total-donna",
  "laser-total-uomo",
  "laser-6zone",
  "laser-4zone",
  "body-experience",
] as const;

function Promos() {
  const { t } = useLang();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <section id="promo" className="bg-[var(--seta-night)] py-20 border-b border-white/5">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="text-[var(--seta-teal)] tracking-[0.3em] text-xs font-semibold mb-4">
            {t.promos.kicker}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">{t.promos.title}</h2>
        </div>
        <Carousel opts={{ align: "start" }} setApi={setApi} className="mt-14">
          <CarouselContent className="pt-4">
            {t.promos.cards.map((p, idx) => {
            const isFeatured = idx === 0 || idx === 1;
            return (
              <CarouselItem key={`${p.title}-${idx}`} className="basis-[85%] sm:basis-1/2 lg:basis-1/4">
              <Link
                to="/promo"
                search={{ promo: PROMO_SLUGS[idx] }}
                onClick={() => saveScrollPosition()}
                className={`group relative h-full rounded-3xl border p-6 sm:p-7 flex flex-col text-center backdrop-blur-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--seta-teal)] ${
                  isFeatured
                    ? "border-[var(--seta-teal)] bg-gradient-to-b from-[var(--seta-teal)]/15 to-[var(--seta-teal)]/5 shadow-[0_0_50px_-12px_var(--seta-teal)] hover:shadow-[0_0_70px_-10px_var(--seta-teal)] hover:border-[var(--seta-teal)]"
                    : "border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] hover:from-white/[0.08] hover:to-white/[0.02] hover:border-[var(--seta-teal)]/60"
                }`}
              >
                {isFeatured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--seta-teal)] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-white shadow-lg">
                    TOP
                  </span>
                )}
                <p className="text-[10px] tracking-[0.28em] text-[var(--seta-teal)] font-semibold">{p.kicker}</p>
                <h3 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  {p.title}
                </h3>
                <div className={`mt-5 mx-auto w-full max-w-xs rounded-2xl border px-5 py-5 ${isFeatured ? "border-[var(--seta-teal)]/40 bg-black/50" : "border-white/10 bg-black/40"}`}>
                  <p className="text-2xl font-extrabold text-white tracking-tight">{p.highlight}</p>
                  {p.sub && (
                    <p className="mt-1 text-sm font-semibold text-white/80 tracking-wide">{p.sub}</p>
                  )}
                  <p className="mt-4 text-[10px] tracking-[0.28em] text-white/60 font-semibold">
                    {p.priceLabel}
                  </p>
                  <p className="mt-1 text-4xl font-extrabold text-[var(--seta-teal)] tracking-tight">
                    {p.price}
                  </p>
                  {p.originalPrice && (
                    <p className="mt-1 text-sm text-white/40 line-through">
                      {p.priceNote ? `${p.priceNote} ${p.originalPrice}` : p.originalPrice}
                    </p>
                  )}
                  {p.priceNote && !p.originalPrice && (
                    <p className="mt-2 text-[10px] tracking-[0.28em] text-white/60 font-semibold">
                      {p.priceNote}
                    </p>
                  )}
                </div>

                <p className="mt-4 text-[11px] text-white/50">{p.note}</p>
                <div className="mt-4 space-y-2">
                  {t.promos.laserBonuses.map((b) => (
                    <div key={b.label} className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/30 px-3 py-2">
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
                <div className="mt-auto pt-4 space-y-3">
                  {p.savings && (
                    <p className={`text-sm font-bold tracking-tight uppercase ${isFeatured ? "text-[var(--seta-teal)]" : "text-white"}`}>
                      {p.savings}
                    </p>
                  )}
                  {p.label && (
                    <p className="text-xs font-semibold tracking-wide text-white/60 uppercase">
                      {p.label}
                    </p>
                  )}
                  <Button asChild className="w-full min-h-11 pointer-events-none">
                    <span>{t.promos.cta}</span>
                  </Button>
                </div>
              </Link>
              </CarouselItem>
            );
          })}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex lg:hidden" />
          <CarouselNext className="hidden sm:flex lg:hidden" />
        </Carousel>
        <div className="mt-6 flex items-center justify-center gap-2 lg:hidden">
          {t.promos.cards.map((p, idx) => (
            <button
              key={`${p.title}-${idx}-dot`}
              type="button"
              aria-label={`Vai alla promo ${idx + 1}`}
              onClick={() => api?.scrollTo(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === current ? "w-6 bg-[var(--seta-teal)]" : "w-2 bg-white/25 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function BodyExperience() {
  const { t } = useLang();
  return (
    <section id="body-experience" className="bg-gradient-to-br from-[var(--seta-teal)]/15 via-[var(--seta-teal)]/5 to-black/40 border-y border-[var(--seta-teal)]/40">
      <Link
        to="/promo"
        search={{ promo: "body-experience" }}
        className="group relative block py-16 sm:py-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--seta-teal)]"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <span className="inline-block rounded bg-[var(--seta-teal)] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-white">
              {t.promos.bodyExperience.kicker}
            </span>
            <h3 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase leading-[1.05]">
              {t.promos.bodyExperience.headline}
            </h3>
            <p className="mt-4 text-base sm:text-lg text-white/80 leading-relaxed">
              {t.promos.bodyExperience.sub}
            </p>

            <div className="mt-8 rounded-3xl border-2 border-[var(--seta-teal)] bg-gradient-to-b from-[var(--seta-teal)]/15 to-black/40 p-6 sm:p-8">
              <span className="inline-block rounded-full bg-[var(--seta-teal)] px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.15em] text-white shadow-lg">
                {t.promos.bodyExperience.badge}
              </span>
              <p className="mt-4 text-xs tracking-[0.28em] text-white/60 font-semibold uppercase">
                {t.promos.bodyExperience.priceLabel}
              </p>
              <div className="mt-2 flex items-baseline justify-center gap-3">
                <p className="text-5xl sm:text-6xl font-extrabold text-[var(--seta-teal)] tracking-tight">
                  {t.promos.bodyExperience.price}
                </p>
                <p className="text-xl text-white/40 line-through">
                  {t.promos.bodyExperience.originalPrice}
                </p>
              </div>
              <p className="text-sm font-semibold text-white/80 uppercase tracking-wide">
                {t.promos.bodyExperience.priceNote}
              </p>
              <p className="mt-3 text-lg font-bold tracking-tight text-white uppercase">
                {t.promos.bodyExperience.savings}
              </p>
            </div>

            <p className="mt-4 text-xs text-white/50">{t.promos.bodyExperience.note}</p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {t.promos.bodyExperience.techs.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white/80"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-white/10 bg-black/30 p-4 text-left">
              <p className="text-[10px] tracking-[0.2em] text-white/50 font-semibold uppercase mb-2 text-center">
                {t.promos.bonusTitle}
              </p>
              <div className="space-y-2">
                {t.promos.bodyExperience.bonuses.map((b) => (
                  <div key={b.label} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[var(--seta-teal)] shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white/80 leading-tight">{b.label}</p>
                    </div>
                    <span className="rounded bg-[var(--seta-teal)]/20 px-2 py-1 text-xs font-extrabold text-[var(--seta-teal)] whitespace-nowrap shrink-0 text-center leading-tight">
                      <span className="block">{b.value}</span>
                      {b.originalValue && (
                        <span className="block text-[9px] font-semibold text-[var(--seta-teal)]/60 line-through">
                          {b.originalValue}
                        </span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-4 text-xs text-white/50">{t.promos.bodyExperience.validity}</p>

            <Button asChild className="mt-6 min-h-12 px-8 pointer-events-none">
              <span>{t.promos.bodyExperience.cta}</span>
            </Button>
          </div>
        </div>
      </Link>
    </section>
  );
}

function WhyUs() {
  const { t } = useLang();
  return (
    <section id="perche" className="py-20 bg-[var(--seta-night)]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-3xl mb-14">
          <p className="text-[var(--seta-teal)] tracking-[0.3em] text-xs font-semibold mb-4">
            {t.why.kicker}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">{t.why.title}</h2>
          <p className="mt-6 text-white/70 leading-relaxed text-lg whitespace-pre-line">
            {t.why.intro}
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {t.why.pillars.map((p) => (
            <div
              key={p.n}
              className="group rounded-3xl bg-white/[0.03] backdrop-blur-sm border border-white/10 p-8 hover:border-[var(--seta-teal)]/50 hover:bg-white/[0.05] transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--seta-teal)]/15 text-[var(--seta-teal)] font-bold text-sm tracking-tight border border-[var(--seta-teal)]/20">
                {p.n}
              </div>
              <h3 className="text-lg font-bold mt-6 tracking-tight whitespace-pre-line">{p.t}</h3>
              <p className="text-white/60 mt-3 text-sm leading-relaxed">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


function Booking({ bookingRef, preset }: { bookingRef: RefObject<HTMLElement | null>; preset?: Interest }) {
  const { t } = useLang();
  return (
    <section ref={bookingRef} className="bg-[var(--seta-night)] text-white py-20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-50" aria-hidden="true" style={{ backgroundImage: "radial-gradient(ellipse at 80% 20%, rgba(20,177,184,0.18), transparent 60%)" }} />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8 grid lg:grid-cols-2 gap-12 lg:gap-14">
        <div>
          <p className="text-[var(--seta-teal)] tracking-[0.3em] text-xs font-semibold mb-4">
            {t.booking.kicker}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            {t.booking.title1}<br />
            <span className="text-[var(--seta-teal)]">{t.booking.title2}</span>
          </h2>
          <p className="text-white/80 mt-6 text-base sm:text-lg max-w-md leading-relaxed">
            {t.booking.text}
          </p>
          <div className="mt-10 space-y-4 text-white/85">
            <a href={`tel:${CENTER.phoneRaw}`} aria-label={`${t.visit.phone} ${CENTER.phone}`} className="flex items-center gap-4 hover:text-[var(--seta-teal)] focus-visible:text-[var(--seta-teal)] focus-visible:outline-none transition min-h-11">
              <Phone className="w-7 h-7 text-[var(--seta-teal)] shrink-0" aria-hidden="true" strokeWidth={1.8} />
              <span>{CENTER.phone}</span>
            </a>
            <a
              href={CENTER.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex items-center gap-4 hover:text-[var(--seta-teal)] focus-visible:text-[var(--seta-teal)] focus-visible:outline-none transition min-h-11"
            >
              <WhatsAppIcon className="w-7 h-7 text-[var(--seta-teal)] shrink-0" />
              <span>{t.booking.whatsapp}</span>
            </a>
            <a href={`mailto:${CENTER.email}`} aria-label={`Email ${CENTER.email}`} className="flex items-center gap-4 hover:text-[var(--seta-teal)] focus-visible:text-[var(--seta-teal)] focus-visible:outline-none transition min-h-11 break-all">
              <Mail className="w-7 h-7 text-[var(--seta-teal)] shrink-0" aria-hidden="true" strokeWidth={1.8} />
              <span>{CENTER.email}</span>
            </a>
          </div>
        </div>

        <div className="hidden lg:block bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <BookingForm dark formId="prenota" preset={preset} />
        </div>
      </div>
    </section>
  );
}


function Visit() {
  const { t } = useLang();
  return (
    <section id="dove" className="py-16 sm:py-20 bg-[var(--seta-coal)] border-y border-white/5">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
        <div>
          <p className="text-[var(--seta-teal)] tracking-[0.3em] text-xs font-semibold mb-3 sm:mb-4">
            {t.visit.kicker}
          </p>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight leading-tight">
            {t.visit.title}
          </h2>
          <dl className="mt-6 sm:mt-8 space-y-4 sm:space-y-5">
            <Row term={t.visit.address} desc={CENTER.address} />
            <Row term={t.visit.hours} desc={t.visit.hoursValue} />
            <Row term={t.visit.phone} desc={CENTER.phone} hrefMobile={`tel:${CENTER.phoneRaw}`} />
            <Row term={t.visit.email} desc={CENTER.email} hrefMobile={`mailto:${CENTER.email}`} />
          </dl>
          <Button
            asChild
            variant="outline"
            className="mt-6 sm:mt-8 inline-flex min-h-11 rounded-full border-white/30 bg-transparent text-white shadow-none hover:border-[var(--seta-teal)] hover:bg-transparent hover:text-[var(--seta-teal)]"
          >
            <a href={CENTER.maps} target="_blank" rel="noopener noreferrer">
              {t.visit.maps}
            </a>
          </Button>
        </div>
        <div className="w-full h-[240px] sm:aspect-video sm:h-auto lg:aspect-auto lg:min-h-[320px] rounded-2xl overflow-hidden border border-white/10 grayscale contrast-110 brightness-90">
          <iframe
            title={t.visit.mapTitle}
            src="https://www.google.com/maps?q=Via+Camillo+Benso+Conte+di+Cavour+33,+21100+Varese&output=embed"
            className="w-full h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

function Row({ term, desc, hrefMobile }: { term: string; desc: string; hrefMobile?: string }) {
  const content = hrefMobile ? (
    <a href={hrefMobile} className="hover:text-[var(--seta-teal)] transition break-words">{desc}</a>
  ) : (
    <span className="break-words whitespace-pre-line">{desc}</span>
  );
  return (
    <div className="flex flex-col sm:flex-row sm:gap-6 gap-1 border-b border-white/10 pb-3 sm:pb-4">
      <dt className="sm:w-24 shrink-0 text-[10px] sm:text-xs uppercase tracking-[0.18em] text-[var(--seta-teal)] font-semibold sm:pt-1">
        {term}
      </dt>
      <dd className="flex-1 min-w-0 text-base sm:text-lg text-white/85">{content}</dd>
    </div>
  );
}

function Footer({ onBookingClick }: { onBookingClick: () => void }) {
  const { t } = useLang();
  return (
    <footer className="bg-[var(--seta-night)] text-white/70 py-12 pb-36 sm:pb-12 text-sm border-t border-white/5">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 flex flex-wrap gap-8 justify-between items-center">
        <div className="flex items-center gap-3">
          <img src={logoBianco} alt="Seta Beauty" className="h-7 w-auto" />
          <p className="text-xs tracking-[0.3em] text-white/40 border-l border-white/15 pl-3">
            BEAUTY CLINIC · VARESE
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs tracking-[0.18em] uppercase">
          <a href="#trattamenti" className="hover:text-[var(--seta-teal)] transition">{t.footer.treatments}</a>
          <a href="#promo" className="hover:text-[var(--seta-teal)] transition">{t.footer.promo}</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onBookingClick(); }} className="hover:text-[var(--seta-teal)] transition">{t.footer.book}</a>
          <Link to="/privacy" className="hover:text-[var(--seta-teal)] transition focus-visible:outline-none focus-visible:text-[var(--seta-teal)]">{t.footer.privacy}</Link>
          <Link to="/cookie-policy" className="hover:text-[var(--seta-teal)] transition focus-visible:outline-none focus-visible:text-[var(--seta-teal)]">{t.footer.cookie}</Link>
          <CookieSettingsLink className="uppercase tracking-[0.18em] hover:text-[var(--seta-teal)] transition focus-visible:outline-none focus-visible:text-[var(--seta-teal)]" />
        </div>
        <p className="text-xs text-white/40">© {new Date().getFullYear()} Seta Beauty Clinic · {t.footer.rights}</p>
      </div>
    </footer>
  );
}

function StickyMobileCTA({ onOpenBooking }: { onOpenBooking: () => void }) {
  const { t } = useLang();
  const [visible] = useState(true);
  return (
    <div
      role="region"
      aria-label={t.sticky.aria}
      aria-hidden={!visible}
      className={`sm:hidden fixed bottom-0 inset-x-0 z-50 bg-black/95 backdrop-blur border-t border-white/10 p-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] flex flex-col gap-2 transition-all duration-300 ${visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"}`}
    >
      <Button
        onClick={onOpenBooking}
        size="lg"
        className="w-full min-h-12 text-base"
      >
        {t.sticky.book}
      </Button>
      <Button
        asChild
        size="lg"
        className="w-full min-h-12 text-base bg-[#25D366] hover:bg-[#1fae56] text-white border-0"
      >
        <a href={CENTER.whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
          <WhatsAppIcon className="w-5 h-5" />
          {t.sticky.whatsapp}
        </a>
      </Button>
    </div>
  );
}

