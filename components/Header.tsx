"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Container } from "@/components/Container";
import { DemoRequestLink } from "@/components/DemoRequestLink";
import { DesktopNav, type NavItem } from "@/components/DesktopNav";
import { headerThemes } from "@/components/headerThemes";
import { MobileMenu } from "@/components/MobileMenu";

const navItems: NavItem[] = [
  {
    // Product brands are lowercase, like the efficura wordmark.
    label: "Labrador",
    // Attio-style feature grid: labrador's deal-side capabilities grouped by
    // where they sit in the lifecycle. Marketing names; descriptions carry the
    // literal feature.
    menu: {
      groups: [
        {
          heading: "Overview",
          items: [
            {
              title: "How it works",
              description: "Origination to servicing, connected",
              href: "/how-it-works",
              icon: "work-from-home",
            },
          ],
        },
        {
          heading: "Origination",
          items: [
            {
              title: "Email Ingestion",
              description: "Deals straight from your inbox",
              href: "/product/email-ingestion",
              icon: "envelope",
            },
            {
              title: "Asset Skyview",
              description: "Every asset, rendered in 3D",
              href: "/product/asset-skyview",
              icon: "office-building",
            },
          ],
        },
        {
          heading: "Under Management",
          items: [
            {
              title: "Ask Effi",
              description: "Talk to docs, get calendars",
              href: "/product/ask-effi",
              icon: "messages",
            },
            {
              title: "Automatic Servicing",
              description: "Bring servicing back in-house",
              href: "/product/automatic-servicing",
              icon: "task-list",
            },
          ],
        },
      ],
      // labrador keeps the case-study box beside the grid.
      feature: {
        heading: "Case Study",
        caseStudy: {
          href: "/martley-capital",
          caption: "See how efficura transformed Martley Capital",
          image: {
            src: "/martley.png",
            alt: "Martley Capital case study",
          },
        },
      },
    },
  },
  {
    label: "Springer",
    // springer is the investor-relations side of the platform. One group and
    // no feature box, so the panel runs narrower (matches Resources).
    menu: {
      width: "52rem",
      groups: [
        {
          heading: "Overview",
          items: [
            {
              title: "How it works",
              description: "Raise to reporting, connected",
              href: "/how-springer-works",
              icon: "work-from-home",
            },
          ],
        },
        {
          heading: "Investor Relations",
          items: [
            {
              title: "Fund Administration",
              description: "Capital calls, NAV, and reporting",
              href: "/product/fund-administration",
              icon: "video-meeting",
            },
            {
              title: "Investor Management",
              description: "Every LP and their positions",
              href: "/product/investor-management",
              icon: "collaboration",
            },
          ],
        },
      ],
    },
  },
  {
    label: "Who it's for",
    // One simple card per audience, with a Streamline icon left of the title.
    menu: {
      tiles: [
        {
          title: "Borrowers",
          description: "Raise and manage your debt",
          href: "/for-borrowers",
          icon: "/icons/store-location--Streamline-Cyber.svg",
        },
        {
          title: "Operators",
          description: "Every asset, in one place",
          href: "/for-operators",
          icon: "/icons/presentation-2--Streamline-Cyber.svg",
        },
        {
          title: "Lenders",
          description: "Originate and service at scale",
          href: "/for-lenders",
          icon: "/icons/bank-1--Streamline-Cyber.svg",
        },
      ],
    },
  },
  {
    label: "Company",
    menu: {
      groups: [
        {
          heading: "About",
          items: [
            {
              title: "About us",
              description: "The team and the mission",
              href: "/about",
              icon: "teamwork",
            },
          ],
        },
        {
          heading: "Connect",
          items: [
            {
              title: "Careers",
              description: "Explore open roles",
              href: "/careers",
              icon: "agreement",
            },
            {
              title: "Contact",
              description: "Talk to the team",
              href: "/contact",
              icon: "letter",
            },
          ],
        },
      ],
      // Gray box holds the trust pitch: the SOC 2 badge and in-progress note
      // (mirrored from the footer), linking to the Vanta trust centre. Must
      // stay factual - SOC 2 is underway, not yet granted.
      feature: {
        heading: "Trust",
        trust: {
          href: "https://trust.efficura.com",
          badge: { src: "/badges/soc2.svg", alt: "SOC 2 (in progress)" },
          note: "Compliance is in progress, with SOC 2 certification currently underway.",
        },
      },
    },
  },
  {
    label: "Resources",
    // No feature box, so the panel runs a little narrower than the others.
    menu: {
      width: "52rem",
      groups: [
        {
          heading: "Legal",
          items: [
            {
              title: "Terms",
              description: "The fine print",
              href: "/terms",
              icon: "file-text",
            },
            {
              title: "Privacy",
              description: "How we handle your data",
              href: "/privacy",
              icon: "lock-circle",
            },
          ],
        },
      ],
    },
  },
];

