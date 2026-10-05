import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,

  images: {
    // Only project images served from the private Blob store.
    localPatterns: [{ pathname: "/media/projects/**", search: "" }],
    // AVIF first: roughly 20% smaller than WebP for photos.
    formats: ["image/avif", "image/webp"],
    // Source images never change (random-suffixed pathnames), so
    // optimized variants can be cached for a month.
    minimumCacheTTL: 2592000,
  },

  // The Open Graph image font is read from disk at request time.
  outputFileTracingIncludes: {
    "/**/opengraph-image*": ["./assets/fonts/**/*"],
  },

  experimental: {
    // Tree-shake the icon library per import.
    optimizePackageImports: ["lucide-react"],
  },

  // Easy-to-remember shortcuts to the admin dashboard.
  async redirects() {
    return [
      { source: "/login", destination: "/admin", permanent: false },
      { source: "/dashboard", destination: "/admin", permanent: false },
    ];
  },

  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/admin/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },
};

export default nextConfig;
