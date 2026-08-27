"use client";

import posthog from "posthog-js";
import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";

/**
 * Link wrapper for the "Book a Demo" CTAs. Captures the `demo-request-click`
 * conversion event before navigating, so the PostHog demo-request funnel
 * ($pageview → demo-request-click) sees every placement. `location` names the
 * placement within the page ("header", "signoff", …) - the page itself comes
 * from the event's own $pathname, so pages sharing a layout can reuse a value.
 */
export function DemoRequestLink({
  location,
  onClick,
  ...props
}: ComponentProps<typeof Link> & { location: string }) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    posthog.capture("demo-request-click", { location });
    onClick?.(event);
  };

  return <Link {...props} onClick={handleClick} />;
}
