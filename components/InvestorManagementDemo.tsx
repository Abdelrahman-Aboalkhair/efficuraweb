"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  CreditCard,
  FileDown,
  FileText,
  Info,
  Landmark,
  LayoutGrid,
  Plus,
  X,
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
 * The investor-management page's product shot: one LP's account record,
 * being used. The account page loads in - the capital figures count up, the
 * allocation-by-current-value donut sweeps itself round, tags, bank details
 * and the positions table settle - then the cursor swoops across to the
 * sidebar, clicks Reports, and the pane becomes the LP's portfolio summary:
 * invested/returned/balance with interest and principal kept distinct, the
 * positions statement, and the distribution history with typed components.
 * Built from the shared springer mock kit (SpringerMock); all data
 * fictional - the Alderton Family Office / Harbour Yard world (the same
 * £800,000 Harbour Yard position the fund-administration demo shows from
 * the fund's side).
 */

// The full sequence (account → click → report) settles by ~5.1s; the dwell
// leaves the statement on screen before the replay.
const PERIOD_MS = 11000;

// The cursor: idle by the figures, fly at 2.4s, click at 3.45s, and the
// pane turns over just after.
const FLIGHT_DELAY = 2.4;
const CLICK_S = 3.45;
const SWITCH_S = 3.6;

const sideNav = [
  { icon: Info, label: "Overview" },
  { icon: CreditCard, label: "Accounts" },
  { icon: LayoutGrid, label: "Holdings" },
  { icon: FileText, label: "Reports" },
];

// Allocation by current value: the account's positions across the fictional
// vehicles, £2,975,000 in all. Sage/blue sit a touch under the chart chroma
// floor on purpose (the house palette - see ChangesDonut in ProductTabs);
// the ochre, plum and neutral slots were validated alongside them - CVD
// separation and contrast pass, and the legend's labels + values carry
// identity. "Other" is deliberately neutral: it names no single holding.
const allocation = [
  { label: "Harbour Yard Loan Note", display: "£800,000", value: 800000, color: "#c2662d" },
  { label: "Granary Wharf Loan Note", display: "£650,000", value: 650000, color: "#588157" },
  { label: "Kings Dock Finco Ltd", display: "£500,000", value: 500000, color: "#5b84ae" },
  { label: "Falcon Wharf Loan Note", display: "£450,000", value: 450000, color: "#a1821f" },
  { label: "Weaver's Cross Bridge Finco", display: "£300,000", value: 300000, color: "#7d5a8c" },
  { label: "Other (2)", display: "£275,000", value: 275000, color: "#78716c" },
];

const accountStats: { label: string; to: number }[] = [
  { label: "Committed", to: 3400000 },
  { label: "Capital in", to: 3400000 },
  { label: "Distributed", to: 612480 },
  { label: "Current value", to: 2975000 },
];

// The account's positions (Entity / Committed / Capital in / Distributed /
// Current value / Share). Fully drawn notes carry at par; Falcon Wharf has
// returned £125,000 of principal, so its value sits below capital in.
const positionsGrid =
  "grid grid-cols-[2.2fr_1fr_1fr_1fr_1.1fr_0.6fr] items-center gap-2";
const positionColumns = [
  "Entity",
  "Committed",
  "Capital in",
  "Distributed",
  "Current value",
  "Share",
];
const positions: string[][] = [
  ["Harbour Yard Loan Note", "£800,000", "£800,000", "£16,500", "£800,000", "32.0%"],
  ["Granary Wharf Loan Note", "£650,000", "£650,000", "£103,300", "£650,000", "18.6%"],
  ["Falcon Wharf Loan Note", "£575,000", "£575,000", "£307,930", "£450,000", "24.1%"],
  ["Kings Dock Finco Ltd", "£500,000", "£500,000", "£9,750", "£500,000", "12.5%"],
  ["Weaver's Cross Bridge Finco", "£300,000", "£300,000", "£0", "£300,000", "9.4%"],
];

// The portfolio summary: invested/returned reconcile with the account page
// (£612,480 returned = £287,480 interest + £325,000 principal; balance =
// invested less principal returned).
const reportStats: {
  label: string;
  to: number;
  subs?: string[];
}[] = [
  { label: "Invested", to: 3400000 },
  {
    label: "Returned",
    to: 612480,
    subs: [
      "£287,480 return on capital (interest)",
      "£325,000 return of capital (principal)",
    ],
  },
  { label: "Balance", to: 3075000 },
  { label: "Current value", to: 2975000 },
];

const reportGrid =
  "grid grid-cols-[2.2fr_1fr_1.3fr_1fr_1fr] items-center gap-2";
const reportColumns = [
  "Position",
  "Invested",
  "Returned",
  "Balance",
  "Current value",
];
const reportPositions: {
  position: string;
  invested: string;
  returned: string;
  returnedSub: string;
  balance: string;
  value: string;
}[] = [
  {
    position: "Harbour Yard Loan Note",
    invested: "£800,000",
    returned: "£16,500",
    returnedSub: "£16,500 on · £0 of",
    balance: "£800,000",
    value: "£800,000",
  },
  {
    position: "Falcon Wharf Loan Note",
    invested: "£575,000",
    returned: "£307,930",
    returnedSub: "£182,930 on · £125,000 of",
    balance: "£450,000",
    value: "£450,000",
  },
  {
    position: "Granary Wharf Loan Note",
    invested: "£650,000",
    returned: "£103,300",
    returnedSub: "£78,300 on · £25,000 of",
    balance: "£625,000",
    value: "£650,000",
  },
];

const historyGrid =
  "grid grid-cols-[0.9fr_2.2fr_1.2fr_0.9fr_0.9fr] items-center gap-2";
const historyColumns = ["Date", "Position", "Type", "Component", "Amount"];
const history: {
  date: string;
  position: string;
  type: string;
  component: "Interest" | "Principal";
  amount: string;
}[] = [
  {
    date: "30 Jun 2026",
    position: "Harbour Yard Loan Note",
    type: "Interest",
    component: "Interest",
    amount: "£16,500",
  },
  {
    date: "29 May 2026",
    position: "Falcon Wharf Loan Note",
    type: "Redemption",
    component: "Principal",
    amount: "£125,000",
  },
  {
    date: "12 May 2026",
    position: "Granary Wharf Loan Note",
    type: "Return of capital",
    component: "Principal",
    amount: "£25,000",
  },
  {
    date: "30 Apr 2026",
    position: "Granary Wharf Loan Note",
    type: "Interest",
    component: "Interest",
    amount: "£13,300",
  },
];

// The GBP/EUR toggle, GBP carrying springer's terracotta.
function CurrencyToggle() {
  return (
    <div className="flex w-fit overflow-hidden rounded-md border border-zinc-200 text-[9px] font-medium">
      <span className="px-3.5 py-1 text-white" style={{ backgroundColor: SPRINGER }}>
        GBP
      </span>
      <span className="bg-white px-3.5 py-1 text-zinc-500">EUR</span>
    </div>
  );
}

// A terracotta table-header band.
function TableHead({ grid, columns }: { grid: string; columns: string[] }) {
  return (
    <div
      className={`${grid} rounded-t-[4px] px-3 py-2`}
      style={{ backgroundColor: SPRINGER }}
    >
      {columns.map((col, i) => (
        <span
          key={col}
          className={`text-[8px] font-medium text-white ${i > 0 ? "text-right" : ""}`}
        >
          {col}
        </span>
      ))}
    </div>
  );
}

// The Accounts tab: one LP's account record - name block, allocation donut,
// tags, bank details and the positions table.
function AccountPane() {
  return (
    <>
      {/* Record breadcrumb: the register this account was opened from. */}
      <FadeIn delay={0.05} className="flex items-center gap-1.5 text-[9px]">
        <span className="text-zinc-400">Accounts</span>
        <span className="text-zinc-300">/</span>
        <span className="font-medium text-zinc-800">Alderton Family Office</span>
        <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[8px] text-zinc-500">
          7 positions
        </span>
        <X className="ml-auto h-3 w-3 text-zinc-400" strokeWidth={1.6} />
      </FadeIn>

      {/* Header: the account's name block with the allocation opposite. */}
      <div className="mt-4 flex items-start justify-between gap-10">
        <div className="min-w-0 flex-1">
          <FadeIn delay={0.12}>
            <p className="text-[34px] font-light leading-none tracking-tight text-zinc-900">
              Alderton Family Office
            </p>
            <p className="mt-2 text-[11px] text-zinc-500">
              Family Office · London, United Kingdom
            </p>
            <p className="mt-1 text-[9px] text-zinc-400">
              Held by <span className="text-zinc-600">Alderton Trustees Ltd</span>
            </p>
          </FadeIn>
          <FadeIn delay={0.2} className="mt-3">
            <CurrencyToggle />
          </FadeIn>

          {/* The account's capital figures, counting up. */}
          <div className="mt-4 flex">
            {accountStats.map((s, i) => (
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

        {/* Allocation by current value; legend rows land with their segments. */}
        <FadeIn delay={0.3} className="flex-none">
          <p className="text-[8px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
            Allocation by current value
          </p>
          <div className="mt-2 flex items-center gap-5">
            <DonutRing series={allocation} />
            <div className="w-48 space-y-1.5">
              {allocation.map((seg, i) => (
                <motion.div
                  key={seg.label}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: segmentDoneAt(allocation, i) - 0.12,
                    duration: 0.3,
                  }}
                  className="flex items-center gap-2 text-[8px]"
                >
                  <span
                    className="h-2 w-2 flex-none rounded-[2px]"
                    style={{ backgroundColor: seg.color }}
                  />
                  <span className="truncate text-zinc-500">{seg.label}</span>
                  <span className="ml-auto flex-none font-medium tabular-nums text-zinc-800">
                    {seg.display}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Tags drive filtering and distribution lists. */}
      <div className="mt-5">
        <FadeIn delay={0.75}>
          <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
            Tags
          </p>
          <div className="mt-1.5 rounded-md border border-zinc-200 px-3 py-2 text-[9px] text-zinc-400">
            Add tags — they drive filtering and distribution lists
          </div>
        </FadeIn>
      </div>

      {/* Bank details: append-only and versioned, and the card says where
          they came from. Fictional account at a fictional bank. */}
      <div className="mt-4">
        <FadeIn delay={0.9}>
          <div className="flex items-center justify-between">
            <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
              Bank details
            </p>
            <span className="flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-2.5 py-1.5 text-[9px] font-medium text-zinc-700">
              <Plus className="h-3 w-3 flex-none text-zinc-500" strokeWidth={1.6} />
              Add bank details
            </span>
          </div>
          <div className="mt-2 rounded-md border border-zinc-100 px-3 py-2.5">
            <div className="flex items-center gap-2">
              <span className="grid h-6 w-6 flex-none place-items-center rounded-md bg-zinc-100">
                <Landmark className="h-3 w-3 text-zinc-500" strokeWidth={1.6} />
              </span>
              <span className="text-[9px] font-medium text-zinc-800">
                Bremont Bank · GBP current account
              </span>
              <span className="ml-auto flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[8px] font-medium text-emerald-600">
                <span className="h-1 w-1 rounded-full bg-emerald-500" />
                Verified
              </span>
              <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[8px] text-zinc-500">
                v2
              </span>
            </div>
            <div className="mt-2 grid grid-cols-4 gap-x-6">
              {(
                [
                  ["Account name", "Alderton Family Office"],
                  ["Sort code", "20-45-71"],
                  ["Account number", "31742209"],
                  ["IBAN", "GB29 BRMT 2045 7131 74"],
                ] as [string, string][]
              ).map(([label, value]) => (
                <div key={label}>
                  <p className="text-[8px] text-zinc-400">{label}</p>
                  <p className="mt-0.5 truncate text-[9px] font-medium tabular-nums text-zinc-700">
                    {value}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-2 text-[8px] text-zinc-400">
              Added from a signed instruction · 12 May 2026 · changes are
              versioned, never overwritten.
            </p>
          </div>
        </FadeIn>
      </div>

      {/* The account's positions across the vehicles. */}
      <div className="mt-4">
        <FadeIn delay={1.05} className="flex items-baseline gap-2">
          <p className="text-[10px] font-semibold text-zinc-900">Positions</p>
          <span className="text-[9px] text-zinc-400">7</span>
        </FadeIn>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.12, duration: 0.25 }}
          className="mt-1.5"
        >
          <TableHead grid={positionsGrid} columns={positionColumns} />
        </motion.div>
        {positions.map((row, i) => (
          <motion.div
            key={row[0]}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 1.2 + i * 0.06,
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`${positionsGrid} border-b border-zinc-100 px-3 py-[8px]`}
          >
            {row.map((cell, c) => (
              <span
                key={c}
                className={
                  c === 0
                    ? "truncate text-[9px] font-medium text-zinc-800"
                    : "text-right text-[9px] tabular-nums text-zinc-700"
                }
              >
                {cell}
              </span>
            ))}
          </motion.div>
        ))}
      </div>
    </>
  );
}

// The Reports tab: the LP's portfolio summary - a capital account statement
// on screen. Delays are relative to the tab's own mount (it appears when
// the cursor's click switches the pane).
function ReportsPane() {
  return (
    <>
      <FadeIn delay={0.05} className="flex items-center gap-2">
        <p className="text-[13px] font-semibold text-zinc-900">Reports</p>
        <span className="ml-auto text-[8px] text-zinc-400">As of</span>
        <span className="flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-2.5 py-1.5 text-[9px] text-zinc-600">
          <Calendar className="h-3 w-3 flex-none text-zinc-400" strokeWidth={1.6} />
          Today
        </span>
        <span className="flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-2.5 py-1.5 text-[9px] font-medium text-zinc-700">
          <FileDown className="h-3 w-3 flex-none text-zinc-500" strokeWidth={1.6} />
          Export PDF
        </span>
      </FadeIn>

      <FadeIn delay={0.12} className="mt-4 flex items-start justify-between gap-6">
        <p className="text-[24px] font-light leading-none tracking-tight text-zinc-900">
          Portfolio summary
        </p>
        <CurrencyToggle />
      </FadeIn>

      {/* Invested / returned / balance / value, interest ≠ principal. */}
      <div className="mt-4 flex">
        {reportStats.map((s, i) => (
          <FadeIn
            key={s.label}
            delay={0.2 + i * 0.07}
            className={i > 0 ? "border-l border-zinc-100 pl-6 pr-8" : "pr-8"}
          >
            <p className="text-[9px] text-zinc-500">{s.label}</p>
            <p className="mt-1 text-[21px] font-medium leading-none tabular-nums text-zinc-900">
              £<CountUp to={s.to} delay={0.35 + i * 0.07} />
            </p>
            {s.subs?.map((sub) => (
              <p key={sub} className="mt-1 text-[8px] text-zinc-400">
                <span className="font-medium text-zinc-500">
                  {sub.split(" ")[0]}
                </span>{" "}
                {sub.split(" ").slice(1).join(" ")}
              </p>
            ))}
          </FadeIn>
        ))}
      </div>

      {/* Snapshots are a deliberate second step, so the empty state says so. */}
      <FadeIn delay={0.5} className="mt-4">
        <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
          Generated reports
        </p>
        <p className="mt-1.5 text-[9px] text-zinc-400">
          No snapshots exported yet — use{" "}
          <span className="font-medium text-zinc-600">Export PDF</span> to
          freeze a copy of this statement.
        </p>
      </FadeIn>

      {/* The positions statement. */}
      <div className="mt-4">
        <FadeIn delay={0.6}>
          <p className="text-[10px] font-semibold text-zinc-900">Positions</p>
        </FadeIn>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.68, duration: 0.25 }}
          className="mt-1.5"
        >
          <TableHead grid={reportGrid} columns={reportColumns} />
        </motion.div>
        {reportPositions.map((row, i) => (
          <motion.div
            key={row.position}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.76 + i * 0.08,
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`${reportGrid} border-b border-zinc-100 px-3 py-[7px]`}
          >
            <span className="min-w-0">
              <span className="block truncate text-[9px] font-medium text-zinc-800">
                {row.position}
              </span>
              <span className="block text-[8px] text-zinc-400">
                Alderton Family Office
              </span>
            </span>
            <span className="text-right text-[9px] tabular-nums text-zinc-700">
              {row.invested}
            </span>
            <span className="text-right">
              <span className="block text-[9px] tabular-nums text-zinc-700">
                {row.returned}
              </span>
              <span className="block text-[8px] tabular-nums text-zinc-400">
                {row.returnedSub}
              </span>
            </span>
            <span className="text-right text-[9px] tabular-nums text-zinc-700">
              {row.balance}
            </span>
            <span className="text-right text-[9px] tabular-nums text-zinc-700">
              {row.value}
            </span>
          </motion.div>
        ))}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.05, duration: 0.25 }}
          className="px-3 pt-1.5 text-[8px] text-zinc-400"
        >
          + 4 more positions
        </motion.p>
      </div>

      {/* Every distribution, typed - interest never conflated with capital. */}
      <div className="mt-4">
        <FadeIn delay={1.0}>
          <p className="text-[10px] font-semibold text-zinc-900">
            Distribution history
          </p>
        </FadeIn>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.08, duration: 0.25 }}
          className="mt-1.5"
        >
          <TableHead grid={historyGrid} columns={historyColumns} />
        </motion.div>
        {history.map((row, i) => (
          <motion.div
            key={`${row.date}-${row.position}-${row.type}`}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 1.16 + i * 0.07,
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`${historyGrid} border-b border-zinc-100 px-3 py-[8px]`}
          >
            <span className="text-[9px] tabular-nums text-zinc-600">
              {row.date}
            </span>
            <span className="truncate text-[9px] font-medium text-zinc-800">
              {row.position}
            </span>
            <span className="text-right text-[9px] text-zinc-600">
              {row.type}
            </span>
            <span className="flex justify-end">
              <span
                className={`rounded-full px-1.5 py-0.5 text-[7px] font-medium ${
                  row.component === "Interest" ? "" : "bg-zinc-100 text-zinc-500"
                }`}
                style={
                  row.component === "Interest"
                    ? { backgroundColor: `${SPRINGER}1a`, color: SPRINGER }
                    : undefined
                }
              >
                {row.component}
              </span>
            </span>
            <span className="text-right text-[9px] tabular-nums text-zinc-700">
              {row.amount}
            </span>
          </motion.div>
        ))}
      </div>
    </>
  );
}

