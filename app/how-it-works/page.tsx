import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/Container";
import { DemoRequestLink } from "@/components/DemoRequestLink";
import { Sections } from "@/components/Sections";
import { Reveal } from "@/components/Reveal";
import { CtaPanel } from "@/components/CtaPanel";

export const metadata: Metadata = {
  title: "How labrador works: origination to servicing",
  description:
    "How labrador works: origination, underwriting, closing and servicing stay connected in one live workspace, the AI-native system of record for real-estate debt.",
};

type Step = { number: string; title: string; description: string };

// The deal lifecycle on Labrador - origination, underwriting/closing, then
// servicing - all held in one live workspace. Framed as what the platform does
// for you rather than a walkthrough of the machinery, and kept in step with the
// audience pages so the story never diverges.
const steps: Step[] = [
  {
    number: "01",
    title: "Originate",
    description:
      "Every deal comes in as a single structured record, with no rekeying, no scattered files and no starting from a blank spreadsheet.",
  },
  {
    number: "02",
    title: "Underwrite and close",
    description:
      "Underwriting, conditions, approvals and closing stay connected in one live workspace, so execution keeps its velocity.",
  },
  {
    number: "03",
    title: "Service",
    description:
      "Servicing activity stays tied to the deal, so the system of record stays complete and current long after close.",
  },
];

export default function Page() {
  return (
    <Sections>
      {/* Hero - the site's full-bleed masthead, on the product pages' cream band
          (this page has no product mock, so it borrows the audience pages'
          split layout instead): big light title left, intro anchored right
          with the underlined book-a-demo link. */}
      <section className="flex min-h-[60svh] flex-col justify-end overflow-hidden bg-[#f8f7f4] py-10 sm:min-h-[68svh] sm:py-14 lg:py-16">
        <Container>
          <Reveal>
            <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(19rem,0.95fr)] lg:items-end lg:gap-16">
              <h1 className="text-[clamp(3rem,12vw,4.75rem)] font-light leading-[0.92] text-[#303236] sm:text-[clamp(3.75rem,7.5vw,7.5rem)] sm:leading-[0.9]">
                how labrador works.
              </h1>
              <div className="max-w-2xl lg:justify-self-end">
                <p className="text-[clamp(1.3rem,5vw,1.85rem)] leading-[1.12] text-[#303236] sm:text-[clamp(1.5rem,2.2vw,2.5rem)] sm:leading-[1.08]">
                  Origination, underwriting, closing and servicing stay
                  connected in one live workspace, a single system of record for
                  the whole deal.
                </p>
                <DemoRequestLink
                  href="/contact"
                  location="hero"
                  className="group mt-7 inline-flex w-fit items-center gap-2 text-base text-[#303236] underline decoration-[#c2662d] underline-offset-[7px] transition-opacity hover:opacity-80 sm:text-lg"
                >
                  <span>book a demo</span>
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:h-5 sm:w-5"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </DemoRequestLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* The deal lifecycle - three tall white cards, the only walkthrough on
          the page: an orange stage number up top, the detail anchored at the
          bottom via justify-between so titles line up across the row. */}
      <section aria-labelledby="lifecycle-heading">
        <Container>
          <Reveal>
            <h2
              id="lifecycle-heading"
              className="max-w-3xl text-[clamp(2.2rem,4.9vw,4.5rem)] font-light leading-[0.9] text-[#303236]"
            >
              Origination to servicing, connected.
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-7 text-[#52555a]">
              One live workspace holds the whole deal, so nothing gets lost
              between teams, tools and inboxes.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3">
            {steps.map((step, i) => (
              <Reveal key={step.number} delay={i * 0.08} className="h-full">
                <article className="flex h-full min-h-[20rem] flex-col justify-between rounded-[8px] border border-neutral-200 bg-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.04)] sm:min-h-[24rem] sm:p-8">
                  <p className="text-[clamp(2.5rem,4vw,4rem)] font-light leading-none text-[#c2662d]">
                    {step.number}
                  </p>
                  <div>
                    <h3 className="text-[clamp(1.35rem,1.65vw,1.9rem)] leading-[1.08] text-[#303236]">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-base leading-7 text-[#52555a]">
                      {step.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Pillars - plain white, ending on a quiet pointer to the lender
          side. */}
      <section>
        <Container>
          <Reveal>
            <h2 className="max-w-3xl text-[clamp(2.2rem,4.9vw,4.5rem)] font-light leading-[0.9] text-[#303236]">
              Transparency, velocity, structure.
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-7 text-[#52555a]">
              Every document, condition and decision is easy to follow, deals
              move without stalling between teams, and one system of record
              holds the whole thing together. That&apos;s what makes labrador
              the first AI-native system of record for real-estate debt.
            </p>
            <p className="mt-8 text-base leading-7 text-[#52555a]">
              Deploying capital rather than raising it?{" "}
              <Link
                href="/for-lenders"
                className="text-[#303236] underline decoration-[#c2662d] underline-offset-[7px] transition-opacity hover:opacity-80"
              >
                See how labrador works for lenders
              </Link>
            </p>
          </Reveal>
        </Container>
      </section>

      <CtaPanel
        title="Ready to see it?"
        body="Book a Demo and we'll walk you through how labrador brings transparency, velocity and structure to your real-estate debt operations."
        primary={{ label: "Book a Demo", href: "/contact" }}
        secondary={{ label: "For lenders", href: "/for-lenders" }}
      />
    </Sections>
  );
}
