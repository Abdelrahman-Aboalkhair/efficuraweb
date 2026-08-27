import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { CtaPanel } from "@/components/CtaPanel";
import { Sections } from "@/components/Sections";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import {
  CaseStudyMetricCarousel,
  type CaseStudyMetric,
} from "@/components/CaseStudyMetricCarousel";

export const metadata: Metadata = {
  title: "Martley Capital case study",
  description:
    "How labrador helps real-estate debt teams keep every deal in view.",
};

// The Martley Capital case study from efficura.com/martley-capital, rebuilt
// on this site's layout primitives.

const facts = [
  { label: "Industry", value: "Real estate investment advisory" },
  { label: "Use Case", value: "Real-estate backed lending" },
  { label: "Company size", value: "40+ staff" },
  { label: "Headquarters", value: "London" },
];

const metrics: CaseStudyMetric[] = [
  {
    label: "Time Save",
    value: "3 weeks",
    detail: "Time saved in deal origination, structuring, and execution.",
    cardClassName: "border-white/10 bg-[#475045]",
    labelClassName: "text-[#d6cbbf]",
    valueClassName: "text-[#f5f5f5]",
    detailClassName: "text-[#d6cbbf]",
  },
  {
    label: "Hours saved per week",
    value: "10h",
    detail:
      "Saved each week by automating manual data entry and credit paper preparation.",
    cardClassName:
      "border-[#d8d6c9] bg-[radial-gradient(circle_at_22%_74%,rgba(230,84,22,0.92)_0%,rgba(230,84,22,0.66)_28%,rgba(216,214,201,0.94)_62%,#d8d6c9_100%)]",
    labelClassName: "text-[#303236]/72",
    valueClassName: "text-[#303236]",
    detailClassName: "text-[#52555a]",
  },
  {
    label: "Equivalent workload automated",
    value: "One full time analyst role",
    detail:
      "Routine analyst work is handled automatically across daily credit workflows.",
    cardClassName: "border-black/5 bg-[#d6cbbf]",
    labelClassName: "text-[#52555a]",
    valueClassName: "text-[#303236]",
    detailClassName: "text-[#52555a]",
  },
  {
    label: "Data ownership",
    value: "Client-owned",
    detail:
      "Integrated with the client's Azure environment and existing workflows.",
    cardClassName: "border-neutral-200 bg-white",
    labelClassName: "text-[#77716b]",
    valueClassName: "text-[#303236]",
    detailClassName: "text-[#52555a]",
  },
  {
    label: "Borrower experience",
    value: "Clearer updates",
    detail:
      "Borrowers and capital providers can follow the relevant work without extra status calls.",
    cardClassName: "border-black/5 bg-[#303236]",
    labelClassName: "text-[#d6cbbf]",
    valueClassName: "text-white",
    detailClassName: "text-[#d6cbbf]",
  },
  {
    label: "Decision cadence",
    value: "Faster reviews",
    detail:
      "Credit context stays ready for repeat review without rebuilding packs from scattered notes.",
    cardClassName: "border-neutral-200 bg-[#f8f7f4]",
    labelClassName: "text-[#77716b]",
    valueClassName: "text-[#303236]",
    detailClassName: "text-[#52555a]",
  },
];

const testimonials = [
  {
    name: "Dan Boakes",
    title: "Executive MD",
    image: "/team/dan.jpg",
    quote:
      "labrador excels in translating business context to an easy to use, investor friendly format, exponentially increasing our ability to execute deals.",
  },
  {
    name: "Tom Tunley",
    title: "Director",
    image: "/team/tom.jpg",
    quote: "This is going to save us an enormous amount of time.",
  },
];

const storySections = [
  {
    title: "The challenge",
    body: [
      "Real-estate debt teams depend on fast judgement, but the operating work behind each deal often lives across inboxes, spreadsheets, document folders, and meeting notes.",
      "As the number of borrowers, assets, and reporting obligations grows, the team needs one place to understand deal status without slowing down investment work.",
      "The team at Martley Capital was looking for a way to manage their ever increasing workload, increase deal velocity, and create a better ecosystem for their borrowers and capital providers.",
    ],
  },
  {
    title: "The solution",
    body: [
      "labrador was designed to be that real-estate debt operating layer: a system of record that connects deal flow, borrower communications, deal files, automated credit papers, and servicing activity in one live workspace - with fine grained access to relevant parties.",
      "The product was shaped around the team’s existing workflow, then we evolved the product so even the highest-friction steps become easier to track, repeat, and improve.",
    ],
  },
  {
    title: "The results",
    body: [
      "The team gets a clearer view of active work, fewer manual updates, and a stronger foundation for scaling a real-estate backed credit strategy.",
      "Instead of adding more process around the work, labrador gives operators and decision makers the context they need while the deal is still moving.",
    ],
  },
];

