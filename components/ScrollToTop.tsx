"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Forces the window to the very top on every route change.
 *
 * The site sets `scroll-behavior: smooth` globally (for in-page anchor jumps),
 * which turns the router's own scroll-to-top into an animated scroll - and that
 * animation gets interrupted by <Reveal> sections drifting in, so it settles a
 * little short of the top. An explicit `behavior: "instant"` scroll overrides
 * the CSS for this one call and lands exactly at 0. Skipped when the URL carries
 * a hash so cross-page anchor links still reach their target.
 */
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
