import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/Container";
import { DemoRequestLink } from "@/components/DemoRequestLink";
import { Sections } from "@/components/Sections";
import { Reveal } from "@/components/Reveal";
import { CtaPanel } from "@/components/CtaPanel";

export const metadata: Metadata = {
  title: "How springer works — raise to reporting",
  description:
    "How springer works: the raise, fund administration and investor reporting stay connected on one audited record — investor relations run in-house.",
};

type Step = { number: string; title: string; description: string };

// The investor lifecycle on springer — the raise, the quarter's
// administration, then the reporting that reaches investors — all run from
// the same record the deals live in. Framed as what the platform does for
// you rather than a walkthrough of the machinery, and kept in step with the
// Fund Administration and Investor Management pages so the story never
// diverges.
const steps: Step[] = [
  {
    number: "01",
    title: "Raise",
    description:
      "Every prospect is tracked from first introduction to funded, with data rooms that report back who viewed what, and a running view of what remains to be raised.",
  },
  {
    number: "02",
    title: "Administer",
    description:
      "Capital calls, distributions and NAV run from a single audited ledger, with human sign-off before anything moves money or reaches an investor.",
  },
  {
    number: "03",
    title: "Report",
    description:
      "Capital account statements are generated, reviewed and published as a deliberate second step, and each LP's portal shows them only what is theirs.",
  },
];

export default function Page() {
  return (
    <Sections>
      {/* Hero — the site's full-bleed masthead, on the product pages' cream band
          (this page has no product mock, so it borrows the audience pages'
          split layout instead): big light title left, intro anchored right
          with the underlined book-a-demo link. */}
      <section className="flex min-h-[60svh] flex-col justify-end overflow-hidden bg-[#f8f7f4] py-10 sm:min-h-[68svh] sm:py-14 lg:py-16">
        <Container>
          <Reveal>
            <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(19rem,0.95fr)] lg:items-end lg:gap-16">
              <h1 className="text-[clamp(3rem,12vw,4.75rem)] font-light leading-[0.92] text-[#303236] sm:text-[clamp(3.75rem,7.5vw,7.5rem)] sm:leading-[0.9]">
                how springer works.
              </h1>
              <div className="max-w-2xl lg:justify-self-end">
                <p className="text-[clamp(1.3rem,5vw,1.85rem)] leading-[1.12] text-[#303236] sm:text-[clamp(1.5rem,2.2vw,2.5rem)] sm:leading-[1.08]">
                  The raise, the ledger and the reporting stay connected in one
                  record, so investor relations runs where your deals already
                  live.
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

      {/* The investor lifecycle — three tall white cards, the only walkthrough
          on the page: an orange stage number up top, the detail anchored at
          the bottom via justify-between so titles line up across the row. */}
      <section aria-labelledby="lifecycle-heading">
        <Container>
          <Reveal>
            <h2
              id="lifecycle-heading"
              className="max-w-3xl text-[clamp(2.2rem,4.9vw,4.5rem)] font-light leading-[0.9] text-[#303236]"
            >
              Raise to reporting, connected.
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-7 text-[#52555a]">
              One register holds every investor, every position and every number
              that reaches them, so nothing lives in a side spreadsheet.
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

      {/* Pillars — plain white, ending on a quiet pointer to the deal
          side. */}
      <section>
        <Container>
          <Reveal>
            <h2 className="max-w-3xl text-[clamp(2.2rem,4.9vw,4.5rem)] font-light leading-[0.9] text-[#303236]">
              Computed, approved, published.
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-7 text-[#52555a]">
              Balances and distributions are computed from a typed transaction
              ledger, never entered by hand. Approval checkpoints sit before
              anything posts, sends or moves money, and statements reach
              investors only when you publish them. That&apos;s springer:
              investor relations on the same system of record as the deals
              themselves.
            </p>
            <p className="mt-8 text-base leading-7 text-[#52555a]">
              Running the deal side too?{" "}
              <Link
                href="/how-it-works"
                className="text-[#303236] underline decoration-[#c2662d] underline-offset-[7px] transition-opacity hover:opacity-80"
              >
                See how labrador works
              </Link>
            </p>
          </Reveal>
        </Container>
      </section>

      <CtaPanel
        title="Ready to see it?"
        body="Book a Demo and we'll walk you through how springer runs the raise, the quarter and the reporting from one record."
        primary={{ label: "Book a Demo", href: "/contact" }}
        secondary={{
          label: "Investor Management",
          href: "/product/investor-management",
        }}
      />
    </Sections>
  );
}
