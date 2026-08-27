import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/Container";
import { DemoRequestLink } from "@/components/DemoRequestLink";
import { Reveal } from "@/components/Reveal";
import { flushSectionClassName } from "@/components/Sections";

type Cta = { label: string; href: string };

/**
 * The default sign-off background: the site's near-black panel with a copper
 * glow rising from the corner the CTA sits in. Exported so one-off closing
 * bands that can't use <CtaPanel/> itself (e.g. the careers apply band) can
 * still share the exact treatment.
 */
export const signoffBackgroundClassName =
  "bg-[#26282b] bg-[radial-gradient(circle_at_84%_82%,rgba(230,84,22,0.5)_0%,rgba(194,102,45,0.3)_32%,rgb(38,40,43)_68%)] bg-no-repeat";

/**
 * The site's closing call-to-action: a near-black panel with a warm radial
 * glow, a large display heading, and the circular-arrow demo affordance the
 * sign-offs share site-wide. Extracted so the sign-off is a single component
 * the inner pages share rather than each duplicating the markup. Renders its
 * own <section>, so it drops straight into a <Sections> tree as a direct
 * child.
 *
 * `backgroundClassName` lets themed pages echo their own hero glow (the
 * audience pages pass their `audienceThemes` hero); everyone else gets the
 * copper default. `location` feeds the PostHog demo-request funnel - pages
 * that predate this component keep their historical "signoff" value.
 *
 * Pass `flush` when the section directly above is itself a colored band, so
 * the panel closes the Sections gap and the two colors meet without a stripe
 * of page background between them.
 */
export function CtaPanel({
  title,
  body,
  primary,
  secondary,
  location = "cta-panel",
  backgroundClassName = signoffBackgroundClassName,
  flush = false,
}: {
  title: string;
  body?: string;
  primary: Cta;
  secondary?: Cta;
  location?: string;
  backgroundClassName?: string;
  flush?: boolean;
}) {
  return (
    <section
      className={`overflow-hidden py-16 text-white sm:py-20 lg:py-28 ${
        flush ? `${flushSectionClassName} ` : ""
      }${backgroundClassName}`}
    >
      <Container>
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16">
            <div>
              <h2 className="max-w-4xl text-[clamp(2.2rem,4.4vw,4.5rem)] font-light leading-[0.96] text-white">
                {title}
              </h2>
              {body ? (
                <p className="mt-6 max-w-2xl text-lg font-light leading-7 text-[#d6cbbf]">
                  {body}
                </p>
              ) : null}
            </div>
            <div className="flex flex-col items-start gap-6 lg:items-end">
              {/* Every page passes "Book a Demo" → /contact as the primary,
                  so it runs through DemoRequestLink to feed the demo-request
                  funnel. If a non-demo primary ever appears, split this. */}
              <DemoRequestLink
                href={primary.href}
                location={location}
                className="group inline-flex w-fit items-center gap-4 text-lg leading-none text-white"
              >
                <span>{primary.label}</span>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/18 bg-white/10 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 sm:h-14 sm:w-14">
                  <ArrowUpRight
                    className="h-6 w-6"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </span>
              </DemoRequestLink>
              {secondary ? (
                <Link
                  href={secondary.href}
                  className="inline-flex items-center gap-2 text-base font-light leading-none text-[#d6cbbf] transition-colors hover:text-white"
                >
                  {secondary.label}
                  <span aria-hidden>→</span>
                </Link>
              ) : null}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
