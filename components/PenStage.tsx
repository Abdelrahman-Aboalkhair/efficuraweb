"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type RefObject } from "react";

/**
 * Client-only mount point for the 3D pen.
 *
 * Two jobs:
 *   1. Lazy-load the heavy three.js scene with `ssr: false` (only legal inside a
 *      Client Component) so it never runs on the server and is split into its
 *      own chunk that loads after first paint.
 *   2. Gate it: the scene only mounts on wide viewports with motion allowed, so
 *      phones and reduced-motion users never download or run it. Below `lg` the
 *      hero simply has no pen - the headline stands on its own.
 */
const PenScene = dynamic(() => import("./PenScene"), {
  ssr: false,
  loading: () => null,
});

export function PenStage({
  eventSource,
}: {
  // The splash root that r3f attaches its pointer listeners to, so the pen's
  // (pointer-transparent) canvas can float on top without stealing clicks.
  eventSource: RefObject<HTMLElement | null>;
}) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(wide.matches && !reduced.matches);
    update();
    wide.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      wide.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  if (!enabled) return null;
  return <PenScene eventSource={eventSource} />;
}