export default function Page() {
  return (
    <Sections>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Martley Capital case study",
          description:
            "How labrador helps real-estate debt teams keep every deal in view.",
          url: "https://efficura.com/martley-capital",
          datePublished: "2026-07-14",
          dateModified: "2026-07-14",
          image: "https://efficura.com/martley-capital/opengraph-image",
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": "https://efficura.com/martley-capital",
          },
          author: {
            "@type": "Organization",
            name: "efficura",
            url: "https://efficura.com",
          },
          publisher: {
            "@type": "Organization",
            name: "efficura",
            url: "https://efficura.com",
          },
          about: { "@type": "Organization", name: "Martley Capital Group" },
          mentions: {
            "@type": "Project",
            name: "efficura and Martley Capital Group implementation",
            startDate: "2025-09",
          },
        }}
      />
      {/* Opening spread - Richard's pull quote beside the brand-gradient
          panel. */}
      <section>
        <Container className="pt-12 sm:pt-16">
          <Reveal>
            <div className="grid w-full gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(28rem,1.1fr)] lg:items-stretch">
              <div className="flex min-h-[24rem] flex-col justify-between rounded-[8px] border border-neutral-200 bg-white p-5 shadow-[0_1px_0_rgba(0,0,0,0.04)] sm:min-h-[34rem] sm:p-8 lg:p-10">
                <h1 className="max-w-5xl text-[clamp(1.55rem,2.45vw,3.1rem)] font-light leading-[1.08] text-black">
                  &quot;This has the potential to be completely game changing
                  for the entire real-estate debt ecosystem&quot;
                </h1>
                <div className="mt-12 flex flex-wrap items-center gap-6 sm:gap-8">
                  <Image
                    src="/logos/mcap-logo.svg"
                    alt="Martley Capital Group"
                    width={230}
                    height={70}
                    className="h-11 w-auto max-w-[12rem]"
                    priority
                  />
                  <div
                    className="hidden h-12 w-px bg-black/12 sm:block"
                    aria-hidden="true"
                  />
                  <Link
                    href="/about/richard-croft"
                    className="flex items-center gap-4 transition hover:opacity-80"
                  >
                    <Image
                      src="/team/richard.jpg"
                      alt="Richard Croft"
                      width={96}
                      height={96}
                      className="h-16 w-16 rounded-full object-cover contrast-110 grayscale"
                      priority
                    />
                    <div>
                      <p className="text-base leading-6 text-[#303236]">
                        Richard Croft
                      </p>
                      <p className="text-sm font-light leading-5 text-[#77716b]">
                        CEO of Martley Capital Group
                      </p>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="relative min-h-[22rem] overflow-hidden rounded-[8px] border border-[#d8d6c9] bg-[#303236] bg-[radial-gradient(135%_135%_at_20%_15%,#e65416_0%,#d97a4a_25%,#c2a68d_48%,#7d8474_70%,#475045_88%,#303236_100%)] bg-no-repeat shadow-[0_1px_0_rgba(0,0,0,0.04)] sm:min-h-[34rem]">
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),rgba(255,255,255,0)_40%,rgba(0,0,0,0.2))]" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white sm:p-8 lg:p-10">
                  <p className="max-w-3xl text-[clamp(1.95rem,3.4vw,4.05rem)] font-light leading-[1]">
                    One operating layer for the whole credit lifecycle.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Company facts beside the about copy and the outcomes carousel. */}
      <section>
        <Container>
          <div className="grid w-full gap-14 lg:grid-cols-[19rem_minmax(0,1fr)] lg:items-start lg:gap-20 xl:grid-cols-[21rem_minmax(0,1fr)]">
            <Reveal>
              <aside className="border border-[#ebe7df] bg-[#f8f7f4] p-6 text-[#303236] sm:p-8 lg:sticky lg:top-32">
                <div className="border-b border-[#ded8cf] pb-7">
                  <Image
                    src="/logos/mcap-logo.svg"
                    alt="Martley Capital Group"
                    width={190}
                    height={54}
                    className="h-12 w-auto max-w-[9rem]"
                  />
                </div>
                <p className="mt-7 max-w-xs text-sm leading-6 text-[#8d8982]">
                  Full-service real estate investment advisory platform.
                </p>
                <div className="mt-7 border-t border-[#ded8cf]">
                  {facts.map((fact) => (
                    <div
                      key={fact.label}
                      className="border-b border-[#ded8cf] py-4 last:border-b-0 last:pb-0"
                    >
                      <p className="text-sm leading-5 text-[#303236]">
                        {fact.label}
                      </p>
                      <p className="mt-1 text-sm leading-5 text-[#8d8982]">
                        {fact.value}
                      </p>
                    </div>
                  ))}
                </div>
              </aside>
            </Reveal>

            <Reveal className="min-w-0">
              <h2 className="text-[clamp(1.75rem,2.1vw,2.55rem)] leading-[1.08] text-[#303236]">
                About
              </h2>
              <p className="mt-5 max-w-4xl text-base leading-7 text-[#6f6d68]">
                Martley Capital Group is a full-service real estate investment
                advisory platform whose activities cover real estate investing,
                lending, assets, and funds.
              </p>
              <p className="mt-4 max-w-4xl text-base leading-7 text-[#6f6d68]">
                Established in December 2023, the company has more than 40
                staff, four offices across the UK and Europe, and around GBP
                1.0bn of AUM across 33 mandates.
              </p>

              <CaseStudyMetricCarousel metrics={metrics} />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* The story - challenge, solution, results - then the testimonials. */}
      <section>
        <Container>
          <div className="border-t border-neutral-200 pt-14">
            <div className="border-y border-neutral-200">
              {storySections.map((section) => (
                <section
                  key={section.title}
                  className="border-b border-neutral-200 py-16 last:border-b-0 sm:py-20"
                >
                  <Reveal>
                    <div className="grid gap-7 lg:grid-cols-[19rem_minmax(0,1fr)] lg:gap-20 xl:grid-cols-[21rem_minmax(0,1fr)]">
                      <h2 className="text-[clamp(1.55rem,2vw,2.15rem)] leading-[1.08] text-[#303236]">
                        {section.title}
                      </h2>
                      <div className="min-w-0 space-y-5 text-base leading-6 text-[#303236]">
                        {section.body.map((paragraph) => (
                          <p key={paragraph} className="max-w-4xl">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                </section>
              ))}
            </div>

            <section className="mt-12" aria-labelledby="testimonials-heading">
              <Reveal>
                <h2
                  id="testimonials-heading"
                  className="text-[clamp(1.45rem,1.7vw,2rem)] leading-[1.1] text-[#303236]"
                >
                  User testimonials
                </h2>
              </Reveal>
              <div className="mt-7 grid gap-5 lg:grid-cols-2">
                {testimonials.map((testimonial, i) => (
                  <Reveal
                    key={testimonial.name}
                    delay={i * 0.08}
                    className="h-full"
                  >
                    <article className="flex h-full flex-col rounded-[8px] border border-neutral-200 bg-white p-6 text-[#303236] shadow-[0_1px_0_rgba(0,0,0,0.04)] sm:p-8">
                      <p className="text-[clamp(1.08rem,1.25vw,1.45rem)] font-light leading-[1.22] text-black">
                        &quot;{testimonial.quote}&quot;
                      </p>
                      <div className="mt-auto flex items-center gap-5 pt-8">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          width={112}
                          height={112}
                          className="h-20 w-20 rounded-full object-cover object-top contrast-105 grayscale sm:h-24 sm:w-24"
                        />
                        <div>
                          <p className="text-base leading-6 text-[#303236]">
                            {testimonial.name}
                          </p>
                          <p className="text-sm font-light leading-5 text-[#77716b]">
                            {testimonial.title}
                          </p>
                          <p className="text-sm font-light leading-5 text-[#77716b]">
                            Martley Capital Group
                          </p>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </section>
          </div>
        </Container>
      </section>

      {/* Sign-off - the shared dark CtaPanel with the circular arrow CTA. */}
      <CtaPanel
        title="Build a clearer real-estate debt workflow around your team."
        primary={{ label: "book a demo", href: "/contact" }}
        location="signoff"
      />
    </Sections>
  );
}
