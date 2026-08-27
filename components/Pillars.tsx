"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/Container";
import { DemoRequestLink } from "@/components/DemoRequestLink";
import { Reveal } from "@/components/Reveal";

/**
 * Currently unmounted: built for the bottom of the home page (July 2026),
 * then pulled the same day - kept here so remounting is a one-line change
 * in app/page.tsx (`<section aria-label="The three pillars"><Pillars /></section>`).
 *
 * The three pillars - transparency, velocity, structure - drawn as a flat
 * temple facade in the carousel's warm-paper tile language: an entablature
 * carrying the homepage promise, one subtly fluted column per pillar with its
 * name reading bottom-to-top (book-spine style), a shared stylobate to stand
 * on, and a caption beneath each column.
 *
 * The facade sits on the left; the right half carries the section's heading
 * and the closing Book a Demo CTA (on phones the copy comes first, then the
 * facade). On first scroll into view the facade builds itself: the columns
 * rise into place one after another, then the beam settles on top of them.
 * MotionConfig in app/template.tsx reduces all of that to plain fades for
 * reduced-motion users.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

const pillars = [
  {
    name: "transparency",
    caption: "Every document, condition and decision is easy to follow.",
  },
  {
    name: "velocity",
    caption: "Deals move without stalling between teams.",
  },
  {
    name: "structure",
    caption: "One system of record holds the whole deal.",
  },
];

// The warm-paper treatment shared by every stone in the facade (the
// ProductShots card palette).
const stone = "border border-[#ebe7df] bg-[#f8f7f4]";

export function Pillars() {
  return (
    <Container>
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Copy: second column on desktop, first thing on phones. */}
        <Reveal className="lg:order-last">
          <h2 className="max-w-xl text-[clamp(2rem,3.4vw,3.25rem)] font-light leading-[0.95] text-zinc-900">
            The three pillars of everything we build.
          </h2>
          <p className="mt-6 max-w-md text-lg leading-7 text-zinc-600">
            Every part of labrador serves at least one of them &mdash; from
            first ask to funded loan, origination through servicing.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <DemoRequestLink
              href="/contact"
              location="pillars"
              className="inline-flex items-center rounded-full bg-[#bf6c35] px-6 py-3 text-base font-medium text-white transition-colors hover:bg-[#894d26]"
            >
              Book a Demo
            </DemoRequestLink>
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 text-base font-medium text-zinc-500 transition-colors hover:text-zinc-900"
            >
              How labrador works
              <span aria-hidden>&rarr;</span>
            </Link>
          </div>
        </Reveal>

        {/* The facade, hugging the container's left edge on desktop. */}
        <motion.div
          className="w-full max-w-xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Entablature: the thing the pillars hold up - the promise. Lands
              from above once the columns are standing. */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: -24 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, delay: 0.5, ease: EASE },
              },
            }}
            className={`${stone} rounded-[8px] px-6 py-5 sm:py-6`}
          >
            <p className="text-center text-[clamp(1.3rem,2.6vw,1.75rem)] font-light leading-tight text-zinc-900">
              real-estate debt, made simple.
            </p>
          </motion.div>

          {/* Colonnade: capital, fluted shaft with the pillar name, plinth.
              The words rotate through vertical-rl so they read bottom-to-top,
              the way a book spine does. */}
          <div className="grid grid-cols-3 justify-items-center">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.name}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.55,
                      delay: 0.05 + i * 0.12,
                      ease: EASE,
                    },
                  },
                }}
                className="flex flex-col items-center"
              >
                <div
                  aria-hidden="true"
                  className={`${stone} h-2 w-24 rounded-[3px] sm:w-28`}
                />
                <div
                  className={`${stone} flex h-64 w-20 items-center justify-center rounded-[3px] sm:h-72 sm:w-24 [background-image:repeating-linear-gradient(to_right,transparent,transparent_10px,rgba(48,50,54,0.04)_10px,rgba(48,50,54,0.04)_11px)]`}
                >
                  <h3 className="rotate-180 text-xl font-light tracking-[0.14em] text-zinc-900 [writing-mode:vertical-rl] sm:text-2xl">
                    {pillar.name}
                  </h3>
                </div>
                <div
                  aria-hidden="true"
                  className={`${stone} h-2.5 w-24 rounded-[3px] sm:w-28`}
                />
              </motion.div>
            ))}
          </div>

          {/* Stylobate: the shared step the colonnade stands on. */}
          <motion.div
            aria-hidden="true"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 0.4 } },
            }}
            className={`${stone} h-2.5 w-full rounded-[4px]`}
          />

          {/* Captions: centered under their columns from `sm` up (gapless
              grid so the tracks match the colonnade's), stacked as a list on
              phones - where each line leads with its pillar name, since a
              stacked line no longer sits under the column it describes. */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, delay: 0.7, ease: EASE },
              },
            }}
            className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-0"
          >
            {pillars.map((pillar) => (
              <p
                key={pillar.name}
                className="text-base leading-6 text-zinc-600 sm:px-3 sm:text-center"
              >
                <span className="font-medium text-zinc-900 sm:hidden">
                  {pillar.name} &mdash;{" "}
                </span>
                {pillar.caption}
              </p>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </Container>
  );
}
