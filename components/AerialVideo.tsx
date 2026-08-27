"use client";

import { useEffect, useState } from "react";

/**
 * The aerial flyover layer: fetches signed, short-lived URIs from
 * /api/aerial-view on mount, paints the still frame straight away and fades
 * the orbit video in over it once frames are actually rendering. Reduced-
 * motion users get the still alone - the route's five-minute upstream cache
 * means their lookup costs nothing extra. Every failure path - API error,
 * media element error - degrades a layer at a time (video → still → nothing),
 * so whatever static layer sits beneath is always the floor and this
 * component never owns one.
 */
export function AerialVideo({
  className = "",
  playbackRate = 0.5,
  orientation = "auto",
}: {
  className?: string;
  /** Orbit speed: 0.5 reads as ambient drift at hero scale, 1 as a rotation. */
  playbackRate?: number;
  /** "landscape" pins the crop for panes that are wide at every viewport. */
  orientation?: "auto" | "landscape";
}) {
  const [video, setVideo] = useState<string | null>(null);
  const [poster, setPoster] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    // Orientation is read once: swapping src on rotate would restart playback,
    // which is worse than a cropped loop.
    const portrait =
      orientation === "auto" &&
      window.matchMedia("(orientation: portrait)").matches;
    const ac = new AbortController();
    fetch("/api/aerial-view", { signal: ac.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then(
        (
          d: {
            landscapeUri: string;
            portraitUri: string;
            imageLandscapeUri?: string;
            imagePortraitUri?: string;
          } | null,
        ) => {
          if (!d) return;
          setPoster(
            (portrait ? d.imagePortraitUri : d.imageLandscapeUri) ?? null,
          );
          // Reduced-motion users keep the still; the video never mounts.
          if (!reduced) setVideo(portrait ? d.portraitUri : d.landscapeUri);
        },
      )
      .catch(() => {});
    return () => ac.abort();
  }, [orientation]);

  if (!video && !poster) return null;
  return (
    <>
      {poster && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt=""
          onError={() => setPoster(null)}
          className={`${className} pointer-events-none`}
        />
      )}
      {video && (
        <video
          ref={(el) => {
            if (el) el.playbackRate = playbackRate;
          }}
          src={video}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          // Decorative footage: pointer-events-none plus the two disable
          // attributes keep the browser's hover furniture (picture-in-picture
          // flyouts, cast buttons, "video insights") off it.
          disablePictureInPicture
          disableRemotePlayback
          onPlaying={() => setPlaying(true)}
          onError={() => setVideo(null)}
          // The fade waits for frames to actually render (onPlaying, not
          // onCanPlay) so a stalled load never reveals a black rectangle over
          // the still.
          className={`${className} pointer-events-none transition-opacity duration-1000 ${playing ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </>
  );
}
