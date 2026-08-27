"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeftRight,
  Banknote,
  ChevronDown,
  Columns3,
  FileText,
  Info,
  type LucideIcon,
  PhoneCall,
  Pencil,
  Plus,
  ScrollText,
  Users,
} from "lucide-react";
import {
  CountUp,
  DonutRing,
  FadeIn,
  MockCursor,
  MockLoopCard,
  segmentDoneAt,
  SideNav,
  SPRINGER,
  SpringerChrome,
} from "@/components/SpringerMock";

/**
 * The fund-administration page's product shot: springer's entity record,
 * being used. The loan note's overview loads in - capital figures count up,
 * the committed/contributed/value donut sweeps itself round, the entity
 * details settle row by row - then the cursor swoops across to the sidebar,
 * clicks Investors, and the pane becomes the investor register: the
 * noteholders, their ownership and their balances, landing line by line
 * with the fund's totals at the foot. Built from the shared springer mock
 * kit (SpringerMock); all data fictional - the Ashgrove Credit / Harbour
 * Yard world.
 */

// The full sequence (overview → click → register) settles by ~4.7s; the
// dwell leaves the register on screen before the replay.
const PERIOD_MS = 10500;

// The cursor: idle by the figures, fly at 2.4s, click at 3.45s, and the
// pane turns over just after.
const FLIGHT_DELAY = 2.4;
const CLICK_S = 3.45;
const SWITCH_S = 3.6;

// The donut compares the three capital figures. Loan notes carry at par, so
// committed = contributed = current value and the ring reads as clean
// thirds. Sage and blue sit a touch under the chart chroma floor on purpose
// - the muted trio is the house chart palette (see ChangesDonut in
// ProductTabs), CVD separation and contrast pass, and the legend's labels +
// values carry identity so it never rides on colour alone.
const donutSeries = [
  { label: "Committed", display: "£2,500,000", value: 2500000, color: "#c2662d" },
  { label: "Contributed", display: "£2,500,000", value: 2500000, color: "#588157" },
  { label: "Current value", display: "£2,500,000", value: 2500000, color: "#5b84ae" },
];

const stats: { label: string; to: number }[] = [
  { label: "Committed", to: 2500000 },
  { label: "Contributed", to: 2500000 },
  { label: "Distributed", to: 51563 },
  { label: "Current value", to: 2500000 },
];

const sideNav = [
  { icon: Info, label: "Overview" },
  { icon: Users, label: "Investors" },
  { icon: ArrowLeftRight, label: "Transactions", section: "Money in & out" },
  { icon: PhoneCall, label: "Capital calls" },
  { icon: Banknote, label: "Distributions" },
  { icon: FileText, label: "Documents", section: "Paperwork" },
  { icon: ScrollText, label: "Capital statements" },
];

// The record's field groups, as two-column label/value tables. Interest and
// the distributed figure tell one story: £2.5m at 8.25% p.a. is ~£51,563 a
// quarter - the coupon the stats row shows as Distributed.
const detailSections: {
  heading: string;
  cols: [string, string][][];
}[] = [
  {
    heading: "Entity details",
    cols: [
      [
        ["Entity type", "Loan Note Finco"],
        ["Legal name", "Harbour Yard Loan Note Ltd"],
        ["Investor-facing name", "Harbour Yard Loan Note"],
        ["Collection", "Ashgrove Credit"],
      ],
      [
        ["Currency", "GBP"],
        ["Tags", "Fixed Income"],
        ["Target risk profile", "—"],
        ["Portal", "Published"],
      ],
    ],
  },
  {
    heading: "Key terms",
    cols: [
      [
        ["Inception date", "15 Mar 2026"],
        ["Maturity date", "15 Mar 2031"],
      ],
      [
        ["Interest rate", "8.25% p.a."],
        ["IRR", "—"],
      ],
    ],
  },
  {
    heading: "Lifecycle dates",
    cols: [
      [
        ["End of investing period", "31 Dec 2027"],
        ["End of investment life", "15 Mar 2031"],
      ],
      [["End of extension", "—"]],
    ],
  },
];

