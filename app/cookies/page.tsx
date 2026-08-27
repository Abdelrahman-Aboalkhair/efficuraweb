import type { Metadata } from "next";
import { LegalDoc, type LegalSection } from "@/components/LegalDoc";

export const metadata: Metadata = {
  title: "Cookie Notice",
  description: "How efficura uses cookies and similar technologies.",
};

const intro: string[] = [
  "Last updated: July 2026",
  "This notice explains how Efficura uses cookies and similar technologies on its websites: efficura.com and tsfetch.com (the site for our ts fetch product). It should be read with our Privacy Policy.",
  "tsfetch.com uses only the consent cookie, PostHog analytics and RB2B visitor-identification technologies described below; the remaining technologies are used on efficura.com only. Cookie choices are made and stored separately on each site.",
];

const rb2bUse = "Only after you accept visitor identification";
const rb2bConsent = "Optional; blocked until explicit consent";

// One row per cookie/technology: name, provider, type, when it is used,
// what it does, duration, consent position - matching the table headings below.
const cookieRows: string[][] = [
  [
    "efficura_cookie_consent",
    "efficura",
    "First-party strictly necessary cookie",
    "After you accept, reject, or save cookie preferences",
    "Stores a random consent ID, first and latest consent timestamps, the policy revision, and the categories you selected so we can remember and evidence your choice.",
    "1 year",
    "Strictly necessary to remember and honour your privacy choice",
  ],
  [
    "_reb2bgeo",
    "RB2B (Retention.com)",
    "First-party visitor-identification cookie",
    rb2bUse,
    "Supports location-based visitor identification and matching by storing visitor geolocation.",
    "20 days",
    rb2bConsent,
  ],
  [
    "_reb2bloaded",
    "RB2B (Retention.com)",
    "First-party functional cookie",
    rb2bUse,
    "Stores a script-load status flag to prevent duplicate execution.",
    "1 second",
    rb2bConsent,
  ],
  [
    "_reb2bref",
    "RB2B (Retention.com)",
    "First-party attribution cookie",
    rb2bUse,
    "Stores the referring URL for visit attribution.",
    "15 days",
    rb2bConsent,
  ],
  [
    "_reb2sessionID",
    "RB2B (Retention.com)",
    "First-party session cookie",
    rb2bUse,
    "Stores a temporary session identifier for active session management.",
    "30 minutes",
    rb2bConsent,
  ],
  [
    "_reb2buid",
    "RB2B (Retention.com)",
    "First-party visitor-identification cookie",
    rb2bUse,
    "Stores a unique visitor ID for persistent visitor identification.",
    "360 days",
    rb2bConsent,
  ],
  [
    "_reb2bfxf",
    "RB2B (Retention.com)",
    "First-party visitor-identification cookie",
    rb2bUse,
    "Stores internal tracking data used by RB2B's identification framework.",
    "1 month",
    rb2bConsent,
  ],
  [
    "_reb2btd",
    "RB2B (Retention.com)",
    "First-party visitor-identification cookie",
    rb2bUse,
    "Stores visitor-resolution data used for identity resolution.",
    "1 month",
    rb2bConsent,
  ],
  [
    "_reb2bli",
    "RB2B (Retention.com)",
    "First-party visitor-identification cookie",
    rb2bUse,
    "Stores internal record-linkage data used to connect sessions to an identity.",
    "1 month",
    rb2bConsent,
  ],
  [
    "_reb2bresolve",
    "RB2B (Retention.com)",
    "First-party visitor-identification cookie",
    rb2bUse,
    "Temporarily stores visitor data pending identity resolution.",
    "2 days",
    rb2bConsent,
  ],
  [
    "_reb2butk",
    "RB2B (Retention.com)",
    "First-party visitor-identification cookie",
    rb2bUse,
    "Stores a persistent unique token for long-term identification across sessions.",
    "1 year",
    rb2bConsent,
  ],
  [
    "PostHog analytics (ph_* cookie and localStorage)",
    "PostHog (EU cloud)",
    "First-party analytics cookie and localStorage",
    "Only after you accept analytics",
    "Measures page views, page-leave events and aggregate site usage so we can understand how the website is used. The browser is identified by a randomly generated ID; the data is processed for us by PostHog on servers in the EU.",
    "Cookie up to 12 months; localStorage until cleared through browser or site data controls",
    "Optional; blocked until explicit consent",
  ],
  [
    "_GRECAPTCHA",
    "Google reCAPTCHA",
    "Third-party security cookie",
    "When the contact form reCAPTCHA is loaded or completed",
    "Supports reCAPTCHA risk analysis so we can protect the form from spam and automated abuse.",
    "Controlled by Google",
    "Treated as necessary for form security",
  ],
  [
    "Google service cookies",
    "Google",
    "Third-party cookies that may already exist or be read by Google",
    "When reCAPTCHA loads from www.google.com",
    "Google may use existing Google cookies or similar technologies for security, fraud prevention, service delivery, and account or browser controls.",
    "Controlled by Google",
    "Disclosed as part of reCAPTCHA use",
  ],
  [
    "__cf_bm",
    "Cloudflare for Cal.com",
    "Third-party security cookie",
    "When the Cal.com scheduling panel is opened",
    "Helps Cloudflare distinguish human traffic from automated traffic and protect the Cal.com scheduling service.",
    "Usually about 30 minutes",
    "Loaded only after the scheduling panel is opened",
  ],
  [
    "Cal.com session, preference, security, analytics, or advertising cookies",
    "Cal.com",
    "Third-party scheduling service cookies",
    "When the Cal.com scheduling panel is opened and used",
    "Cal.com may use cookies and similar technologies to operate scheduling, remember settings, secure the service, analyze usage, and support its own service operations.",
    "Controlled by Cal.com",
    "Loaded only after the scheduling panel is opened",
  ],
  [
    "Vercel Web Analytics",
    "Vercel Analytics",
    "Cookieless analytics script and request data",
    "Site-wide analytics component and booking-form custom event",
    "Vercel states that Web Analytics does not use cookies. Visitors are identified by a daily hash created from the incoming request, and page views or custom events are used for aggregate website measurement. We do not use Google Analytics in the website code.",
    "No Vercel Web Analytics browser cookie or storage item; Vercel states the visitor hash is reset after 24 hours",
    "Disclosed in this notice and the Privacy Policy; not treated as a cookie consent item",
  ],
  [
    "EmailJS browser SDK and localStorage rate-limit storage",
    "EmailJS",
    "Form processing request; optional localStorage-backed rate limiting",
    "When the contact form is submitted; localStorage only if the EmailJS SDK limitRate option is enabled",
    "Our app calls emailjs.send(...) with the public key and does not configure emailjs.init, storageProvider, or limitRate. EmailJS receives submitted form details so the enquiry can be delivered to us. The installed SDK includes a default localStorage provider for client-side rate limiting, but that storage path is not used by our current configuration.",
    "No EmailJS cookie or localStorage key is written by the current configuration; if SDK rate limiting is enabled later, the localStorage value stores a request timestamp until overwritten or removed with browser/site data controls",
    "Not a cookie consent item in the current implementation; disclosed as form processing",
  ],
];

