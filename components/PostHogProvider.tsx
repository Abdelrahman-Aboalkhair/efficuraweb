'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'

export function enablePostHog() {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
  if (!key) return

  const wasOptedOut = posthog.__loaded && posthog.has_opted_out_capturing()

  if (!posthog.__loaded) {
    posthog.init(key, {
      api_host: '/ingest',
      ui_host: 'https://eu.posthog.com',
      capture_pageview: 'history_change',
      capture_pageleave: true,
    })
  }

  posthog.opt_in_capturing({ captureEventName: false })

  if (wasOptedOut) {
    posthog.capture('$pageview')
  }
}

export function disablePostHog() {
  if (posthog.__loaded && !posthog.has_opted_out_capturing()) {
    posthog.opt_out_capturing()
  }
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  return <PHProvider client={posthog}>{children}</PHProvider>
}
