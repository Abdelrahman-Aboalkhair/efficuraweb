import type { Metadata } from "next";
import { ArrowUpRight, Check } from "lucide-react";
import { Container } from "@/components/Container";
import { DemoRequestLink } from "@/components/DemoRequestLink";
import { Sections } from "@/components/Sections";
import { Reveal } from "@/components/Reveal";
import { CtaPanel } from "@/components/CtaPanel";
import { AutomaticServicingDemo } from "@/components/AutomaticServicingDemo";

export const metadata: Metadata = {
  title: "Automatic Servicing: in-house loan servicing",
  description:
    "Interest calcs, drawdowns, covenant tests and reporting, tracked and actioned automatically, so you can service loans in-house without a third-party servicer.",
};

const features = [
  {
    title: "Interest & fee calcs",
    detail:
      "Accruals, interest and fees calculated on schedule from the facility terms. No spreadsheets, no month-end scramble.",
  },
  {
    title: "Drawdowns & redemptions",
    detail:
      "Drawdown requests, repayments and redemptions tracked against the facility and reflected in the live balance.",
  },
  {
    title: "Covenant monitoring",
    detail:
      "Covenant tests scheduled from the agreement and flagged ahead of time, so nothing is missed and nothing is a surprise.",
  },
  {
    title: "Borrower & lender reporting",
    detail:
      "Reporting packs assembled from the live record, ready to send on the dates the documents require.",
  },
];

export default function Page() {
  return (
    <Sections>
      {/* Hero - full-bleed dark band with the copy. */}
      <section className="overflow-hidden bg-[#303236] bg-[radial-gradient(circle_at_85%_80%,rgba(58,90,64,0.55)_0%,rgba(48,50,54,0)_45%)] py-16 sm:py-20 lg:py-28">
        <Container>
          <Reveal>
            <h1 className="text-[clamp(2.5rem,6.4vw,4.75rem)] font-light leading-[0.94] text-[#f5f5f5]">
              Bring servicing back in-house.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-7 text-[#d6cbbf] sm:text-xl">
              Interest calcs, drawdowns, redemptions, covenant tests and
              reporting, all tracked and actioned automatically, so you can
              service loans in-house without standing up a servicing shop.
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

      {/* Servicing mock - full container width. */}
      <section>
        <Container>
          <Reveal>
            <AutomaticServicingDemo />
          </Reveal>
        </Container>
      </section>

      {/* Feature grid - the four servicing workloads. */}
      <section>
        <Container>
          <Reveal>
            <h2 className="max-w-3xl text-[clamp(2.2rem,4.9vw,4.5rem)] font-light leading-[0.9] text-[#303236]">
              The servicing desk, automated.
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-7 text-[#52555a]">
              The repetitive, exacting work of loan servicing, run from the same
              live record the deal was originated in.
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

      {/* Why in-house - the value band. */}
      <section className="bg-[#f8f7f4] py-16 sm:py-20 lg:py-28">
        <Container>
          <Reveal>
            <h2 className="max-w-4xl text-[clamp(2.1rem,4.4vw,4rem)] font-light leading-[0.92] text-[#303236]">
              Keep the margin, and the relationship.
            </h2>
            <p className="mt-7 max-w-3xl text-lg leading-7 text-[#52555a]">
              Outsourced servicing costs money and distance. It puts a third
              party between you and your borrower. When servicing runs itself on
              the deal record, you can keep it in-house: lower cost, tighter
              control, and a direct line to the people whose loans you hold.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                "No third-party servicer fees",
                "One record from origination to redemption",
                "A direct line to your borrowers",
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
        title="Service loans without the servicer."
        body="See how labrador runs interest, covenants, redemptions and reporting from one live record, automatically."
        primary={{ label: "Book a Demo", href: "/contact" }}
        secondary={{ label: "Own Your Data", href: "/product/own-your-data" }}
      />
    </Sections>
  );
}