const sections: LegalSection[] = [
  {
    heading: "Cookies and similar technologies we use",
    blocks: [
      {
        table: {
          head: [
            "Cookie or technology",
            "Provider",
            "Type",
            "When it is used",
            "What it does",
            "Duration",
            "Consent position",
          ],
          rows: cookieRows,
        },
      },
    ],
  },
  {
    heading: "How to control cookies",
    blocks: [
      {
        p: "On your first visit, optional analytics and visitor-identification technologies are blocked. You can accept all, reject all non-essential technologies, or choose each category separately.",
      },
      {
        p: "You can change or withdraw your choice at any time using the Cookie settings link in the footer. Withdrawing analytics consent stops PostHog and clears its persistence. Withdrawing visitor-identification consent clears RB2B cookies and reloads the page without its script.",
      },
      {
        p: "You can also block or delete cookies through your browser settings. If you block security cookies used by reCAPTCHA or Cal.com, the form or scheduling panel may not work correctly.",
      },
      {
        p: "You may opt out of communications and marketing associated with RB2B identification at [https://app.retention.com/optout](https://app.retention.com/optout). You may opt out of RB2B's collection of your personal data in compliance with GDPR at [https://www.rb2b.com/rb2b-gdpr-opt-out](https://www.rb2b.com/rb2b-gdpr-opt-out).",
      },
      {
        p: "The Cal.com calendar is not loaded automatically. It loads only when you open the scheduling panel on the booking page.",
      },
    ],
  },
  {
    heading: "Contact",
    blocks: [
      { p: "Questions about this notice can be sent to info@efficura.com." },
    ],
  },
];

export default function CookiesPage() {
  return <LegalDoc title="Cookie Notice" intro={intro} sections={sections} />;
}
