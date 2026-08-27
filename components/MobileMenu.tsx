"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { DemoRequestLink } from "@/components/DemoRequestLink";
import type { NavMenu } from "@/components/DesktopNav";

type NavItem = {
  label: string;
  href?: string;
  menu?: NavMenu;
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * The small-screen counterpart to the desktop pill nav: a hamburger button that
 * opens an iOS-style drawer sliding in from the left, over a dimmed backdrop.
 * Once the drawer is moving, its rows stagger in top to bottom; with reduced
 * motion everything falls back to plain fades.
 *
 * The whole thing is wrapped in `md:hidden`, so it (and the drawer, which
 * mounts only while open) only exists below the breakpoint where the pill nav
 * takes over. Explicit dismissals (X, backdrop, Escape) hand focus back to the
 * hamburger, per dialog conventions; closing via a link leaves focus to the
 * navigation.
 */
export function MobileMenu({
  navItems,
  dark = false,
}: {
  navItems: NavItem[];
  dark?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  const close = () => setOpen(false);
  const dismiss = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  // While open: lock background scroll and close on Escape.
  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const drawerVariants: Variants = reduceMotion
    ? {
        hidden: { opacity: 0, transition: { duration: 0.12 } },
        visible: { opacity: 1, transition: { duration: 0.12 } },
      }
    : {
        hidden: { x: "-100%", transition: { duration: 0.2, ease: [0.4, 0, 1, 1] } },
        visible: { x: 0, transition: { duration: 0.25, ease: EASE } },
      };

  // The list waits until the drawer is mostly in, then staggers its rows.
  const listVariants: Variants = {
    hidden: {},
    visible: {
      transition: reduceMotion
        ? undefined
        : { delayChildren: 0.06, staggerChildren: 0.02 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : -8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: EASE } },
  };

  const footerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.25, delay: reduceMotion ? 0 : 0.18 },
    },
  };

  const linkClass =
    "block rounded-xl px-3 py-2.5 text-lg font-light text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900 active:bg-zinc-100";

  return (
    <div className="font-light md:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className={`-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full ${
          dark ? "text-white hover:bg-white/10" : "text-zinc-900 hover:bg-zinc-100"
        }`}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M3 6h18M3 12h18M3 18h18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Dimmed backdrop */}
            <motion.div
              key="backdrop"
              onClick={dismiss}
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-zinc-900/40 backdrop-blur-sm"
            />

            {/* Drawer */}
            <motion.aside
              key="drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="fixed inset-y-0 left-0 z-50 flex w-80 max-w-[85%] flex-col bg-white shadow-2xl"
            >
              {/* Same height, wordmark size, and left gutter as the site
                  header, so the drawer's wordmark lands exactly over it. */}
              <div className="flex h-16 flex-none items-center justify-between pl-5 pr-3">
                <Link
                  href="/"
                  onClick={close}
                  className="flex items-center gap-2 text-xl font-light tracking-tight text-zinc-900 sm:text-2xl"
                >
                  <Image
                    src="/efficura.svg"
                    alt=""
                    aria-hidden="true"
                    width={28}
                    height={28}
                    unoptimized
                    className="h-7 w-7"
                  />
                  efficura
                </Link>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={dismiss}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M6 6l12 12M18 6 6 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              {/* px-2 + the rows' own px-3 lines link text up with the pl-5
                  wordmark above. */}
              <nav className="flex-1 overflow-y-auto px-2 pb-6 pt-2">
                <motion.ul variants={listVariants} className="space-y-1">
                  {navItems.map((item) => {
                    if (!item.menu) {
                      return (
                        <motion.li key={item.label} variants={itemVariants}>
                          <Link href={item.href!} onClick={close} className={linkClass}>
                            {item.label}
                          </Link>
                        </motion.li>
                      );
                    }
                    // Flatten every menu shape (link columns, feature-grid
                    // groups, and tiles) into one plain list of links for the
                    // drawer.
                    const links: {
                      label: string;
                      href: string;
                      disabled?: boolean;
                      external?: boolean;
                    }[] = [
                      ...(item.menu.columns ?? []).flatMap((column) => column.links),
                      ...(item.menu.groups ?? []).flatMap((group) =>
                        group.items.map((entry) => ({
                          label: entry.title,
                          href: entry.href,
                          external: entry.external,
                        }))
                      ),
                      ...(item.menu.tiles ?? []).map((tile) => ({
                        label: tile.title,
                        href: tile.href,
                      })),
                    ];
                    return (
                      <li key={item.label} className="pt-4">
                        <motion.p
                          variants={itemVariants}
                          className="px-3 pb-1.5 text-sm font-light uppercase tracking-wide text-zinc-400"
                        >
                          {item.label}
                        </motion.p>
                        <ul className="space-y-0.5">
                          {links.map((child) => (
                            <motion.li key={child.label} variants={itemVariants}>
                              {child.disabled ? (
                                <span
                                  aria-disabled="true"
                                  className="block cursor-not-allowed rounded-xl px-3 py-2.5 text-lg font-light text-zinc-300"
                                >
                                  {child.label}
                                </span>
                              ) : child.external ? (
                                <a
                                  href={child.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={close}
                                  className={linkClass}
                                >
                                  {child.label}
                                </a>
                              ) : (
                                <Link href={child.href} onClick={close} className={linkClass}>
                                  {child.label}
                                </Link>
                              )}
                            </motion.li>
                          ))}
                        </ul>
                      </li>
                    );
                  })}
                </motion.ul>
              </nav>

              <motion.div
                variants={footerVariants}
                className="flex-none border-t border-zinc-100 px-5 py-5"
              >
                <DemoRequestLink
                  href="/contact"
                  location="mobile-menu"
                  onClick={close}
                  className="block rounded-full bg-[#bf6c35] px-5 py-3 text-center text-base font-light text-white transition-colors hover:bg-[#894d26]"
                >
                  Book a demo
                </DemoRequestLink>
              </motion.div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
