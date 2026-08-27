import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Container } from "@/components/Container";
import { CtaPanel } from "@/components/CtaPanel";
import { DemoRequestLink } from "@/components/DemoRequestLink";
import { flushSectionClassName, Sections } from "@/components/Sections";
import { Reveal } from "@/components/Reveal";

/**
 * The audience detail page from efficura.com (/for-borrowers, /for-operators,
 * /for-lenders), rebuilt on this site's layout primitives: coloured bands run
 * the full viewport width with their content on the Container grid, and
 * <Sections> owns the vertical rhythm. Each route supplies its copy as an
 * AudiencePageData object and renders <AudiencePage>.
 */

export type AudienceFlowColumn = {
  label: string;
  title: string;
  items: string[];
};

export type AudienceWorkflowStep = { title: string; detail: string };

export type AudienceFaq = { question: string; answer: string };

export type AudienceCaseStudyCta = {
  title: string;
  href: string;
  linkLabel: string;
};

export type AudiencePageData = {
  title: string;
  intro: string;
  /** The live site's hero gradient for this audience, kept verbatim. Also
      backs the closing CtaPanel, so the sign-off echoes the hero. */
  heroBackgroundClassName: string;
  /** Text colour over the hero gradient (the lenders gradient runs light in
      its top-left at small sizes, so it switches colour per breakpoint). */
  heroTextClassName: string;
  roles: string[];
  flowColumns: AudienceFlowColumn[];
  workflowTitle: string;
  workflowIntro: string;
  securityItems?: string[];
  caseStudyCta?: AudienceCaseStudyCta;
  workflowSteps: AudienceWorkflowStep[];
  faqs: AudienceFaq[];
};

// The platform's standard governance list, shared by every audience page.
const defaultSecurityItems = [
  "Client-owned data model",
  "Azure-ready deployment path",
  "Fine-grained access controls",
  "Audit trail across decisions",
  "Document-level permissions",
  "No training on client data",
];

