import type { Metadata } from "next";
import { AudiencePage, type AudiencePageData } from "@/components/AudiencePage";
import { audienceThemes } from "@/components/audienceThemes";

export const metadata: Metadata = {
  title: "For operators",
  description:
    "Origination, underwriting, closing, and servicing stay connected in one live workspace that gives velocity to execute.",
};

// The operator page from efficura.com/for-operators, copy carried over from
// main's audience-pages content and rendered on this site's AudiencePage.
const page: AudiencePageData = {
  title: "for operators.",
  intro:
    "Origination, underwriting, closing, and servicing stay connected in one live workspace that gives velocity to execute.",
  heroBackgroundClassName: audienceThemes.operators.hero,
  heroTextClassName: audienceThemes.operators.heroText,
  roles: [
    "Origination lead",
    "Credit analyst",
    "Deal captain",
    "Servicing team",
  ],
  flowColumns: [
    {
      label: "operator-inputs",
      title: "Pipeline, diligence, approvals, and closing activity.",
      items: ["Deal pipeline", "Credit papers", "Borrower conditions"],
    },
    {
      label: "operator-coordination",
      title: "The operating layer across the deal lifecycle.",
      items: ["Owners and blockers", "Document packs", "Approval status"],
    },
    {
      label: "operator-output",
      title: "Decisions, checklists, and reporting-ready data.",
      items: [
        "Execution checklists",
        "Credit paper outputs",
        "Servicing handoffs",
      ],
    },
  ],
  workflowTitle: "Run the credit lifecycle from one operating view.",
  workflowIntro:
    "Operators can keep momentum without rebuilding deal context every time work moves from one stage to the next.",
  workflowSteps: [
    {
      title: "Screen incoming deals",
      detail:
        "Keep core borrower, asset, sponsor, and facility context together from the first review.",
    },
    {
      title: "Coordinate underwriting",
      detail:
        "Documents, notes, questions, approvals, and exceptions stay visible to the people moving the deal.",
    },
    {
      title: "Manage execution",
      detail:
        "Closing steps, conditions precedent, and internal sign-offs are tracked in a live checklist.",
    },
    {
      title: "Hand off to servicing",
      detail:
        "The record becomes the starting point for ongoing monitoring instead of a static closing archive.",
    },
  ],
  faqs: [
    {
      question: "Can labrador match our existing stages?",
      answer:
        "Yes. The workspace can be shaped around the way your team already screens, underwrites, approves, closes, and services deals.",
    },
    {
      question: "Does this add another tracker?",
      answer:
        "The goal is to replace scattered trackers with one live operating record that connects documents, decisions, and owners.",
    },
    {
      question: "How quickly can a team get started?",
      answer:
        "A focused implementation can map your workflow, configure core stages, and stand up a working operating layer in weeks.",
    },
  ],
};

export default function Page() {
  return <AudiencePage page={page} />;
}
