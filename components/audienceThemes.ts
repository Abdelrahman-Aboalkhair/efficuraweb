/**
 * Single source of truth for the per-audience theming, shared by the audience
 * hero pages (/for-borrowers, /for-lenders, /for-operators) and the "Who it's
 * for" nav dropdown cards.
 *
 * Each audience owns a brand hue - green (borrowers), gold (lenders), orange
 * (operators): a soft radial glow over a near-black panel (`hero`), which
 * backs both the page hero and the closing CtaPanel sign-off.
 * Change a value here and every page that uses the audience updates together.
 *
 * The gradient strings must be complete and static so Tailwind's scanner sees
 * them.
 */
export type AudienceTheme = {
  /** Subtle dark radial-glow panel - the page hero and closing sign-off. */
  hero: string;
  /** Light text colour that sits over the dark hero. */
  heroText: string;
};

export const audienceThemes = {
  borrowers: {
    hero: "bg-[#26282b] bg-[radial-gradient(circle_at_16%_18%,rgba(150,170,146,0.42)_0%,rgba(71,80,69,0.55)_34%,rgb(38,40,43)_70%)] bg-no-repeat",
    heroText: "text-[#f5f5f5]",
  },
  lenders: {
    hero: "bg-[#26282b] bg-[radial-gradient(circle_at_84%_18%,rgba(224,198,150,0.42)_0%,rgba(150,120,80,0.34)_34%,rgb(38,40,43)_70%)] bg-no-repeat",
    heroText: "text-[#f5f5f5]",
  },
  operators: {
    hero: "bg-[#26282b] bg-[radial-gradient(circle_at_16%_18%,rgba(230,84,22,0.95)_0%,rgba(214,104,52,0.55)_28%,rgb(38,40,43)_66%)] bg-no-repeat",
    heroText: "text-[#f5f5f5]",
  },
} satisfies Record<string, AudienceTheme>;

export type AudienceKey = keyof typeof audienceThemes;