export function AudiencePage({ page }: { page: AudiencePageData }) {
  const securityItems = page.securityItems ?? defaultSecurityItems;

  return (
    <Sections>
      {/* Hero - a full-bleed gradient band at the tall viewport-relative
          scale of the careers role hero. Content stays bottom-anchored so it
          lands in the gradient's darker lower region, which is what the
          per-audience heroTextClassName colours assume. */}
      <section
        className={`flex min-h-[60svh] flex-col justify-end overflow-hidden py-10 sm:min-h-[68svh] sm:py-14 lg:py-16 ${page.heroBackgroundClassName}`}
      >
        <Container>
          <Reveal>
            <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(19rem,0.95fr)] lg:items-end lg:gap-16">
              <h1
                className={`text-[clamp(3rem,12vw,4.75rem)] font-light leading-[0.92] sm:text-[clamp(3.75rem,7.5vw,7.5rem)] sm:leading-[0.9] ${page.heroTextClassName}`}
              >
                {page.title}
              </h1>
              <div className="max-w-2xl lg:justify-self-end">
                <p
                  className={`text-[clamp(1.3rem,5vw,1.85rem)] leading-[1.12] sm:text-[clamp(1.5rem,2.2vw,2.5rem)] sm:leading-[1.08] ${page.heroTextClassName}`}
                >
                  {page.intro}
                </p>
                <DemoRequestLink
                  href="/contact"
                  location="hero"
                  className={`group mt-7 inline-flex w-fit items-center gap-2 text-base underline decoration-current underline-offset-[7px] transition-opacity hover:opacity-80 sm:text-lg ${page.heroTextClassName}`}
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

      {/* The workflow at a glance - warm muted band with three cards tracing
          the record: what goes in, what it holds, what comes back. Runs flush
          out of the hero gradient above it. */}
      <section
        className={`bg-[#f8f7f4] py-16 sm:py-20 lg:py-28 ${flushSectionClassName}`}
      >
        <Container>
          <div className="grid w-full gap-10 lg:grid-cols-[minmax(18rem,0.7fr)_minmax(0,1.3fr)] lg:items-start lg:gap-16">
            <Reveal>
              <h2 className="max-w-3xl text-[clamp(2.1rem,4.4vw,4.5rem)] font-light leading-[0.92] text-[#303236]">
                Built around the real workflow.
              </h2>
              <p className="mt-7 max-w-2xl text-base leading-7 text-[#52555a]">
                labrador connects the people, documents, decisions, and updates
                that usually drift across tools.
              </p>
            </Reveal>
            <div className="grid gap-4 lg:grid-cols-3 lg:gap-5">
              {page.flowColumns.map((column, i) => (
                <Reveal key={column.label} delay={i * 0.08} className="h-full">
                  <article className="flex h-full min-h-[17rem] flex-col justify-between rounded-[8px] border border-neutral-200 bg-white p-5 shadow-[0_1px_0_rgba(0,0,0,0.04)] sm:min-h-80 sm:p-6">
                    <h3 className="text-[clamp(1.35rem,1.55vw,1.8rem)] leading-[1.08] text-[#303236]">
                      {column.title}
                    </h3>
                    <div className="mt-8 space-y-3 sm:mt-10">
                      {column.items.map((item) => (
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

      {/* The credit process, step by step - role chips on the left, the four
          numbered stages of this audience's journey on the right. */}
      <section>
        <Container>
          <div className="grid w-full gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start lg:gap-16">
            <Reveal>
              <h2 className="max-w-4xl text-[clamp(2.2rem,4.9vw,5rem)] font-light leading-[0.9] text-[#303236]">
                {page.workflowTitle}
              </h2>
              <p className="mt-7 max-w-2xl text-lg leading-7 text-[#52555a]">
                {page.workflowIntro}
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {page.roles.map((role) => (
                  <span
                    key={role}
                    className="rounded-full border border-[#ded8cf] bg-[#f8f7f4] px-4 py-2 text-sm leading-5 text-[#303236]"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <div className="grid gap-px overflow-hidden rounded-[8px] border border-neutral-200 bg-neutral-200">
                {page.workflowSteps.map((step, i) => (
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

      {/* Security - the dark governance band. */}
      <section className="bg-[#303236] py-16 text-white sm:py-20 lg:py-28">
        <Container>
          <div className="grid w-full gap-12 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-16">
            <Reveal>
              <h2 className="max-w-4xl text-[clamp(2.3rem,5vw,5rem)] font-light leading-[0.9] text-white">
                Enterprise-grade control.
              </h2>
              <p className="mt-7 max-w-2xl text-lg leading-7 text-[#d6cbbf]">
                Keep sensitive borrower, lender, and asset data governed inside
                a clear operating model.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="grid gap-3 sm:grid-cols-2">
                {securityItems.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-[8px] border border-white/10 bg-white/8 p-4 text-base leading-6 text-white"
                  >
                    <Check
                      className="h-5 w-5 shrink-0 text-[#d6cbbf]"
                      strokeWidth={1.8}
                    />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Case-study strip - the slim orange gradient banner the live site
          shows between security and FAQs (operators only for now). */}
      {page.caseStudyCta ? (
        <section>
          <Reveal>
            <div className="overflow-hidden border-y border-[#303236]/20 bg-[#e65416] bg-[linear-gradient(95deg,#e65416_0%,#c2662d_56%,#f0b48f_100%)] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.24),inset_0_-1px_0_rgba(0,0,0,0.18)]">
              <Link
                href={page.caseStudyCta.href}
                className="group block w-full py-3 text-white transition-colors hover:bg-white/10 sm:py-4"
              >
                <Container className="flex items-center justify-between gap-4">
                  <span className="min-w-0 flex-1 text-xs leading-[1.25] text-white drop-shadow-[0_1px_10px_rgba(48,50,54,0.22)] sm:text-sm lg:text-base">
                    {page.caseStudyCta.title}
                  </span>
                  <span className="inline-flex shrink-0 items-center justify-between gap-3 rounded-[6px] border border-[#303236] bg-[#303236] p-2 text-sm leading-none text-white shadow-[0_8px_22px_rgba(48,50,54,0.22)] transition-colors duration-300 group-hover:border-black group-hover:bg-black sm:px-3 sm:py-2 lg:min-w-48">
                    <span className="sr-only sm:not-sr-only">
                      {page.caseStudyCta.linkLabel}
                    </span>
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white text-[#303236] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      <ArrowUpRight
                        className="h-4 w-4"
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </span>
                  </span>
                </Container>
              </Link>
            </div>
          </Reveal>
        </section>
      ) : null}

      {/* FAQs - native details/summary accordions, no client JS needed. */}
      <section>
        <Container>
          <div className="grid w-full gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-start lg:gap-16">
            <Reveal>
              <h2 className="max-w-3xl text-[clamp(2.2rem,4.9vw,5rem)] font-light leading-[0.9] text-[#303236]">
                Find answers.
              </h2>
            </Reveal>
            <Reveal>
              <div className="divide-y divide-neutral-200 border-y border-neutral-200">
                {page.faqs.map((faq) => (
                  <details key={faq.question} className="group py-6">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-xl leading-7 text-[#303236]">
                      {faq.question}
                      <span className="text-[#c2662d] transition-transform group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mt-4 max-w-3xl text-base leading-7 text-[#52555a]">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Sign-off - the shared dark CtaPanel, echoing this audience's hero
          glow so the page closes the way it opened. */}
      <CtaPanel
        title="Build a clearer real-estate debt workflow around your team."
        primary={{ label: "book a demo", href: "/contact" }}
        location="signoff"
        backgroundClassName={page.heroBackgroundClassName}
      />
    </Sections>
  );
}
