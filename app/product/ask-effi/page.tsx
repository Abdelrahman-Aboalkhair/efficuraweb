import type { Metadata } from "next";
import { ArrowUpRight, Check } from "lucide-react";
import { Container } from "@/components/Container";
import { DemoRequestLink } from "@/components/DemoRequestLink";
import { Sections } from "@/components/Sections";
import { Reveal } from "@/components/Reveal";
import { CtaPanel } from "@/components/CtaPanel";
import { AskEffiDemo } from "@/components/AskEffiDemo";

export const metadata: Metadata = {
  title: "Ask Effi: AI assistant for credit documents",
  description:
    "Ask in plain English and get answers grounded in the deal's documents. Every answer cites its source clause, with covenant dates on your calendar.",
};

const features = [
  {
    title: "Grounded in your documents",
    items: [
      "Answers read from the actual facility agreement",
      "Every answer cites its source clause",
      "No guesswork, no invented terms",
    ],
  },
  {
    title: "Dates, automatically",
    items: [
      "Covenant tests and reporting dates extracted",
      "Lifted straight onto the deal calendar",
      "Nothing diarised by hand",
    ],
  },
  {
    title: "Ask in plain English",
    items: [
      "Query a deal the way you'd ask a colleague",
      "Works across the whole data room",
      "Answers scoped to the deal you're in",
    ],
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
              Talk to your documents.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-7 text-[#52555a] sm:text-xl">
              Effi is labrador&apos;s assistant. Ask a question in plain
              English and get an answer grounded in the deal&apos;s documents,
              with covenant and reporting dates already on your calendar.
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

      {/* Document-chat mock - full container width. */}
      <section>
        <Container>
          <Reveal>
            <AskEffiDemo />
          </Reveal>
        </Container>
      </section>

      {/* Feature cards. */}
      <section>
        <Container>
          <div className="grid w-full gap-10 lg:grid-cols-[minmax(18rem,0.7fr)_minmax(0,1.3fr)] lg:items-start lg:gap-16">
            <Reveal>
              <h2 className="max-w-3xl text-[clamp(2.1rem,4.4vw,4.5rem)] font-light leading-[0.92] text-[#303236]">
                An assistant that has read the file.
              </h2>
              <p className="mt-7 max-w-2xl text-base leading-7 text-[#52555a]">
                Effi doesn&apos;t answer from the internet. It answers from your
                deal (the agreements, the amendments, the reporting) and shows
                you where each answer came from.
              </p>
            </Reveal>
            <div className="grid gap-4 lg:grid-cols-3 lg:gap-5">
              {features.map((f, i) => (
                <Reveal key={f.title} delay={i * 0.08} className="h-full">
                  <article className="flex h-full min-h-[17rem] flex-col justify-between rounded-[8px] border border-neutral-200 bg-white p-5 shadow-[0_1px_0_rgba(0,0,0,0.04)] sm:min-h-80 sm:p-6">
                    <div>
                      <h3 className="text-[clamp(1.35rem,1.55vw,1.8rem)] leading-[1.08] text-[#303236]">
                        {f.title}
                      </h3>
                    </div>
                    <div className="mt-8 space-y-3 sm:mt-10">
                      {f.items.map((item) => (
                        <div
                          key={item}
                          className="flex items-start gap-3 text-sm leading-5 text-[#52555a]"
                        >
                          <Check
                            className="mt-0.5 h-4 w-4 shrink-0 text-[#c2662d]"
                            strokeWidth={1.9}
                          />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Dark band - the trust point about citations. */}
      <section className="bg-[#303236] py-16 text-white sm:py-20 lg:py-28">
        <Container>
          <Reveal>
            <h2 className="max-w-4xl text-[clamp(2.1rem,4.6vw,4.5rem)] font-light leading-[0.92] text-white">
              Every answer, with a citation.
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-7 text-[#d6cbbf]">
              In credit, an answer you can&apos;t check isn&apos;t worth much.
              Effi links every response back to the clause, document and deal it
              came from, so you can trust it, and prove it.
            </p>
          </Reveal>
        </Container>
      </section>

      <CtaPanel
        flush
        title="Give your team an analyst that never sleeps."
        body="See how Effi turns a data room into something you can simply ask: grounded, cited, and always current."
        primary={{ label: "Book a Demo", href: "/contact" }}
        secondary={{
          label: "Automatic Servicing",
          href: "/product/automatic-servicing",
        }}
      />
    </Sections>
  );
}
