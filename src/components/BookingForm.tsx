import { useState, useEffect } from "react";
import { z } from "zod";
import { Mail, Phone } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useLang, COPY, type PromoKey } from "@/lib/lang";
import { CENTER } from "@/lib/center";

const WHATSAPP_URL = CENTER.whatsappUrl;

// Opens a chat with the center with the form data prefilled. Must run synchronously
// inside the submit handler, otherwise browsers block it as a popup.
function openWhatsApp(text: string) {
  window.open(`https://wa.me/${CENTER.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
}

export const INTEREST_KEYS = ["laser", "viso", "corpo"] as const;
export type Interest = (typeof INTEREST_KEYS)[number];

const PRIVACY_URL = "/privacy";

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(6).max(30),
  email: z.string().trim().email().max(120),
  interest: z.enum(INTEREST_KEYS),
  days: z.array(z.number()).optional(),
  slots: z.array(z.number()).optional(),
  notes: z.string().trim().max(1000).optional().or(z.literal("")),
  privacy: z.boolean().refine((v) => v === true),
});

export const promoSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  notes: z.string().trim().max(1000).optional().or(z.literal("")),
  privacy: z.boolean().refine((v) => v === true),
});

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
  dark = false,
  formId = "form",
  autoComplete,
  inputMode,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
  dark?: boolean;
  formId?: string;
  autoComplete?: string;
  inputMode?: "text" | "tel" | "email" | "numeric" | "search" | "url" | "none" | "decimal";
}) {
  const id = `${formId}-${name}`;
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className={`block text-[11px] font-semibold tracking-[0.18em] uppercase mb-2 ${dark ? "text-white/80" : ""}`}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required
        maxLength={120}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={
          dark
            ? "w-full border border-white/20 bg-white/5 text-white placeholder-white/40 px-4 py-3 focus:border-[var(--seta-teal)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--seta-teal)] rounded-lg backdrop-blur min-h-11"
            : "w-full border border-black/20 px-4 py-3 focus:border-[var(--seta-teal)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--seta-teal)] rounded-xl min-h-11"
        }
      />
      {error && <p id={errorId} className={`text-xs mt-1 ${dark ? "text-red-300" : "text-red-600"}`}>{error}</p>}
    </div>
  );
}

export function BookingForm({
  dark = false,
  formId = "form",
  preset,
  defaultNotes,
}: {
  dark?: boolean;
  formId?: string;
  preset?: Interest;
  defaultNotes?: string;
} = {}) {
  const navigate = useNavigate();
  const { t } = useLang();
  const [, setStatus] = useState<"idle" | "ok" | "err">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [interest, setInterest] = useState<Interest>(preset ?? "laser");
  useEffect(() => {
    if (preset) setInterest(preset);
  }, [preset]);
  const [days, setDays] = useState<number[]>([]);
  const [slots, setSlots] = useState<number[]>([]);

  function toggle(list: number[], setList: (v: number[]) => void, value: number) {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = contactSchema.safeParse({
      name: fd.get("name"),
      phone: fd.get("phone"),
      email: fd.get("email"),
      interest,
      days,
      slots,
      notes: fd.get("notes") ?? "",
      privacy: fd.get("privacy") === "on",
    });
    if (!parsed.success) {
      const fieldErr: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        const key = String(i.path[0]);
        const msg = (t.form.errors as unknown as Record<string, string>)[key];
        if (msg) fieldErr[key] = msg;
      });
      setErrors(fieldErr);
      setStatus("err");
      return;
    }
    setErrors({});
    const d = parsed.data;
    const it = COPY.it;
    const giorni = (d.days ?? []).map((i) => it.form.days[i]).join(", ");
    const fasce = (d.slots ?? []).map((i) => it.form.slots[i]).join(", ");
    const waText = [
      `Ciao, sono ${d.name} e vorrei essere ricontattato/a.`,
      `Interesse: ${it.form.interests[d.interest]}`,
      giorni && `Giorni preferiti: ${giorni}`,
      fasce && `Fasce orarie: ${fasce}`,
      `Telefono: ${d.phone}`,
      `Email: ${d.email}`,
      d.notes && `Note: ${d.notes}`,
    ]
      .filter(Boolean)
      .join("\n");
    openWhatsApp(waText);
    setStatus("ok");
    navigate({ to: "/grazie" });
  }

  const formCls = dark
    ? "space-y-4 text-white"
    : "bg-white text-black p-7 sm:p-8 rounded-2xl space-y-4 shadow-2xl";

  const selectId = `${formId}-interest`;
  const selectCls = dark
    ? "w-full border border-white/20 bg-white/5 text-white px-4 py-3 focus:border-[var(--seta-teal)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--seta-teal)] rounded-lg backdrop-blur min-h-11"
    : "w-full border border-black/20 px-4 py-3 bg-white focus:border-[var(--seta-teal)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--seta-teal)] rounded-xl min-h-11";

  const legendCls = `block text-[11px] font-semibold tracking-[0.18em] uppercase mb-2 ${dark ? "text-white/80" : "text-black/70"}`;
  const chipBase = "inline-flex items-center justify-center px-3.5 py-2 rounded-full text-sm font-medium transition border min-h-10";
  const chipOn = "bg-[var(--seta-teal)] text-white border-[var(--seta-teal)]";
  const chipOff = dark
    ? "bg-white/5 text-white/80 border-white/20 hover:border-white/40"
    : "bg-white text-black/70 border-black/20 hover:border-black/40";
  const notesCls = dark
    ? "w-full border border-white/20 bg-white/5 text-white px-4 py-3 focus:border-[var(--seta-teal)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--seta-teal)] rounded-lg backdrop-blur resize-none placeholder:text-white/40"
    : "w-full border border-black/20 px-4 py-3 bg-white focus:border-[var(--seta-teal)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--seta-teal)] rounded-xl resize-none placeholder:text-black/40";

  return (
    <form onSubmit={onSubmit} className={formCls} noValidate aria-label={t.form.aria}>
      <div className="space-y-3">
        <div>
          <h3 className={`text-xl font-bold tracking-tight ${dark ? "text-white" : ""}`}>{t.form.title}</h3>
        </div>
        <Button asChild size="lg" className="w-full min-h-12 text-base bg-[#25D366] hover:bg-[#1fae56] text-white border-0">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon className="w-5 h-5" />
            {t.form.whatsappCta}
          </a>
        </Button>
        <p className={`text-sm mt-1 ${dark ? "text-white/70" : "text-black/60"}`}>{t.form.sub}</p>
      </div>
      <Field dark={dark} formId={formId} label={t.form.name} name="name" autoComplete="name" error={errors.name} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field dark={dark} formId={formId} label={t.form.phone} name="phone" type="tel" autoComplete="tel" inputMode="tel" error={errors.phone} />
        <Field dark={dark} formId={formId} label={t.form.email} name="email" type="email" autoComplete="email" inputMode="email" error={errors.email} />
      </div>
      <div>
        <label htmlFor={selectId} className={`block text-[11px] font-semibold tracking-[0.18em] uppercase mb-2 ${dark ? "text-white/80" : ""}`}>
          {t.form.interestLabel}
        </label>
        <select
          id={selectId}
          name="interest"
          required
          className={selectCls}
          value={interest}
          onChange={(e) => setInterest(e.target.value as Interest)}
        >
          {INTEREST_KEYS.map((key) => (
            <option key={key} className="text-black" value={key}>
              {t.form.interests[key]}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-8">
        <fieldset className="border-0 p-0 m-4">
          <legend className={legendCls}>
            {t.form.daysLabel}{" "}
            <span className="normal-case tracking-normal font-normal opacity-60">{t.form.optional}</span>
          </legend>
          <div className="flex flex-wrap gap-3">
            {t.form.days.map((d, i) => {
              const active = days.includes(i);
              return (
                <button
                  key={d}
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggle(days, setDays, i)}
                  className={`${chipBase} ${active ? chipOn : chipOff}`}
                >
                  {d}
                </button>
              );
            })}
          </div>
        </fieldset>
        <fieldset className="border-0 p-0 m-0">
          <legend className={legendCls}>
            {t.form.slotsLabel}{" "}
            <span className="normal-case tracking-normal font-normal opacity-60">{t.form.optional}</span>
          </legend>
          <div className="flex flex-wrap gap-3 m-4">
            {t.form.slots.map((s, i) => {
              const active = slots.includes(i);
              return (
                <button
                  key={s}
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggle(slots, setSlots, i)}
                  className={`${chipBase} ${active ? chipOn : chipOff}`}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </fieldset>
        <div>
          <label htmlFor={`${formId}-notes`} className={legendCls}>
            {t.form.notesLabel}{" "}
            <span className="normal-case tracking-normal font-normal opacity-60">{t.form.optional}</span>
          </label>
          <textarea
            id={`${formId}-notes`}
            name="notes"
            rows={3}
            maxLength={1000}
            placeholder={t.form.notesPlaceholder}
            defaultValue={defaultNotes}
            className={notesCls}
          />
          {errors.notes && <p className="text-xs text-red-400 mt-1.5">{errors.notes}</p>}
        </div>
      </div>
      <Button type="submit" size="lg" className="w-full min-h-12 text-base">
        {t.form.submit}
      </Button>

      <div>
        <label htmlFor={`${formId}-privacy`} className={`flex items-start gap-2.5 text-xs leading-relaxed cursor-pointer ${dark ? "text-white/70" : "text-black/60"}`}>
          <input
            id={`${formId}-privacy`}
            name="privacy"
            type="checkbox"
            required
            className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--seta-teal)] cursor-pointer"
          />
          <span>
            {t.form.privacyPre}{" "}
            <a href={PRIVACY_URL} target="_blank" rel="noopener noreferrer" className="underline hover:text-[var(--seta-teal)]">
              {t.form.privacyLink}
            </a>
            .
          </span>
        </label>
        {errors.privacy && <p className="text-xs text-red-400 mt-1.5 ml-6">{errors.privacy}</p>}
      </div>
    </form>
  );
}

export { Phone, Mail, WhatsAppIcon };


export function PromoForm({ promo, formId = "promo" }: { promo: PromoKey; formId?: string }) {
  const navigate = useNavigate();
  const { t } = useLang();
  const [, setStatus] = useState<"idle" | "ok" | "err">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const promoName = t.promoForm.names[promo];

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = promoSchema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      notes: fd.get("notes") ?? "",
      privacy: fd.get("privacy") === "on",
    });
    if (!parsed.success) {
      const fieldErr: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => {
        const key = String(issue.path[0]);
        const message = (t.form.errors as unknown as Record<string, string>)[key];
        if (message) fieldErr[key] = message;
      });
      setErrors(fieldErr);
      setStatus("err");
      return;
    }
    setErrors({});
    const data = parsed.data;
    const waText = [
      `Ciao, sono ${data.name} e vorrei bloccare la promo "${COPY.it.promoForm.names[promo]}".`,
      `Email: ${data.email}`,
      data.notes && `Note: ${data.notes}`,
    ]
      .filter(Boolean)
      .join("\n");
    openWhatsApp(waText);
    setStatus("ok");
    navigate({ to: "/grazie" });
  }

  const legendCls = "block text-[11px] font-semibold tracking-[0.18em] uppercase mb-2 text-white/80";
  return (
    <form onSubmit={onSubmit} className="space-y-4 text-white" noValidate aria-label={t.promoForm.title}>
      <div className="space-y-3">
        <div>
          <h3 className="text-xl font-bold tracking-tight text-white">{t.promoForm.title} — {promoName}</h3>
        </div>
        <Button asChild size="lg" className="w-full min-h-12 text-base bg-[#25D366] hover:bg-[#1fae56] text-white border-0">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon className="w-5 h-5" />
            {t.promoForm.whatsappCta}
          </a>
        </Button>
        <p className="text-sm mt-1 text-white/70">{t.promoForm.sub}</p>
      </div>
      <Field dark formId={formId} label={t.form.name} name="name" autoComplete="name" error={errors.name} />
      <Field dark formId={formId} label={t.form.email} name="email" type="email" autoComplete="email" inputMode="email" error={errors.email} />
      <div>
        <label htmlFor={`${formId}-notes`} className={legendCls}>
          {t.form.notesLabel} <span className="normal-case tracking-normal font-normal opacity-60">{t.form.optional}</span>
        </label>
        <textarea
          id={`${formId}-notes`}
          name="notes"
          rows={3}
          maxLength={1000}
          placeholder={t.form.notesPlaceholder}
          className="w-full border border-white/20 bg-white/5 text-white px-4 py-3 focus:border-[var(--seta-teal)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--seta-teal)] rounded-lg backdrop-blur resize-none placeholder:text-white/40"
        />
        {errors.notes && <p className="text-xs text-red-400 mt-1.5">{errors.notes}</p>}
      </div>
      <Button type="submit" size="lg" className="w-full min-h-12 text-base">
        {t.promoForm.submit}
      </Button>
      <div>
        <label htmlFor={`${formId}-privacy`} className="flex items-start gap-2.5 text-xs leading-relaxed cursor-pointer text-white/70">
          <input id={`${formId}-privacy`} name="privacy" type="checkbox" required className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--seta-teal)] cursor-pointer" />
          <span>
            {t.form.privacyPre}{" "}
            <a href={PRIVACY_URL} target="_blank" rel="noopener noreferrer" className="underline hover:text-[var(--seta-teal)]">{t.form.privacyLink}</a>.
          </span>
        </label>
        {errors.privacy && <p className="text-xs text-red-400 mt-1.5 ml-6">{errors.privacy}</p>}
      </div>
    </form>
  );
}
