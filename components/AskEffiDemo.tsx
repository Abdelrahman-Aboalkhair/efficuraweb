import { MockDemo } from "@/components/MockDemo";

/**
 * The ask-effi hero's product shot: the Data Room's document chat - a question
 * types itself in and Effi answers from the open credit memo with its source
 * chips (DocChatMock, mock index 3 in ProductTabs), looping as a standalone
 * browser-window card (MockDemo).
 */

// DocChatMock - the talk-to-your-documents screen.
const DOC_CHAT_MOCK_INDEX = 3;

// The answer and its citations land by ~3.2s; the longer dwell leaves the
// quoted figures on screen long enough to read before the replay.
const PERIOD_MS = 9000;

export function AskEffiDemo() {
  return <MockDemo index={DOC_CHAT_MOCK_INDEX} periodMs={PERIOD_MS} />;
}
