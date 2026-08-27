import type { MetadataRoute } from "next";

// One open rule for every crawler, AI agents included (GPTBot, ClaudeBot,
// PerplexityBot, Google-Extended…) - being read and cited is the point.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: "https://efficura.com/sitemap.xml",
  };
}
