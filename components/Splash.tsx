"use client";

import { type ReactNode, useRef } from "react";
import Image from "next/image";
import { PenStage } from "@/components/PenStage";
import floorplan from "@/public/floorplan.png";

/**
 * Above-the-fold hero wrapper for pages that open on the notebook-grid splash:
 * a light ruled field with a blueprint accent and the draggable 3D pen
 * floating on top. Used by /loans. The column is full-height (viewport minus
 * the header); the page centres its hero in the flexible space.
 */

// The notebook grid: a light field ruled with slightly darker grey lines.
const gridStyle = {
  backgroundColor: "#f6f6f8",
  backgroundImage:
    "linear-gradient(to right, #e8e8ec 1px, transparent 1px), linear-gradient(to bottom, #e8e8ec 1px, transparent 1px)",
  backgroundSize: "72px 72px",
} as const;

const shell =
  "relative isolate flex flex-col min-h-[calc(100dvh-4rem)] pb-12 sm:pb-16 md:min-h-[calc(100dvh-6rem)]";

export function Splash({ children }: { children: ReactNode }) {
  // The whole splash is r3f's event source: the pen canvas is painted on top
  // but pointer-transparent, so drags are picked up here while the CTAs
  // beneath stay clickable.
  const rootRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={rootRef} className={`${shell} overflow-hidden`}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={gridStyle}
      />

      {/* Floor plan accent: a faint blueprint tucked into the bottom-right corner,
          angled 45°, behind the pen and content. */}
      <Image
        aria-hidden
        alt=""
        src={floorplan}
        sizes="(max-width: 1024px) 95vw, 64rem"
        className="pointer-events-none absolute -bottom-[44rem] -right-32 -z-10 w-[64rem] max-w-[95vw] -rotate-45 opacity-25 mix-blend-multiply"
      />

      {/* The 3D pen stage, painted on TOP (z-40) so the pen floats above the
          headline and CTAs. The layer is pointer-transparent; r3f listens for
          drags on the splash root (`eventSource={rootRef}`) so the pen stays
          draggable while the CTAs beneath remain clickable. */}
      <div className="pointer-events-none absolute inset-0 z-40">
        <PenStage eventSource={rootRef} />
      </div>

      {/* Content layer beneath the pen. Pointer-transparent so open areas grab
          the pen; the hero CTAs opt back in with `pointer-events-auto`. */}
      <div className="pointer-events-none relative flex flex-1 flex-col">
        {children}
      </div>
    </div>
  );
}
