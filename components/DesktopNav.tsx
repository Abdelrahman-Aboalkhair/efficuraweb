"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type FocusEvent,
  type ReactElement,
} from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { Container } from "@/components/Container";
import {
  Box,
  FilePen,
  Landmark,
  LayoutDashboard,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

type NavLink = {
  label: string;
  href: string;
  // Greyed-out, non-clickable entries (e.g. products not yet launched).
  disabled?: boolean;
};

type FeatureCard = {
  title: string;
  description: string;
};

// Icons for feature-grid entries, referenced by key so nav data stays
// serializable across the server→client boundary (Header is a server
// component; the SVGs live in FeatureIcon below).
// Streamline "Cyber Line" glyphs rendered as inline SVGs (see the components
// below); the rest map to a Lucide line icon.
export type CustomIconName =
  | "envelope"
  | "office-building"
  | "messages"
  | "task-list"
  | "video-meeting"
  | "teamwork"
  | "agreement"
  | "letter"
  | "collaboration"
  | "file-text"
  | "lock-circle"
  | "work-from-home";
export type FeatureIconName =
  | CustomIconName
  | "paper"
  | "cube"
  | "layers"
  | "landmark"
  | "shield";

export type FeatureGridItem = {
  title: string;
  description: string;
  href: string;
  icon: FeatureIconName;
  // Off-site destinations (e.g. the Vanta trust centre) open in a new tab.
  external?: boolean;
};

export type NavMenu = {
  // Max width of the shared dropdown panel when this menu is open (e.g.
  // "52rem"). Defaults to 64rem; a lighter menu can run narrower.
  width?: string;
  // Left-hand link columns. Each renders its heading above its links; more than
  // one column sits side by side.
  columns?: { heading?: string; links: NavLink[] }[];
  // Alternative body: groups of icon'd feature entries laid out in a
  // two-column grid under uppercase group headings (Attio-style).
  groups?: { heading: string; items: FeatureGridItem[] }[];
  // Alternative body: a row of simple light audience cards filling the panel,
  // no gray feature box beside it. Used by "Who it's for". `icon` is the path to
  // an SVG shown to the left of the title.
  tiles?: {
    title: string;
    description?: string;
    href: string;
    icon?: string;
  }[];
  // Right-hand gray box. Renders either a list of placeholder cards, or - when
  // `caseStudy` is set - a single image that links out, with an optional
  // caption beneath. `image` is optional; a placeholder tile shows until real
  // artwork is supplied.
  feature?: {
    heading: string;
    cards?: FeatureCard[];
    caseStudy?: {
      href: string;
      caption?: string;
      image?: { src: string; alt: string };
    };
    // Trust variant: a compliance badge plus an "in progress" note, linking out
    // to the Vanta trust centre. Used by the Company menu.
    trust?: {
      href: string;
      badge: { src: string; alt: string };
      note: string;
    };
  };
};

export type NavItem = {
  label: string;
  href?: string;
  menu?: NavMenu;
};

// useLayoutEffect on the client, useEffect on the server (avoids the SSR
// warning while still measuring before paint in the browser).
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Next's Link with motion props, so panel rows can inherit the stagger
// variants without an extra wrapper element.
const MotionLink = motion.create(Link);

// Menus open on click — hover-opened mega menus are notoriously finicky
// (accidental opens while crossing the bar, diagonal-travel flicker; see
// NN/g's and Baymard's hover-intent guidance). Once an open is committed, the
// header's gray wipe (100ms ease-in, see Header.tsx) runs first and the panel
// mounts this much later — a hair before the wipe finishes, so React mount
// latency doesn't leave a pause between the gray reaching the bottom of the
// header and the panel unrolling beneath it.
const WIPE_LEAD_MS = 90;

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 12 12"
      aria-hidden="true"
      className={`h-4 w-4 text-zinc-400 transition-transform ${
        open ? "rotate-180" : ""
      }`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 4.5 3 3 3-3" />
    </svg>
  );
}

// Dark rounded tile standing in for real card artwork until it's supplied.
function PlaceholderThumb() {
  return (
    <div
      aria-hidden="true"
      className="h-12 w-12 flex-none rounded-lg bg-gradient-to-br from-zinc-700 via-zinc-800 to-zinc-950 ring-1 ring-white/10"
    />
  );
}

