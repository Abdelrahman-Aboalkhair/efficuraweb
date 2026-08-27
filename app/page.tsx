import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Hero } from "@/components/Hero";
import { ProductShots } from "@/components/ProductShots";
import { LaptopShowcase } from "@/components/LaptopShowcase";
import { Container } from "@/components/Container";
import { Sections } from "@/components/Sections";
import { Reveal } from "@/components/Reveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Real-estate debt software",
  description:
    "labrador is the first AI-native system of record for real-estate debt, connecting origination, underwriting and servicing for borrowers, operators and lenders.",
};

// The three people Labrador is built for, rendered as a row of cards: a small
// label, a real portrait in a rounded card with a corner arrow, and a caption
// carrying the promise. Portraits are free-license Pexels stock (same source
// as the /public/avatars faces), served from /public/audiences; the cards are
// 4:5 to match the source crop, so the whole person reads without an
// aggressive zoom.
const audiences = [
  {
    label: "For Borrowers",
    href: "/for-borrowers",
    image: "/audiences/borrowers.jpg",
    imageAlt: "A real-estate borrower",
    caption:
      "Move from first ask to funded loan, with every document, condition, and decision easy to follow.",
  },
  {
    label: "For Operators",
    href: "/for-operators",
    image: "/audiences/operators.jpg",
    imageAlt: "A deal operator",
    // The office scene reads brighter and busier than the two flanking
    // portraits, so it's dimmed to sit level with them in the row.
    dimmed: true,
    caption:
      "Origination through servicing, connected in one live workspace that gives velocity to execute.",
  },
  {
    label: "For Lenders",
    href: "/for-lenders",
    image: "/audiences/lenders.jpg",
    imageAlt: "A lender",
    caption:
      "Pipeline, exposure, and approvals in focus, with the context behind every dollar deployed.",
  },
];

export default function Home() {
  return (
    <Sections compact>
      {/* First screen: centered copy + email capture on plain white, with the
          laptop product shot flush beneath - one section, so no Sections gap
          separates the two. The laptop's screen plays the self-animating
          Labrador mocks on a loop; its comic shouts may spill past the
          container margins, so the section clips horizontal overflow. The
          showcase's light-grey floor carries a partner logo strip, then hands
          off into the grey audience band that follows; the page then returns
          to white for the section after it. */}
      <section className="overflow-x-clip">
        <Reveal className="w-full">
          <Hero />
        </Reveal>
        <Reveal>
          <LaptopShowcase />
        </Reveal>
        {/* Partner strip on the grey floor beneath the laptop: the Martley
            Capital wordmark, then a link into their case study. The strip's
            grey stays in normal flow so the showcase's positioned contact
            shadow paints over it and stays visible; only the inner row is
            raised, so the floor can't cover the logo where the small
            negative-margin tuck makes them overlap. */}
        <Reveal>
          <div className="-mt-3 bg-zinc-100 pb-8 sm:-mt-5 sm:pb-10">
            <Container>
              <div className="relative z-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 sm:gap-x-5">
                <a
                  href="https://www.martleycapital.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity hover:opacity-80"
                >
                  <Image
                    src="/partners/martley.svg"
                    alt="Martley Capital Group"
                    width={148}
                    height={45}
                    className="h-8 w-auto sm:h-10"
                    unoptimized
                  />
                </a>
                <span aria-hidden className="h-6 w-px bg-zinc-300 sm:h-8" />
                <Link
                  href="/martley-capital"
                  className="inline-flex items-center gap-1.5 text-sm font-normal text-zinc-500 transition-colors hover:text-zinc-900 sm:text-base"
                >
                  See case study
                  <ArrowUpRight
                    className="h-4 w-4"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </Container>
          </div>
        </Reveal>
      </section>

      {/* Audience band: the three people Labrador is built for, as a row of
          cards - label, portrait with a corner arrow, then a caption carrying
          the promise. A full-bleed grey band that runs straight out
          of the laptop's grey floor - the negative top margin eats the Sections
          gap so the two greys meet - with the page returning to white in the
          section that follows. */}
      <section className="-mt-12 bg-zinc-100 py-16 sm:-mt-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3 sm:gap-5 lg:gap-8">
            {audiences.map((audience, i) => (
              <Reveal key={audience.href} delay={i * 0.08}>
                <Link href={audience.href} className="group block">
                  <p className="text-base font-medium text-zinc-900">
                    {audience.label}
                  </p>
                  <div className="relative mt-4 aspect-[4/5] overflow-hidden rounded-xl bg-zinc-200">
                    <Image
                      src={audience.image}
                      alt={audience.imageAlt}
                      fill
                      sizes="(min-width: 640px) 33vw, 100vw"
                      className={`object-cover object-center transition-transform duration-[900ms] ease-out group-hover:scale-105 ${
                        audience.dimmed ? "brightness-[.85]" : ""
                      }`}
                    />
                    <span
                      aria-hidden
                      className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/50 bg-white/20 text-white backdrop-blur-sm transition-colors duration-300 group-hover:bg-white group-hover:text-zinc-900"
                    >
                      <ArrowRight
                        className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5"
                        strokeWidth={1.8}
                      />
                    </span>
                  </div>
                  <p className="mt-4 max-w-xs text-base leading-7 text-zinc-600">
                    {audience.caption}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* The features up close: a full-bleed carousel of cards, each with a
          live self-animating mock cropped into it and a one-liner beneath,
          drifting right-to-left and linking to its product page. */}
      <section aria-label="The product, up close">
        <Reveal>
          <ProductShots />
        </Reveal>
      </section>
    </Sections>
  );
}
