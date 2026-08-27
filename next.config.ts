import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    // Retired duplicate audience routes - the /for-* URLs are canonical.
    return [
      { source: "/lenders", destination: "/for-lenders", permanent: true },
      { source: "/loans", destination: "/for-borrowers", permanent: true },
    ];
  },
  async rewrites() {
    // Reverse-proxy PostHog through our own domain so ad blockers don't
    // drop the requests (they block eu.i.posthog.com directly).
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://eu-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://eu.i.posthog.com/:path*",
      },
    ];
  },
  // PostHog API requests use trailing slashes; don't redirect them away.
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
