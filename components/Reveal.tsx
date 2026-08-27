"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

/**
 * Reveals its children with a short fade + upward drift the first time they
 * scroll into view (`once` - it never re-hides on scroll back up). This is how
 * the page arrives one piece at a time instead of all at once: wrap a section,
 * or each item in a row, giving siblings a small incremental `delay` to cascade.
 *
 * Reduced motion is honored app-wide via <MotionConfig reducedMotion="user">
 * (see app/template.tsx): those users get the opacity fade with no movement.
 *
 * framer-motion renders the `initial` state during SSR, so there's no flash of
 * fully-visible content before the animation runs.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
