import { type ReactNode } from "react";

/**
 * The single source of truth for the site's vertical rhythm.
 *
 * Wraps a page's top-level <section> blocks and owns the space *between* them.
 * Spacing-between-siblings is a property of their shared parent (here, the
 * flex `gap`), not of anything nested inside an individual section - so this
 * lives here rather than in <Container>, which owns *horizontal* rhythm only.
 *
 * Drop a new <section> as a direct child and it's spaced correctly with no
 * extra classes. Sections should not set their own vertical padding; a child
 * that needs a different offset from the rest (e.g. the hero's nav gap) sets
 * it on itself.
 *
 * Layout tokens:
 *   - gap-16 / sm:gap-24 : 64px / 96px between sections
 *   - pb-16  / sm:pb-24  : matching breathing room at the page end
 *   - `compact` keeps the original tighter rhythm (gap-12 / sm:gap-16, same
 *     pb). Only the landing page uses it - its section seams (the laptop
 *     floor's negative-margin tuck) are tuned to those values.
 */
export function Sections({
  children,
  className = "",
  compact = false,
}: {
  children: ReactNode;
  className?: string;
  compact?: boolean;
}) {
  const rhythm = compact
    ? "gap-12 pb-12 sm:gap-16 sm:pb-16"
    : "gap-16 pb-16 sm:gap-24 sm:pb-24";
  return (
    <main className={`flex flex-col ${rhythm} ${className}`}>{children}</main>
  );
}

/**
 * For a full-bleed colored band that directly follows another colored band.
 *
 * Between two colored siblings the Sections gap shows as a bare stripe of
 * page background, which reads as a seam rather than breathing room. This
 * class pulls the lower band up by exactly the default gap so the two colors
 * meet flush (the same trick the landing page uses to run its grey bands
 * together, tuned there to the compact rhythm). Keep it next to the gap
 * tokens above so the two stay in step.
 */
export const flushSectionClassName = "-mt-16 sm:-mt-24";
