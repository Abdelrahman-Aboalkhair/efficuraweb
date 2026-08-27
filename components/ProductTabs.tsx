"use client";

import {
  createContext,
  Fragment,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { AnimatePresence, animate, motion } from "framer-motion";
import { AerialVideo } from "@/components/AerialVideo";

/**
 * The Labrador screen mocks shown inside the home hero's laptop (see
 * LaptopShowcase): stylized, self-animating mocks of the real product screen
 * (deliberately fictional data - no live deal details), choreographed so the
 * software looks like it's being used: Effi reads a thread and a cursor files
 * the deal, an aerial render of the asset orbits behind the asset page's
 * headline figures, an approved monthly report lands - its figures count up
 * and the trend line draws itself.
 *
 * `MockScreen` renders one of them full-bleed with a cross-fade on change -
 * no tab row, no user chrome; it's a device-screen demo, not a control.
 * LaptopShowcase owns the cycling (a timer, pinned for reduced-motion users;
 * each mock's own choreography also respects reduced motion where it
 * matters, e.g. AerialVideo serves a still).
 */

const BRAND_GREEN = "#3a5a40";
const OUTLOOK_BLUE = "#0f6cbd";

// Animated integer/currency readout: counts from 0 to `to` on mount.
function CountUp({
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

/* ------------------------------------------------------------------ */
/* Shared mock scaffolding                                             */
/* ------------------------------------------------------------------ */

// Inside the laptop's screen the window IS the display: no rounded corners,
// shadow or ring - the bezel provides the frame. Standalone (framed) chrome
// is kept for any future use of a mock outside the laptop.
const FramelessContext = createContext(false);

// App-window chrome shared by all three mocks: traffic lights + a centred
// address-pill, then whatever screen the mock is showing.
function Window({ label, children }: { label: string; children: ReactNode }) {
  const frameless = useContext(FramelessContext);
  return (
    <div
      className={`flex h-full min-h-0 cursor-default select-none flex-col overflow-hidden bg-white ${
        frameless ? "" : "rounded-xl shadow-xl ring-1 ring-zinc-900/5"
      }`}
    >
      <div className="relative flex h-9 flex-none items-center border-b border-zinc-100 bg-white px-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
        </div>
        <span className="absolute left-1/2 -translate-x-1/2 rounded-md bg-white px-3 py-0.5 text-[10px] text-zinc-400 ring-1 ring-zinc-200">
          {label}
        </span>
      </div>
      <div className="flex min-h-0 flex-1">{children}</div>
    </div>
  );
}

// A grey placeholder line - the mock equivalent of body text.
function Bar({ className = "" }: { className?: string }) {
  return <div className={`h-1.5 rounded-full bg-zinc-100 ${className}`} />;
}

// The little arrow pointer that "uses" the software.
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

// The hand ("pointer") cursor the arrow becomes while hovering a button.
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

// Minimal single-stroke pictograms for the Outlook chrome. Fidelity over
// beauty: at 10–16px they only need to read as the right *kind* of icon.
const GLYPHS: Record<string, ReactNode> = {
  waffle: (
    <g fill="currentColor" stroke="none">
      {[3, 8, 13].map((y) =>
        [3, 8, 13].map((x) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="1.2" />
        )),
      )}
    </g>
  ),
  search: (
    <>
      <circle cx="7" cy="7" r="4" />
      <path d="m10.2 10.2 3.6 3.6" />
    </>
  ),
  chat: <path d="M13.5 3.5h-11v7.2h3v2.6l3.1-2.6h4.9V3.5z" />,
  bell: (
    <>
      <path d="M8 2.4a3.9 3.9 0 0 1 3.9 3.9V9l1.3 2.1H2.8L4.1 9V6.3A3.9 3.9 0 0 1 8 2.4z" />
      <path d="M6.7 13.1a1.4 1.4 0 0 0 2.6 0" />
    </>
  ),
  gear: (
    <>
      <circle cx="8" cy="8" r="2.3" />
      <path d="M8 1.9v1.9M8 12.2v1.9M1.9 8h1.9M12.2 8h1.9M3.7 3.7 5 5M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3" />
    </>
  ),
  person: (
    <>
      <circle cx="8" cy="5.4" r="2.4" />
      <path d="M3.4 13.6a4.8 4.8 0 0 1 9.2 0" />
    </>
  ),
  hamburger: <path d="M2.5 4.5h11M2.5 8h11M2.5 11.5h11" />,
  mail: (
    <>
      <rect x="1.8" y="3.6" width="12.4" height="9" rx="1.3" />
      <path d="m2.4 4.8 5.6 4 5.6-4" />
    </>
  ),
  calendar: (
    <>
      <rect x="2.4" y="3" width="11.2" height="10.4" rx="1.3" />
      <path d="M2.4 6.4h11.2M5.4 1.7v2.5M10.6 1.7v2.5" />
    </>
  ),
  people: (
    <>
      <circle cx="5.6" cy="5.6" r="2.2" />
      <path d="M1.9 13a3.8 3.8 0 0 1 7.4 0M10.4 8a2 2 0 1 0-.5-3.9M11 9.7a3.4 3.4 0 0 1 3 3.3" />
    </>
  ),
  check: (
    <>
      <circle cx="8" cy="8" r="5.6" />
      <path d="m5.5 8.2 1.8 1.8 3.2-3.8" />
    </>
  ),
  newMail: (
    <>
      <rect x="1.6" y="4.2" width="10" height="8.2" rx="1.3" />
      <path d="m2.2 5.4 4.4 3.2 4.4-3.2M13 1.6v4M11 3.6h4" />
    </>
  ),
  trash: <path d="M3 4.4h10M6.4 4.4V3h3.2v1.4M4.4 4.4l.6 8.6h6l.6-8.6" />,
  archive: (
    <>
      <rect x="2" y="2.8" width="12" height="2.8" rx="0.8" />
      <path d="M3.2 5.6v6.6a.9.9 0 0 0 .9.9h7.8a.9.9 0 0 0 .9-.9V5.6M6.4 8.4h3.2" />
    </>
  ),
  shield: <path d="M8 1.8l5 1.8v4.2c0 3-2 4.8-5 6-3-1.2-5-3-5-6V3.6L8 1.8z" />,
  reply: <path d="M6 4.4 2.8 7.6 6 10.8M2.8 7.6h6.3a4 4 0 0 1 4 4v.8" />,
  replyAll: (
    <path d="M8.4 4.4 5.2 7.6l3.2 3.2M5 4.8 2.2 7.6 5 10.4M5.2 7.6h4.2a3.7 3.7 0 0 1 3.7 3.7v.5" />
  ),
  forward: <path d="m10 4.4 3.2 3.2-3.2 3.2M13.2 7.6H6.9a4 4 0 0 0-4 4v.8" />,
  folder: (
    <path d="M1.8 4h4.1l1.4 1.6h6.9v6.9a.9.9 0 0 1-.9.9H2.7a.9.9 0 0 1-.9-.9V4z" />
  ),
  rules: (
    <path d="M2.4 4.4h7.2M2.4 7.6h5M2.4 10.8h7.2M12 5.6v6M10.2 9.8l1.8 1.9 1.8-1.9" />
  ),
  unread: (
    <>
      <path d="M2 6.2 8 2.5l6 3.7v6.4a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6.2z" />
      <path d="m2 6.4 6 4.1 6-4.1" />
    </>
  ),
  flag: <path d="M4.4 2.2v11.6M4.4 3h7.4l-1.9 2.7 1.9 2.7H4.4" />,
  pin: (
    <path d="m9.4 2.4 4.2 4.2-2.6.8-1.5 3.4-4.3-4.3 3.4-1.5.8-2.6zM5.6 10.4l-3.2 3.2" />
  ),
  sparkle: (
    <path
      fill="currentColor"
      stroke="none"
      d="M8 1.6 9.3 6l4.4 1.3-4.4 1.3L8 13l-1.3-4.4L2.3 7.3 6.7 6 8 1.6z"
    />
  ),
  inbox: (
    <>
      <rect x="2" y="3.2" width="12" height="9.6" rx="1.2" />
      <path d="M2 9h3.3l1 1.7h3.4l1-1.7H14" />
    </>
  ),
  send: <path d="M14 2 1.9 7l4.5 1.7L8.1 14 14 2zM6.4 8.7 14 2" />,
  draft: (
    <path d="m3 13 .7-2.9 7.2-7.2a1.1 1.1 0 0 1 1.6 0l.6.6a1.1 1.1 0 0 1 0 1.6L5.9 12.3 3 13z" />
  ),
  junk: (
    <>
      <circle cx="8" cy="8" r="5.6" />
      <path d="m4.1 4.1 7.8 7.8" />
    </>
  ),
  note: <path d="M3 2.6h10V10l-3.4 3.4H3V2.6zM9.6 13.4V10H13" />,
  filter: <path d="M2.5 4.2h11M4.7 8h6.6M6.9 11.8h2.2" />,
  sort: (
    <path d="M5 3.2v9.6M3.2 10.9 5 12.8l1.8-1.9M11 12.8V3.2M9.2 5.1 11 3.2l1.8 1.9" />
  ),
  dealPlus: (
    <>
      <rect x="2" y="2.8" width="12" height="10.4" rx="1.4" />
      <path d="M8 5.6v4.8M5.6 8h4.8" />
    </>
  ),
  chevronDown: <path d="m4 6.2 4 4 4-4" />,
  chevronLeft: <path d="m9.8 4.2-3.8 3.8 3.8 3.8" />,
  chevronRight: <path d="m6.2 4.2 3.8 3.8-3.8 3.8" />,
  close: <path d="m4 4 8 8M12 4l-8 8" />,
  back: <path d="M13 8H3.4M7.2 4.2 3.4 8l3.8 3.8" />,
  panel: (
    <>
      <rect x="2" y="3" width="12" height="10" rx="1.5" />
      <path d="M6.2 3v10" />
    </>
  ),
  eye: (
    <>
      <path d="M1.8 8s2.3-4.1 6.2-4.1S14.2 8 14.2 8s-2.3 4.1-6.2 4.1S1.8 8 1.8 8z" />
      <circle cx="8" cy="8" r="1.9" />
    </>
  ),
  branch: (
    <>
      <circle cx="4.5" cy="3.7" r="1.5" />
      <circle cx="4.5" cy="12.3" r="1.5" />
      <circle cx="11.5" cy="5.7" r="1.5" />
      <path d="M4.5 5.2v5.6M11.5 7.2c0 2.7-3.3 2.2-5.3 3.3" />
    </>
  ),
  grid: (
    <>
      <rect x="2.6" y="2.6" width="4.7" height="4.7" rx="1" />
      <rect x="8.7" y="2.6" width="4.7" height="4.7" rx="1" />
      <rect x="2.6" y="8.7" width="4.7" height="4.7" rx="1" />
      <rect x="8.7" y="8.7" width="4.7" height="4.7" rx="1" />
    </>
  ),
  barChart: <path d="M3.6 13.2V8.8M8 13.2V4.4M12.4 13.2V10" />,
  card: (
    <>
      <rect x="1.8" y="3.6" width="12.4" height="9" rx="1.4" />
      <path d="M1.8 6.6h12.4M4.2 10.4h3.2" />
    </>
  ),
  trend: <path d="m2.4 11.6 4-4.4 2.6 2.4 4.6-5.2M10.4 4.4h3.2v3.2" />,
  building: (
    <>
      <path d="M4.2 13.4V2.8h7.6v10.6M2.6 13.4h10.8" />
      <path d="M6.5 5.3h1M8.9 5.3h1M6.5 7.7h1M8.9 7.7h1M7.3 13.4v-2.7h1.7v2.7" />
    </>
  ),
  export: (
    <path d="M13.4 2.6 7.8 8.2M9.6 2.4h4.2v4.2M13.4 9.4v3.2a1.4 1.4 0 0 1-1.4 1.4H3.6a1.4 1.4 0 0 1-1.4-1.4V4.2a1.4 1.4 0 0 1 1.4-1.4h3.2" />
  ),
  photo: (
    <>
      <rect x="2" y="3.2" width="12" height="9.6" rx="1.4" />
      <circle cx="5.7" cy="6.5" r="1.1" />
      <path d="m3.9 11.9 3.1-3.3 2.2 2.2 2.4-2.8 2.3 2.7" />
    </>
  ),
  star: (
    <path
      fill="currentColor"
      stroke="none"
      d="M8 1.9l1.9 3.8 4.2.6-3 3 .7 4.2L8 11.5l-3.8 2 .7-4.2-3-3 4.2-.6L8 1.9z"
    />
  ),
  tick: <path d="m3.6 8.6 2.9 2.9 6-7" />,
  info: (
    <>
      <circle cx="8" cy="8" r="5.5" />
      <path d="M8 7.4v3.2M8 5.2h.01" />
    </>
  ),
  arrowUpRight: <path d="M4.8 11.2 11.2 4.8M6.2 4.8h5v5" />,
};

function Glyph({
  name,
  className = "",
  style,
}: {
  name: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      {GLYPHS[name]}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Tab 1 - agentic deal origination in Outlook                         */
/* ------------------------------------------------------------------ */

// Ribbon furniture: icon-over-label command cells, grouped with a caption
// beneath - the classic Outlook ribbon at mock scale.
function RibbonItem({
  icon,
  label,
  tint,
  wide = false,
}: {
  icon: string;
  label: string;
  tint?: string;
  wide?: boolean;
}) {
  return (
    <div
      className={`flex ${wide ? "w-14" : "w-10"} flex-col items-center gap-1 pt-1.5 text-center`}
    >
      <Glyph
        name={icon}
        className="h-3.5 w-3.5"
        style={{ color: tint ?? "#52525b" }}
      />
      <span className="text-[7px] leading-[1.2] text-zinc-600">{label}</span>
    </div>
  );
}

function RibbonGroup({
  caption,
  children,
  className = "",
}: {
  caption: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-none flex-col border-r border-zinc-100 px-1 last:border-r-0 ${className}`}
    >
      <div className="flex flex-1 items-start justify-center">{children}</div>
      <span className="pb-1 text-center text-[7px] text-zinc-400">
        {caption}
      </span>
    </div>
  );
}

// One row of the folder pane: icon, name, count.
function FolderRow({
  icon,
  name,
  count,
  selected = false,
}: {
  icon: string;
  name: string;
  count?: string;
  selected?: boolean;
}) {
  return (
    <div
      className={`flex h-6 flex-none items-center gap-1.5 rounded-[4px] px-1.5 text-[10px] ${
        selected ? "bg-[#d5e4f2] font-medium text-zinc-900" : "text-zinc-600"
      }`}
    >
      <Glyph
        name={icon}
        className="h-3 w-3 flex-none"
        style={{ color: selected ? OUTLOOK_BLUE : "#a1a1aa" }}
      />
      <span className="truncate">{name}</span>
      {count && (
        <span
          className="ml-auto text-[9px]"
          style={{ color: selected ? OUTLOOK_BLUE : "#a1a1aa" }}
        >
          {count}
        </span>
      )}
    </div>
  );
}

// The message list, with Outlook's grouped-by-week headers. Fictional deals
// and names; the faces are free-license Pexels stock, served from
// /public/avatars. System senders (IT Security) keep an initials circle.
const mailRows: {
  initials: string;
  color: string;
  photo?: string;
  sender: string;
  subject: string;
  preview: string;
  time: string;
  unread?: boolean;
  selected?: boolean;
  attachment?: string;
  group?: string;
}[] = [
  {
    group: "This week",
    initials: "JW",
    color: "#7719aa",
    photo: "/avatars/james.jpg",
    sender: "James Whitfield",
    subject: "Priverd Lane Portfolio",
    preview: "Good morning both, can I check where we…",
    time: "10:20",
    unread: true,
  },
  {
    initials: "EL",
    color: "#0f6cbd",
    photo: "/avatars/ed.jpg",
    sender: "Ed Lawson",
    subject: "Harbour Yard - facility pack",
    preview: "Hi team, as promised, please see the attach…",
    time: "08:55",
    selected: true,
    attachment: "Harbour Yard fl…",
  },
  {
    group: "Last week",
    initials: "MW",
    color: "#0b6a0b",
    photo: "/avatars/marcus.jpg",
    sender: "Marcus Webb",
    subject: "Granary Wharf | term sheet v3",
    preview: "Clean version attached, redline to follow o…",
    time: "Fri 26/06",
    attachment: "Granary Whar…",
  },
  {
    initials: "HP",
    color: "#ca5010",
    photo: "/avatars/helen.jpg",
    sender: "Helen Price",
    subject: "Project Alder - facility drawdown",
    preview: "Drawdown notice attached, contingency n…",
    time: "Wed 24/06",
  },
  {
    initials: "AR",
    color: "#8661c5",
    photo: "/avatars/anita.jpg",
    sender: "Anita Rao",
    subject: "Weaver's Cross - bridge facility terms",
    preview: "Sharing the indicative terms discussed, su…",
    time: "Tue 23/06",
    unread: true,
  },
  {
    initials: "CD",
    color: "#498205",
    photo: "/avatars/chris.jpg",
    sender: "Chris Dalton",
    subject: "Kings Dock | PBSA senior debt",
    preview: "Hi team, following our call yesterday, the s…",
    time: "Tue 23/06",
  },
  {
    initials: "MW",
    color: "#0b6a0b",
    photo: "/avatars/marcus.jpg",
    sender: "Marcus Webb",
    subject: "Hawley Lane - stretched senior",
    preview: "Reverting with the updated sources & use…",
    time: "Mon 22/06",
  },
  {
    initials: "JW",
    color: "#7719aa",
    photo: "/avatars/james.jpg",
    sender: "James Whitfield",
    subject: "Falcon Wharf - redemption statement",
    preview: "Redemption statement attached for revie…",
    time: "Mon 22/06",
    attachment: "Redemption s…",
  },
  {
    initials: "JW",
    color: "#7719aa",
    photo: "/avatars/james.jpg",
    sender: "James Whitfield",
    subject: "Priverd Lane Portfolio Offering",
    preview: "Good morning both, can I check where we…",
    time: "Mon 22/06",
    unread: false,
  },
];

const favouriteFolders: { icon: string; name: string; count?: string }[] = [
  { icon: "inbox", name: "Inbox", count: "22" },
  { icon: "send", name: "Sent Items" },
  { icon: "draft", name: "Drafts", count: "[5]" },
];

const accountFolders: {
  icon: string;
  name: string;
  count?: string;
  selected?: boolean;
}[] = [
  { icon: "inbox", name: "Inbox", count: "22", selected: true },
  { icon: "draft", name: "Drafts", count: "[5]" },
  { icon: "send", name: "Sent Items" },
  { icon: "trash", name: "Deleted Items", count: "3" },
  { icon: "junk", name: "Junk Email" },
  { icon: "note", name: "Notes" },
  { icon: "archive", name: "Archive" },
  { icon: "search", name: "Search Folders" },
];

// One pass of the origination story in the Apps panel, timed to the window-
// level cursor in OutlookMock: the "Create new deal" button presses and
// confirms with "Sent!" as the cursor's click lands, then the toast follows.
// Remounted on a loop so the sequence replays.
function OriginationSequence() {
  const [sent, setSent] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setSent(true), 3400);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="relative">
        <motion.button
          tabIndex={-1}
          animate={{ scale: [1, 0.94, 1] }}
          transition={{ delay: 3.25, duration: 0.3, times: [0, 0.5, 1] }}
          className="flex w-full cursor-default items-center gap-2 rounded-md bg-zinc-900 px-2.5 py-2 text-[10px] font-medium text-white"
        >
          <Glyph
            name={sent ? "check" : "dealPlus"}
            className="h-3 w-3 flex-none"
          />
          {sent ? "Sent!" : "Create new deal"}
        </motion.button>
      </div>
      <button
        tabIndex={-1}
        className="mt-1.5 flex w-full cursor-default items-center gap-2 rounded-md border border-zinc-300 bg-white px-2.5 py-2 text-[10px] font-medium text-zinc-700"
      >
        <Glyph name="folder" className="h-3 w-3 flex-none text-zinc-500" />
        File to existing deal
      </button>

      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.7, duration: 0.35 }}
        className="mt-2 rounded-md border px-2 py-1 text-[9px] font-medium"
        style={{
          color: BRAND_GREEN,
          borderColor: `${BRAND_GREEN}44`,
          backgroundColor: `${BRAND_GREEN}14`,
        }}
      >
        ✓ Deal created: Harbour Yard
      </motion.div>
    </div>
  );
}

// The full new-Outlook chrome, at mock scale: blue title bar, menu row,
// ribbon, module rail, folder pane, Focused/Other message list, reading pane
// and the Apps panel where the Labrador add-in does its work.
function OutlookMock() {
  return (
    <Window label="outlook.office.com/mail">
      {/* Relative frame around the whole window body: the cursor crosses panes
          (message list → add-in button), so it and the choreography it triggers
          share this positioning context. The whole mock remounts each time the
          showcase brings it back into view, restarting the choreography from
          the top then - so it plays once per appearance and never resets while
          it's on screen. */}
      <div className="relative flex min-h-0 flex-1">
        {/* Module rail */}
        <aside className="hidden w-9 flex-none flex-col items-center gap-3.5 border-r border-zinc-100 pt-3 @min-[640px]:flex">
          <Glyph
            name="mail"
            className="h-4 w-4"
            style={{ color: OUTLOOK_BLUE }}
          />
          <Glyph name="calendar" className="h-4 w-4 text-zinc-400" />
          <Glyph name="people" className="h-4 w-4 text-zinc-400" />
          <Glyph name="check" className="h-4 w-4 text-zinc-400" />
          <Glyph name="waffle" className="h-4 w-4 text-zinc-400" />
        </aside>

        {/* Menu row + ribbon + panes */}
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex h-7 flex-none items-center gap-3.5 px-3 text-[10px] text-zinc-600">
            <Glyph name="hamburger" className="h-3 w-3 text-zinc-500" />
            <span>File</span>
            <span className="relative font-semibold text-zinc-900">
              Home
              <span
                className="absolute inset-x-0 -bottom-1 h-[2px] rounded-full"
                style={{ backgroundColor: OUTLOOK_BLUE }}
              />
            </span>
            <span>View</span>
            <span>Help</span>
          </div>

          {/* Ribbon */}
          <div className="flex flex-none items-stretch overflow-hidden border-y border-zinc-100 px-1.5">
            <RibbonGroup caption="New">
              <RibbonItem icon="newMail" label="New" tint={OUTLOOK_BLUE} />
            </RibbonGroup>
            <RibbonGroup caption="Delete">
              <RibbonItem icon="trash" label="Delete" />
              <RibbonItem icon="archive" label="Archive" />
            </RibbonGroup>
            <RibbonGroup caption="Report" className="hidden @min-[768px]:flex">
              <RibbonItem icon="shield" label="Report" tint="#c50f1f" />
            </RibbonGroup>
            <RibbonGroup caption="Respond">
              <RibbonItem icon="reply" label="Reply" tint="#8661c5" />
              <RibbonItem icon="replyAll" label="Reply all" tint="#8661c5" />
              <RibbonItem icon="forward" label="Forward" tint="#8661c5" />
            </RibbonGroup>
            <RibbonGroup caption="Move" className="hidden @min-[1024px]:flex">
              <RibbonItem icon="folder" label="Move to" />
              <RibbonItem icon="rules" label="Rules" />
            </RibbonGroup>
            <RibbonGroup caption="Quick steps" className="hidden @min-[1280px]:flex">
              <div className="mt-1.5 flex h-6 w-24 items-center justify-between rounded border border-zinc-200 px-1.5 text-[8px] text-zinc-500">
                Quick steps
                <Glyph name="chevronDown" className="h-2 w-2" />
              </div>
            </RibbonGroup>
            <RibbonGroup caption="Tags" className="hidden @min-[1024px]:flex">
              <RibbonItem icon="unread" label="Unread" />
              <RibbonItem icon="flag" label="Flag" tint="#c50f1f" />
              <RibbonItem icon="pin" label="Pin" />
            </RibbonGroup>
            <RibbonGroup caption="Add-ins">
              <div className="flex w-14 flex-col items-center gap-1 pt-1.5 text-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icon-32.png" alt="" className="h-3.5 w-3.5" />
                <span className="text-[7px] leading-[1.2] text-zinc-600">
                  Send to labrador
                </span>
              </div>
            </RibbonGroup>
          </div>

          <div className="flex min-h-0 flex-1">
            {/* Folder pane */}
            <aside className="hidden w-40 flex-none flex-col gap-px overflow-hidden border-r border-zinc-100 p-2 @min-[1024px]:flex @min-[1280px]:w-44">
              <div className="flex items-center gap-1.5 px-1.5 py-1 text-[10px] font-semibold text-zinc-800">
                <Glyph name="chevronDown" className="h-2 w-2 text-zinc-500" />
                Favourites
              </div>
              {favouriteFolders.map((f) => (
                <FolderRow key={f.name} {...f} />
              ))}
              <div className="mt-2 flex items-center gap-1.5 px-1.5 py-1 text-[10px] font-semibold text-zinc-800">
                <Glyph
                  name="chevronDown"
                  className="h-2 w-2 flex-none text-zinc-500"
                />
                <span className="truncate">you@efficura.com</span>
              </div>
              {accountFolders.map((f) => (
                <FolderRow key={f.name} {...f} />
              ))}
              <div className="mt-auto flex items-center gap-1.5 px-1.5 pt-1 text-[10px] text-zinc-600">
                <Glyph name="people" className="h-3 w-3 text-zinc-400" />
                Go to Groups
              </div>
            </aside>

            {/* Message list */}
            <aside className="hidden w-52 flex-none flex-col overflow-hidden border-r border-zinc-200 @min-[640px]:flex @min-[1024px]:w-60">
              <div className="flex h-8 flex-none items-center gap-3 border-b border-zinc-100 px-3 text-[10px]">
                <span className="relative font-semibold text-zinc-900">
                  Focused
                  <span
                    className="absolute inset-x-0 -bottom-[7px] h-[2px] rounded-full"
                    style={{ backgroundColor: OUTLOOK_BLUE }}
                  />
                </span>
                <span className="text-zinc-500">Other</span>
                <span className="ml-auto flex items-center gap-2 text-zinc-400">
                  <Glyph name="filter" className="h-3 w-3" />
                  <Glyph name="sort" className="h-3 w-3" />
                </span>
              </div>
              <div className="min-h-0 flex-1 overflow-hidden">
                {mailRows.map((row) => (
                  <Fragment key={`${row.sender}-${row.subject}`}>
                    {row.group && (
                      <div className="flex items-center gap-1.5 px-3 pb-1 pt-2 text-[9px] font-semibold text-zinc-700">
                        <Glyph
                          name="chevronDown"
                          className="h-2 w-2 text-zinc-400"
                        />
                        {row.group}
                      </div>
                    )}
                    {/* The selected row's tint lands just after the
                          window-level cursor's click dip (~0.43s). */}
                    <motion.div
                      initial={
                        row.selected
                          ? { backgroundColor: "rgba(244, 244, 245, 0)" }
                          : false
                      }
                      animate={
                        row.selected
                          ? { backgroundColor: "rgba(244, 244, 245, 1)" }
                          : undefined
                      }
                      transition={{ delay: 0.45, duration: 0.25 }}
                      className="relative flex gap-2 px-3 py-1.5"
                    >
                      {row.unread && (
                        <span
                          className="absolute inset-y-1 left-0 w-[3px] rounded-r"
                          style={{ backgroundColor: OUTLOOK_BLUE }}
                        />
                      )}
                      {row.photo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={row.photo}
                          alt=""
                          className="mt-0.5 h-6 w-6 flex-none rounded-full object-cover"
                        />
                      ) : (
                        <span
                          className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full text-[8px] font-semibold text-white"
                          style={{ backgroundColor: row.color }}
                        >
                          {row.initials}
                        </span>
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline justify-between gap-2">
                          <p className="truncate text-[10px] font-semibold text-zinc-800">
                            {row.sender}
                          </p>
                          <p
                            className={`flex-none text-[8px] ${
                              row.unread ? "font-semibold" : "text-zinc-400"
                            }`}
                            style={
                              row.unread ? { color: OUTLOOK_BLUE } : undefined
                            }
                          >
                            {row.time}
                          </p>
                        </div>
                        <p
                          className={`truncate text-[9px] ${
                            row.unread ? "font-semibold" : "text-zinc-600"
                          }`}
                          style={
                            row.unread ? { color: OUTLOOK_BLUE } : undefined
                          }
                        >
                          {row.subject}
                        </p>
                        <p className="truncate text-[9px] text-zinc-400">
                          {row.preview}
                        </p>
                        {row.attachment && (
                          <div className="mt-1 flex items-center gap-1">
                            <span className="flex items-center gap-1 rounded border border-zinc-200 bg-white px-1.5 py-0.5 text-[8px] text-zinc-500">
                              <Glyph
                                name="note"
                                className="h-2.5 w-2.5 flex-none text-zinc-400"
                              />
                              {row.attachment}
                            </span>
                            <span className="text-[8px] text-zinc-400">+2</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </Fragment>
                ))}
              </div>
            </aside>

            {/* Reading pane - blank until the clicked email "loads in", a
                  beat after the cursor's click on it in the list. */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.15, duration: 0.45 }}
              className="flex min-w-0 flex-1 flex-col overflow-hidden"
            >
              <div className="flex flex-none items-center gap-2 border-b border-zinc-100 px-4 py-2.5 @min-[1024px]:px-5">
                <p className="truncate text-xs font-semibold text-zinc-800 @min-[1024px]:text-sm">
                  Harbour Yard - facility pack
                </p>
                <span className="hidden flex-none items-center gap-1 text-[8px] text-zinc-400 @min-[1280px]:flex">
                  <span className="h-1.5 w-1.5 rounded-full bg-zinc-300" />
                  General\All Employees
                </span>
                <span className="ml-auto hidden flex-none items-center gap-1 rounded-md border border-zinc-200 px-2 py-1 text-[9px] text-zinc-600 @min-[768px]:flex">
                  <Glyph
                    name="sparkle"
                    className="h-2.5 w-2.5"
                    style={{ color: "#8661c5" }}
                  />
                  Summarise this email
                </span>
              </div>
              <div className="min-h-0 flex-1 overflow-hidden px-4 pt-3 @min-[1024px]:px-5">
                <p
                  className="flex items-center gap-1 text-[9px] font-medium"
                  style={{ color: OUTLOOK_BLUE }}
                >
                  <Glyph name="chevronDown" className="h-2 w-2" />
                  Hide message history
                </p>
                <p className="mt-3 text-[9px] text-zinc-400 @min-[1024px]:text-[10px]">
                  On Mon, 29 Jun at 08:55, Ed Lawson &lt;
                  <span className="underline" style={{ color: OUTLOOK_BLUE }}>
                    ed.lawson@excap.example
                  </span>
                  &gt; wrote:
                </p>
                <div className="mt-3 space-y-2 text-[10px] leading-relaxed text-zinc-600 @min-[1024px]:text-[11px]">
                  <p>Hi team,</p>
                  <p>
                    As promised, please see the attached pack in a high-level
                    format. It should be enough to get to broad figures ahead of
                    the detailed model, which is being worked through now
                    including build phasing and drawdowns.
                  </p>
                  <div className="space-y-1">
                    <p>- 120 Key Hotel</p>
                    <p>- £48.5m senior facility</p>
                    <p>- £83.0m GDV</p>
                    <p>- 58.4% LTV</p>
                    <p>- Stage 2 cost plan and appraisal attached</p>
                  </div>
                  <p>Timings:</p>
                  <div className="space-y-1">
                    <p>
                      - Exclusivity fee committed within the next 4 weeks; terms
                      buttoned down before then.
                    </p>
                    <p>
                      - Exchange end Sept STPP, completion 30 days after
                      planning.
                    </p>
                  </div>
                </div>
                <div className="mt-4 space-y-1.5">
                  <Bar className="w-11/12" />
                  <Bar className="w-3/4" />
                </div>
              </div>
              <div className="flex flex-none flex-wrap gap-1.5 px-4 pb-4 pt-3 @min-[1024px]:px-5">
                {["Floorplan pack.pdf", "Cost plan.xlsx", "Appraisal.pdf"].map(
                  (f) => (
                    <span
                      key={f}
                      className="rounded-md border border-zinc-200 bg-zinc-50 px-2 py-1 text-[9px] text-zinc-500"
                    >
                      {f}
                    </span>
                  ),
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* The Apps panel - where the Labrador add-in does the agentic bit. */}
        <aside className="flex w-40 flex-none flex-col border-l border-zinc-200 bg-white p-3 @min-[1024px]:w-52">
          <div className="flex flex-none items-center justify-between text-[10px] font-semibold text-zinc-800">
            Apps
            <span className="flex items-center gap-2 text-zinc-400">
              <Glyph name="close" className="h-2.5 w-2.5" />
            </span>
          </div>
          <div className="mt-2.5 flex flex-none items-center gap-1.5 text-[10px] text-zinc-700">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icon-32.png" alt="" className="h-3.5 w-3.5 flex-none" />
            Send to labrador
          </div>
          <div className="mt-2.5 flex min-h-0 flex-1 flex-col">
            <OriginationSequence />
          </div>
        </aside>

        {/* The cursor doing the work, window-level so it can cross panes:
              it starts on the already-open email in the list and clicks it,
              waits while the message loads into the reading pane, then
              swoops to the add-in's "Create new deal" button along a curve
              (the waypoints sample a bézier dipping through the reading
              pane, not a straight line). It's the hand (pointer) cursor
              while over the clickable things - the email row, then the
              button - and the arrow in between, flipping instantly only
              once it has actually crossed each rectangle's edge (~2.4s off
              the row, ~2.9s onto the button), like a real cursor. The scale
              keyframes are its two clicks, the second matched to the
              button's own press pulse at 3.25s. Positions are percentages
              of the window tuned for the desktop layout; hidden on narrow
              canvases, where the message list it starts on is hidden too. */}
        <motion.div
          aria-hidden
          initial={{ top: "34%", left: "27%" }}
          animate={{
            top: ["34%", "34%", "35.5%", "32%", "24%", "11%", "11%"],
            left: ["27%", "27%", "41%", "56%", "72%", "88%", "88%"],
          }}
          transition={{
            delay: 2,
            duration: 1.2,
            times: [0, 0.05, 0.35, 0.48, 0.6, 0.9, 1],
            ease: ["linear", "easeIn", "linear", "linear", "easeOut", "linear"],
          }}
          className="pointer-events-none absolute z-10 hidden @min-[640px]:block"
        >
          <motion.span
            className="relative block h-4 w-4"
            animate={{ scale: [1, 0.8, 1, 1, 0.8, 1] }}
            transition={{
              delay: 0.3,
              duration: 3.2,
              times: [0, 0.04, 0.08, 0.92, 0.96, 1],
            }}
          >
            <motion.span
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
              transition={{
                duration: 3.2,
                times: [0, 0.78, 0.781, 0.92, 0.921, 1],
              }}
            >
              <Pointer className="h-4 w-4" />
            </motion.span>
            <motion.span
              className="absolute inset-0"
              initial={{ opacity: 1 }}
              animate={{ opacity: [1, 1, 0, 0, 1, 1] }}
              transition={{
                duration: 3.2,
                times: [0, 0.78, 0.781, 0.92, 0.921, 1],
              }}
            >
              <Hand className="h-4 w-4" />
            </motion.span>
          </motion.span>
        </motion.div>
      </div>
    </Window>
  );
}

/* ------------------------------------------------------------------ */
/* Tab 2 - system of record: the asset page                            */
/* ------------------------------------------------------------------ */

// The deal's Asset (Day 1) page as the record of truth: breadcrumb chrome and
// deal-page sidebar around a pane that IS the asset - a slowly orbiting
// aerial render (the /api/aerial-view flyover) with the app's pin and status
// furniture floating over it, and the asset's headline figures counting up
// along the bottom. All data fictional.

const recordNav: { icon: string; label: string }[] = [
  { icon: "grid", label: "Live Overview" },
  { icon: "draft", label: "Facility Agreement" },
  { icon: "barChart", label: "Reporting" },
  { icon: "calendar", label: "Calendar" },
  { icon: "card", label: "Billing & Redemption" },
  { icon: "trend", label: "Transaction (Day 1)" },
  { icon: "building", label: "Asset (Day 1)" },
  { icon: "folder", label: "Data Room" },
  { icon: "export", label: "Exports" },
];

// The deal-page sidebar shared by the asset and reporting mocks; the active
// item carries the edge accent. `liveDot` marks Live Overview with the app's
// red live indicator and `activeChevron` marks the active item as expandable -
// both only on the screens whose story calls for them.
function RecordSidebar({
  active = 0,
  liveDot = false,
  activeChevron = false,
}: {
  active?: number;
  liveDot?: boolean;
  activeChevron?: boolean;
}) {
  return (
    <aside className="hidden w-40 flex-none flex-col gap-1 border-r border-zinc-100 bg-white px-2 pt-2 @min-[768px]:flex @min-[1024px]:w-48">
      {recordNav.map((item, i) => (
        <div
          key={item.label}
          className={`relative flex items-center gap-2 rounded-md px-2 py-1.5 text-[10px] ${
            i === active ? "font-medium text-zinc-900" : "text-zinc-500"
          }`}
        >
          {i === active && (
            <span className="absolute -left-2 top-1/2 h-3.5 w-[3px] -translate-y-1/2 rounded-r bg-zinc-900" />
          )}
          <Glyph
            name={item.icon}
            className={`h-3 w-3 flex-none ${i === active ? "text-zinc-800" : "text-zinc-400"}`}
          />
          <span className="truncate">{item.label}</span>
          {liveDot && i === 0 && (
            <span className="ml-auto h-1 w-1 flex-none rounded-full bg-red-500" />
          )}
          {activeChevron && i === active && (
            <Glyph
              name="chevronDown"
              className="ml-auto h-2 w-2 flex-none text-zinc-400"
            />
          )}
        </div>
      ))}
    </aside>
  );
}

// The app's top chrome: back arrow + sidebar toggle, the centred breadcrumb
// whose deal chip is the switcher (it pulses when the cursor clicks it -
// `pulse` off for screens without that story), and the investor-preview /
// Effi / changes cluster on the right (`minimal` trims it to Effi + avatar,
// as the app shows on the asset page).
function RecordTopBar({
  loop,
  pulse = true,
  minimal = false,
  asset = "Granary Wharf (Leeds)",
}: {
  loop: number;
  pulse?: boolean;
  minimal?: boolean;
  asset?: string;
}) {
  return (
    <div className="relative flex h-8 flex-none items-center bg-white px-3">
      <div className="flex items-center gap-2 @min-[768px]:w-[136px] @min-[768px]:justify-between @min-[1024px]:w-[168px]">
        <Glyph name="back" className="h-3 w-3 text-zinc-500" />
        <Glyph name="panel" className="hidden h-3 w-3 text-zinc-400 @min-[768px]:block" />
      </div>
      <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-1.5 text-[8px] text-zinc-400 @min-[1024px]:text-[9px]">
        <span className="hidden @min-[640px]:inline">Home</span>
        <span className="hidden text-zinc-300 @min-[640px]:inline">/</span>
        <span className="hidden items-center gap-0.5 @min-[640px]:flex">
          labrador
          <Glyph name="chevronDown" className="h-2 w-2" />
        </span>
        <span className="hidden text-zinc-300 @min-[640px]:inline">/</span>
        <motion.span
          key={loop}
          animate={pulse ? { scale: [1, 0.93, 1] } : undefined}
          transition={{ delay: 2.4, duration: 0.26, times: [0, 0.5, 1] }}
          className="flex items-center gap-1 font-medium text-zinc-700"
        >
          <Glyph
            name="building"
            className="h-2.5 w-2.5 flex-none text-zinc-500"
          />
          {asset}
          <Glyph name="chevronDown" className="h-2 w-2 text-zinc-400" />
        </motion.span>
      </div>
      <div className="ml-auto flex items-center gap-3 text-[8px] text-zinc-500 @min-[1024px]:text-[9px]">
        {!minimal && (
          <span className="hidden items-center gap-1 @min-[1280px]:flex">
            <Glyph name="eye" className="h-3 w-3 text-zinc-400" />
            Preview as Investor
          </span>
        )}
        <span className="hidden items-center gap-1 @min-[768px]:flex">
          <Glyph name="sparkle" className="h-2.5 w-2.5 text-zinc-400" />
          Ask Effi
        </span>
        {!minimal && (
          <span className="relative hidden items-center gap-1 @min-[768px]:flex">
            <Glyph name="branch" className="h-3 w-3 text-zinc-400" />
            Changes
            <span className="absolute -right-1.5 -top-0.5 h-1 w-1 rounded-full bg-orange-500" />
          </span>
        )}
        <span className="grid h-4 w-4 flex-none place-items-center rounded-full bg-zinc-800 text-[6px] font-semibold text-white @min-[1024px]:h-5 @min-[1024px]:w-5 @min-[1024px]:text-[7px]">
          TS
        </span>
      </div>
    </div>
  );
}

function AssetMock() {
  return (
    <Window label="labrador - Salesforce Tower">
      <div className="relative flex min-w-0 flex-1 flex-col">
        <RecordTopBar loop={0} pulse={false} minimal asset="Salesforce Tower" />

        <div className="flex min-h-0 flex-1">
          <RecordSidebar active={6} liveDot activeChevron />

          {/* The asset pane: the orbit fills it edge to edge - the still
              frame first, the video fading in over it - and the app furniture
              floats above on its own layers. The dark base is the no-imagery
              floor (API down, key missing) so the white type still reads. */}
          <div className="relative min-h-0 min-w-0 flex-1 overflow-hidden bg-zinc-800">
            {/* Google bakes a red location pin into the footage, hovering over
                the crown of the building. The pane is narrower than the 16:9
                frame, so object-position can't crop the pin out (cover trims the
                sides, not the top); instead we scale the orbit up from its base
                so the crown - and the pin above it - is pushed past the top edge
                and clipped by overflow-hidden. The labelled pin below is ours. */}
            <AerialVideo
              orientation="landscape"
              className="absolute inset-0 h-full w-full origin-bottom scale-[1.65] object-cover"
            />

            {/* Vignette so the footage sits back like the app's, then the
                legibility scrim under the white overlay type. */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.35)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black/60 via-black/25 to-transparent" />

            {/* Status cluster, top right: the live-usage pill and the
                open-externally button. */}
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.35 }}
              className="absolute right-3 top-3 flex items-center gap-2"
            >
              <span className="flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[8px] font-medium text-zinc-700 shadow-md @min-[1024px]:text-[9px]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                In use
              </span>
              <span className="grid h-5 w-5 place-items-center rounded-full bg-zinc-900/85 text-white shadow-md @min-[1024px]:h-6 @min-[1024px]:w-6">
                <Glyph name="export" className="h-2.5 w-2.5" />
              </span>
            </motion.div>

            {/* The asset's pin: label chip over a teardrop marker, dropped
                where the orbit keeps the building. */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.5,
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute left-1/2 top-[32%] flex -translate-x-1/2 flex-col items-center"
            >
              <span className="rounded-md bg-white px-2 py-1 text-[8px] font-medium text-zinc-800 shadow-md @min-[1024px]:text-[9px]">
                Salesforce Tower
              </span>
              <svg
                viewBox="0 0 24 24"
                aria-hidden
                className="mt-0.5 h-4 w-4 drop-shadow-md @min-[1024px]:h-5 @min-[1024px]:w-5"
              >
                <path
                  d="M12 1.8a7.2 7.2 0 0 1 7.2 7.2c0 5.2-7.2 13.2-7.2 13.2S4.8 14.2 4.8 9A7.2 7.2 0 0 1 12 1.8z"
                  fill="#fff"
                />
                <circle cx="12" cy="9" r="2.8" fill={BRAND_GREEN} />
              </svg>
            </motion.div>

            {/* The asset's headline figures, counting up on arrival, with the
                More-details affordance on the right. */}
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-x-6 gap-y-3 p-4 @min-[1024px]:px-6 @min-[1024px]:pb-5">
              <div className="min-w-0">
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.35 }}
                >
                  <p className="text-xl font-semibold text-white @min-[1024px]:text-3xl">
                    Salesforce Tower
                  </p>
                  <p className="mt-0.5 text-[9px] text-zinc-200 @min-[1024px]:text-[11px]">
                    San Francisco, CA
                  </p>
                </motion.div>

                <div className="mt-3 flex flex-wrap items-end gap-x-6 gap-y-2 @min-[1024px]:mt-4 @min-[1024px]:gap-x-10">
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.35 }}
                  >
                    <p className="text-sm font-semibold tabular-nums text-white @min-[1024px]:text-xl">
                      $<CountUp to={1400000000} delay={0.55} />
                    </p>
                    <p className="mt-0.5 text-[7px] text-zinc-300 @min-[1024px]:text-[9px]">
                      Market value
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.43, duration: 0.35 }}
                  >
                    <p className="text-sm font-semibold tabular-nums text-white @min-[1024px]:text-xl">
                      <CountUp
                        to={6.5}
                        delay={0.63}
                        format={(v) => `${v.toFixed(2)}%`}
                      />
                    </p>
                    <p className="mt-0.5 text-[7px] text-zinc-300 @min-[1024px]:text-[9px]">
                      Net initial yield
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.51, duration: 0.35 }}
                  >
                    <p className="text-sm font-semibold tabular-nums text-white @min-[1024px]:text-xl">
                      <CountUp to={1420079} delay={0.71} /> Sq Ft
                    </p>
                    <p className="mt-0.5 text-[7px] text-zinc-300 @min-[1024px]:text-[9px]">
                      Area
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.59, duration: 0.35 }}
                  >
                    <p className="text-sm font-semibold tabular-nums text-white @min-[1024px]:text-xl">
                      <CountUp
                        to={78}
                        delay={0.79}
                        format={(v) => `${Math.round(v)}%`}
                      />
                    </p>
                    <p className="mt-0.5 text-[7px] text-zinc-300 @min-[1024px]:text-[9px]">
                      Occupancy
                    </p>
                  </motion.div>
                </div>
              </div>

              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.35 }}
                className="flex flex-none items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[8px] font-medium text-zinc-800 shadow-md @min-[1024px]:text-[9px]"
              >
                More details
                <Glyph name="chevronDown" className="h-2 w-2" />
              </motion.span>
            </div>
          </div>
        </div>
      </div>
    </Window>
  );
}

/* ------------------------------------------------------------------ */
/* Tab 3 - the whole life of a deal: servicing & reporting             */
/* ------------------------------------------------------------------ */

// The deal's Reporting tab once the loan is under management: an approved
// monthly snapshot - the change summary and its donut, the period's headline
// figures, the key-metrics trend and the operational cards. The story: the
// report lands - figures count up, the trend line draws itself. All data
// fictional.

const reportChanges = [
  { label: "Decreased", count: 1, color: "#344e41" },
  { label: "Increased", count: 14, color: "#588157" },
  { label: "Info", count: 15, color: "#5b84ae" },
];
const REPORT_CHANGE_TOTAL = 30;

const reportMetrics: {
  label: string;
  sub?: string;
  value: (delay: number) => ReactNode;
}[] = [
  {
    label: "Valuation",
    value: (delay) => (
      <>
        £<CountUp to={106800000} delay={delay} />
      </>
    ),
  },
  {
    label: "Senior LTV",
    value: (delay) => (
      <CountUp to={35.58} delay={delay} format={(v) => `${v.toFixed(2)}%`} />
    ),
  },
  {
    label: "Net Rental Income (3M LB)",
    sub: "+4.2%",
    value: (delay) => (
      <>
        £<CountUp to={1385527} delay={delay} />
      </>
    ),
  },
  {
    label: "Loan outstanding",
    value: (delay) => (
      <>
        £<CountUp to={65000000} delay={delay} />
      </>
    ),
  },
];

// The series selectors under the trend chart; the active one is tinted and
// carries the black underline.
const trendSeries = [
  { label: "Net rental income (actual 3M LB)", value: "£1.4m", active: true },
  { label: "Net rental income (projected 6M LF)", value: "£3.6m" },
  { label: "Market value", value: "£106.8m" },
  { label: "Loan outstanding", value: "£65m" },
];

const operationalCards: {
  label: string;
  value: string;
  rows: [string, string][];
}[] = [
  {
    label: "Loan outstanding",
    value: "£65,000,000",
    rows: [
      ["Senior", "£38,000,000"],
      ["Mezzanine", "£27,000,000"],
    ],
  },
  {
    label: "Valuation / LTV",
    value: "£106,800,000",
    rows: [
      ["Senior LTV", "35.58%"],
      ["Mezz LTV", "60.86%"],
    ],
  },
  {
    label: "Net rental income (3M LB) / ICR",
    value: "£1,385,527",
    rows: [
      ["Senior interest", "£710,548"],
      ["Mezzanine interest", "£1,023,750"],
      ["Senior PICR", "255.49%"],
      ["Senior HICR", "194.99%"],
    ],
  },
  { label: "Arrears", value: "None", rows: [] },
];

// The changes donut: segments laid clockwise from 12 o'clock in legend
// order, as pathLength-normalised dashes so the fractions read straight
// off the counts.
function ChangesDonut() {
  // Fractions with cumulative start offsets, precomputed so the render stays
  // pure (no reassignment while rendering).
  const segments = reportChanges.map((seg, i) => ({
    ...seg,
    frac: seg.count / REPORT_CHANGE_TOTAL,
    offset: reportChanges
      .slice(0, i)
      .reduce((sum, s) => sum + s.count / REPORT_CHANGE_TOTAL, 0),
  }));
  return (
    <div className="relative h-20 w-20 flex-none @min-[1024px]:h-24 @min-[1024px]:w-24">
      <svg viewBox="0 0 64 64" aria-hidden className="h-full w-full -rotate-90">
        {segments.map((seg) => (
          <circle
            key={seg.label}
            cx="32"
            cy="32"
            r="25"
            pathLength={1}
            fill="none"
            stroke={seg.color}
            strokeWidth="13"
            strokeDasharray={`${seg.frac} ${1 - seg.frac}`}
            strokeDashoffset={-seg.offset}
          />
        ))}
      </svg>
      <span className="absolute inset-0 grid place-items-center text-[10px] tabular-nums text-zinc-800 @min-[1024px]:text-xs">
        <CountUp to={REPORT_CHANGE_TOTAL} delay={0.45} />
      </span>
    </div>
  );
}

// The key-metrics trend: light gridlines with £-labels above them, and a
// single black line that draws itself in. The viewBox stretches to fill the
// plot; its 10:1 aspect is close enough to the rendered plot's that the
// stroke stays visually uniform (non-scaling-stroke would break the
// dash-based pathLength draw).
function TrendChart() {
  return (
    <div className="mt-3">
      <div className="relative h-24 @min-[1024px]:h-32">
        {["£1.5m", "£1.4m", "£1.3m", "£1.3m"].map((label, i) => (
          <div
            key={i}
            className="absolute inset-x-0 border-t border-zinc-100"
            style={{ top: `${(i / 3) * 100}%` }}
          >
            <span className="absolute left-0 top-0 -translate-y-full pb-px text-[6px] text-zinc-400 @min-[1024px]:text-[7px]">
              {label}
            </span>
          </div>
        ))}
        <svg
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
          aria-hidden
          className="absolute inset-0 h-full w-full overflow-visible"
        >
          <motion.path
            d="M 0 100 C 300 100, 420 7, 540 6 C 630 5, 720 57, 800 57 C 870 57, 940 52, 1000 50"
            fill="none"
            stroke="#18181b"
            strokeWidth="1.6"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.7, duration: 1.4, ease: "easeInOut" }}
          />
        </svg>
      </div>
      <div className="mt-1.5 flex justify-between text-[6px] tracking-wide text-zinc-400 @min-[1024px]:text-[7px]">
        {["APR 2025", "JUL 2025", "OCT 2025", "JAN 2026", "APR 2026"].map(
          (t) => (
            <span key={t}>{t}</span>
          ),
        )}
      </div>
    </div>
  );
}

function ReportingMock() {
  return (
    <Window label="labrador - Granary Wharf (Leeds) - Reporting">
      {/* Plays once when the showcase brings this mock into view; the whole mock
          remounts on re-entry, so the report only re-lands when it comes back. */}
      <div className="flex min-w-0 flex-1 flex-col">
        <RecordTopBar loop={0} pulse={false} />

        <div className="flex min-h-0 flex-1">
          <RecordSidebar active={2} />

          <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
            {/* Page header: period, approval state, snapshot controls. */}
            <div className="flex flex-none flex-wrap items-center justify-between gap-2 border-b border-zinc-100 px-4 py-2 @min-[1024px]:px-6 @min-[1024px]:py-2.5">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-zinc-900 @min-[1024px]:text-xs">
                  Reporting
                </span>
                <span className="text-[10px] text-zinc-400 @min-[1024px]:text-[11px]">
                  APR 2026
                </span>
                <span className="flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[7px] font-medium text-emerald-600 @min-[1024px]:text-[8px]">
                  <Glyph name="check" className="h-2 w-2 flex-none" />
                  Approved
                  <span className="font-normal text-emerald-600/70">
                    · 29 Jun 2026
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[8px] @min-[1024px]:text-[9px]">
                <span className="flex items-center gap-1.5 rounded-md bg-zinc-100 px-2 py-1 text-zinc-700">
                  <Glyph
                    name="calendar"
                    className="h-2.5 w-2.5 flex-none text-zinc-500"
                  />
                  APR 2026
                  <span className="text-[7px] text-zinc-400">5</span>
                  <Glyph
                    name="chevronDown"
                    className="h-2 w-2 flex-none text-zinc-400"
                  />
                </span>
                <span className="hidden items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-2 py-1 text-zinc-600 @min-[640px]:flex">
                  <Glyph
                    name="trash"
                    className="h-2.5 w-2.5 flex-none text-zinc-500"
                  />
                  Bin snapshot
                </span>
                <span className="flex items-center gap-1.5 rounded-md bg-zinc-900 px-2 py-1 font-medium text-white">
                  <Glyph name="export" className="h-2.5 w-2.5 flex-none" />
                  Add snapshot
                </span>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-hidden px-4 pt-3 @min-[1024px]:px-6 @min-[1024px]:pt-4">
              {/* Changes since last report: the quoted count and the donut. */}
              <div className="flex flex-none items-center justify-between gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.35 }}
                  className="border-l-4 border-zinc-900 pl-2.5 @min-[1024px]:pl-3"
                >
                  <p className="text-xl font-semibold tabular-nums text-zinc-900 @min-[1024px]:text-3xl">
                    <CountUp to={REPORT_CHANGE_TOTAL} delay={0.3} />
                  </p>
                  <p className="mt-0.5 text-[9px] font-medium text-zinc-800 @min-[1024px]:text-[10px]">
                    Changes since last report
                  </p>
                  <p className="mt-1 text-[7px] text-zinc-400 @min-[1024px]:text-[8px]">
                    15 info
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.35 }}
                  className="flex items-center gap-3 @min-[1024px]:gap-4"
                >
                  <div className="w-24 space-y-1 @min-[1024px]:w-28">
                    {reportChanges.map((seg) => (
                      <div
                        key={seg.label}
                        className="flex items-center gap-1.5 text-[7px] @min-[1024px]:text-[8px]"
                      >
                        <span
                          className="h-1.5 w-1.5 flex-none rounded-full"
                          style={{ backgroundColor: seg.color }}
                        />
                        <span className="text-zinc-500">{seg.label}</span>
                        <span className="ml-auto tabular-nums text-zinc-700">
                          {seg.count}
                        </span>
                      </div>
                    ))}
                  </div>
                  <ChangesDonut />
                </motion.div>
              </div>

              {/* Headline figures for the period. */}
              <div className="mt-3 grid flex-none grid-cols-2 gap-x-4 gap-y-2 @min-[1024px]:mt-4 @min-[1024px]:grid-cols-4 @min-[1024px]:gap-x-8">
                {reportMetrics.map((m, i) => (
                  <motion.div
                    key={m.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + i * 0.08, duration: 0.35 }}
                  >
                    <p className="text-[8px] text-zinc-400 @min-[1024px]:text-[9px]">
                      {m.label}
                    </p>
                    <p className="mt-0.5 text-sm font-semibold tabular-nums text-zinc-900 @min-[1024px]:text-lg">
                      {m.value(0.45 + i * 0.08)}
                    </p>
                    {m.sub && (
                      <p className="mt-1 flex items-center gap-0.5 text-[7px] text-zinc-500 @min-[1024px]:text-[8px]">
                        <Glyph name="trend" className="h-2 w-2 flex-none" />
                        {m.sub}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Trend overview: the chart and its series selectors. */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.35 }}
                className="mt-3 flex-none @min-[1024px]:mt-5"
              >
                <p className="text-[10px] font-semibold text-zinc-900 @min-[1024px]:text-[11px]">
                  Trend overview{" "}
                  <span className="font-normal text-zinc-400">
                    · key metrics
                  </span>
                </p>
                <TrendChart />
                <div className="mt-2 grid grid-cols-2 @min-[640px]:grid-cols-4">
                  {trendSeries.map((s) => (
                    <div
                      key={s.label}
                      className={`px-2.5 py-1.5 ${
                        s.active ? "border-b-2 border-zinc-900 bg-zinc-50" : ""
                      }`}
                    >
                      <p className="truncate text-[6px] uppercase tracking-wide text-zinc-400 @min-[1024px]:text-[7px]">
                        {s.label}
                      </p>
                      <p className="mt-0.5 text-[11px] font-semibold tabular-nums text-zinc-900 @min-[1024px]:text-sm">
                        {s.value}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Operational snapshot cards. */}
              <div className="mt-3 flex-none @min-[1024px]:mt-5">
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.35 }}
                  className="text-[10px] font-semibold text-zinc-900 @min-[1024px]:text-[11px]"
                >
                  Operational{" "}
                  <span className="font-normal text-zinc-400">· snapshot</span>
                </motion.p>
                <div className="mt-2 grid grid-cols-2 gap-2 @min-[1024px]:grid-cols-4 @min-[1024px]:gap-3">
                  {operationalCards.map((card, i) => (
                    <motion.div
                      key={card.label}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.65 + i * 0.1, duration: 0.35 }}
                      className="rounded-lg border border-zinc-200 p-2.5 @min-[1024px]:p-3"
                    >
                      <p className="text-[7px] uppercase tracking-wide text-zinc-400 @min-[1024px]:text-[8px]">
                        {card.label}
                      </p>
                      <p className="mt-1 text-sm font-semibold tabular-nums text-zinc-900 @min-[1024px]:text-lg">
                        {card.value}
                      </p>
                      {card.rows.length > 0 && (
                        <div className="mt-2 space-y-1 text-[7px] @min-[1024px]:text-[8px]">
                          {card.rows.map(([k, v]) => (
                            <div
                              key={k}
                              className="flex items-center justify-between gap-1"
                            >
                              <span className="text-zinc-400">{k}</span>
                              <span className="tabular-nums text-zinc-600">
                                {v}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Window>
  );
}

/* ------------------------------------------------------------------ */
/* Tab 4 - talk to your documents & deals: the data-room chat          */
/* ------------------------------------------------------------------ */

// The Data Room's document chat: a credit memo open in the PDF viewer with
// Effi answering questions about it alongside. The story: a question types
// itself into the composer, the cursor sends it, the message posts, Effi
// thinks, then replies - the figures it quotes (£106.8m value, 35.58% senior
// LTV) match the asset and reporting mocks, so it reads as one deal, one
// truth. All data fictional.

const DOC_NAME = "Aldercott Capital – Granary Wharf Credit Memo (Apr 2026).pdf";

const docSuggestions = [
  "What market value does the valuation report?",
  "What is the senior LTV on the facility?",
  "What is the estate's current occupancy?",
];

const DOC_QUESTION = "What's the market value and current senior LTV?";
const DOC_ANSWER =
  "Granary Wharf Estate is valued at £106.8m as at April 2026. With £38m of senior debt drawn, the senior LTV is 35.58%.";
const docCitations = ["Valuation summary · p.3", "Debt schedule · p.12"];

// The credit memo's opening body copy, rendered as real text in the PDF pane so
// the page reads as an actual document. Figures track the asset/reporting mocks
// and Effi's answer (£106.8m value, £38m senior, 35.58% senior LTV) - one deal,
// one truth.
const MEMO_BODY = [
  "Aldercott Capital Group has been mandated to arrange a £65.0m senior facility secured against Granary Wharf Estate, a mixed-use waterside scheme in Leeds. This memorandum sets out the proposed terms, the underlying security and the sponsor's business plan for the asset.",
  "The estate was independently valued at £106.8m as at April 2026 by Kestrel Surveyors LLP on a market-value basis. With £38.0m of senior debt drawn at completion, the senior loan-to-value is 35.58%, comfortably inside the 65% covenant threshold in the facility agreement.",
  "Occupancy across the estate stands at 78%, with a weighted average unexpired lease term of 6.4 years and net rental income of £1.39m over the trailing three months. The senior tranche is fully covered on both a projected and historic interest-cover basis.",
];

// A stylized credit-memo first page for the PDF pane: sponsor wordmark and logo,
// the facility accent, then the opening section of body text - enough to read as
// a real document sitting behind the chat.
function DocCover() {
  return (
    <div className="flex h-full flex-col">
      <div className="px-4 pt-4">
        <div className="flex items-start justify-between">
          <p className="text-sm font-bold leading-[1.02] text-zinc-900 @min-[1024px]:text-base">
            Aldercott
            <br />
            Capital
            <br />
            Group
          </p>
          <div className="flex items-center gap-1">
            <span
              className="grid h-4 w-4 flex-none place-items-center rounded-sm text-[8px] font-bold text-white"
              style={{ backgroundColor: BRAND_GREEN }}
            >
              A
            </span>
            <span className="text-[6px] font-semibold leading-[1.15] text-zinc-700">
              ALDERCOTT
              <br />
              CAPITAL GROUP
            </span>
          </div>
        </div>
        <p
          className="mt-3 text-[9px] font-bold tracking-wide"
          style={{ color: BRAND_GREEN }}
        >
          FACILITY IV: GRANARY WHARF
        </p>
        <p className="mt-2 text-[7px] font-semibold text-zinc-600">April 2026</p>
        <p className="text-[7px] text-zinc-400">Credit Memorandum</p>
        <div
          className="mt-2.5 h-[2px] w-full rounded-full"
          style={{ backgroundColor: BRAND_GREEN }}
        />
      </div>

      <div className="mt-3 min-h-0 flex-1 overflow-hidden px-4">
        <p className="text-[8px] font-bold text-zinc-800">1. Executive Summary</p>
        <div className="mt-1.5 space-y-1.5 text-justify text-[6px] leading-[1.6] text-zinc-500">
          {MEMO_BODY.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>

      <div
        className="flex flex-none items-center justify-between border-t px-4 py-1.5 text-[6px] text-zinc-400"
        style={{ borderColor: `${BRAND_GREEN}33` }}
      >
        <span>
          Aldercott Capital{" "}
          <span style={{ color: BRAND_GREEN }}>Granary Wharf</span>
        </span>
        <span>1</span>
      </div>
    </div>
  );
}

// The composer's send-and-receive choreography, driving the chat column. It
// remounts with the mock, so it replays once per appearance: the question
// types itself in, the cursor swoops to Send and clicks, the message posts,
// Effi shows a thinking pulse, then the answer lands with its source chips.
function DocChatSequence() {
  // 0 idle · 1 typing · 2 sent · 3 thinking · 4 answered
  const [stage, setStage] = useState(0);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 500),
      setTimeout(() => setStage(2), 1800),
      setTimeout(() => setStage(3), 2200),
      setTimeout(() => setStage(4), 3200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // Type the question out while the composer is focused (stage 1).
  useEffect(() => {
    if (stage !== 1) return;
    let i = 0;
    const id = setInterval(() => {
      i += 2;
      setTyped(DOC_QUESTION.slice(0, i));
      if (i >= DOC_QUESTION.length) clearInterval(id);
    }, 28);
    return () => clearInterval(id);
  }, [stage]);

  const showTyped = stage === 1 && typed.length > 0;
  const active = stage >= 1;

  return (
    <div className="relative flex min-h-0 min-w-0 flex-1 flex-col bg-white">
      {/* Data-room breadcrumb + the open file. */}
      <div className="flex h-8 flex-none items-center gap-1.5 border-b border-zinc-100 px-3 text-[10px] text-zinc-500">
        <Glyph name="back" className="h-3 w-3 flex-none text-zinc-400" />
        <span className="flex-none">Data Room</span>
        <span className="flex-none text-zinc-300">/</span>
        <span className="flex min-w-0 items-center gap-1 text-zinc-700">
          <span className="h-3 w-2.5 flex-none rounded-[1px] bg-red-500" />
          <span className="truncate">{DOC_NAME}</span>
        </span>
      </div>

      {/* The conversation: empty state (heading + suggestions) cross-fades to
          the posted message and Effi's reply. */}
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {stage < 2 ? (
            <motion.div
              key="empty"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex h-full flex-col px-4 pt-4"
            >
              <p className="text-xs font-medium text-zinc-800 @min-[1024px]:text-sm">
                Ask a question about{" "}
                <span className="text-zinc-400">{DOC_NAME}</span>
              </p>
              <div className="mt-4 space-y-2">
                {docSuggestions.map((q) => (
                  <div
                    key={q}
                    className="flex items-center justify-between gap-2 rounded-lg border border-zinc-200 px-3 py-2 text-[10px] text-zinc-600"
                  >
                    <span className="truncate">{q}</span>
                    <Glyph
                      name="arrowUpRight"
                      className="h-3 w-3 flex-none text-zinc-300"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="convo"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="flex h-full flex-col justify-end gap-2.5 px-4 pb-3 pt-4"
            >
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="flex justify-end"
              >
                <p className="max-w-[85%] rounded-2xl rounded-br-sm bg-zinc-900 px-3 py-1.5 text-[10px] leading-snug text-white">
                  {DOC_QUESTION}
                </p>
              </motion.div>

              {stage >= 3 && (
                <div className="flex gap-2">
                  <span
                    className="grid h-5 w-5 flex-none place-items-center rounded-full"
                    style={{ backgroundColor: `${BRAND_GREEN}1a` }}
                  >
                    <Glyph
                      name="sparkle"
                      className="h-2.5 w-2.5"
                      style={{ color: BRAND_GREEN }}
                    />
                  </span>
                  {stage === 3 ? (
                    <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-white px-3 py-2 ring-1 ring-zinc-200">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="h-1.5 w-1.5 rounded-full bg-zinc-300"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{
                            duration: 0.9,
                            repeat: Infinity,
                            delay: i * 0.15,
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="min-w-0 rounded-2xl rounded-tl-sm bg-white px-3 py-2 ring-1 ring-zinc-200"
                    >
                      <p className="text-[10px] leading-relaxed text-zinc-700">
                        {DOC_ANSWER}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {docCitations.map((c) => (
                          <span
                            key={c}
                            className="flex items-center gap-1 rounded-md border border-zinc-200 bg-zinc-50 px-1.5 py-0.5 text-[8px] text-zinc-500"
                          >
                            <Glyph
                              name="note"
                              className="h-2 w-2 flex-none text-zinc-400"
                            />
                            {c}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Composer: the question types in, then clears once sent. */}
      <div className="flex-none px-4 pb-3">
        <div className="rounded-xl border border-zinc-200 bg-white px-3 py-2 shadow-sm">
          <div className="flex items-center gap-2">
            <p className="min-w-0 flex-1 truncate text-[10px]">
              {showTyped ? (
                <span className="text-zinc-800">
                  {typed}
                  <motion.span
                    className="ml-px inline-block h-2.5 w-px translate-y-[1px] bg-zinc-700 align-middle"
                    animate={{ opacity: [1, 0] }}
                    transition={{
                      duration: 0.55,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  />
                </span>
              ) : (
                <span className="text-zinc-400">
                  Ask a question about this document…
                </span>
              )}
            </p>
            <motion.button
              tabIndex={-1}
              animate={{ scale: [1, 0.9, 1] }}
              transition={{ delay: 1.5, duration: 0.3, times: [0, 0.5, 1] }}
              className={`flex flex-none cursor-default items-center gap-1 rounded-lg px-2.5 py-1.5 text-[9px] font-medium ${
                active ? "text-white" : "bg-zinc-100 text-zinc-400"
              }`}
              style={active ? { backgroundColor: BRAND_GREEN } : undefined}
            >
              <Glyph name="arrowUpRight" className="h-2.5 w-2.5 flex-none" />
              Ask
            </motion.button>
          </div>
        </div>
        <p className="mt-1.5 px-1 text-[8px] text-zinc-400">
          Check important answers against the PDF.
        </p>
      </div>

      {/* The cursor sending the message: it swoops to the Send button and
          clicks it, timed to the button's own press pulse at 1.5s. Percentages
          of the chat column, tuned for the desktop layout; hidden below sm. */}
      <motion.div
        aria-hidden
        initial={{ top: "52%", left: "34%" }}
        animate={{
          top: ["52%", "52%", "93%", "93%"],
          left: ["34%", "34%", "90%", "90%"],
        }}
        transition={{
          delay: 0.9,
          duration: 0.6,
          times: [0, 0.1, 0.85, 1],
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute z-20 hidden @min-[640px]:block"
      >
        <motion.span
          className="block h-4 w-4"
          animate={{ scale: [1, 1, 0.82, 1] }}
          transition={{ delay: 0.9, duration: 0.7, times: [0, 0.8, 0.88, 1] }}
        >
          <Pointer className="h-4 w-4" />
        </motion.span>
      </motion.div>
    </div>
  );
}

// The Data Room screen: the app chrome and sidebar around the document chat
// and, on wide layouts, the PDF viewer showing the open memo.
function DocChatMock() {
  return (
    <Window label="labrador - Granary Wharf (Leeds) - Data Room">
      <div className="relative flex min-w-0 flex-1 flex-col">
        <RecordTopBar loop={0} pulse={false} minimal />

        <div className="flex min-h-0 flex-1">
          <RecordSidebar active={7} />

          <div className="flex min-h-0 min-w-0 flex-1">
            <DocChatSequence />

            {/* PDF viewer: a toolbar over the open credit memo. */}
            <div className="hidden min-w-0 flex-1 flex-col border-l border-zinc-200 bg-zinc-100 @min-[1024px]:flex">
              <div className="flex h-8 flex-none items-center gap-2.5 border-b border-zinc-200 bg-white px-3 text-zinc-400">
                <Glyph name="hamburger" className="h-3 w-3" />
                <Glyph name="draft" className="h-3 w-3" />
                <Glyph name="filter" className="h-3 w-3" />
                <span className="ml-auto flex items-center gap-2">
                  <Glyph name="chevronLeft" className="h-3 w-3" />
                  <span className="rounded border border-zinc-200 px-1.5 py-0.5 text-[8px] text-zinc-600">
                    1
                  </span>
                  <span className="text-[8px]">of 21</span>
                  <Glyph name="chevronRight" className="h-3 w-3" />
                </span>
                <span className="ml-auto flex items-center gap-2.5">
                  <Glyph name="search" className="h-3 w-3" />
                  <Glyph name="export" className="h-3 w-3" />
                </span>
              </div>
              <div className="flex min-h-0 flex-1 justify-center overflow-hidden p-3">
                <div className="flex h-full aspect-[1/1.414] flex-none flex-col overflow-hidden rounded-sm bg-white shadow-md ring-1 ring-zinc-200">
                  <DocCover />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Window>
  );
}

/* ------------------------------------------------------------------ */
/* The screen                                                          */
/* ------------------------------------------------------------------ */

// One entry per product screen; `label` is documentation (it was the old tab
// caption) - nothing renders it. Order matters: LaptopShowcase keys its
// side-bubble copy to these indices.
const features: { label: string; Mock: () => ReactNode }[] = [
  {
    label: "A system of record for your entire pipeline",
    Mock: AssetMock,
  },
  {
    label: "Agentic deal origination, in your Outlook",
    Mock: OutlookMock,
  },
  {
    label: "The whole life of a deal, servicing included",
    Mock: ReportingMock,
  },
  {
    label: "Talk to your documents and deals",
    Mock: DocChatMock,
  },
];

export const MOCK_COUNT = features.length;

// Plays one mock full-bleed. The caller owns which one (LaptopShowcase cycles
// the index on a timer, synced with its bubbles). Keyed on the index so each
// change cross-fades and restarts the incoming mock's choreography from the
// top. Opacity only - any positional movement makes the whole screen jump.
//
// The root is a size container: the mocks' breakpoint variants (@min-[…])
// query the canvas MockScreen is drawn on, not the viewport - so a phone
// showing the 1280px canvas scaled down still gets the desktop layout.
export function MockScreen({ index }: { index: number }) {
  const Mock = features[index].Mock;
  return (
    <FramelessContext value={true}>
      <motion.div
        key={index}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="@container h-full w-full"
      >
        <Mock />
      </motion.div>
    </FramelessContext>
  );
}
