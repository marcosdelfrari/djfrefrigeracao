import { getSiteUrl } from "@/lib/site";

function buildCatalog() {
  const siteUrl = getSiteUrl();

  return {
    linkset: [
      {
        anchor: `${siteUrl}/`,
        "service-doc": [
          {
            href: `${siteUrl}/`,
            type: "text/html",
            title: "DJF Refrigeração — site público",
          },
        ],
        "item": [
          {
            href: `${siteUrl}/mcp`,
            type: "application/json",
            title: "MCP Streamable HTTP endpoint",
          },
        ],
        describedby: [
          {
            href: `${siteUrl}/.well-known/mcp/server-card.json`,
            type: "application/json",
            title: "MCP Server Card",
          },
          {
            href: `${siteUrl}/.well-known/ai-catalog.json`,
            type: "application/json",
            title: "AI Catalog (ARD)",
          },
          {
            href: `${siteUrl}/sitemap.xml`,
            type: "application/xml",
            title: "Sitemap",
          },
          {
            href: `${siteUrl}/robots.txt`,
            type: "text/plain",
            title: "Robots exclusion rules",
          },
        ],
      },
    ],
  };
}

const catalogHeaders = {
  "Content-Type":
    'application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"',
  "Cache-Control": "public, max-age=3600, must-revalidate",
  Link: '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
};

export function GET() {
  return new Response(JSON.stringify(buildCatalog(), null, 2), {
    headers: catalogHeaders,
  });
}

export function HEAD() {
  return new Response(null, { headers: catalogHeaders });
}
