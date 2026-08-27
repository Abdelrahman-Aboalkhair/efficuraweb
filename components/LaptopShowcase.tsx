"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/Container";
import { MOCK_COUNT, MockScreen } from "@/components/ProductTabs";

/**
 * The hero's product shot: a CSS-drawn modern MacBook (slim dark bezel, thin
 * aluminium deck - no photo asset, so it's crisp at any DPI) whose screen
 * plays the live Labrador mocks on a loop. The section clips any viewport
 * overflow.
 * viewport overflow.
 */

// Frame geometry, as fractions of the laptop's total width.
const LID_W = 0.84; // lid width (deck is the full width)
const BEZEL = 0.011; // bezel thickness
const SCREEN_RATIO = 0.625; // 16:10 panel, h/w
const DECK_H = 0.026; // deck height

// The mocks always draw on a fixed desktop-width canvas that gets scaled
// down into the screen rect, so every viewport - phones included - sees the
// same full desktop screen, just smaller. Their internal breakpoint styles
// are container queries against this canvas (see MockScreen), so the
// desktop layout holds even when the viewport is a phone.
const CANVAS_W = 1280;

export function LaptopShowcase({ periodMs = 6500 }: { periodMs?: number }) {
  const laptopRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  // The canvas's scale into the panel; null until measured (SSR/first paint).
  const [scale, setScale] = useState<number | null>(null);

  // Cycle the screens; reduced-motion users get the first mock pinned
  // (AerialVideo already degrades to a still for them).
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(
      () => setActive((a) => (a + 1) % MOCK_COUNT),
      periodMs,
    );
    return () => clearInterval(id);
  }, [periodMs]);

  // The mock canvas's scale, from the laptop's laid-out width. Width-driven
  // only - the laptop's width never depends on its own content, so this
  // can't feed back into layout.
  useEffect(() => {
    const el = laptopRef.current;
    if (!el) return;
    const update = () => {
      const screenW = el.getBoundingClientRect().width * (LID_W - 2 * BEZEL);
      setScale(screenW / CANVAS_W);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Decorative device shot: fictional data, nothing focusable inside.
  return (
    <div className="relative pb-14 sm:pb-20">
      {/* Full-bleed grey floor behind the laptop's lower third, so the
          device reads as sitting in the world rather than floating. */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 top-2/3 bg-zinc-100"
      />
      <Container className="relative">
        <div
          ref={laptopRef}
          aria-hidden
          className="laptop-showcase-frame relative mx-auto w-full max-w-[70rem]"
        >
          {/* Contact shadow: a soft blurred ellipse on the grey floor
              directly beneath the deck, so the laptop reads as resting on
              the surface rather than floating above it. First child, so the
              device paints on top of it. */}
          <div className="absolute -inset-x-[2%] bottom-0 h-8 translate-y-1/2 rounded-[50%] bg-zinc-950/25 blur-2xl sm:h-11" />
          {/* Lid: slim near-black bezel around the panel. */}
          <div
            className="relative mx-auto rounded-t-[0.9rem] rounded-b-[0.35rem] bg-[#0e0e11] shadow-[0_30px_60px_-24px_rgba(24,24,27,0.45)] ring-1 ring-black/20"
            style={{
              width: `${LID_W * 100}%`,
              // % padding resolves against the parent's width (the laptop),
              // so this is the BEZEL fraction directly - and it's uniform on
              // all four sides for the same reason.
              padding: `${BEZEL * 100}%`,
            }}
          >
            {/* Camera dot, barely-there in the top bezel. */}
            <div
              className="absolute left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-[#26282c]"
              style={{ top: "0.9%" }}
            />
            {/* The panel. The live mock draws on the fixed desktop canvas
                and is scaled down to fit (see CANVAS_W). */}
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[0.45rem] bg-white">
              {scale === null ? (
                <div className="absolute inset-0">
                  <MockScreen index={active} />
                </div>
              ) : (
                <div
                  className="absolute left-0 top-0"
                  style={{
                    width: CANVAS_W,
                    height: CANVAS_W * SCREEN_RATIO,
                    transform: `scale(${scale})`,
                    transformOrigin: "top left",
                  }}
                >
                  <MockScreen index={active} />
                </div>
              )}
            </div>
          </div>
          {/* Deck: thin aluminium base, full width, with the thumb notch. */}
          <div
            className="relative w-full rounded-b-[0.8rem] bg-gradient-to-b from-[#eceded] via-[#d4d5d7] to-[#9fa1a4] shadow-[0_24px_48px_-20px_rgba(24,24,27,0.5)]"
            style={{ aspectRatio: `1 / ${DECK_H}` }}
          >
            {/* Hinge shading where the lid meets the deck. */}
            <div className="absolute inset-x-[7%] top-0 h-px bg-black/25" />
            <div className="absolute left-1/2 top-0 h-[45%] w-[11%] -translate-x-1/2 rounded-b-full bg-gradient-to-b from-[#aeb0b3] to-[#d8d9db]" />
          </div>
        </div>
      </Container>

    </div>
  );
}
