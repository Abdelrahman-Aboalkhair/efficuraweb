"use client";

import { useEffect, useRef, useState } from "react";
import { MockScreen } from "@/components/ProductTabs";

/**
 * A product-page hero shot: one of the self-animating app mocks the home
 * hero's laptop cycles through (ProductTabs), standing on its own as a
 * browser-window card and looping on that single screen. Each product page
 * wraps this with its feature's mock index and loop period (see
 * EmailIngestionDemo, AskEffiDemo).
 *
 * Sizing mirrors LaptopShowcase: the mock always draws on a fixed 1280px
 * canvas scaled down into the card, so every viewport keeps the full desktop
 * layout it was designed against - the mocks' breakpoints are container
 * queries against that canvas (see MockScreen), not the viewport.
 */

// The width the mocks were designed against (matches LaptopShowcase).
const CANVAS_W = 1280;
const SCREEN_RATIO = 0.625; // 16:10 panel, h/w

export function MockDemo({
  index,
  periodMs,
}: {
  index: number;
  periodMs: number;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  // The canvas's scale into the card; null until measured (SSR/first paint).
  const [scale, setScale] = useState<number | null>(null);
  const [loop, setLoop] = useState(0);

  // Replay the sequence by remounting the mock; reduced-motion users get a
  // single pass, left settled on the finished screen.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setLoop((n) => n + 1), periodMs);
    return () => clearInterval(id);
  }, [periodMs]);

  // Scale the fixed canvas down into the card (same width-driven approach
  // as LaptopShowcase's screen).
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const update = () => {
      setScale(el.getBoundingClientRect().width / CANVAS_W);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Decorative device shot: fictional data, nothing focusable inside.
  return (
    <div
      ref={frameRef}
      aria-hidden
      className="relative aspect-[16/10] w-full overflow-hidden rounded-[10px] border border-black/10 bg-white shadow-[0_24px_60px_-24px_rgba(48,50,54,0.45)]"
    >
      {scale === null ? (
        <div className="absolute inset-0">
          <MockScreen key={loop} index={index} />
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
          <MockScreen key={loop} index={index} />
        </div>
      )}
    </div>
  );
}
