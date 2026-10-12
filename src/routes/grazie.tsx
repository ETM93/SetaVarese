import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";

import logoBianco from "@/assets/seta/logo-bianco.png";

export const Route = createFileRoute("/grazie")({
  head: () => ({
    meta: [
      { title: "Grazie — Seta Beauty Varese" },
      { name: "description", content: "Abbiamo ricevuto la tua richiesta. Ti ricontatteremo entro 24h." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ThankYouPage,
});

function ThankYouPage() {
  return (
    <div className="min-h-dvh bg-[var(--seta-night)] font-sans text-white antialiased flex flex-col">
      <header className="px-6 py-6 sm:px-10">
        <Link to="/" aria-label="Torna alla home">
          <img src={logoBianco} alt="Seta Beauty" className="h-10 w-auto" />
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-xl w-full text-center">
          <div className="mx-auto mb-8 inline-flex h-20 w-20 items-center justify-center rounded-full bg-[var(--seta-teal)]/15 ring-1 ring-[var(--seta-teal)]/40">
            <CheckCircle2 className="h-10 w-10 text-[var(--seta-teal)]" strokeWidth={1.5} />
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Grazie, la tua richiesta è stata inviata
          </h1>
          <p className="mt-4 text-white/70 text-base sm:text-lg leading-relaxed">
            Ti ricontatteremo <strong className="text-white">entro 24 ore</strong> per organizzare insieme il tuo appuntamento e rispondere a tutte le tue domande.
          </p>

          <div className="mt-10">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white/80 hover:border-white/40 hover:text-white transition"
            >
              ← Torna alla home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
