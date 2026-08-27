import type { Metadata } from "next";
import {
  ArrowUpRight,
  Check,
  Cloud,
  KeyRound,
  Database,
  FileText,
  Receipt,
} from "lucide-react";
import { Container } from "@/components/Container";
import { DemoRequestLink } from "@/components/DemoRequestLink";
import { Sections } from "@/components/Sections";
import { Reveal } from "@/components/Reveal";
import { CtaPanel } from "@/components/CtaPanel";

export const metadata: Metadata = {
  title: "Own Your Data: labrador in your Azure tenant",
  description:
    "labrador deploys into your own Azure tenant, so deal data never leaves your environment. efficura runs on infrastructure you already own and control.",
};

// Architecture mock: the Labrador layer running on top of data stores that sit
// entirely inside the client's own Azure tenant.
function TenantMock() {
  const stores = [
    { icon: Database, label: "Deals & facilities" },
    { icon: FileText, label: "Documents & data room" },
    { icon: Receipt, label: "Servicing ledger" },
  ];
  return (
    <div className="w-full rounded-[12px] border border-black/10 bg-white p-4 shadow-[0_24px_60px_-24px_rgba(48,50,54,0.4)] sm:p-5">
      {/* The tenant boundary. */}
      <div className="relative rounded-[10px] border-2 border-dashed border-[#0a5ad4]/40 bg-[#f5f8ff] p-4 pt-9 sm:p-5 sm:pt-10">
        <div className="absolute left-3 top-2.5 inline-flex items-center gap-1.5">
          <Cloud className="h-4 w-4 text-[#0a5ad4]" strokeWidth={2} />
          <span className="text-[11px] font-semibold text-[#0a5ad4]">
            Your Azure tenant
          </span>
        </div>
        <span className="absolute right-3 top-2.5 inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 ring-1 ring-[#0a5ad4]/20">
          <KeyRound className="h-3 w-3 text-[#0a5ad4]" strokeWidth={2} />
          <span className="text-[10px] font-medium text-[#0a5ad4]">
            You hold the keys
          </span>
        </span>

        {/* Labrador app layer, on top. */}
        <div className="flex items-center gap-2 rounded-[8px] bg-[#303236] px-3.5 py-2.5">
          <span className="flex h-6 w-6 items-center justify-center rounded-[5px] bg-[#c2662d] text-[11px] font-bold text-white">
            L
          </span>
          <span className="text-[12px] font-semibold text-white">labrador</span>
          <span className="ml-auto text-[10px] text-white/50">app layer</span>
        </div>

        {/* Connectors. */}
        <div className="flex justify-around px-6">
          <span className="h-4 w-px bg-[#0a5ad4]/30" />
          <span className="h-4 w-px bg-[#0a5ad4]/30" />
          <span className="h-4 w-px bg-[#0a5ad4]/30" />
        </div>

        {/* Data stores, inside the boundary. */}
        <div className="grid grid-cols-3 gap-2">
          {stores.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="flex flex-col items-center gap-1.5 rounded-[8px] border border-zinc-200 bg-white px-2 py-3 text-center"
              >
                <Icon className="h-4 w-4 text-[#303236]" strokeWidth={1.8} />
                <span className="text-[10px] font-medium leading-tight text-[#52555a]">
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <p className="mt-3 text-center text-[11px] text-zinc-400">
        Data stays inside your environment. efficura operates on top.
      </p>
    </div>
  );
}

const features = [
  {
    title: "Your infrastructure",
    items: [
      "Deploys into your own Azure tenant",
      "Runs on infrastructure you already own",
      "Data residency stays in your control",
    ],
  },
  {
    title: "You hold the keys",
    items: [
      "Client-owned data model",
      "Your identity, your access policies",
      "efficura never takes custody of the data",
    ],
  },
  {
    title: "No lock-in",
    items: [
      "Your data is yours to export, anytime",
      "Open, structured, portable record",
      "Nothing held hostage in a black box",
    ],
  },
];

export default function Page() {
  return (
    <Sections>
      {/* Hero - cream panel, architecture diagram on the right. */}
      <section className="overflow-hidden bg-[#f8f7f4] py-16 sm:py-20 lg:py-28">
        <Container>
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
              <div>
                <h1 className="text-[clamp(2.75rem,7vw,5rem)] font-light leading-[0.92] text-[#303236]">
                  Own your data.
                </h1>
                <p className="mt-7 max-w-xl text-lg leading-7 text-[#52555a] sm:text-xl">
                  labrador deploys into your own Azure tenant. Your deal data
                  never leaves your environment: efficura operates on top of
                  infrastructure you already own and control.
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
              </div>
              <div className="mx-auto w-full max-w-md lg:justify-self-end">
                <TenantMock />
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Feature cards. */}
      <section>
        <Container>
          <div className="grid w-full gap-10 lg:grid-cols-[minmax(18rem,0.7fr)_minmax(0,1.3fr)] lg:items-start lg:gap-16">
            <Reveal>
              <h2 className="max-w-3xl text-[clamp(2.1rem,4.4vw,4.5rem)] font-light leading-[0.92] text-[#303236]">
                Built on the infrastructure you already trust.
              </h2>
              <p className="mt-7 max-w-2xl text-base leading-7 text-[#52555a]">
                Most tools ask you to hand your most sensitive data to a
                third-party cloud. labrador does the opposite: it runs inside
                your walls.
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

      {/* Dark band - the AI governance promise. */}
      <section className="bg-[#303236] py-16 text-white sm:py-20 lg:py-28">
        <Container>
          <Reveal>
            <h2 className="max-w-4xl text-[clamp(2.1rem,4.6vw,4.5rem)] font-light leading-[0.92] text-white">
              Your data never trains our models.
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-7 text-[#d6cbbf]">
              Because everything runs in your tenant, your deals, documents and
              borrowers stay yours. Nothing is pooled, nothing is sold, and
              nothing is used to train a shared model. The intelligence works
              for you, on data that stays with you.
            </p>
          </Reveal>
        </Container>
      </section>

      <CtaPanel
        flush
        title="Keep your data where it belongs."
        body="See how labrador runs inside your own Azure tenant: the system of record you own, end to end."
        primary={{ label: "Book a Demo", href: "/contact" }}
      />
    </Sections>
  );
}