// Generic "image goes here" glyph, shown in the case-study tile until a real
// image src is supplied.
function ImageGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-10 w-10 text-zinc-400"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="8.5" cy="9.5" r="1.5" />
      <path d="m4 18 5-5 4 4 3-3 4 4" />
    </svg>
  );
}

// Streamline "Cyber Line" glyphs (from the free cyber-line set), inlined here
// (rather than referenced via <img>) so their strokes use currentColor and pick
// up the same zinc-600 → zinc-800 hover treatment as the Lucide icons. Each
// uses a 24×24 viewBox to match Lucide's sizing.
function EmailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} aria-hidden="true" className={className}>
      <path d="m22.5 4.5l-11 11.25L.5 4.5m0 16L8.605 13m5.79 0l8.105 7.5" />
      <path d="M22.5 4.5H.5v16h22z" />
    </svg>
  );
}

function BuildingIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} aria-hidden="true" className={className}>
      <path d="m18.5 13.5l4 1v7h-4m-14 0h-4v-7l4-1" />
      <path d="M19.5 23.5h-16l1-2v-9l7-3l7 3v9z" />
      <path d="M5.5 12.1V8.5h12v3.6m-12-3.6L7 5l4.5-2L16 5l1.5 3.5m-6-5.5V.5m-5 21v-7m-2 0h14m-14 7h15m-15-2h2m4 2v-7m-2 7v-7m0 5h2m4 2v-7m-2 7v-7m0 5h2m2 2v-7m0 5h2" />
    </svg>
  );
}

function BubbleChatDoubleTextIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} aria-hidden="true" className={className}>
      <path d="M18.5 9.5V5.413L9.5 1.5l-9 3.913v7.826l6 2.348V19.5l2-1.5" />
      <path d="m10.5 13.9l6-2.4l6 2.4V19l-5 1.5v3l-7-4zm3 1.6h6m-6 2h3m-12-9h10m-10-2h10m-10 4h5" />
    </svg>
  );
}

function PencilClipboardIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} aria-hidden="true" className={className}>
      <path d="M12.959 2.5H17.5v4m0 11v6H.5v-21h4.459M3.5 17.5h6m-6-4h6m-6-4h10" />
      <path d="m14 .5l-1.562 3h-7L4 .5zm-1.5 15v2h2l8-8l-2-2z" />
    </svg>
  );
}

function VideoMeetingGroupIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} aria-hidden="true" className={className}>
      <path d="M21.5.5h-20v13h20zm-16 19l-2 1l-2-1V17l2-1l2 1zm1 4l-1-2h-4l-1 2zm7-4l-2 1l-2-1V17l2-1l2 1zm1 4l-1-2h-4l-1 2zm7-4l-2 1l-2-1V17l2-1l2 1zm1 4l-1-2h-4l-1 2z" />
      <path d="m14.5 8l-3 1.5l-3-1.5V4l3-1.5l3 1.5z" />
      <path d="M8.5 4L11 5.5h3.5m2 8V12l-5-1.5l-5 1.5v1.5" />
    </svg>
  );
}

function GroupIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} aria-hidden="true" className={className}>
      <path d="M13.5 17.5v6h4v-6h2v-5l-4-1.5l-2 .75m2 1.75v3m3-8l-3 1.5l-3-1.5v-4l3-1.5l3 1.5z" />
      <path d="M18.5 5.5h-4l-2-1m-3 19v-6h2v-5l-4-1.5l-4 1.5v5h2v6zm-2-10v3m3-8l-3 1.5l-3-1.5v-4l3-1.5l3 1.5z" />
      <path d="M10.5 5.5h-4l-2-1" />
    </svg>
  );
}

function HandshakeDealIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} aria-hidden="true" className={className}>
      <path d="M14.5 10.5L9.934 12L9 11.066L13.132 7.5H15L18 9l2.5.5V16l-2 .5h-4.626" />
      <path d="m3.5 15l2.597.5l3.952 3.951l1.709-.294l.294-1.709l1.709-.295l.295-1.709l1.708-.294l.295-1.709l-2.599-2.599m-1.946-1.946L9.618 7L6 8.5L3.5 9m0-1.5h-3v9h3zm20 1h-3v9h3z" />
    </svg>
  );
}

function MailboxIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} aria-hidden="true" className={className}>
      <path d="M22.5 18.5h-9v-8l4.5-4l4.5 4z" />
      <path d="M13.5 18.5H.5v-8l4.5-4h13" />
      <path d="M9.5 12.5v-11h-6L2 3l1.5 1.5h6m0 19v-5m11-6h-5v2h5z" />
    </svg>
  );
}

function UserChatIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} aria-hidden="true" className={className}>
      <path d="M12.5 7.674L18 10.5l5.5-2.826V3.326L18 .5l-5.5 2.826zm5.497 4.825L16.498 14L18 15.498l1.499-1.5zM11.5 15l-4 1.5l-4-1.5V9.5l4-1.5l4 1.5z" />
      <path d="m3.5 9.5l3.5 2h4.5m3 12V19l-7-1.5l-7 1.5v4.5m7-4v4" />
      <path d="m15 16l-.5.5l.5.5m0-1l.5.5l-.5.5m0-12l-.5.5l.5.5m0-1l.5.5l-.5.5m3-1l-.5.5l.5.5m3-1l-.5.5l.5.5m-3-1l.5.5l-.5.5m3-1l.5.5l-.5.5" />
    </svg>
  );
}

function DocumentBookmarkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} aria-hidden="true" className={className}>
      <path d="M5.5 1.5h-3v20h16v-20h-8" />
      <path d="M4.5 21.5v2h16v-20h-2M5.5 9L8 6.5L10.5 9V.5h-5z" />
    </svg>
  );
}

function LockCloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} aria-hidden="true" className={className}>
      <path d="M20.5 9.5h-18v14h18z" />
      <path d="m14.5 14l-3-1.5l-3 1.5v2.5l2 1.5L9 21.5h5L12.5 18l2-1.5zm-8-4.5v-7l5-2l5 2v7" />
    </svg>
  );
}

function WorkStationIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} aria-hidden="true" className={className}>
      <path d="M21 18.5H1.5l-1-3H22zm-20.5-7h13m-2 4v3m-9.5 5l3.5-5h-3l-.476 5zm18.5 0l-3.5-5h3l.476 5zm-7-20H.5v10h13zm-5 10v2m-3-2v2m-.5 0h4m8.75-9L16 3.5l1.75-3h3.5l1.75 3l-1.75 3z" />
      <path d="M19.5 2.557v1.309l1 .634m1 8h-3v3h3zm-2 0v-2m1 2l1.5-2" />
    </svg>
  );
}

const customIcons: Record<
  CustomIconName,
  (props: { className?: string }) => ReactElement
> = {
  envelope: EmailIcon,
  "office-building": BuildingIcon,
  messages: BubbleChatDoubleTextIcon,
  "task-list": PencilClipboardIcon,
  "video-meeting": VideoMeetingGroupIcon,
  teamwork: GroupIcon,
  agreement: HandshakeDealIcon,
  letter: MailboxIcon,
  collaboration: UserChatIcon,
  "file-text": DocumentBookmarkIcon,
  "lock-circle": LockCloseIcon,
  "work-from-home": WorkStationIcon,
};

// Lucide glyphs for the remaining feature-grid entries. Keyed by string so the
// nav data itself stays serializable across the server→client boundary.
const featureIcons: Record<Exclude<FeatureIconName, CustomIconName>, LucideIcon> = {
  paper: FilePen,
  cube: Box,
  layers: LayoutDashboard,
  landmark: Landmark,
  shield: ShieldCheck,
};

const isCustomIcon = (name: FeatureIconName): name is CustomIconName =>
  name in customIcons;

function FeatureIcon({ name }: { name: FeatureIconName }) {
  const className =
    "h-9 w-9 flex-none text-zinc-600 transition-colors group-hover/item:text-zinc-800";
  if (isCustomIcon(name)) {
    const Icon = customIcons[name];
    return <Icon className={className} />;
  }
  const Icon = featureIcons[name];
  return <Icon aria-hidden="true" strokeWidth={1.5} className={className} />;
}

