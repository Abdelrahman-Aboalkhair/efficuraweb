"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { animate, motion } from "framer-motion";
import {
  ArrowLeft,
  ChevronsUpDown,
  type LucideIcon,
  PanelLeft,
  Search,
} from "lucide-react";

/**
 * The shared kit behind the springer product-page demos (FundAdminDemo,
 * InvestorManagementDemo): the browser-window card that scales a fixed
 * 1280px canvas down and remounts it on a loop, the app chrome, the sidebar
 * whose active marker slides between items, the sweeping donut, the counting
 * figures, and the cursor that walks each mock's story - swooping across the
 * screen on a damped sine curve, flipping from arrow to hand as it crosses
 * onto its target, and clicking. One choreography language, shared with the
 * home showcase mocks (ProductTabs). All consumers use fictional data.
 */

export const SPRINGER = "#b85a24"; // springer's terracotta app accent

// The width the mocks are designed against (matches MockDemo/LaptopShowcase).
const CANVAS_W = 1280;
const SCREEN_RATIO = 0.625; // 16:10 panel, h/w

/* ------------------------------------------------------------------ */
/* Motion primitives                                                   */
/* ------------------------------------------------------------------ */

// Animated integer/currency readout: counts from 0 to `to` on mount
// (same as the home mocks').
export function CountUp({
  to,
  delay = 0,
  format = (v: number) => Math.round(v).toLocaleString("en-GB"),
}: {
  to: number;
  delay?: number;
  format?: (v: number) => string;
}) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const controls = animate(0, to, {
      delay,
      duration: 1.3,
      ease: "easeOut",
      onUpdate: setValue,
    });
    return () => controls.stop();
  }, [to, delay]);
  return <>{format(value)}</>;
}

