import { getSiteUrl } from "@/lib/site";

/** HTTP agent index referenced by DNS-AID `_index._agents` discovery. */
export function GET() {
  const siteUrl = getSiteUrl();

  const body = {
    version: "1",
    name: "DJF Refrigeração",
    description:
      "Assistência técnica em refrigeração e ar-condicionado em Belo Horizonte e região.",
    agents: [
      {
        id: "site",
        name: "Site público",
        url: `${siteUrl}/`,
        protocols: ["https"],
        capabilities: ["company-info", "contact"],
      },
    ],
    links: {
      "mcp-server-card": `${siteUrl}/.well-known/mcp/server-card.json`,
      mcp: `${siteUrl}/mcp`,
      "ai-catalog": `${siteUrl}/.well-known/ai-catalog.json`,
      "api-catalog": `${siteUrl}/.well-known/api-catalog`,
      sitemap: `${siteUrl}/sitemap.xml`,
      robots: `${siteUrl}/robots.txt`,
    },
  };

  return new Response(JSON.stringify(body, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}
