import { useLang } from "@/lib/lang";

export function CookieSettingsLink({ className }: { className?: string }) {
  const { t } = useLang();

  return (
    <button
      type="button"
      onClick={() => document.getElementById("stcm-icon")?.click()}
      className={className}
    >
      {t.footer.cookieSettings}
    </button>
  );
}
