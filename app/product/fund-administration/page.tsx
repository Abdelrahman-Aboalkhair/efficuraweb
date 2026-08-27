import type { Metadata } from "next";
import { ArrowUpRight, Check } from "lucide-react";
import { Container } from "@/components/Container";
import { DemoRequestLink } from "@/components/DemoRequestLink";
import { Sections } from "@/components/Sections";
import { Reveal } from "@/components/Reveal";
import { CtaPanel } from "@/components/CtaPanel";
import { FundAdminDemo } from "@/components/FundAdminDemo";

export const metadata: Metadata = {
  title: "Fund Administration: capital calls & NAV",
  description:
    "Capital calls, distributions, NAV and investor statements, run from a single audited ledger with human sign-off before anything moves money.",
};

const features = [
  {
    title: "Capital calls",
    detail:
      "Issue a call pro rata across commitments. Notices carry the amount called, the fund-by date and payment instructions, and contributions are tracked against the call until it is fulfilled.",
  },
  {
    title: "Distributions",
    detail:
      "Enter a total and allocate pro rata, or upload per-investor amounts from a spreadsheet. Interest, return of capital and redemptions are recorded as distinct types, so income and principal are never conflated.",
  },
  {
    title: "NAV",
    detail:
      "Quarterly valuations filed as snapshots and finalised once. Each equity position's current value follows as its share of the fund; loan notes carry at par.",
  },
  {
    title: "Capital account statements",
    detail:
      "Opening balance to closing balance, with contributions, income, fees and tax in between. Generate for the period, review the figures, then publish to investors as a deliberate second step.",
  },
];

export default function Page() {
  return (
    <Sections>
      {/* Hero: full-bleed dark band with the copy. */}
      <section className="overflow-hidden bg-[#303236] bg-[radial-gradient(circle_at_85%_80%,rgba(192,102,45,0.4)_0%,rgba(48,50,54,0)_45%)] py-16 sm:py-20 lg:py-28">
        <Container>
          <Reveal>
            <h1 className="text-[clamp(2.5rem,6.4vw,4.75rem)] font-light leading-[0.94] text-[#f5f5f5]">
              Fund administration, in-house.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-7 text-[#d6cbbf] sm:text-xl">
              Capital calls, distributions, NAV and capital account statements,
              run from a single audited ledger, with human sign-off before
              anything moves money or reaches an investor.
            </p>
            <DemoRequestLink
              href="/contact"
              location="page-cta"
              className="group mt-8 inline-flex w-fit items-center gap-2 text-base text-[#f5f5f5] underline decoration-[#f0b48f] underline-offset-[7px] transition-opacity hover:opacity-80 sm:text-lg"
            >
              <span>book a demo</span>
              <ArrowUpRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:h-5 sm:w-5"
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </DemoRequestLink>
          </Reveal>
        </Container>
      </section>

      {/* The record itself: springer's entity overview loading in - full
          container width, like the other product pages' demos. */}
      <section>
        <Container>
          <Reveal>
            <FundAdminDemo />
          </Reveal>
        </Container>
      </section>

      {/* Feature grid: the four quarterly workloads. */}
      <section>
        <Container>
          <Reveal>
            <h2 className="max-w-3xl text-[clamp(2.2rem,4.9vw,4.5rem)] font-light leading-[0.9] text-[#303236]">
              Quarter-end, under control.
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-7 text-[#52555a]">
              The recurring workloads of the reporting cycle, run from the same
              record the investments live in.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={(i % 2) * 0.08} className="h-full">
                <article className="flex h-full flex-col rounded-[8px] border border-neutral-200 bg-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.04)] sm:p-8">
                  <h3 className="text-[clamp(1.3rem,1.5vw,1.7rem)] leading-[1.1] text-[#303236]">
                    {f.title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-[#52555a]">
                    {f.detail}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Why it holds up: the audit-trail value band. */}
      <section className="bg-[#f8f7f4] py-16 sm:py-20 lg:py-28">
        <Container>
          <Reveal>
            <h2 className="max-w-4xl text-[clamp(2.1rem,4.4vw,4rem)] font-light leading-[0.92] text-[#303236]">
              Every number has a paper trail.
            </h2>
            <p className="mt-7 max-w-3xl text-lg leading-7 text-[#52555a]">
              Balances and distributions are computed from a typed transaction
              ledger, never entered by hand. Interest is recorded as income and
              leaves principal untouched; repayments of principal reduce the
              balance. NAV locks once finalised, statements reach investors only
              when you publish them, and notices go out as PDF attachments that
              are filed back to the record automatically.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                "Balances computed from the ledger, never entered by hand",
                "Approval checkpoints before anything posts or sends",
                "Notices sent as attachments and filed to the record",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-[8px] border border-[#ded8cf] bg-white p-4 text-base leading-6 text-[#303236]"
                >
                  <Check
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#c2662d]"
                    strokeWidth={1.8}
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <CtaPanel
        flush
        title="Run the fund from one record."
        body="See how labrador runs capital calls, distributions, NAV and capital account statements end to end, with sign-off at every step."
        primary={{ label: "Book a Demo", href: "/contact" }}
        secondary={{
          label: "Investor Management",
          href: "/product/investor-management",
        }}
      />
    </Sections>
  );
}
