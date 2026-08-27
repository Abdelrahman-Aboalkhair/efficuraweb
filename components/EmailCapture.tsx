"use client";

import { useEffect, useRef, useState } from "react";
import { getCalApi } from "@calcom/embed-react";
import posthog from "posthog-js";

/**
 * Hero email capture: one email field and a button that opens the Cal.com
 * booking popup with the email prefilled.
 *
 * Same Cal.com wiring as the old BookingCard - the "30min" event type at
 * cal.com/efficura/30min, overridable via `NEXT_PUBLIC_CAL_LINK` so staging
 * can point elsewhere. Cal reads `data-cal-config` from the DOM at click
 * time, so binding it to state is all the prefill needs. An empty email
 * still opens the popup, just without prefill - Cal's own form takes over.
 */
const CAL_NAMESPACE = "30min";
const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK ?? "efficura/30min";

export function EmailCapture({ className = "" }: { className?: string }) {
  const [email, setEmail] = useState("");
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Load the Cal embed once and theme the popup light to match the page.
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      cal("ui", { theme: "light", layout: "month_view" });
    })();
  }, []);

  const calConfig = JSON.stringify({
    layout: "month_view",
    ...(email && { email }),
  });

  // Enter in the input triggers implicit form submission; re-dispatch it as a
  // real click on the button so Cal's delegated listener picks it up, then
  // stop the navigation.
  return (
    <form
      className={`flex w-full max-w-md flex-col gap-3 sm:flex-row ${className}`}
      onSubmit={(e) => {
        e.preventDefault();
        buttonRef.current?.click();
      }}
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-label="Work email"
        placeholder="Work email"
        autoComplete="email"
        className="h-12 w-full rounded-full border border-zinc-300 bg-white px-5 text-base font-medium tracking-tight text-zinc-900 outline-none transition-colors placeholder:font-normal placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"
      />
      <button
        ref={buttonRef}
        type="button"
        data-cal-namespace={CAL_NAMESPACE}
        data-cal-link={CAL_LINK}
        data-cal-config={calConfig}
        onClick={() =>
          posthog.capture("demo-request-click", { location: "email-capture" })
        }
        className="h-12 flex-none cursor-pointer rounded-full bg-[#bf6c35] px-6 text-base font-light text-white transition-colors hover:bg-[#894d26]"
      >
        Book a demo
      </button>
    </form>
  );
}