// The house entrance: a short fade-and-rise, staggered by `delay`.
export function FadeIn({
  delay,
  className = "",
  children,
}: {
  delay: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* The cursor                                                          */
/* ------------------------------------------------------------------ */

// The arrow pointer that "uses" the software (as the home mocks').
function Pointer({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={`drop-shadow ${className}`}>
      <path
        d="M4 2l15 11-7 1 4 7.5-3 1.5-4-7.5L4 20V2z"
        fill="#18181b"
        stroke="white"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// The hand ("pointer") cursor the arrow becomes over the clickable item.
function Hand({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={`drop-shadow ${className}`}>
      <path
        d="M9 3.5C9 2.7 9.7 2 10.5 2S12 2.7 12 3.5V10h.7V7.8c0-.7.6-1.3 1.3-1.3s1.3.6 1.3 1.3V10h.7V8.8c0-.7.6-1.3 1.3-1.3s1.3.6 1.3 1.3V10h.7v-.4c0-.7.6-1.3 1.3-1.3.7 0 1.3.6 1.3 1.3V15c0 1-.2 1.9-.7 2.7l-1.2 2.2c-.4.7-1.1 1.1-1.9 1.1h-5c-.7 0-1.4-.3-1.8-.9l-3.8-4.6c-.5-.6-.4-1.4.2-1.9.5-.4 1.3-.4 1.8.1L9 15.2V3.5z"
        fill="#18181b"
        stroke="white"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// The cursor's flight: it idles at `from` (top%, left%) while the screen
// loads, then swoops to `to` - the horizontal leg a straight run, the
// vertical leg a damped sine wave blended into the destination, so the move
// reads hand-like rather than mechanical. The arrow flips to the hand the
// instant it crosses onto its target (`flip`, a fraction of the flight) and
// the click dip lands at `clickAt` seconds.
export function MockCursor({
  from,
  to,
  delay,
  duration = 1.0,
  clickAt,
  flip = 0.85,
}: {
  /** [top%, left%] of the canvas. */
  from: [number, number];
  to: [number, number];
  delay: number;
  duration?: number;
  clickAt: number;
  flip?: number;
}) {
  const steps = 8;
  const tops: string[] = [];
  const lefts: string[] = [];
  for (let i = 0; i < steps; i++) {
    const f = i / (steps - 1);
    const wave = 8 * Math.sin(2 * Math.PI * f) * (1 - f);
    tops.push(`${(from[0] + (to[0] - from[0]) * f + wave).toFixed(1)}%`);
    lefts.push(`${(from[1] + (to[1] - from[1]) * f).toFixed(1)}%`);
  }
  return (
    <motion.div
      aria-hidden
      initial={{ top: tops[0], left: lefts[0] }}
      animate={{ top: tops, left: lefts }}
      transition={{ delay, duration, ease: "linear" }}
      className="pointer-events-none absolute z-10"
    >
      <motion.span
        className="relative block h-4 w-4"
        animate={{ scale: [1, 0.82, 1] }}
        transition={{ delay: clickAt, duration: 0.28, times: [0, 0.5, 1] }}
      >
        <motion.span
          className="absolute inset-0"
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{ delay, duration, times: [0, flip - 0.001, flip, 1] }}
        >
          <Pointer className="h-4 w-4" />
        </motion.span>
        <motion.span
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 1, 1] }}
          transition={{ delay, duration, times: [0, flip - 0.001, flip, 1] }}
        >
          <Hand className="h-4 w-4" />
        </motion.span>
      </motion.span>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Charts                                                              */
/* ------------------------------------------------------------------ */

// A donut of value-weighted segments drawn as pathLength-normalised dashes
// (as the reporting mock's ChangesDonut lays them out), each sweeping in
// clockwise from 12 o'clock in series order - the graph filling itself in.
// Each segment draws for its share of `sweep`, queued behind the previous
// one, so the ring fills in one continuous pass.
export function DonutRing({
  series,
  delay = 0.5,
  sweep = 1.1,
  className = "h-28 w-28",
}: {
  series: { color: string; value: number }[];
  delay?: number;
  sweep?: number;
  className?: string;
}) {
  const total = series.reduce((sum, s) => sum + s.value, 0);
  const gap = 0.012; // pathLength-normalised surface gap between fills
  const segments = series.map((s, i) => ({
    color: s.color,
    frac: s.value / total,
    offset: series.slice(0, i).reduce((sum, x) => sum + x.value / total, 0),
  }));
  return (
    <div className={`relative flex-none ${className}`}>
      <svg viewBox="0 0 64 64" aria-hidden className="h-full w-full -rotate-90">
        {segments.map((seg, i) => {
          const dash = Math.max(seg.frac - gap, 0.005);
          return (
            <motion.circle
              key={i}
              cx="32"
              cy="32"
              r="24"
              pathLength={1}
              fill="none"
              stroke={seg.color}
              strokeWidth="14"
              strokeDashoffset={-(seg.offset + gap / 2)}
              initial={{ strokeDasharray: "0.0001 0.9999" }}
              animate={{ strokeDasharray: `${dash} ${1 - dash}` }}
              transition={{
                delay: delay + seg.offset * sweep,
                duration: seg.frac * sweep,
                ease: "linear",
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}

// When a segment's sweep completes, for timing its legend row's entrance.
export function segmentDoneAt(
  series: { value: number }[],
  index: number,
  delay = 0.5,
  sweep = 1.1,
) {
  const total = series.reduce((sum, s) => sum + s.value, 0);
  const upTo = series
    .slice(0, index + 1)
    .reduce((sum, s) => sum + s.value / total, 0);
  return delay + upTo * sweep;
}

/* ------------------------------------------------------------------ */
/* App chrome                                                          */
/* ------------------------------------------------------------------ */

// The screen scaffold: browser chrome (traffic lights + address pill) and
// the app's top bar (back + panel toggle, the springer breadcrumb, search).
// Children are the body - typically a sidebar/pane row plus a MockCursor,
// positioned against this root.
export function SpringerChrome({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="relative flex h-full min-h-0 cursor-default select-none flex-col overflow-hidden bg-white">
      <div className="relative flex h-9 flex-none items-center border-b border-zinc-100 bg-white px-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
        </div>
        <span className="absolute left-1/2 -translate-x-1/2 rounded-md bg-white px-3 py-0.5 text-[10px] text-zinc-400 ring-1 ring-zinc-200">
          {title}
        </span>
      </div>

      <div className="relative flex h-9 flex-none items-center border-b border-zinc-100 px-3">
        <div className="flex items-center gap-2.5">
          <ArrowLeft className="h-3.5 w-3.5 text-zinc-500" strokeWidth={1.6} />
          <PanelLeft className="h-3.5 w-3.5 text-zinc-400" strokeWidth={1.6} />
        </div>
        <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-1.5 text-[9px] text-zinc-400">
          <span>Home</span>
          <span className="text-zinc-300">/</span>
          <span className="flex items-center gap-0.5 font-medium text-zinc-700">
            springer
            <ChevronsUpDown className="h-2.5 w-2.5 text-zinc-400" strokeWidth={1.6} />
          </span>
        </div>
        <div className="ml-auto flex items-center gap-2.5">
          <span className="flex items-center gap-1.5 rounded-full border border-zinc-200 px-2.5 py-1 text-[9px] text-zinc-400">
            <Search className="h-2.5 w-2.5 flex-none" strokeWidth={1.6} />
            Search everything
            <span className="rounded border border-zinc-200 px-1 text-[7px] text-zinc-400">
              ⌘K
            </span>
          </span>
          <span className="grid h-5 w-5 flex-none place-items-center rounded-full bg-zinc-800 text-[7px] font-semibold text-white">
            TS
          </span>
        </div>
      </div>

      {children}
    </div>
  );
}

// One sidebar item. The active edge bar shares `markerId` as a layoutId so
// it slides between items when the cursor's click moves the tab; `pressed`
// flashes the row's background under the click at `clickAt` seconds.
function SideItem({
  icon: Icon,
  label,
  active,
  pressed,
  clickAt,
  markerId,
}: {
  icon: LucideIcon;
  label: string;
  active: boolean;
  pressed: boolean;
  clickAt: number;
  markerId: string;
}) {
  return (
    <motion.div
      animate={
        pressed
          ? {
              backgroundColor: [
                "rgba(244,244,245,0)",
                "rgba(244,244,245,1)",
                "rgba(244,244,245,0)",
              ],
            }
          : undefined
      }
      transition={{ delay: clickAt, duration: 0.4, times: [0, 0.35, 1] }}
      className={`relative flex items-center gap-2.5 rounded-md px-2 py-[7px] text-[10px] ${
        active ? "font-medium text-zinc-900" : "text-zinc-500"
      }`}
    >
      {active && (
        <motion.span
          layoutId={markerId}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -left-3 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-r bg-zinc-900"
        />
      )}
      <Icon
        className={`h-3.5 w-3.5 flex-none ${active ? "text-zinc-800" : "text-zinc-400"}`}
        strokeWidth={1.6}
      />
      <span className="truncate">{label}</span>
    </motion.div>
  );
}

// The module sidebar: items with optional section captions above them.
export function SideNav({
  items,
  active,
  pressed,
  clickAt,
  markerId,
}: {
  items: { icon: LucideIcon; label: string; section?: string }[];
  /** Label of the currently active item. */
  active: string;
  /** Label of the item the cursor clicks. */
  pressed: string;
  clickAt: number;
  markerId: string;
}) {
  return (
    <aside className="flex w-56 flex-none flex-col border-r border-zinc-100 px-3 pt-4">
      {items.map((item) => (
        <div key={item.label}>
          {item.section && (
            <p className="mb-1 mt-5 px-2 text-[8px] font-semibold uppercase tracking-[0.12em] text-zinc-400">
              {item.section}
            </p>
          )}
          <SideItem
            icon={item.icon}
            label={item.label}
            active={item.label === active}
            pressed={item.label === pressed}
            clickAt={clickAt}
            markerId={markerId}
          />
        </div>
      ))}
    </aside>
  );
}

/* ------------------------------------------------------------------ */
/* The card                                                            */
/* ------------------------------------------------------------------ */

// The standalone browser-window card: the mock draws on the fixed canvas
// scaled down into the card (same width-driven approach as MockDemo), and
// remounts every `periodMs` so its choreography replays. Reduced-motion
// users get a single pass, left settled on the finished screen.
export function MockLoopCard({
  periodMs,
  children,
}: {
  periodMs: number;
  children: ReactNode;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  // The canvas's scale into the card; null until measured (SSR/first paint).
  const [scale, setScale] = useState<number | null>(null);
  const [loop, setLoop] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setLoop((n) => n + 1), periodMs);
    return () => clearInterval(id);
  }, [periodMs]);

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const update = () => {
      setScale(el.getBoundingClientRect().width / CANVAS_W);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Decorative device shot: fictional data, nothing focusable inside.
  // Keying the canvas on `loop` remounts the whole screen, restarting its
  // choreography from the top.
  return (
    <div
      ref={frameRef}
      aria-hidden
      className="relative aspect-[16/10] w-full overflow-hidden rounded-[10px] border border-black/10 bg-white shadow-[0_24px_60px_-24px_rgba(48,50,54,0.45)]"
    >
      {scale === null ? (
        <div key={loop} className="absolute inset-0">
          {children}
        </div>
      ) : (
        <div
          key={loop}
          className="absolute left-0 top-0"
          style={{
            width: CANVAS_W,
            height: CANVAS_W * SCREEN_RATIO,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