// The register: six noteholders whose commitments sum to the £2.5m the
// overview quotes, distributions pro rata to the £51,563 coupon.
const investorColumns = [
  "Account",
  "Role",
  "Investor group",
  "Ownership",
  "Committed",
  "Capital in",
  "Distributed",
  "Equity balance",
];
const investorGrid =
  "grid grid-cols-[2.1fr_0.6fr_1.1fr_0.9fr_1fr_1fr_1fr_1.1fr] items-center gap-2";

const investors: {
  account: string;
  ownership: string;
  committed: string;
  distributed: string;
}[] = [
  {
    account: "Alderton Family Office",
    ownership: "32.00%",
    committed: "£800,000",
    distributed: "£16,500",
  },
  {
    account: "Birchwood Pension Trust",
    ownership: "24.00%",
    committed: "£600,000",
    distributed: "£12,375",
  },
  {
    account: "Kestrel Capital Partners",
    ownership: "18.00%",
    committed: "£450,000",
    distributed: "£9,281",
  },
  {
    account: "H. & M. Calloway",
    ownership: "10.00%",
    committed: "£250,000",
    distributed: "£5,156",
  },
  {
    account: "Fenwick Estates LLP",
    ownership: "9.00%",
    committed: "£225,000",
    distributed: "£4,641",
  },
  {
    account: "Marchmont & Co.",
    ownership: "7.00%",
    committed: "£175,000",
    distributed: "£3,610",
  },
];

function DetailRow({
  label,
  value,
  delay,
}: {
  label: string;
  value: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center justify-between gap-6 border-b border-zinc-100 py-[7px]"
    >
      <span className="flex-none text-[10px] text-zinc-500">{label}</span>
      <span className="truncate text-[10px] font-medium text-zinc-800">
        {value}
      </span>
    </motion.div>
  );
}

