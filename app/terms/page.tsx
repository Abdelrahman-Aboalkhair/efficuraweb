import type { Metadata } from "next";
import { LegalDoc, type LegalSection } from "@/components/LegalDoc";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms and conditions governing your use of the efficura website.",
};

const sections: LegalSection[] = [
  {
    heading: "1. Introduction",
    blocks: [
      {
        p: "These Terms and Conditions govern your use of the Efficura Solutions website (including any sub-domains). By accessing or using this Website, you agree to be bound by these Terms. If you disagree with any part of these Terms, stop using the Website immediately.",
      },
      { p: "In these Terms:" },
      {
        list: [
          "“Efficura Solutions,” “we,” “us,” “our” refers to Efficura Solutions, the owner and operator of the Website.",
          "“User,” “you,” “your” means any third party who accesses the Website and is not employed by Efficura Solutions in the course of their duties or engaged as a consultant providing services to Efficura Solutions.",
        ],
      },
      {
        p: "**You must be at least 18 years old to use this Website.** By using the Website, you confirm that you meet this requirement.",
      },
    ],
  },
  {
    heading: "2. Intellectual Property Rights",
    blocks: [
      {
        list: [
          "All content on the Website unless uploaded by Users is the property of Efficura Solutions, our affiliates, or relevant third parties.",
        ],
      },
      {
        p: "“Content” includes text, graphics, images, audio, video, software, data compilations, page layouts, underlying code, and any other form of information that can be stored on a computer.",
      },
      {
        list: [
          "All content is protected by copyright, trademark, database rights, and other intellectual property protections.",
        ],
      },
      {
        p: "Nothing on this site grants you any license or right to use Efficura Solutions’ trademarks, service marks, or logos without prior written consent.",
      },
      {
        list: [
          "You may only use the Website for personal, non-commercial purposes, including:",
          "Accessing and viewing content on your device.",
          "You may not reproduce, modify, copy, distribute, or otherwise use Website content for commercial purposes without written permission from Efficura Solutions.",
        ],
      },
    ],
  },
  {
    heading: "3. Acceptable Use",
    blocks: [
      { p: "You agree not to use the Website:" },
      {
        list: [
          "In any way that may damage, disable, or impair the Website or interfere with another user’s access.",
          "For any unlawful, harmful, defamatory, harassing, abusive, threatening, or otherwise objectionable activity.",
          "For any activity in breach of laws, regulations, or governmental requirements.",
          "To store, upload, or distribute copyrighted material without appropriate permissions.",
        ],
      },
    ],
  },
  {
    heading: "4. User-Generated Content",
    blocks: [
      { p: "If you upload or provide content:" },
      {
        list: [
          "You confirm that you own the rights to that content or have permission to use it.",
          "You grant Efficura Solutions a non-exclusive, royalty-free license to use, reproduce, adapt, and display that content for the operation of the Website.",
          "You are solely responsible for any content you provide.",
          "We may remove or edit any user content that violates these Terms or applicable law.",
        ],
      },
    ],
  },
  {
    heading: "5. GDPR & Data Protection Compliance",
    blocks: [
      {
        p: "Efficura Solutions is committed to full compliance with the General Data Protection Regulation (GDPR) and applicable privacy laws.",
      },
      { sub: "5.1 Data We Collect" },
      { p: "We may collect:" },
      {
        list: [
          "Contact details (e.g., name, email, phone, company)",
          "Technical data (IP address, browser type, device identifiers)",
          "Usage data (pages visited, time spent on the Website)",
          "Data you voluntarily submit via forms, registrations, or communication",
        ],
      },
      { sub: "5.2 Legal Bases for Processing" },
      { p: "We process personal data on the following lawful grounds:" },
      {
        list: [
          "Consent",
          "Contractual necessity",
          "Legitimate interests",
          "Compliance with legal obligations",
        ],
      },
      { sub: "5.3 Your GDPR Rights" },
      { p: "**You have the right to:**" },
      {
        list: [
          "Access your personal data",
          "Request correction of inaccurate data",
          "Request deletion (“right to be forgotten”)",
          "Restrict processing",
          "Object to processing (including marketing)",
          "Request data portability",
          "Withdraw consent at any time",
          "Lodge complaints with your supervisory authority",
        ],
      },
      { p: "**To exercise these rights, contact:** info@efficura.com" },
      { sub: "5.4 Data Security" },
      {
        p: "We implement strict technical and organizational measures to protect your data from unauthorized access, loss, or misuse.",
      },
      { sub: "5.5 Third-Party Sharing" },
      {
        p: "We only share personal data with trusted partners when necessary for Website operation or service delivery, and only under GDPR-compliant agreements.",
      },
    ],
  },
  {
    heading: "6. Cookie Notice",
    blocks: [
      {
        p: "The Website uses cookies and similar technologies as described in our Cookie Notice at /cookies. These technologies may be used to:",
      },
      {
        list: [
          "Provide site security",
          "Operate the contact form and scheduling panel",
          "Analyse Website usage",
          "Identify business visitors for sales and marketing",
          "Protect third-party services from spam and automated abuse",
        ],
      },
      {
        p: "Optional analytics and visitor-identification technologies are blocked until you consent. You can change or withdraw your choice at any time using the Cookie settings link in the footer or manage cookies in your browser. Some parts of the Website, including the contact form and scheduling panel, may not function properly if necessary security or scheduling cookies are blocked.",
      },
    ],
  },
  {
    heading: "7. Links to Other Websites",
    blocks: [
      { p: "The Website may contain links to third-party websites." },
      {
        p: "Efficura Solutions is not responsible for the content, privacy policies, or practices of any external sites.",
      },
    ],
  },
  {
    heading: "8. Limitation of Liability",
    blocks: [
      { p: "To the maximum extent permitted by law:" },
      {
        list: [
          "Efficura Solutions is not liable for any indirect, consequential, or incidental damages arising from your use of the Website.",
          "We do not guarantee that the Website will be uninterrupted, error-free, secure, or free from malware.",
          "Your use of the Website is at your own risk.",
        ],
      },
      {
        p: "**Nothing in these Terms limits liability where prohibited by law.**",
      },
    ],
  },
  {
    heading: "9. Indemnity",
    blocks: [
      {
        p: "You agree to indemnify and hold harmless Efficura Solutions against all claims, damages, losses, liabilities, and expenses arising from your misuse of the Website or breach of these Terms.",
      },
    ],
  },
  {
    heading: "10. Changes to These Terms",
    blocks: [
      { p: "Efficura Solutions may update these Terms at any time." },
      { p: "Changes become effective immediately upon posting on the Website." },
      {
        p: "Continued use of the Website indicates acceptance of the updated Terms.",
      },
    ],
  },
  {
    heading: "11. Governing Law",
    blocks: [
      { p: "These Terms are governed by the laws of England and Wales." },
      {
        p: "Any disputes will be subject to the exclusive jurisdiction of the courts in that jurisdiction.",
      },
    ],
  },
  {
    heading: "12. Contact Information",
    blocks: [
      {
        p: "**For any questions about these Terms or GDPR matters, contact:** info@efficura.com",
      },
    ],
  },
];

export default function Page() {
  return <LegalDoc title="Terms & Conditions" sections={sections} />;
}
