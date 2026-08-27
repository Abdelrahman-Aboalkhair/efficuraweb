import { type ReactNode } from "react";

/**
 * The single source of truth for the site's horizontal rhythm.
 *
 * Every page section should render its content inside a <Container> so the
 * page gutters and max content width stay identical everywhere. Full-bleed
 * backgrounds (e.g. a colored header bar) should sit *outside* the Container,
 * with the Container wrapping only the inner content.
 *
 * Layout tokens (Tailwind Labs' standard container convention):
 *   - max-w-12xl : 1920px content ceiling (custom; see --container-12xl in globals.css)
 *   - mx-auto   : centers content once it reaches the ceiling
 *   - px-5      : 20px side gutter on phones/tablets
 *   - lg:px-6   : 24px side gutter from the `lg` breakpoint (>=1024px) up
 */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-12xl px-5 lg:px-6 ${className}`}>
      {children}
    </div>
  );
}
