"use client";

import { useEffect } from "react";
import * as CookieConsent from "vanilla-cookieconsent";
import {
  disablePostHog,
  enablePostHog,
} from "@/components/PostHogProvider";

const RB2B_KEY = "961Y0H811KNG";
const ANALYTICS_CATEGORY = "analytics";
const IDENTIFICATION_CATEGORY = "visitor_identification";

let isRunning = false;

type Rb2bWindow = Window & {
  reb2b?: { loaded: true };
};

function enableRb2b() {
  const reb2bWindow = window as Rb2bWindow;
  if (reb2bWindow.reb2b) return;

  reb2bWindow.reb2b = { loaded: true };

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://ddwl4m2hdecbv.cloudfront.net/b/${RB2B_KEY}/${RB2B_KEY}.js.gz`;

  const firstScript = document.scripts[0];
  if (firstScript?.parentNode) {
    firstScript.parentNode.insertBefore(script, firstScript);
  } else {
    document.head.appendChild(script);
  }
}

function applyConsent() {
  if (CookieConsent.acceptedCategory(ANALYTICS_CATEGORY)) {
    enablePostHog();
  } else {
    disablePostHog();
  }

  if (CookieConsent.acceptedCategory(IDENTIFICATION_CATEGORY)) {
    enableRb2b();
  }
}

export function ConsentManager() {
  useEffect(() => {
    if (isRunning) return;
    isRunning = true;

    void CookieConsent.run({
      mode: "opt-in",
      revision: 1,
      cookie: {
        name: "efficura_cookie_consent",
        expiresAfterDays: 365,
        sameSite: "Lax",
        secure: true,
      },
      guiOptions: {
        consentModal: {
          layout: "box",
          position: "bottom right",
          equalWeightButtons: true,
        },
        preferencesModal: {
          layout: "bar wide",
          position: "right",
          equalWeightButtons: true,
        },
      },
      categories: {
        necessary: {
          enabled: true,
          readOnly: true,
        },
        [ANALYTICS_CATEGORY]: {
          autoClear: {
            cookies: [{ name: /^ph_/ }],
          },
        },
        [IDENTIFICATION_CATEGORY]: {
          autoClear: {
            cookies: [{ name: /^_reb2/ }],
          },
        },
      },
      onConsent: applyConsent,
      onChange: ({ changedCategories }) => {
        const identificationWasWithdrawn =
          changedCategories.includes(IDENTIFICATION_CATEGORY) &&
          !CookieConsent.acceptedCategory(IDENTIFICATION_CATEGORY);

        applyConsent();

        if (identificationWasWithdrawn) {
          window.location.reload();
        }
      },
      language: {
        default: "en",
        translations: {
          en: {
            consentModal: {
              label: "Cookie consent",
              title: "Your privacy choices",
              description:
                "Optional cookies help us analyse site use and identify business visitors.",
              acceptAllBtn: "Accept all",
              acceptNecessaryBtn: "Reject non-essential",
              showPreferencesBtn: "Manage choices",
              footer:
                '<a href="/privacy">Privacy Policy</a><a href="/cookies">Cookie Notice</a>',
            },
            preferencesModal: {
              title: "Cookie settings",
              acceptAllBtn: "Accept all",
              acceptNecessaryBtn: "Reject non-essential",
              savePreferencesBtn: "Save choices",
              closeIconLabel: "Close cookie settings",
              sections: [
                {
                  title: "Choose what we may use",
                  description:
                    "Optional technologies are off until you allow them. Withdrawing consent is as easy as giving it and takes effect immediately.",
                },
                {
                  title: "Strictly necessary",
                  description:
                    "Remembers and evidences your privacy choice. This does not track your browsing.",
                  linkedCategory: "necessary",
                  cookieTable: {
                    headers: {
                      name: "Name",
                      purpose: "Purpose",
                      duration: "Duration",
                    },
                    body: [
                      {
                        name: "efficura_cookie_consent",
                        purpose: "Stores a consent ID, timestamps, policy revision and your selected categories.",
                        duration: "1 year",
                      },
                    ],
                  },
                },
                {
                  title: "Analytics",
                  description:
                    "PostHog measures page views, navigation and interactions using a random browser identifier. Its data is processed on EU servers.",
                  linkedCategory: ANALYTICS_CATEGORY,
                  cookieTable: {
                    headers: {
                      name: "Name",
                      purpose: "Purpose",
                      duration: "Duration",
                    },
                    body: [
                      {
                        name: "ph_* cookie and localStorage",
                        purpose: "Measures aggregate website use and performance.",
                        duration: "Up to 1 year",
                      },
                    ],
                  },
                },
                {
                  title: "Visitor identification",
                  description:
                    "RB2B (provided by Retention.com) uses first-party identifiers to recognise business visitors, connect visits across sessions and associate activity with business contact information for our marketing.",
                  linkedCategory: IDENTIFICATION_CATEGORY,
                  cookieTable: {
                    headers: {
                      name: "Name",
                      purpose: "Purpose",
                      duration: "Duration",
                    },
                    body: [
                      {
                        name: "_reb2*",
                        purpose: "Session continuity, attribution and visitor identity resolution.",
                        duration: "1 second to 1 year",
                      },
                    ],
                  },
                },
                {
                  title: "More information",
                  description:
                    'Read our <a href="/cookies">Cookie Notice</a> and <a href="/privacy">Privacy Policy</a>, or contact <a href="mailto:info@efficura.com">info@efficura.com</a>.',
                },
              ],
            },
          },
        },
      },
    });
  }, []);

  return null;
}