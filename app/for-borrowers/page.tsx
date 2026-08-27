import type { Metadata } from "next";
import { AudiencePage, type AudiencePageData } from "@/components/AudiencePage";
import { audienceThemes } from "@/components/audienceThemes";

export const metadata: Metadata = {
  title: "For borrowers",
  description:
    "A calmer borrower workflow for real-estate debt teams.",
};

// The borrower page from efficura.com/for-borrowers, copy carried over from
// main's audience-pages content and rendered on this site's AudiencePage.
const page: AudiencePageData = {
  title: "for borrowers.",
  intro:
    "A calmer way to move from first ask to funded loan, with every document, condition, and decision easy to follow.",
  heroBackgroundClassName: audienceThemes.borrowers.hero,
  heroTextClassName: audienceThemes.borrowers.heroText,
  roles: ["Borrower", "Relationship manager", "Originator", "Servicing lead"],
  flowColumns: [
    {
      label: "borrower-inputs",
      title: "Borrower asks, documents, and follow-ups.",
      items: [
        "Initial facility requests",
        "Borrower documents",
        "Conditions and missing items",
      ],
    },
    {
      label: "borrower-record",
      title: "A live borrower record for everyone involved.",
      items: ["Requirement ownership", "Document status", "Decision history"],
    },
    {
      label: "borrower-updates",
      title: "Clear updates without another status thread.",
      items: ["Next actions", "Approved conditions", "Servicing updates"],
    },
  ],
  workflowTitle:
    "Move borrowers through the credit process without the chase.",
  workflowIntro:
    "Borrower-facing work stays clear while internal teams keep the context needed to originate, close, and service the loan.",
  workflowSteps: [
    {
      title: "Capture the first ask",
      detail:
        "The borrower request, facility context, and required documents start in one structured workspace.",
    },
    {
      title: "Collect what is missing",
      detail:
        "Outstanding items have owners, statuses, due dates, and a visible path to completion.",
    },
    {
      title: "Preserve decisions",
      detail:
        "Credit notes, approvals, conditions, and borrower answers stay tied to the live facility record.",
    },
    {
      title: "Carry context into servicing",
      detail:
        "The borrower relationship does not reset after close because servicing starts from the same record.",
    },
  ],
  faqs: [
    {
      question: "Can borrowers see internal credit notes?",
      answer:
        "No. Access can be scoped so borrowers only see relevant requests, documents, conditions, and updates.",
    },
    {
      question: "Does this replace borrower email?",
      answer:
        "It gives the team a system of record for borrower work. Email can still be used, but the operating context stays structured in labrador.",
    },
    {
      question: "What happens after close?",
      answer:
        "The same borrower and facility record can carry into servicing, so the team keeps continuity after execution.",
    },
  ],
};

export default function Page() {
  return <AudiencePage page={page} />;
}
