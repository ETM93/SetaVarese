import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

type SilktideWindow = Window & {
  __silktideConsentBootstrapped?: boolean;
  __silktideConsentInitialized?: boolean;
  __silktideLoaded?: boolean;
  silktideConsentManager?: {
    init: (config: unknown) => void;
  };
};

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: unknown; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Seta Beauty Varese" },
      {
        name: "description",
        content:
          "Seta Beauty Varese: estetica avanzata, epilazione laser e percorsi di bellezza personalizzati in centro città.",
      },
      { name: "author", content: "Seta Beauty Varese" },
      { property: "og:title", content: "Seta Beauty Varese" },
      {
        property: "og:description",
        content:
          "Estetica avanzata, epilazione laser e percorsi di bellezza personalizzati in centro Varese.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Seta Beauty Clinic" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/og-image.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", sizes: "48x48" },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap",
      },
      { rel: "preconnect", href: "https://cdn.jsdelivr.net", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        id: "silktide-consent-manager-css",
        href: "https://cdn.jsdelivr.net/gh/silktide/consent-manager@v2.0.1/silktide-consent-manager.css",
        integrity: "sha384-EdMq+R+YOnsbelo08wPenoTlnxbAyxI11NMIxzugx/qAsbh64KcOkqxYqq6pfvO/",
        crossOrigin: "anonymous",
      },
    ],
    styles: [
      {
        id: "silktide-consent-manager-overrides",
        children: `#stcm-wrapper {
  --boxShadow: -5px 5px 10px 0px #00000012, 0px 0px 50px 0px #0000001a;
  --fontFamily: Helvetica Neue, Segoe UI, Arial, sans-serif;
  --primaryColor: #AFE3FF;
  --backgroundColor: #070219;
  --textColor: #E5F6FA;
  --backdropBackgroundColor: #00000033;
  --backdropBackgroundBlur: 0px;
  --iconColor: #E5F6FA;
  --iconBackgroundColor: #070219;
}
#stcm-icon { display: none !important; }`,
      },
    ],
    scripts: [
      {
        id: "gtm-init",
        children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-5NRZJX35');`,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="it">
      <head>
        <HeadContent />
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5NRZJX35"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    const win = window as SilktideWindow;

    if (win.__silktideConsentBootstrapped) return;
    win.__silktideConsentBootstrapped = true;

    let lastScrollY = window.scrollY;
    window.addEventListener(
      "scroll",
      () => {
        if (document.body.style.position !== "fixed") lastScrollY = window.scrollY;
      },
      { passive: true },
    );

    const initSilktide = () => {
      if (win.__silktideConsentInitialized || !win.silktideConsentManager) return;
      win.__silktideConsentInitialized = true;
      win.silktideConsentManager.init({
        backdrop: { show: true },
        onPreferencesOpen: () => {
          document.body.style.top = `-${lastScrollY}px`;
        },
        onPreferencesClose: () => {
          document.body.style.top = "";
          window.scrollTo(0, lastScrollY);
        },
        icon: { position: "bottomRight" },
        prompt: { position: "bottomRight" },
        consentTypes: [
          {
            id: "essenziali",
            label: "Essenziali",
            description:
              "<p>Questi cookie sono necessari per il funzionamento del sito web e non possono essere disattivati. Aiutano a gestire funzioni come l'accesso e l'impostazione delle preferenze sulla privacy.</p>",
            required: true,
            onAccept: function () {},
          },
          {
            id: "analytics",
            label: "Analytics",
            description:
              "<p>Questi cookie ci aiutano a migliorare il sito tracciando quali pagine sono più popolari e come i visitatori si muovono al suo interno.</p>",
            required: false,
            gtag: ["ad_storage", "ad_user_data", "ad_personalization", "analytics_storage"],
          },
          {
            id: "marketing",
            label: "Marketing",
            description:
              "<p>Questi cookie vengono utilizzati da noi e dai nostri partner pubblicitari per mostrarti annunci pertinenti su questo sito e altrove, e per misurare l'efficacia di tali campagne.</p>",
            required: false,
            gtag: ["ad_storage", "ad_user_data", "ad_personalization"],
          },
        ],
        text: {
          prompt: {
            description:
              "<p>Utilizziamo i cookie sul nostro sito per migliorare la tua esperienza utente, fornire contenuti personalizzati e analizzare il nostro traffico.</p>",
            acceptAllButtonText: "Accetta tutto",
            acceptAllButtonAccessibleLabel: "Accetta tutti i cookies",
            rejectNonEssentialButtonText: "Rifiuta non essenziali",
            rejectNonEssentialButtonAccessibleLabel: "Rifiuta i cookies non essenziali",
            preferencesButtonText: "Preferenze",
            preferencesButtonAccessibleLabel: "Modifica preferenze",
          },
          preferences: {
            title: "Personalizza le preferenze sui cookie",
            description:
              "<p>Rispettiamo la tua privacy. Puoi scegliere di non consentire alcuni tipi di cookie. Le tue preferenze sui cookie si applicano a tutto il nostro sito web.</p>",
            saveButtonText: "Salva e chiudi",
            saveButtonAccessibleLabel: "Salva le preferenze sui cookie",
            creditLinkText: "Ottieni questo banner gratis",
            creditLinkAccessibleLabel: "Ottieni questo banner gratis",
          },
        },
      });
    };

    if (win.silktideConsentManager) {
      initSilktide();
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src*="silktide/consent-manager"]',
    );

    if (existingScript) {
      existingScript.addEventListener("load", initSilktide, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = "silktide-consent-manager-js";
    script.src =
      "https://cdn.jsdelivr.net/gh/silktide/consent-manager@v2.0.1/silktide-consent-manager.js";
    script.integrity = "sha384-5Pt34uiIbCsvfiiZXoLi4HRf/YBXjr9c8e+gYeVo9smUaInNHYVtc8NZ8wUnXJIq";
    script.crossOrigin = "anonymous";
    script.async = true;
    script.addEventListener("load", initSilktide, { once: true });
    document.head.appendChild(script);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
