import type { Metadata } from "next";
import { ArrowUpRight, Check, Orbit } from "lucide-react";
import { Container } from "@/components/Container";
import { DemoRequestLink } from "@/components/DemoRequestLink";
import { Sections } from "@/components/Sections";
import { Reveal } from "@/components/Reveal";
import { CtaPanel } from "@/components/CtaPanel";
import { AerialVideo } from "@/components/AerialVideo";
import CapitalStackMock, {
  type StackTranche,
} from "@/components/CapitalStackMock";

export const metadata: Metadata = {
  title: "Asset Skyview: 3D collateral visualisation",
  description:
    "Every asset behind a facility, rendered in 3D and orbited from above, so the collateral is something you can see, tied to the live deal and its capital stack.",
};

// The hero visual: the same orbiting aerial flyover the home page runs (see
// AssetMock in ProductTabs), of a real landmark that stands in for the asset,
// with the address and LTV floating over it. AerialVideo fetches signed URIs
// and degrades video → still → nothing, so the dark floor beneath is the
// no-imagery fallback and keeps the white overlay type legible either way.
function SkyviewRender() {
  return (
    // `isolate` + explicit z-layers: the capital-stack WebGL canvas elsewhere on
    // the page forces GPU compositing site-wide, which otherwise paints the
    // transform-scaled orbit *behind* an opaque container background and blanks
    // it. Own stacking context, a separate floor layer, and a GPU-promoted
    // media layer keep the render on top regardless.
    <div className="relative isolate aspect-[4/3] w-full overflow-hidden rounded-[12px] border border-white/10 shadow-[0_28px_70px_-28px_rgba(0,0,0,0.7)]">
      {/* No-imagery floor (API down / key missing): its own layer, not the
          container background, so it never occludes the orbit above it. */}
      <div className="absolute inset-0 z-0 bg-zinc-900" />

      {/* Google bakes a location pin into the crown of the footage; scaling the
          orbit up from its base pushes the crown (and the pin) past the top
          edge, where overflow-hidden clips it. The labelled pin below is ours. */}
      <AerialVideo
        orientation="landscape"
        className="absolute inset-0 z-[1] h-full w-full origin-bottom scale-[1.65] transform-gpu object-cover"
      />

      {/* Vignette so the footage sits back, then a bottom scrim under the type. */}
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.4)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 z-[2] h-1/2 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />

      <div className="pointer-events-none absolute left-4 top-4 z-[3] flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-3 py-1.5 backdrop-blur-sm">
        <Orbit className="h-3.5 w-3.5 text-[#f0b48f]" strokeWidth={2} />
        <span className="text-[11px] font-medium text-white">3D · Aerial</span>
      </div>

      <div className="pointer-events-none absolute inset-x-4 bottom-4 z-[3] flex items-end justify-between gap-3">
        <div>
          <p className="text-lg font-semibold leading-tight text-white">
            Salesforce Tower
          </p>
          <p className="mt-0.5 text-[11px] text-white/60">
            415 Mission St, San Francisco
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-wide text-white/50">
            LTV
          </p>
          <p className="text-base font-semibold text-[#f0b48f]">61%</p>
        </div>
      </div>
    </div>
  );
}

// The capital stack, top → bottom (equity → senior), for the 3D tower - three
// shades of the page's copper so the slabs read as one material family.
const tranches: StackTranche[] = [
  { fraction: 0.25, percent: "25%", name: "Equity", color: "#d8956a" },
  { fraction: 0.15, percent: "15%", name: "Mezzanine", color: "#c2662d" },
  { fraction: 0.6, percent: "60%", name: "Senior", color: "#7f3f20" },
];

const features = [
  {
    title: "Real aerial imagery",
    items: [
      "Actual footage of the property",
      "Orbited from above, not a flat map pin",
      "The asset you're lending against, on screen",
    ],
  },
  {
    title: "Tied to the live deal",
    items: [
      "Sits on the deal record itself",
      "Beside the facility, terms and capital stack",
      "Your position in the structure, in context",
    ],
  },
  {
    title: "Location & footprint",
    items: [
      "Address and site on the record",
      "Context on what surrounds the asset",
      "One shared view for the whole deal team",
    ],
  },
];

export default function Page() {
  return (
    <Sections>
      {/* Hero - dark panel with a copper glow, the spinning tower on the right. */}
      <section className="overflow-hidden bg-[#303236] bg-[radial-gradient(circle_at_82%_20%,rgba(230,84,22,0.5)_0%,rgba(48,50,54,0)_45%)] py-16 sm:py-20 lg:py-28">
        <Container>
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-16">
              <div>
                <h1 className="text-[clamp(2.75rem,7vw,5rem)] font-light leading-[0.92] text-[#f5f5f5]">
                  Every asset, rendered in 3D.
                </h1>
                <p className="mt-7 max-w-xl text-lg leading-7 text-[#d6cbbf] sm:text-xl">
                  The property behind every facility, rendered in 3D and orbited
                  from above, so the collateral is something you can see, tied
                  to the live deal and its capital stack.
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
              </div>
              {/* w-full, not justify-self-end: the render's layers are all
                    absolutely positioned, so the panel has no intrinsic width -
                    a fit-content grid item collapses it to nothing. Stretch the
                    item and let aspect-[4/3] set the height (same idiom as the
                    email-ingestion hero). */}
              <div className="w-full">
                <SkyviewRender />
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* What you get - three feature cards in the flow-column idiom. */}
      <section>
        <Container>
          <div className="grid w-full gap-10 lg:grid-cols-[minmax(18rem,0.7fr)_minmax(0,1.3fr)] lg:items-start lg:gap-16">
            <Reveal>
              <h2 className="max-w-3xl text-[clamp(2.1rem,4.4vw,4.5rem)] font-light leading-[0.92] text-[#303236]">
                See the asset, not just the address.
              </h2>
              <p className="mt-7 max-w-2xl text-base leading-7 text-[#52555a]">
                A facility is only as good as the asset behind it. Skyview puts
                that asset (rendered, located and capitalised) at the centre of
                the deal.
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

      {/* Capital stack band - the real 3D tower widget, the render's structural
          companion. Kept on the light band so its leader lines and labels read. */}
      <section className="bg-[#f8f7f4] py-16 sm:py-20 lg:py-28">
        <Container>
          <div className="grid w-full gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
            <Reveal>
              <h2 className="max-w-2xl text-[clamp(2.1rem,4.4vw,4rem)] font-light leading-[0.92] text-[#303236]">
                The whole capital stack, at a glance.
              </h2>
              <p className="mt-7 max-w-2xl text-lg leading-7 text-[#52555a]">
                Alongside the render, Skyview shows how the deal is capitalised:
                senior, mezzanine and equity stacked in proportion, so your
                position in the structure is never in doubt.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-[340px] w-full sm:h-[420px]">
                <CapitalStackMock tranches={tranches} />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <CtaPanel
        flush
        title="Put the asset at the centre of the deal."
        body="See how Skyview renders the collateral behind every facility: in 3D, in context, and tied to the live record."
        primary={{ label: "Book a Demo", href: "/contact" }}
        secondary={{
          label: "Email Ingestion",
          href: "/product/email-ingestion",
        }}
      />
    </Sections>
  );
}