// The inner contents of the panel (link columns + gray box). Kept separate so
// the animated panel shell can swap this out when the active menu changes.
// Every row is a motion element that inherits the hidden/visible variants from
// the panel body in DesktopNav, which staggers them into a top-down cascade.
function MenuBody({
  menu,
  onNavigate,
}: {
  menu: NavMenu;
  onNavigate: () => void;
}) {
  const reduceMotion = useReducedMotion();
  // Rows drop down into place; with reduced motion they simply fade.
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: EASE } },
  };

  // Card layout: one simple light card per audience, matching the other menus,
  // with an icon to the left of the title.
  if (menu.tiles) {
    return (
      <div className="grid grid-cols-3 gap-4 py-1">
        {menu.tiles.map((tile) => (
          <MotionLink
            key={tile.href}
            variants={itemVariants}
            href={tile.href}
            role="menuitem"
            onClick={onNavigate}
            className="group/item flex flex-col justify-center rounded-xl p-5 transition-colors hover:bg-zinc-50"
          >
            <div className="flex items-center gap-4">
              {tile.icon && (
                // Rendered as a colour-fillable mask (the source SVGs have a
                // hard-coded stroke colour) so the icon matches the zinc-600 →
                // zinc-800 treatment of the Product/Company/Resources menus.
                <span
                  aria-hidden="true"
                  className="h-10 w-10 flex-none bg-zinc-600 transition-colors group-hover/item:bg-zinc-800"
                  style={{
                    maskImage: `url(${tile.icon})`,
                    WebkitMaskImage: `url(${tile.icon})`,
                    maskRepeat: "no-repeat",
                    WebkitMaskRepeat: "no-repeat",
                    maskPosition: "center",
                    WebkitMaskPosition: "center",
                    maskSize: "contain",
                    WebkitMaskSize: "contain",
                  }}
                />
              )}
              <div>
                <p className="text-lg font-light text-zinc-900">
                  {tile.title}
                </p>
                {tile.description && (
                  <p className="mt-1 text-sm leading-6 text-zinc-500">
                    {tile.description}
                  </p>
                )}
              </div>
            </div>
          </MotionLink>
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-12">
      {/* Left: either an Attio-style grouped feature grid, or plain link
          columns. `pt-5` matches the gray box's own padding so the first
          heading lines up with the title inside the box. */}
      {menu.groups ? (
        <div className="min-w-0 flex-1 space-y-7 pb-4 pt-5">
          {menu.groups.map((group) => (
            <div key={group.heading}>
              <motion.p
                variants={itemVariants}
                className="text-sm font-light uppercase tracking-wider text-zinc-400"
              >
                {group.heading}
              </motion.p>
              <div className="mt-3 grid grid-cols-2 gap-x-8 gap-y-2">
                {group.items.map((item) => {
                  const itemBody = (
                    <>
                      <FeatureIcon name={item.icon} />
                      <div className="min-w-0">
                        <p className="text-base font-light text-zinc-900">
                          {item.title}
                        </p>
                        <p className="mt-0.5 truncate text-sm text-zinc-500">
                          {item.description}
                        </p>
                      </div>
                    </>
                  );
                  const itemClass =
                    "group/item -mx-3 flex items-center gap-4 rounded-lg px-3 py-2 transition-colors hover:bg-zinc-50";
                  return item.external ? (
                    <motion.a
                      key={item.title}
                      variants={itemVariants}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      role="menuitem"
                      onClick={onNavigate}
                      className={itemClass}
                    >
                      {itemBody}
                    </motion.a>
                  ) : (
                    <MotionLink
                      key={item.title}
                      variants={itemVariants}
                      href={item.href}
                      role="menuitem"
                      onClick={onNavigate}
                      className={itemClass}
                    >
                      {itemBody}
                    </MotionLink>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex min-w-0 flex-1 gap-12 pt-5">
          {menu.columns?.map((column, index) => (
            <div key={column.heading ?? index} className="min-w-0 flex-1">
              {column.heading && (
                <motion.p
                  variants={itemVariants}
                  className="mb-4 text-lg font-light text-zinc-500"
                >
                  {column.heading}
                </motion.p>
              )}
              <ul className="space-y-1">
                {column.links.map((item) => (
                  <motion.li key={item.label} variants={itemVariants}>
                    {item.disabled ? (
                      <span
                        role="menuitem"
                        aria-disabled="true"
                        className="block cursor-not-allowed py-1.5 text-base font-light text-zinc-300"
                      >
                        {item.label}
                      </span>
                    ) : (
                      <Link
                        href={item.href}
                        role="menuitem"
                        onClick={onNavigate}
                        className="block py-1.5 text-base font-light text-zinc-700 transition-colors hover:text-zinc-950"
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Right: gray box - a trust badge, a case-study image, or placeholder
          cards. */}
      {menu.feature && (
        <motion.div
          variants={itemVariants}
          className="w-80 flex-none rounded-md bg-zinc-50 px-6 py-5"
        >
          <p className="mb-4 text-lg font-light text-zinc-500">
            {menu.feature.heading}
          </p>
          {menu.feature.trust ? (
            <a
              href={menu.feature.trust.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onNavigate}
              className="group block"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={menu.feature.trust.badge.src}
                alt={menu.feature.trust.badge.alt}
                className="mx-auto h-24 w-24"
              />
              <p className="mt-4 text-sm leading-relaxed text-zinc-500 transition-colors group-hover:text-zinc-700">
                {menu.feature.trust.note}
              </p>
            </a>
          ) : menu.feature.caseStudy ? (
            <Link
              href={menu.feature.caseStudy.href}
              onClick={onNavigate}
              className="group block"
            >
              <div className="overflow-hidden rounded ring-1 ring-black/5">
                {menu.feature.caseStudy.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={menu.feature.caseStudy.image.src}
                    alt={menu.feature.caseStudy.image.alt}
                    className="block aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="flex aspect-[4/3] w-full items-center justify-center bg-zinc-200 transition-colors group-hover:bg-zinc-300">
                    <ImageGlyph />
                  </div>
                )}
              </div>
              {menu.feature.caseStudy.caption && (
                <p className="mt-4 text-base font-light leading-snug text-zinc-700 transition-colors group-hover:text-zinc-950">
                  {menu.feature.caseStudy.caption}
                </p>
              )}
            </Link>
          ) : (
            <div className="space-y-4">
              {menu.feature.cards?.map((card, index) => (
                <div key={index} className="flex items-start gap-4">
                  <PlaceholderThumb />
                  <div className="min-w-0">
                    <p className="text-base font-light text-zinc-900">
                      {card.title}
                    </p>
                    <p className="mt-0.5 text-sm leading-snug text-zinc-500">
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}

export function DesktopNav({
  navItems,
  dark = false,
  onOpenChange,
}: {
  navItems: NavItem[];
  dark?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  // Index of the open menu, or null when nothing is open. A single shared panel
  // is driven by this so it can morph between menus rather than pop.
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  // Index of a committed open whose header wipe is still running: the header
  // is already turning gray (via onOpenChange) but the panel hasn't mounted.
  const [pendingIndex, setPendingIndex] = useState<number | null>(null);
  // Per-menu content heights, measured from the hidden copies below, so the
  // panel can animate its height to hug whichever menu is open.
  const [heights, setHeights] = useState<Record<number, number>>({});
  const navRef = useRef<HTMLElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  // Timer chaining the header wipe into the panel mount.
  const wipeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduceMotion = useReducedMotion();

  const activeMenu =
    activeIndex != null ? navItems[activeIndex]?.menu ?? null : null;
  const panelHeight = activeIndex != null ? heights[activeIndex] : undefined;

  const cancelWipe = useCallback(() => {
    if (wipeTimer.current != null) {
      clearTimeout(wipeTimer.current);
      wipeTimer.current = null;
    }
  }, []);

  const close = useCallback(() => {
    cancelWipe();
    setPendingIndex(null);
    setActiveIndex(null);
  }, [cancelWipe]);

  const handleTriggerClick = (index: number) => {
    if (activeIndex === index) {
      close(); // toggle the open menu shut
    } else if (activeIndex != null || pendingIndex != null) {
      // Already open (or mid-wipe): the gray is in place, so no second wipe —
      // morph straight to the clicked menu.
      cancelWipe();
      setPendingIndex(null);
      setActiveIndex(index);
    } else {
      // Commit an open from rest: the header wipe starts now (pendingIndex
      // flips onOpenChange) and the panel mounts once it has swept the header.
      setPendingIndex(index);
      wipeTimer.current = setTimeout(() => {
        wipeTimer.current = null;
        setPendingIndex(null);
        setActiveIndex(index);
      }, WIPE_LEAD_MS);
    }
  };

  // When focus moves outside the nav (e.g. tabbing on to "Book a demo"), the
  // panel closes.
  const handleBlur = (event: FocusEvent<HTMLElement>) => {
    const next = event.relatedTarget as Node | null;
    if (next && !event.currentTarget.contains(next)) close();
  };

  useEffect(() => {
    onOpenChange?.(activeIndex != null || pendingIndex != null);
  }, [activeIndex, pendingIndex, onOpenChange]);

  // Never leave a timer running past unmount.
  useEffect(
    () => () => {
      if (wipeTimer.current != null) clearTimeout(wipeTimer.current);
    },
    [],
  );

  // Measure every menu at real panel geometry (full-bleed width, shared
  // container) so the panel knows each menu's height up front. The hidden
  // copies also keep the numbers accurate when the viewport changes.
  useIsoLayoutEffect(() => {
    const root = measureRef.current;
    if (!root) return;

    const measure = () => {
      const next: Record<number, number> = {};
      for (const element of root.querySelectorAll<HTMLElement>(
        "[data-nav-measure]",
      )) {
        next[Number(element.dataset.navMeasure)] = element.offsetHeight;
      }
      setHeights(next);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    return () => observer.disconnect();
  }, [navItems]);

  // Close on outside click / Escape while a menu is open or mid-wipe.
  useEffect(() => {
    if (activeIndex == null && pendingIndex == null) return;
    function onPointerDown(event: PointerEvent) {
      if (!navRef.current?.contains(event.target as Node)) close();
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, pendingIndex, close]);

  // The keyed body fades between menus; when it enters, its rows (the motion
  // children inside MenuBody) drop in one after another, top to bottom.
  const bodyVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.12,
        staggerChildren: reduceMotion ? 0 : 0.025,
        delayChildren: reduceMotion ? 0 : 0.04,
      },
    },
    exit: { opacity: 0, transition: { duration: 0.08 } },
  };

  return (
    <nav
      ref={navRef}
      onBlur={handleBlur}
      className="relative hidden flex-col items-center justify-start md:flex"
    >
      <ul className="flex h-16 items-center gap-1 rounded-full p-1.5 font-light">
        {navItems.map((item, index) => {
          const isOpen = activeIndex === index || pendingIndex === index;
          return (
            <li key={item.label}>
              {item.menu ? (
                <button
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={isOpen}
                  onClick={() => handleTriggerClick(index)}
                  className={`flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-2 text-lg font-light ${
                    dark
                      ? `text-zinc-200 hover:bg-white/15 hover:text-white ${
                          isOpen ? "bg-white/15 text-white" : ""
                        }`
                        : `text-zinc-700 hover:bg-zinc-200/70 hover:text-zinc-900 ${
                          isOpen ? "bg-zinc-200/70 text-zinc-900" : ""
                        }`
                  }`}
                >
                  {item.label}
                  <ChevronDown open={isOpen} />
                </button>
              ) : (
                <Link
                  href={item.href!}
                  className={`flex items-center rounded-full px-4 py-2 text-lg font-light ${
                    dark
                      ? "text-zinc-200 hover:bg-white/15 hover:text-white"
                      : "text-zinc-700 hover:bg-zinc-200/70 hover:text-zinc-900"
                  }`}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>

      {/* The backdrop begins below the expanded header, keeping the navigation
          crisp while blurring the page underneath it. */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="pointer-events-none fixed inset-x-0 top-16 z-0 h-[calc(100vh-4rem)] bg-white/45 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Full-bleed gray surface, unrolling from under the header (whose wipe
          has just led into it) and hugging the active menu's height. On close
          it rolls back up before the header's gray retracts. */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            key="nav-panel"
            role="menu"
            initial={reduceMotion ? { opacity: 0 } : { height: 0 }}
            animate={{ opacity: 1, height: panelHeight ?? "auto" }}
            exit={
              reduceMotion
                ? { opacity: 0, transition: { duration: 0.12 } }
                : { height: 0, transition: { duration: 0.15, ease: [0.4, 0, 1, 1] } }
            }
            transition={{ duration: 0.25, ease: EASE }}
            className="fixed inset-x-0 top-16 z-10 overflow-hidden bg-zinc-100"
          >
            <Container className="flex w-full items-start justify-center py-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  variants={bodyVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  style={{
                    width: activeMenu.width ?? "64rem",
                    maxWidth: "100%",
                  }}
                >
                  <MenuBody menu={activeMenu} onNavigate={close} />
                </motion.div>
              </AnimatePresence>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden copies mirroring the real panel's geometry, one per menu, so
          heights track content and viewport changes. */}
      <div
        ref={measureRef}
        aria-hidden="true"
        className="invisible pointer-events-none absolute left-[-9999px] top-0"
      >
        {navItems.map((item, index) =>
          item.menu ? (
            <div key={item.label} data-nav-measure={index} className="w-screen">
              <Container className="flex w-full items-start justify-center py-4">
                <div
                  style={{ width: item.menu.width ?? "64rem", maxWidth: "100%" }}
                >
                  <MenuBody menu={item.menu} onNavigate={close} />
                </div>
              </Container>
            </div>
          ) : null,
        )}
      </div>
    </nav>
  );
}
