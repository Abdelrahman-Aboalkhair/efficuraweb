import type { Metadata } from "next";
import { ArrowUpRight, Check } from "lucide-react";
import { Container } from "@/components/Container";
import { DemoRequestLink } from "@/components/DemoRequestLink";
import { Sections } from "@/components/Sections";
import { Reveal } from "@/components/Reveal";
import { CtaPanel } from "@/components/CtaPanel";
import { InvestorManagementDemo } from "@/components/InvestorManagementDemo";

export const metadata: Metadata = {
  title: "Investor Management: LP register & portal",
  description:
    "Contacts, accounts and holdings in one LP register, a fundraising pipeline from introduction to funded, and a portal showing each investor only what is theirs.",
};

const features = [
  {
    title: "Contacts & accounts",
    detail:
      "A single view of each investor, whether they hold in a personal name, through a company vehicle or via a family office. Holdings roll up across accounts, so the whole relationship reads from one page.",
  },
  {
    title: "The raise, tracked",
    detail:
      "Offerings with a target, and a running list of prospects from first introduction to funded. Expected amounts by stage show how much has been committed and how much remains to be raised.",
  },
  {
    title: "Data rooms that report back",
    detail:
      "Share a curated document set with a prospect and see who viewed and downloaded each document, and when. Sharing a data room automatically records the prospect against the raise.",
  },
  {
    title: "The investor portal",
    detail:
      "Each LP sees their own portfolio, statements, notices and documents, and can generate their own report on demand. They see only what has been shared with them, never another investor's positions.",
  },
];

export default function Page() {
  return (
    <Sections>
      {/* Hero: full-bleed dark band with the copy. */}
      <section className="overflow-hidden bg-[#303236] bg-[radial-gradient(circle_at_85%_15%,rgba(58,90,64,0.55)_0%,rgba(48,50,54,0)_45%)] py-16 sm:py-20 lg:py-28">
        <Container>
          <Reveal>
            <h1 className="text-[clamp(2.5rem,6.4vw,4.75rem)] font-light leading-[0.94] text-[#f5f5f5]">
              Every LP. Every position.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-7 text-[#d6cbbf] sm:text-xl">
              Contacts, accounts and holdings in one register: commitments,
              capital in and current value for every investor, with a portal
              that shows each LP only what is theirs.
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

      {/* The record itself: an LP's account and its portfolio report,
          loading in - full container width, like the other product pages'
          demos. */}
      <section>
        <Container>
          <Reveal>
            <InvestorManagementDemo />
          </Reveal>
        </Container>
      </section>

      {/* Feature grid: the relationship record end to end. */}
      <section>
        <Container>
          <Reveal>
            <h2 className="max-w-3xl text-[clamp(2.2rem,4.9vw,4.5rem)] font-light leading-[0.9] text-[#303236]">
              The whole relationship, on the record.
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-7 text-[#52555a]">
              From the first meeting to the raise, the commitment, and every
              statement after: one record per investor, rather than a trail of
              spreadsheets.
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

      {/* Email intelligence: the inbox-to-record band. */}
      <section className="bg-[#f8f7f4] py-16 sm:py-20 lg:py-28">
        <Container>
          <Reveal>
            <h2 className="max-w-4xl text-[clamp(2.1rem,4.4vw,4rem)] font-light leading-[0.92] text-[#303236]">
              The inbox does the filing.
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-7 text-[#52555a]">
              Investor decisions happen in email: commitments, wire
              confirmations and changes of bank details. labrador reads the
              thread and proposes the corresponding change, with the evidence
              alongside; your team accepts, edits or dismisses it. The work
              becomes deciding, not re-typing.
            </p>
            <div className="mt-8 space-y-3">
              {[
                "Proposals quote the exact sentence from the email",
                "Bank-detail changes are flagged for review, never applied automatically",
                "Every accepted change retains its source email",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 text-base leading-6 text-[#303236]"
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
        title="One record for every investor."
        body="See how labrador keeps contacts, accounts and positions current, and how the portal shows each LP only what is theirs."
        primary={{ label: "Book a Demo", href: "/contact" }}
        secondary={{
          label: "Fund Administration",
          href: "/product/fund-administration",
        }}
      />
    </Sections>
  );
}
