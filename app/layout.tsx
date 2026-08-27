import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { PostHogProvider } from "@/components/PostHogProvider";
import { ConsentManager } from "@/components/ConsentManager";
import { ScrollToTop } from "@/components/ScrollToTop";
import "vanilla-cookieconsent/dist/cookieconsent.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://efficura.com"),
  title: {
    default: "efficura | AI-native system of record for real-estate debt",
    template: "%s | efficura",
  },
  description:
    "efficura provides labrador, the first AI-native system of record for real-estate debt, bringing transparency, velocity and structure to borrowers, operators and lenders.",
  // Like og:url below, "./" resolves against each page's own pathname, so
  // every route gets a correct self-referencing canonical from this one line.
  alternates: {
    canonical: "./",
  },
  openGraph: {
    siteName: "efficura",
    type: "website",
    locale: "en_GB",
    // "./" resolves against each page's own pathname, so every route gets a
    // correct absolute og:url without per-page config. og:title and
    // og:description likewise auto-fill from each page's resolved metadata.
    url: "./",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <ConsentManager />
        {/* Site-wide structured data. The description must keep the
            compliance disclaimer wording - see docs/SITE-CONTEXT.md §1. */}
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "efficura",
            legalName: "Efficura Solutions Ltd",
            url: "https://efficura.com",
            logo: "https://efficura.com/efficura.svg",
            email: "info@efficura.com",
            sameAs: ["https://www.linkedin.com/company/efficura/"],
            brand: [
              {
                "@type": "Brand",
                name: "efficura",
                url: "https://efficura.com",
              },
              {
                "@type": "Brand",
                name: "labrador",
                url: "https://efficura.com",
              },
            ],
            description:
              "efficura builds labrador and springer, software platforms for real-estate debt and investor relations. efficura is not a lender or an investment adviser, and does not originate, underwrite or fund loans.",
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "sales",
              email: "info@efficura.com",
            },
            address: {
              "@type": "PostalAddress",
              streetAddress: "Martley Hall, Framlingham Road",
              addressLocality: "Woodbridge",
              addressRegion: "Suffolk",
              postalCode: "IP13 0EN",
              addressCountry: "GB",
            },
            identifier: {
              "@type": "PropertyValue",
              propertyID: "Companies House",
              value: "15884358",
            },
          }}
        />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "efficura",
            url: "https://efficura.com",
          }}
        />
        <PostHogProvider>
          <ScrollToTop />
          <Header />
          {children}
          <Footer />
        </PostHogProvider>
      </body>
    </html>
  );
}
