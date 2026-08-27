import type { Metadata } from "next";
import { LegalDoc, type LegalSection } from "@/components/LegalDoc";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How efficura collects, uses and protects your personal data.",
};

const intro: string[] = [
  "Last updated: July 2026",
  "This Privacy Notice explains how Efficura Solutions Ltd (“Efficura”, “we”, “us”, or “our”) collects, uses, and protects your personal data. It applies to our website visitors, prospective clients, suppliers, partners, and anyone who contacts us in the course of our business.",
  "For information about our use of cookies and similar technologies, please see our Cookie Notice.",
];

const sections: LegalSection[] = [
  {
    heading: "1. Who we are",
    blocks: [
      {
        p: "Efficura Solutions Ltd is the controller of your personal data. Registered in England and Wales.",
      },
      { p: "Company No. 15884358" },
      {
        p: "**Registered Office:** Martley Hall, Framlingham Road, Woodbridge, Suffolk IP13 0EN",
      },
      { p: "**Email:** info@efficura.com" },
      {
        p: "If you have questions about this notice, you can contact our Data Protection Lead at the email above.",
      },
    ],
  },
  {
    heading: "2. Personal data we collect",
    blocks: [
      { p: "We may collect and process the following types of personal data:" },
      {
        list: [
          "Your contact details, such as name, business email address, phone number, job title, and company name.",
          "Information about how you interact with our website, including IP address, browser type, pages viewed, approximate location, time spent on pages, and links clicked.",
          "Information you provide when you contact us, such as emails, forms, support requests, feedback, and chat messages.",
          "Marketing and event information, including your communication preferences, registration details, and interests.",
          "Cookie-consent information, including a random consent ID, consent timestamps, the policy revision, and the categories you accepted or rejected.",
          "General location data, such as the country or region from which you access our website.",
          "Scheduling and anti-spam information processed through third-party services such as Cal.com and Google reCAPTCHA.",
        ],
      },
      {
        p: "We do not normally collect special category (sensitive) data. If we ever need to (for example, when arranging event accessibility) we will do so lawfully and only with your consent. Please do not send us sensitive personal data unless we specifically ask for it.",
      },
    ],
  },
  {
    heading: "3. How we collect your information",
    blocks: [
      { p: "We collect personal data directly from you when you:" },
      {
        list: [
          "Fill in a contact form or request information about our products or services.",
          "Communicate with us by phone, email, chat, or social media.",
          "Register for or attend an event, meeting, or demo.",
          "Interact with our website or marketing materials.",
        ],
      },
      {
        p: "We may also receive data about you from third parties, such as analytics providers, scheduling providers, marketing or event partners, and publicly available business sources (for example, LinkedIn).",
      },
    ],
  },
  {
    heading: "4. Cookies and similar technologies",
    blocks: [
      {
        p: "After you make a choice in our cookie banner, we store a strictly necessary first-party consent cookie so we can remember and evidence that choice. Optional PostHog analytics and RB2B visitor-identification technologies are blocked unless and until you consent to their respective categories.",
      },
      {
        p: "If you accept analytics, PostHog sets a first-party cookie and localStorage entry, identifies the browser with a randomly generated ID, and processes the data for us on its EU servers. If you accept visitor identification, RB2B (provided by Retention.com) sets first-party cookies used for session continuity, attribution, and identity resolution.",
      },
      {
        p: "Other services include Google reCAPTCHA for form security, Cal.com for scheduling, Vercel Analytics for aggregate website measurement, and EmailJS for form delivery. The Cal.com scheduling panel is not loaded automatically; it loads when you open the scheduling panel on the booking page.",
      },
      {
        p: "You can find more detail in our Cookie Notice and change or withdraw your consent at any time using the Cookie settings link in the footer. You can also control cookies through your browser settings. If you disable certain security or scheduling cookies, the form or scheduling panel may not function properly.",
      },
    ],
  },
  {
    heading: "5. Visitor identification, advertising and analytics",
    blocks: [
      {
        p: "With your consent, we use PostHog to understand website usage and performance; its data is processed on servers in the EU. We also use Vercel Analytics for cookieless aggregate measurement. We do not currently use Google Analytics in the website code.",
      },
      {
        p: "When you visit or log in to our website, cookies and similar technologies may be used by our online data partners or vendors to associate these activities with other personal information they or others have about you, including by association with your email. We (or service providers on our behalf) may then send communications and marketing to these email addresses. You may opt out of receiving this advertising by visiting [https://app.retention.com/optout](https://app.retention.com/optout). You also have the option to opt out of the collection of your personal data in compliance with GDPR by visiting [https://www.rb2b.com/rb2b-gdpr-opt-out](https://www.rb2b.com/rb2b-gdpr-opt-out).",
      },
    ],
  },
  {
    heading: "6. How we use your personal data",
    blocks: [
      { p: "We use your personal data to:" },
      {
        list: [
          "Communicate with you and respond to your enquiries.",
          "Provide information, proposals, or support regarding our products and services.",
          "Manage our website, analyse usage, and improve its performance.",
          "Send you updates, newsletters, or event invitations, where you have agreed to receive them or where our communications are directed to business contacts.",
          "Operate our business functions, including marketing, sales, accounting, and internal reporting.",
          "Maintain the security of our website and systems.",
          "Prevent and detect fraud, misuse, or other unlawful activity.",
          "Comply with our legal and regulatory obligations.",
          "Prepare for or engage in audits, legal proceedings, or business transactions such as mergers or acquisitions.",
        ],
      },
      {
        p: "We only process personal data where we have a lawful basis to do so. These bases include the performance of a contract, compliance with a legal obligation, our legitimate business interests, or your consent (where required).",
      },
      {
        p: "You may withdraw your consent at any time by contacting us using the details below.",
      },
    ],
  },
  {
    heading: "7. Sharing your personal data",
    blocks: [
      {
        p: "**We do not sell personal data.** However, we may share your information with trusted third parties who help us run our business, such as:",
      },
      {
        list: [
          "Website hosting and analytics providers, including Vercel and PostHog.",
          "Online data and visitor-identification providers, including RB2B (provided by Retention.com).",
          "Email and communication service providers, including EmailJS where used for form delivery.",
          "Scheduling providers, including Cal.com where you use the scheduling panel.",
          "Security and anti-spam providers, including Google reCAPTCHA.",
          "Customer relationship and marketing platforms.",
          "Event management and webinar partners.",
          "Professional advisers such as accountants, auditors, and solicitors.",
          "Regulatory bodies and law enforcement where required by law.",
          "Companies involved in potential mergers, acquisitions, or corporate restructuring.",
        ],
      },
      {
        p: "We ensure that all such parties are subject to appropriate contractual safeguards and comply with UK data protection law.",
      },
    ],
  },
  {
    heading: "8. International data transfers",
    blocks: [
      {
        p: "Some of our service providers may store or process data outside the United Kingdom. Where this occurs, we use lawful transfer mechanisms such as the UK International Data Transfer Agreement (IDTA), the UK Addendum to the EU Standard Contractual Clauses, or other safeguards approved by the UK Information Commissioner’s Office (ICO).",
      },
      { p: "You can request details of these safeguards by contacting us." },
    ],
  },
  {
    heading: "9. How long we keep your data",
    blocks: [
      {
        p: "We retain personal data only for as long as necessary for the purposes described in this notice, taking into account our legal obligations, the nature of our relationship with you, and our legitimate business needs. When data is no longer required, we securely delete or anonymise it. Aggregated or anonymised information that does not identify individuals may be retained for longer periods.",
      },
    ],
  },
  {
    heading: "10. Your rights",
    blocks: [
      {
        p: "Under the UK General Data Protection Regulation (UK GDPR), you have the right to:",
      },
      {
        list: [
          "Request access to your personal data and information about how it is processed.",
          "Request correction of inaccurate or incomplete data.",
          "Request deletion of your data in certain circumstances.",
          "Request that we restrict or limit processing of your data.",
          "Object to processing based on our legitimate interests, including direct marketing.",
          "Request a copy of your data in a commonly used, machine-readable format (data portability).",
          "Withdraw your consent at any time, where processing is based on consent.",
        ],
      },
      {
        p: "To exercise any of these rights, please contact us at info@efficura.com. We may need to verify your identity before completing your request.",
      },
      {
        p: "If you are unhappy with how we handle your data, you have the right to lodge a complaint with the Information Commissioner’s Office (ICO).",
      },
      { p: "**Website:** www.ico.org.uk" },
      { p: "**Telephone:** 0303 123 1113" },
      {
        p: "**Address:** Wycliffe House, Water Lane, Wilmslow, Cheshire, SK9 5AF.",
      },
    ],
  },
  {
    heading: "11. Marketing and preferences",
    blocks: [
      {
        p: "We may send you information about our services or events that we think may be relevant to you. You can opt out at any time by clicking the unsubscribe link in our emails or contacting us at info@efficura.com. We do not share your contact details with third parties for their own marketing purposes.",
      },
    ],
  },
  {
    heading: "12. Children’s privacy",
    blocks: [
      {
        p: "Our website and services are directed to businesses and professionals. We do not knowingly collect personal data from anyone under the age of 13. If you believe a child has provided us with personal data, please contact us so that we can delete it promptly.",
      },
    ],
  },
  {
    heading: "13. Security",
    blocks: [
      {
        p: "We use appropriate technical and organisational measures to safeguard personal data from unauthorised access, use, or disclosure. These include access controls, encryption, and secure storage. However, no system can be completely secure. The transmission of information via the internet is at your own risk.",
      },
    ],
  },
  {
    heading: "14. Changes to this policy",
    blocks: [
      {
        p: "We may update this Privacy Policy from time to time to reflect changes in our practices or legal obligations. The date at the top of this page indicates when it was last revised. Significant changes will be communicated on our website or by direct notice if required.",
      },
    ],
  },
  {
    heading: "15. How to contact us",
    blocks: [
      {
        p: "If you have any questions about this Privacy Policy or how we handle your data, please contact:",
      },
      { p: "**Efficura Solutions Ltd**" },
      { p: "**Email:** info@efficura.com" },
      {
        p: "**Postal address:** Martley Hall, Framlingham Road, Woodbridge, Suffolk, IP13 0EN",
      },
    ],
  },
];

export default function Page() {
  return (
    <LegalDoc title="Privacy Policy" intro={intro} sections={sections} />
  );
}
