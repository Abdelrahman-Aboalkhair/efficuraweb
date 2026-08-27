import { MockDemo } from "@/components/MockDemo";

/**
 * The email-ingestion hero's product shot: the "Send to labrador" add-in
 * reading an Outlook thread and filing it as a deal (OutlookMock, mock index 1
 * in ProductTabs), looping as a standalone browser-window card (MockDemo).
 */

// OutlookMock - the agentic origination / email-ingestion screen.
const EMAIL_MOCK_INDEX = 1;

// The choreography settles by ~4s; this dwell before the replay matches the
// home hero's cadence.
const PERIOD_MS = 6500;

export function EmailIngestionDemo() {
  return <MockDemo index={EMAIL_MOCK_INDEX} periodMs={PERIOD_MS} />;
}
