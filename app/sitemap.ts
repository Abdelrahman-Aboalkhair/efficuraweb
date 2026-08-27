import type { MetadataRoute } from "next";
import { teamMembers } from "./about/team-data";
import { careerRoles } from "./careers/careers-data";

const BASE = "https://efficura.com";

// Every indexable route on the site. New static pages must be added here;
// careers roles and team members are picked up from their data files
// automatically.
const staticRoutes = [
  "",
  "/about",
  "/careers",
  "/contact",
  "/cookies",
  "/for-borrowers",
  "/for-lenders",
  "/for-operators",
  "/how-it-works",
  "/how-springer-works",
  "/martley-capital",
  "/privacy",
  "/product/ask-effi",
  "/product/asset-skyview",
  "/product/automatic-servicing",
  "/product/email-ingestion",
  "/product/fund-administration",
  "/product/investor-management",
  "/product/own-your-data",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes.map((route) => ({ url: `${BASE}${route}` })),
    ...teamMembers.map((member) => ({ url: `${BASE}/about/${member.slug}` })),
    ...careerRoles.map((role) => ({ url: `${BASE}/careers/${role.slug}` })),
  ];
}
