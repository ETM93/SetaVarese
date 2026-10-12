import { ArrowLeft } from "lucide-react";
import { useCanGoBack, useRouter } from "@tanstack/react-router";

interface BackLinkProps {
  label: string;
  fallbackTo: string;
}

export function BackLink({ label, fallbackTo }: BackLinkProps) {
  const router = useRouter();
  const canGoBack = useCanGoBack();

  return (
    <button
      type="button"
      onClick={() => {
        if (canGoBack) {
          router.history.back();
        } else {
          router.navigate({ to: fallbackTo });
        }
      }}
      className="inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--seta-teal)] rounded transition"
    >
      <ArrowLeft className="w-4 h-4" aria-hidden="true" />
      {label}
    </button>
  );
}
