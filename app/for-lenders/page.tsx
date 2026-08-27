import type { Metadata } from "next";
import { AudiencePage, type AudiencePageData } from "@/components/AudiencePage";
import { audienceThemes } from "@/components/audienceThemes";

export const metadata: Metadata = {
  title: "For lenders",
  description:
    "Pipeline, exposure, approvals, and servicing activity come into focus with the context behind every dollar deployed.",
};

// The lender page from efficura.com/for-lenders, copy carried over from
// main's audience-pages content and rendered on this site's AudiencePage.
const page: AudiencePageData = {
  title: "for lenders.",
  intro:
    "Pipeline, exposure, approvals, and servicing activity come into focus with the context behind every dollar deployed.",
  heroBackgroundClassName: audienceThemes.lenders.hero,
  heroTextClassName: audienceThemes.lenders.heroText,
  roles: [
    "Investment committee",
    "Portfolio manager",
    "Risk lead",
    "Asset manager",
  ],
  flowColumns: [
    {
      label: "lender-inputs",
      title: "Pipeline, borrower exposure, covenants, and portfolio events.",
      items: ["New lending opportunities", "Exposure data", "Monitoring packs"],
    },
    {
      label: "lender-context",
      title: "Portfolio context linked to the deal record.",
      items: ["Approval history", "Risk flags", "Servicing activity"],
    },
    {
      label: "lender-output",
      title: "Cleaner decisions and reporting-ready updates.",
      items: ["Committee context", "Portfolio summaries", "Actionable alerts"],
    },
  ],
  workflowTitle: "See credit exposure with the context behind it.",
  workflowIntro:
    "Lenders get a connected view of origination, approvals, exposure, and monitoring instead of a disconnected reporting cycle.",
  workflowSteps: [
    {
      title: "Review the opportunity",
      detail:
        "Facility terms, borrower context, collateral, and sponsor notes sit together before investment committee review.",
    },
    {
      title: "Track approval rationale",
      detail:
        "Decisions, assumptions, exceptions, and conditions remain linked to the record after approval.",
    },
    {
      title: "Monitor exposure",
      detail:
        "Portfolio-level views surface concentration, servicing events, conditions, and risk changes.",
    },
    {
      title: "Report with confidence",
      detail:
        "Updates are easier to prepare because the evidence behind them is captured as work happens.",
    },
  ],
  faqs: [
    {
      question: "Can lenders see only their relevant assets?",
      answer:
        "Yes. Access can be scoped around mandates, facilities, borrowers, or other boundaries your team needs.",
    },
    {
      question: "How does this support investment committee work?",
      answer:
        "The record keeps terms, assumptions, documents, approvals, and conditions together so decision context is easier to review.",
    },
    {
      question: "Can it help after origination?",
      answer:
        "Yes. The same data foundation supports exposure views, servicing activity, covenant monitoring, and portfolio updates.",
    },
  ],
};

export default function Page() {
  return <AudiencePage page={page} />;
}
