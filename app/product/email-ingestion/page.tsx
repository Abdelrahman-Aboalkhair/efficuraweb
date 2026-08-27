import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/Container";
import { DemoRequestLink } from "@/components/DemoRequestLink";
import { Sections } from "@/components/Sections";
import { Reveal } from "@/components/Reveal";
import { CtaPanel } from "@/components/CtaPanel";
import { EmailIngestionDemo } from "@/components/EmailIngestionDemo";

export const metadata: Metadata = {
  title: "Email Ingestion: deal origination from your inbox",
  description:
    "The labrador add-in turns an email thread into a structured deal record: borrower, asset, facility and attachments, with nothing to rekey.",
};

const steps = [
  {
    title: "Open the thread in your inbox",
    detail:
      "The labrador add-in sits in the message you're already reading. No forwarding, no leaving your inbox, no copy-paste.",
  },
  {
    title: "Effi reads borrower, asset and facility",
    detail:
      "The assistant pulls the structured detail out of the email and its attachments and shows you exactly what it found before anything is saved.",
  },
  {
    title: "It lands as a live deal record",
    detail:
      "Create a new deal or file to an existing one. The thread and every attachment arrive in the data room, structured and ready to work.",
  },
];

const features = [
  {
    title: "Create or file",
    detail:
      "Start a brand-new deal from an email, or file the message and its attachments onto a deal that's already running.",
  },
  {
    title: "Attachments to the data room",
    detail:
      "Term sheets, valuations and legals land in the deal's data room automatically, named and in the right place.",
  },
  {
    title: "Nothing rekeyed",
    detail:
      "Borrower, asset, facility and amount are read straight from the thread, so origination doesn't start with a data-entry chore.",
  },
  {
    title: "Works where you already work",
    detail:
      "The add-in lives right in your inbox. Your team keeps working where they already do and gains a system of record, without changing how they operate.",
  },
];

export default function Page() {
  return (
    <Sections>
      {/* Hero - full-bleed cream band with the copy. */}
      <section className="overflow-hidden bg-[#f8f7f4] py-16 sm:py-20 lg:py-28">
        <Container>
          <Reveal>
            <h1 className="text-[clamp(2.75rem,7vw,5rem)] font-light leading-[0.92] text-[#303236]">
              Deals start in your inbox.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-7 text-[#52555a] sm:text-xl">
              Not every deal begins as an email, but most do. The labrador
              add-in turns the thread in your inbox into a structured deal
              record (borrower, asset, facility and attachments) with nothing to
              rekey.
            </p>
            <DemoRequestLink
              href="/contact"
              location="page-cta"
              className="group mt-8 inline-flex w-fit items-center gap-2 text-base text-[#303236] underline decoration-[#c2662d] underline-offset-[7px] transition-opacity hover:opacity-80 sm:text-lg"
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

      {/* Inbox mock - full container width. */}
      <section>
        <Container>
          <Reveal>
            <EmailIngestionDemo />
          </Reveal>
        </Container>
      </section>

      {/* From thread to record - three numbered stages. */}
      <section>
        <Container>
          <div className="grid w-full gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start lg:gap-16">
            <Reveal>
              <h2 className="max-w-3xl text-[clamp(2.2rem,4.9vw,4.5rem)] font-light leading-[0.9] text-[#303236]">
                From thread to record.
              </h2>
              <p className="mt-7 max-w-2xl text-lg leading-7 text-[#52555a]">
                Origination usually starts by retyping an email into a system.
                labrador removes that step entirely: the inbox becomes the front
                door to the deal.
              </p>
            </Reveal>

            <Reveal>
              <div className="grid gap-px overflow-hidden rounded-[8px] border border-neutral-200 bg-neutral-200">
                {steps.map((step, i) => (
                  <article
                    key={step.title}
                    className="grid gap-6 bg-white p-5 sm:grid-cols-[4rem_minmax(0,1fr)] sm:p-6 lg:p-8"
                  >
                    <p className="text-[clamp(1.65rem,2vw,2.5rem)] font-light leading-none text-[#c2662d]">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <div>
                      <h3 className="text-[clamp(1.35rem,1.65vw,1.9rem)] leading-[1.08] text-[#303236]">
                        {step.title}
                      </h3>
                      <p className="mt-3 max-w-2xl text-base leading-7 text-[#52555a]">
                        {step.detail}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Feature grid. */}
      <section>
        <Container>
          <Reveal>
            <h2 className="max-w-3xl text-[clamp(2.2rem,4.9vw,4.5rem)] font-light leading-[0.9] text-[#303236]">
              Origination without the busywork.
            </h2>
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

      <CtaPanel
        title="Turn your inbox into a system of record."
        body="See how labrador captures deals the moment they arrive: straight from your inbox, structured and ready to work."
        primary={{ label: "Book a Demo", href: "/contact" }}
        secondary={{ label: "Ask Effi", href: "/product/ask-effi" }}
      />
    </Sections>
  );
}
