"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * The outcomes strip on the Martley Capital case study: metric cards in a
 * horizontal carousel that auto-advances until the visitor interacts (hover,
 * focus, or the arrow buttons), with all motion disabled under
 * prefers-reduced-motion. Ported from the live site; only the motion import
 * differs (this build uses framer-motion).
 */

export type CaseStudyMetric = {
  label: string;
  value: string;
  detail: string;
  cardClassName: string;
  labelClassName: string;
  valueClassName: string;
  detailClassName: string;
};

const autoRotateMs = 3400;

export function CaseStudyMetricCarousel({
  metrics,
}: {
  metrics: CaseStudyMetric[];
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [slideIndex, setSlideIndex] = useState(0);
  const [slideOffsets, setSlideOffsets] = useState([0]);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const activeOffset = hasOverflow ? (slideOffsets[slideIndex] ?? 0) : 0;
  const isFirstSlide = slideIndex === 0;
  const isLastSlide = slideIndex >= slideOffsets.length - 1;

  const goToPrevious = () => {
    if (!hasOverflow || isFirstSlide) {
      return;
    }

    setSlideIndex((currentIndex) => Math.max(currentIndex - 1, 0));
  };

  const goToNext = () => {
    if (!hasOverflow || isLastSlide) {
      return;
    }

    setSlideIndex((currentIndex) =>
      Math.min(currentIndex + 1, slideOffsets.length - 1),
    );
  };

  // Measure how far the track overflows the viewport and derive the snap
  // offsets (one per card, capped at the end of the track), re-deriving on any
  // resize of either element.
  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!viewport || !track) {
      return;
    }

    const updateOverflow = () => {
      const maxOffset = Math.max(0, track.scrollWidth - viewport.clientWidth);
      const nextHasOverflow = maxOffset > 1;

      if (!nextHasOverflow) {
        setHasOverflow(false);
        setSlideOffsets([0]);
        setSlideIndex(0);
        return;
      }

      const cardOffsets = Array.from(track.children).map((card) =>
        Math.min((card as HTMLElement).offsetLeft, maxOffset),
      );
      const nextSlideOffsets = Array.from(new Set([0, ...cardOffsets]));

      setHasOverflow(true);
      setSlideOffsets(nextSlideOffsets);
      setSlideIndex((currentIndex) =>
        Math.min(currentIndex, nextSlideOffsets.length - 1),
      );
    };

    updateOverflow();

    const observer = new ResizeObserver(updateOverflow);
    observer.observe(viewport);
    observer.observe(track);

    return () => observer.disconnect();
  }, [hasOverflow, metrics.length]);

  useEffect(() => {
    if (!hasOverflow || isPaused || prefersReducedMotion || isLastSlide) {
      return;
    }

    const timer = window.setInterval(() => {
      setSlideIndex((currentIndex) =>
        Math.min(currentIndex + 1, slideOffsets.length - 1),
      );
    }, autoRotateMs);

    return () => window.clearInterval(timer);
  }, [
    hasOverflow,
    isLastSlide,
    isPaused,
    prefersReducedMotion,
    slideOffsets.length,
  ]);

  if (metrics.length === 0) {
    return null;
  }

  return (
    <div
      className="mt-10 min-w-0"
      aria-label="Client outcomes"
      aria-roledescription={hasOverflow ? "carousel" : undefined}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div className="overflow-hidden border-y border-neutral-200 bg-neutral-200 py-px">
        <motion.div ref={viewportRef} className="w-full overflow-hidden">
          <motion.div
            ref={trackRef}
            className="flex w-max gap-px will-change-transform"
            animate={{ x: -activeOffset }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.72, ease: [0.22, 1, 0.36, 1] }
            }
          >
            {metrics.map((metric) => (
              <article
                key={metric.label}
                className={`flex min-h-[20rem] w-[76vw] min-w-[17rem] max-w-[22rem] shrink-0 flex-col justify-between border p-5 sm:w-[21rem] lg:p-6 ${metric.cardClassName}`}
              >
                <p className={`text-xs leading-5 ${metric.labelClassName}`}>
                  {metric.label}
                </p>
                <div className="pt-10">
                  <p
                    className={`text-[clamp(1.85rem,2.35vw,2.85rem)] font-light leading-[1] ${metric.valueClassName}`}
                  >
                    {metric.value}
                  </p>
                  <p
                    className={`mt-5 max-w-md text-base leading-6 ${metric.detailClassName}`}
                  >
                    {metric.detail}
                  </p>
                </div>
              </article>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {hasOverflow ? (
        <div className="mt-4 flex items-center gap-2">
          <button
            type="button"
            className="inline-flex h-10 w-14 cursor-pointer items-center justify-center rounded-full border border-neutral-200 bg-white text-[#303236] transition-colors hover:bg-neutral-50 disabled:cursor-default disabled:text-neutral-300 disabled:hover:bg-white"
            aria-label="Previous outcome"
            disabled={isFirstSlide}
            onClick={goToPrevious}
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.8} />
          </button>
          <button
            type="button"
            className="inline-flex h-10 w-14 cursor-pointer items-center justify-center rounded-full border border-neutral-200 bg-white text-[#303236] transition-colors hover:bg-neutral-50 disabled:cursor-default disabled:text-neutral-300 disabled:hover:bg-white"
            aria-label="Next outcome"
            disabled={isLastSlide}
            onClick={goToNext}
          >
            <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
          </button>
        </div>
      ) : null}
    </div>
  );
}
