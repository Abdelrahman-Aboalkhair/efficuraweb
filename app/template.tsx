"use client";

import { MotionConfig } from "framer-motion";

/**
 * App-wide motion settings. `reducedMotion="user"` makes every framer-motion
 * animation on the site honor the OS "reduce motion" preference - movement is
 * dropped while opacity fades are kept.
 *
 * It lives in template.tsx (rather than layout.tsx) so it's a single, cheap
 * client boundary wrapping the page tree; MotionConfig is context-only and adds
 * no DOM of its own. The actual entrance animations are per-section <Reveal>s,
 * so navigation brings each part of a page in as it scrolls into view rather
 * than fading the whole page at once.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
