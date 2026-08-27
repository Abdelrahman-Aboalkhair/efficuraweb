import { audienceThemes } from "@/components/audienceThemes";

/**
 * Per-route header theming for pages whose hero is a full-bleed coloured or
 * gradient band. While the page is unscrolled, the sticky header paints the
 * same background as the hero directly beneath it, so the two read as one
 * continuous surface; on scroll the header snaps back to its default white.
 *
 * The class strings mirror each page's hero band (they must stay complete and
 * static so Tailwind's scanner sees them). Where a hero's glow is anchored
 * near the top of the band, the header carries the same gradient - the radial
 * falloff is width-dominated, so the 4rem header slice and the band's top edge
 * land on near-identical colours and the seam disappears. Where the glow sits
 * at the bottom of the band (or the band is a flat colour), the header uses
 * just the base colour, which is what the band's top edge shows anyway.
 *
 * The careers role pages keep the default header: their hero gradient runs
 * near-white to near-black across the width, so no single text colour fits
 * against it.
 */
export type HeaderTheme = {
  /** Background classes matching the page's hero band. */
  background: string;
  /** True when the hero is dark and the header chrome needs light text. */
  dark: boolean;
};

const cream: HeaderTheme = { background: "bg-[#f8f7f4]", dark: false };
const ink: HeaderTheme = { background: "bg-[#303236]", dark: true };

export const headerThemes: Record<string, HeaderTheme> = {
  // Cream heroes.
  "/product/ask-effi": cream,
  "/product/email-ingestion": cream,
  "/product/own-your-data": cream,
  "/how-it-works": cream,
  "/how-springer-works": cream,

  // Dark heroes with a top-anchored glow: header carries the gradient too.
  "/product/asset-skyview": {
    background:
      "bg-[#303236] bg-[radial-gradient(circle_at_82%_20%,rgba(230,84,22,0.5)_0%,rgba(48,50,54,0)_45%)]",
    dark: true,
  },
  "/product/investor-management": {
    background:
      "bg-[#303236] bg-[radial-gradient(circle_at_85%_15%,rgba(58,90,64,0.55)_0%,rgba(48,50,54,0)_45%)]",
    dark: true,
  },

  // Dark heroes whose glow sits at the bottom of the band: base colour only.
  "/product/automatic-servicing": ink,
  "/product/fund-administration": ink,

  // Audience pages share their hero classes with audienceThemes; all three
  // glow from the top of the band, so the header carries the gradient too.
  "/for-borrowers": { background: audienceThemes.borrowers.hero, dark: true },
  "/for-lenders": { background: audienceThemes.lenders.hero, dark: true },
  "/for-operators": { background: audienceThemes.operators.hero, dark: true },
};
