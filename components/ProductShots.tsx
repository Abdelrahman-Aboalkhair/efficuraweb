"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MockScreen } from "@/components/ProductTabs";

/**
 * The product, shown as a slow full-bleed carousel: each card is a warm-paper
 * tile with a live, self-animating labrador mock cropped into it (the shot
 * bleeds off the card's bottom-right, untitled.stream-style), with the feature
 * name and a one-liner beneath. The strip drifts right-to-left on a seamless
 * loop (content doubled, so -50% is one cycle) - it keeps moving under the
 * mouse - and holds still under prefers-reduced-motion. Each card links to
 * its product page.
 */

// The mocks draw on a fixed desktop-width canvas (see MockScreen) so their
// container-query breakpoints resolve to the desktop layout at any card size.
const CANVAS_W = 1280;
const CANVAS_H = CANVAS_W * 0.625; // 16:10

// How much wider than the card the scaled canvas runs - >1 crops into the
// shot so it reads as a detail, not a thumbnail.
const ZOOM = 1.45;

// Indices match `features` in ProductTabs.
const shots: {
  index: number;
  title: string;
  caption: string;
  href: string;
  // Fractions of the scaled canvas to shift up/left, picking the card's focal
  // region. 0/0 shows the mock from its top-left.
  focusX: number;
  focusY: number;
}[] = [
  {
    index: 0,
    title: "Asset skyview",
    caption:
      "Every asset behind a facility, rendered in 3D and orbited from above, tied to the live deal.",
    href: "/product/asset-skyview",
    focusX: 0.06,
    focusY: 0,
  },
  {
    index: 1,
    title: "Email ingestion",
    caption:
      "An email thread becomes a structured deal record: borrower, asset, facility, attachments. Nothing rekeyed.",
    href: "/product/email-ingestion",
    focusX: 0.18,
    focusY: 0,
  },
  {
    index: 2,
    title: "Automatic servicing",
    caption:
      "Interest, drawdowns, covenant tests and reporting, tracked and actioned automatically, in-house.",
    href: "/product/automatic-servicing",
    focusX: 0.1,
    focusY: 0.04,
  },
  {
    index: 3,
    title: "Ask Effi",
    caption:
      "Talk to your documents. Every answer cites its source clause; every date lands on the calendar.",
    href: "/product/ask-effi",
    focusX: 0.14,
    focusY: 0.02,
  },
];

function ShotCard({
  shot,
  clone,
}: {
  shot: (typeof shots)[number];
  // The marquee renders the strip twice for a seamless loop; the second copy
  // is decorative, so keep it out of the accessibility tree and tab order.
  clone?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  // The canvas's scale into this card; null until measured (SSR/first paint).
  const [scale, setScale] = useState<number | null>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const update = () => {
      setScale((el.getBoundingClientRect().width * ZOOM) / CANVAS_W);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <Link
      href={shot.href}
      tabIndex={clone ? -1 : undefined}
      className="group block w-[min(44rem,85vw)] shrink-0 cursor-pointer"
    >
      {/* The tile: warm paper, the shot floating in from a small top/left
          margin and cropped off the bottom-right. Decorative - the real
          product pages carry the accessible detail - and pointer-inert, so
          the mock's own controls can't swallow the click or override the
          link's pointer cursor. */}
      <div
        ref={cardRef}
        aria-hidden="true"
        className="pointer-events-none relative aspect-[4/4.4] overflow-hidden rounded-[8px] border border-[#ebe7df] bg-[#f8f7f4]"
      >
        {scale !== null && (
          <div
            className="absolute overflow-hidden rounded-[6px] bg-white shadow-[0_16px_40px_-12px_rgba(48,50,54,0.35)] ring-1 ring-black/5 transition-transform duration-500 ease-out group-hover:-translate-y-1"
            style={{
              top: "9%",
              left: "8%",
              width: CANVAS_W * scale,
              height: CANVAS_H * scale * (1 - shot.focusY),
            }}
          >
            <div
              className="absolute left-0 top-0"
              style={{
                width: CANVAS_W,
                height: CANVAS_H,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                marginLeft: -CANVAS_W * scale * shot.focusX,
                marginTop: -CANVAS_H * scale * shot.focusY,
              }}
            >
              <MockScreen index={shot.index} />
            </div>
          </div>
        )}
      </div>
      <p className="mt-4 text-lg leading-6 font-normal text-black">
        {shot.title}
      </p>
      <p className="mt-2 max-w-md text-base leading-6 font-light text-neutral-600">
        {shot.caption}
      </p>
    </Link>
  );
}

export function ProductShots() {
  return (
    <div className="w-full overflow-x-clip [mask-image:linear-gradient(to_right,transparent,black_4rem,black_calc(100%_-_4rem),transparent)]">
      <div className="flex w-max animate-marquee motion-reduce:[animation-play-state:paused]">
        {[false, true].map((clone) => (
          <div
            key={clone ? "clone" : "strip"}
            aria-hidden={clone || undefined}
            className="flex shrink-0 gap-x-6 pr-6"
          >
            {shots.map((shot) => (
              <ShotCard key={shot.href} shot={shot} clone={clone} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