// The screen: chrome, the module sidebar and the tabbed pane, plus the
// cursor that walks the story from the account to its report.
function AccountScreen() {
  const [tab, setTab] = useState<"accounts" | "reports">("accounts");

  // The pane follows the cursor: the click lands at CLICK_S, the tab turns
  // over just after.
  useEffect(() => {
    const t = setTimeout(() => setTab("reports"), SWITCH_S * 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <SpringerChrome title="labrador - springer - Alderton Family Office">
      <div className="flex min-h-0 flex-1">
        <SideNav
          items={sideNav}
          active={tab === "accounts" ? "Accounts" : "Reports"}
          pressed="Reports"
          clickAt={CLICK_S}
          markerId="invMgmtSideActive"
        />

        {/* The pane: the account until the click lands, then its report. */}
        <div className="min-h-0 min-w-0 flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            {tab === "accounts" ? (
              <motion.div
                key="account"
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="h-full px-8 pt-4"
              >
                <AccountPane />
              </motion.div>
            ) : (
              <motion.div
                key="reports"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
                className="h-full px-8 pt-4"
              >
                <ReportsPane />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* The cursor: idle by the allocation while the account lands, swoop
          to the sidebar, click Reports. */}
      <MockCursor
        from={[38, 82]}
        to={[23.25, 4.3]}
        delay={FLIGHT_DELAY}
        clickAt={CLICK_S}
      />
    </SpringerChrome>
  );
}

export function InvestorManagementDemo() {
  return (
    <MockLoopCard periodMs={PERIOD_MS}>
      <AccountScreen />
    </MockLoopCard>
  );
}
