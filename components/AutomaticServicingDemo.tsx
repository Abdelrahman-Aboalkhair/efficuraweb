import { MockDemo } from "@/components/MockDemo";

/**
 * The automatic-servicing hero's product shot: the closed deal's Reporting
 * screen - covenant headroom counting up and the period chart drawing in
 * (ReportingMock, mock index 2 in ProductTabs), looping as a standalone
 * browser-window card (MockDemo).
 */

// ReportingMock - the whole-life-of-a-deal / servicing screen.
const SERVICING_MOCK_INDEX = 2;

// The count-ups and chart draw settle by ~2.5s; the dwell leaves the reported
// figures on screen before the replay.
const PERIOD_MS = 7000;

export function AutomaticServicingDemo() {
  return <MockDemo index={SERVICING_MOCK_INDEX} periodMs={PERIOD_MS} />;
}