// Pass `dark` to render the header in dark mode (black bg, white text). Kept for
// when a dark backdrop calls for it; defaults to the light treatment.
export function Header({ dark = false }: { dark?: boolean }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Whether the dropdown's gray wipe is currently covering the header: true
  // the moment a menu opens (the sweep takes ~100ms), and false only once the
  // retraction has finished on close (150ms delay + 100ms sweep - keep in
  // step with the wipe classes below). The themed chrome keys off this rather
  // than dropdownOpen so light-on-dark text never sits on the gray.
  const [grayCovering, setGrayCovering] = useState(false);
  const pathname = usePathname();

  // Pages whose hero is a coloured/gradient band get a matching header while
  // the page is unscrolled (see headerThemes.ts): the theme layer below paints
  // the hero's own background and the chrome flips to the text treatment that
  // fits against it. Scrolling past a small threshold snaps the header back to the default white
  // (a hard cut, no fade); the dropdown's gray wipe still animates over it.
  const heroTheme = pathname ? headerThemes[pathname] : undefined;
  const heroBackdropVisible = heroTheme != null && !scrolled;
  const chromeDark =
    dark || (heroBackdropVisible && !grayCovering && heroTheme.dark);

  useEffect(() => {
    // 4rem, resolved against the root font size so the threshold scales with it.
    const threshold =
      18 * parseFloat(getComputedStyle(document.documentElement).fontSize);
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  // Timer holding the chrome flip back until the wipe has retracted on close.
  const grayTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleDropdownOpenChange = useCallback((open: boolean) => {
    setDropdownOpen(open);
    if (grayTimer.current != null) {
      clearTimeout(grayTimer.current);
      grayTimer.current = null;
    }
    if (open) {
      setGrayCovering(true);
    } else {
      grayTimer.current = setTimeout(() => setGrayCovering(false), 250);
    }
  }, []);

  // Never leave the timer running past unmount.
  useEffect(
    () => () => {
      if (grayTimer.current != null) clearTimeout(grayTimer.current);
    },
    [],
  );

  return (
    <header
      className={`sticky top-0 z-50 font-light ${dark ? "bg-black" : "bg-white"}`}
    >
      {/* Hero-match layer. While the page is unscrolled it paints the hero
          band's own background so header and band read as one surface; once
          scrolled it unmounts (a hard cut) leaving the default white. It sits
          under the wipe, which sweeps the dropdown gray over it and retracts
          to reveal it again. */}
      {heroBackdropVisible && (
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 ${heroTheme.background}`}
        />
      )}
      {/* Gray sweeps down behind the header content just before the dropdown
          panel opens, reading as one continuous unroll: this wipe is the
          accelerating first segment (ease-in, ends at speed) and DesktopNav
          mounts the decelerating panel the moment it completes (WIPE_LEAD_MS).
          On close the order reverses: the panel rolls up first (150ms), then
          the gray retracts (the delay below). grayCovering above mirrors this
          timing. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 origin-top transition-transform motion-reduce:transition-none ${
          dark ? "bg-zinc-900" : "bg-zinc-100"
        } ${
          dropdownOpen
            ? "scale-y-100 duration-100 ease-in"
            : "scale-y-0 delay-150 duration-100 ease-out"
        }`}
      />
      <Container className="relative">
        {/* Mobile: a simple space-between row (wordmark | hamburger).
          md+: a 3-column grid keeps the nav centered while actions stay
          aligned to the right. */}
        <div className="flex min-h-16 items-center justify-between gap-4 md:grid md:grid-cols-[1fr_auto_1fr] md:items-start">
          {/* Left: wordmark */}
          <div className="flex h-16 items-center justify-start gap-1">
            <Link
              href="/"
              className={`flex items-center gap-2 text-xl font-light tracking-tight sm:text-2xl ${
                chromeDark ? "text-white" : "text-zinc-900"
              }`}
            >
              <Image
                src="/efficura.svg"
                alt=""
                aria-hidden="true"
                width={28}
                height={28}
                unoptimized
                className={`h-7 w-7 ${chromeDark ? "brightness-0 invert" : ""}`}
              />
              efficura
            </Link>
          </div>

          {/* Center: pill nav + shared animated dropdown (hidden on small screens) */}
          <DesktopNav
            navItems={navItems}
            dark={chromeDark}
            onOpenChange={handleDropdownOpenChange}
          />

          {/* Right: actions (desktop) + hamburger (mobile only) */}
          <div className="flex h-16 items-center justify-end gap-2">
            <DemoRequestLink
              href="/contact"
              location="header"
              className="hidden items-center rounded-full bg-[#bf6c35] px-5 py-2.5 text-base font-light text-white transition-colors hover:bg-[#894d26] md:inline-flex"
            >
              Book a demo
            </DemoRequestLink>
            <MobileMenu navItems={navItems} dark={chromeDark} />
          </div>
        </div>
      </Container>
    </header>
  );
}