function DetailSection({
  heading,
  cols,
  delay,
}: {
  heading: string;
  cols: [string, string][][];
  delay: number;
}) {
  return (
    <div className="mt-6">
      <FadeIn delay={delay}>
        <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
          {heading}
        </p>
      </FadeIn>
      <div className="mt-1 grid grid-cols-2 gap-x-14">
        {cols.map((rows, c) => (
          <div key={c}>
            {rows.map(([label, value], r) => (
              <DetailRow
                key={label}
                label={label}
                value={value}
                delay={delay + 0.08 + r * 0.06}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// The Overview tab: actions, the name block and donut, the field groups.
function OverviewPane() {
  return (
    <>
      {/* Actions: post / call / distribute on the left, state on the right. */}
      <FadeIn delay={0.05} className="flex items-center gap-2">
        {(
          [
            [ArrowLeftRight, "Post a transaction"],
            [PhoneCall, "Issue a capital call"],
            [Banknote, "Post a distribution"],
          ] as [LucideIcon, string][]
        ).map(([Icon, label]) => (
          <span
            key={label}
            className="flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-2.5 py-1.5 text-[9px] font-medium text-zinc-700"
          >
            <Icon className="h-3 w-3 flex-none text-zinc-500" strokeWidth={1.6} />
            {label}
          </span>
        ))}
        <span className="ml-auto flex items-center gap-1.5 rounded-full border border-zinc-200 px-2.5 py-1 text-[9px] font-medium text-zinc-700">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Active
        </span>
        <span className="flex items-center gap-1.5 rounded-md border border-zinc-200 px-2.5 py-1.5 text-[9px] font-medium text-zinc-700">
          <Pencil className="h-2.5 w-2.5 flex-none text-zinc-500" strokeWidth={1.6} />
          Edit
        </span>
      </FadeIn>

      {/* Header: the entity's name block with the capital donut opposite. */}
      <div className="mt-5 flex items-start justify-between gap-10">
        <div className="min-w-0 flex-1">
          <FadeIn delay={0.12}>
            <p className="text-[9px] font-medium tracking-wide text-zinc-500">
              Harbour Yard Loan Note Ltd
            </p>
            <p className="mt-1 text-[34px] font-light leading-none tracking-tight text-zinc-900">
              Harbour Yard Loan Note
            </p>
            <p className="mt-2 text-[11px] text-zinc-500">
              Loan Note Finco · Ashgrove Credit · GBP
            </p>
            <p className="mt-1 text-[9px] text-zinc-400">
              Inception 15 Mar 2026 · Maturity 15 Mar 2031
            </p>
          </FadeIn>

          {/* The capital figures, counting up as the record lands. */}
          <div className="mt-5 flex">
            {stats.map((s, i) => (
              <FadeIn
                key={s.label}
                delay={0.25 + i * 0.08}
                className={i > 0 ? "border-l border-zinc-100 pl-6 pr-7" : "pr-7"}
              >
                <p className="text-[9px] text-zinc-500">{s.label}</p>
                <p className="mt-1 text-[21px] font-medium leading-none tabular-nums text-zinc-900">
                  £<CountUp to={s.to} delay={0.4 + i * 0.08} />
                </p>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* The donut and its legend; rows land as their segments finish. */}
        <FadeIn delay={0.3} className="flex flex-none items-center gap-5 pt-1">
          <DonutRing series={donutSeries} />
          <div className="w-44 space-y-2">
            {donutSeries.map((seg, i) => (
              <motion.div
                key={seg.label}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: segmentDoneAt(donutSeries, i) - 0.12,
                  duration: 0.3,
                }}
                className="flex items-center gap-2 text-[9px]"
              >
                <span
                  className="h-2 w-2 flex-none rounded-[2px]"
                  style={{ backgroundColor: seg.color }}
                />
                <span className="text-zinc-500">{seg.label}</span>
                <span className="ml-auto font-medium tabular-nums text-zinc-800">
                  {seg.display}
                </span>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </div>

      {/* The record's field groups, settling row by row. */}
      {detailSections.map((section, i) => (
        <DetailSection
          key={section.heading}
          heading={section.heading}
          cols={section.cols}
          delay={0.55 + i * 0.22}
        />
      ))}

      {/* Notes - the free-text terms the statements lean on. */}
      <div className="mt-6">
        <FadeIn delay={1.2}>
          <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
            Notes
          </p>
          <p className="mt-2 text-[10px] leading-relaxed text-zinc-600">
            Interest paid quarterly in arrears. First coupon settled 30 Jun
            2026 and distributed pro rata across all positions.
          </p>
        </FadeIn>
      </div>
    </>
  );
}

// The Investors tab: the noteholder register as springer's terracotta-headed
// table, landing line by line. Delays are relative to the tab's own mount
// (it appears when the cursor's click switches the pane).
function InvestorsPane() {
  return (
    <>
      <FadeIn delay={0.05} className="flex items-center gap-2.5">
        <p className="text-[13px] font-semibold text-zinc-900">Investors</p>
        <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[8px] text-zinc-500">
          6 investors · 6 positions
        </span>
        <span className="ml-auto flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-2.5 py-1.5 text-[9px] font-medium text-zinc-700">
          <Columns3 className="h-3 w-3 flex-none text-zinc-500" strokeWidth={1.6} />
          Columns
          <ChevronDown className="h-2.5 w-2.5 flex-none text-zinc-400" strokeWidth={1.6} />
        </span>
        <span className="flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-2.5 py-1.5 text-[9px] font-medium text-zinc-700">
          <Plus className="h-3 w-3 flex-none text-zinc-500" strokeWidth={1.6} />
          Add investor
        </span>
      </FadeIn>

      <div className="mt-3">
        {/* Header band, springer terracotta. */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.12, duration: 0.25 }}
          className={`${investorGrid} rounded-t-[4px] px-3 py-2`}
          style={{ backgroundColor: SPRINGER }}
        >
          {investorColumns.map((col, i) => (
            <span
              key={col}
              className={`text-[8px] font-medium text-white ${i > 0 ? "text-right" : ""}`}
            >
              {col}
            </span>
          ))}
        </motion.div>

        {/* The register, one noteholder at a time. */}
        {investors.map((inv, i) => (
          <motion.div
            key={inv.account}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2 + i * 0.07,
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`${investorGrid} border-b border-zinc-100 px-3 py-[9px]`}
          >
            <span className="truncate text-[9px] font-medium text-zinc-800">
              {inv.account}
            </span>
            <span className="text-right text-[9px] text-zinc-400">—</span>
            <span className="text-right text-[9px] text-zinc-600">
              Noteholder
            </span>
            <span className="text-right text-[9px] tabular-nums text-zinc-700">
              {inv.ownership}
            </span>
            <span className="text-right text-[9px] tabular-nums text-zinc-700">
              {inv.committed}
            </span>
            <span className="text-right text-[9px] tabular-nums text-zinc-700">
              {inv.committed}
            </span>
            <span className="text-right text-[9px] tabular-nums text-zinc-700">
              {inv.distributed}
            </span>
            <span className="text-right text-[9px] tabular-nums text-zinc-700">
              {inv.committed}
            </span>
          </motion.div>
        ))}

        {/* Totals, computed from the ledger like everything else. */}
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.2 + investors.length * 0.07 + 0.08,
            duration: 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={`${investorGrid} px-3 py-[9px]`}
        >
          <span className="text-[9px] font-semibold text-zinc-900">
            Total (GBP)
          </span>
          <span />
          <span />
          <span className="text-right text-[9px] font-semibold tabular-nums text-zinc-900">
            100.00%
          </span>
          <span className="text-right text-[9px] font-semibold tabular-nums text-zinc-900">
            £2,500,000
          </span>
          <span className="text-right text-[9px] font-semibold tabular-nums text-zinc-900">
            £2,500,000
          </span>
          <span className="text-right text-[9px] font-semibold tabular-nums text-zinc-900">
            £51,563
          </span>
          <span className="text-right text-[9px] font-semibold tabular-nums text-zinc-900">
            £2,500,000
          </span>
        </motion.div>
      </div>
    </>
  );
}

// The screen: chrome, the entity sidebar and the tabbed pane, plus the
// cursor that walks the story from the overview to the register.
function EntityScreen() {
  const [tab, setTab] = useState<"overview" | "investors">("overview");

  // The pane follows the cursor: the click lands at CLICK_S, the tab turns
  // over just after.
  useEffect(() => {
    const t = setTimeout(() => setTab("investors"), SWITCH_S * 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <SpringerChrome title="labrador - springer - Harbour Yard Loan Note">
      <div className="flex min-h-0 flex-1">
        <SideNav
          items={sideNav}
          active={tab === "overview" ? "Overview" : "Investors"}
          pressed="Investors"
          clickAt={CLICK_S}
          markerId="fundAdminSideActive"
        />

        {/* The pane: overview until the click lands, then the register. */}
        <div className="min-h-0 min-w-0 flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            {tab === "overview" ? (
              <motion.div
                key="overview"
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="h-full px-8 pt-4"
              >
                <OverviewPane />
              </motion.div>
            ) : (
              <motion.div
                key="investors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
                className="h-full px-8 pt-4"
              >
                <InvestorsPane />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* The cursor: idle by the capital figures while the overview lands,
          swoop to the sidebar, click Investors. */}
      <MockCursor
        from={[40, 82]}
        to={[16.25, 4.3]}
        delay={FLIGHT_DELAY}
        clickAt={CLICK_S}
      />
    </SpringerChrome>
  );
}

export function FundAdminDemo() {
  return (
    <MockLoopCard periodMs={PERIOD_MS}>
      <EntityScreen />
    </MockLoopCard>
  );
}
