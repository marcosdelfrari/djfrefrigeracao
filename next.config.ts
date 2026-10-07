import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Vary",
            value: "Accept",
          },
          {
            key: "Link",
            value: [
              '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
              '</agents.json>; rel="describedby"; type="application/json"',
              '</sitemap.xml>; rel="describedby"; type="application/xml"',
              '</robots.txt>; rel="describedby"; type="text/plain"',
            ].join(", "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
