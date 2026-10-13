import { acceptedCategory, run, showPreferences } from "vanilla-cookieconsent";

const GTM_ID = "GTM-MBLZCQBD";
const GOOGLE_ADS_ID = "AW-18444170259";
const OPENAI_PIXEL_ID = "NceV8K3BLYzBhgx5kyU5fX";

type MetaPixel = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push: MetaPixel;
  loaded: boolean;
  version: string;
};

type ConsentState = "granted" | "denied";
type GoogleConsent = {
  analytics_storage: ConsentState;
  ad_storage: ConsentState;
  ad_user_data: ConsentState;
  ad_personalization: ConsentState;
};

declare global {
  interface Window {
    fbq?: MetaPixel;
    _fbq?: MetaPixel;
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    oaiq?: ((...args: unknown[]) => void) & { q?: unknown[][] };
  }
}

let gtmLoaded = false;
let googleAdsLoaded = false;
let openaiLoaded = false;
let metaLoaded = false;

function loadScript(src: string): void {
  const script = document.createElement("script");
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

function loadGtm(): void {
  if (gtmLoaded) return;
  gtmLoaded = true;
  window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
  loadScript(`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`);
}

function loadGoogleAds(): void {
  if (googleAdsLoaded) return;
  googleAdsLoaded = true;
  window.gtag("js", new Date());
  window.gtag("config", GOOGLE_ADS_ID);
  loadScript(`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`);
}

function loadOpenAi(): void {
  if (openaiLoaded) return;
  openaiLoaded = true;
  const queue = ((...args: unknown[]) => {
    queue.q?.push(args);
  }) as NonNullable<Window["oaiq"]>;
  queue.q = [];
  window.oaiq = queue;
  queue("init", { pixelId: OPENAI_PIXEL_ID });
  loadScript("https://bzrcdn.openai.com/sdk/oaiq.min.js");
}

function loadMetaPixel(): void {
  if (metaLoaded) return;
  metaLoaded = true;

  if (!window.fbq) {
    const pixel = ((...args: unknown[]) => {
      if (pixel.callMethod) {
        pixel.callMethod(...args);
      } else {
        pixel.queue.push(args);
      }
    }) as MetaPixel;
    pixel.queue = [];
    pixel.push = pixel;
    pixel.loaded = true;
    pixel.version = "2.0";
    window.fbq = pixel;
    // oxlint-disable-next-line no-underscore-dangle -- Meta's standard queue alias.
    window._fbq ??= pixel;

    loadScript("https://connect.facebook.net/en_US/fbevents.js");
  }

  window.fbq("consent", "grant");
  window.fbq("init", "1135123575716330");
}

function updateGoogleConsent(analytics: boolean, advertising: boolean): void {
  const googleConsent: GoogleConsent = {
    analytics_storage: analytics ? "granted" : "denied",
    ad_storage: advertising ? "granted" : "denied",
    ad_user_data: advertising ? "granted" : "denied",
    ad_personalization: advertising ? "granted" : "denied",
  };
  window.gtag("consent", "update", googleConsent);
}

function applyConsent(): void {
  const analytics = acceptedCategory("analytics");
  const advertising = acceptedCategory("advertising");
  updateGoogleConsent(analytics, advertising);

  if (advertising) {
    loadGoogleAds();
    loadOpenAi();
    loadMetaPixel();
    void import("./tracking.ts");
  }
  if (analytics) {
    loadGtm();
  }
}

void run({
  mode: "opt-in",
  revision: 1,
  categories: {
    necessary: { readOnly: true },
    analytics: {
      autoClear: { cookies: [{ name: /^_ga/ }, { name: "_gid" }] },
    },
    advertising: {
      autoClear: {
        cookies: [{ name: /^_gcl_/ }, { name: /^_fbp$/ }, { name: /^_fbc$/ }],
      },
    },
  },
  guiOptions: {
    consentModal: { equalWeightButtons: true },
    preferencesModal: { equalWeightButtons: true },
  },
  onConsent: applyConsent,
  onChange: () => {
    const analytics = acceptedCategory("analytics");
    const advertising = acceptedCategory("advertising");
    // Already loaded third-party SDKs cannot be reliably unloaded. A fresh page
    // drops their runtime after CookieConsent has saved the new preferences.
    // Do this before applying grants, so a change cannot start a new SDK just
    // before the page reloads.
    if (
      (!advertising && (openaiLoaded || googleAdsLoaded || metaLoaded)) ||
      (gtmLoaded && (!analytics || !advertising))
    ) {
      updateGoogleConsent(analytics, advertising);
      if (!advertising) window.fbq?.("consent", "revoke");
      window.location.reload();
      return;
    }
    applyConsent();
  },
  language: {
    default: "fr",
    translations: {
      fr: {
        consentModal: {
          title: "Vos choix de cookies",
          description:
            "Nous utilisons des cookies pour mesurer l’audience et, " +
            "avec votre accord, pour la publicité. " +
            "Vous pouvez accepter, refuser ou choisir les catégories. " +
            "<br><br>" +
            "<a href='/confidentialite'>Politique de confidentialité</a>.",
          acceptAllBtn: "Tout accepter",
          acceptNecessaryBtn: "Tout refuser",
          showPreferencesBtn: "Gérer les préférences",
        },
        preferencesModal: {
          title: "Préférences des cookies",
          acceptAllBtn: "Tout accepter",
          acceptNecessaryBtn: "Tout refuser",
          savePreferencesBtn: "Enregistrer mes choix",
          closeIconLabel: "Fermer",
          sections: [
            {
              title: "Utilisation des cookies",
              description:
                "Vous pouvez modifier vos choix à tout moment depuis le pied de page.",
            },
            {
              title: "Nécessaires",
              description:
                "Conservent votre choix de consentement et assurent le fonctionnement du site.",
              linkedCategory: "necessary",
            },
            {
              title: "Mesure d'audience",
              description:
                "Autorise la mesure de la fréquentation du site pour nous aider à comprendre son utilisation.",
              linkedCategory: "analytics",
            },
            {
              title: "Publicité",
              description:
                "Autorise la mesure des résultats de nos campagnes publicitaires.",
              linkedCategory: "advertising",
            },
          ],
        },
      },
    },
  },
});

document
  .querySelector("[data-cookie-settings]")
  ?.addEventListener("click", () => {
    showPreferences();
  });
