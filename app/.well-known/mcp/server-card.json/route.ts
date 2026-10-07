import {
  listMcpToolsForCard,
  MCP_PROTOCOL_VERSION,
  MCP_SERVER_INFO,
} from "@/lib/mcp-tools";
import { getSiteUrl } from "@/lib/site";

function buildServerCard() {
  const siteUrl = getSiteUrl();

  return {
    $schema: "https://static.modelcontextprotocol.io/schemas/mcp-server-card/v1.json",
    version: "1.0",
    protocolVersion: MCP_PROTOCOL_VERSION,
    serverInfo: {
      name: MCP_SERVER_INFO.name,
      title: MCP_SERVER_INFO.title,
      version: MCP_SERVER_INFO.version,
    },
    description: MCP_SERVER_INFO.description,
    iconUrl: `${siteUrl}/djf.png`,
    documentationUrl: `${siteUrl}/`,
    transport: {
      type: "streamable-http",
      endpoint: "/mcp",
    },
    capabilities: {
      tools: {},
    },
    authentication: {
      required: false,
      schemes: [],
    },
    instructions: MCP_SERVER_INFO.description,
    tools: listMcpToolsForCard(),
  };
}

const cardHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Cache-Control": "public, max-age=3600, must-revalidate",
  Link: '</.well-known/mcp/server-card.json>; rel="mcp-server-card"; type="application/json"',
};

export function GET() {
  return new Response(JSON.stringify(buildServerCard(), null, 2), {
    headers: cardHeaders,
  });
}

export function HEAD() {
  return new Response(null, { headers: cardHeaders });
}

export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      ...cardHeaders,
      "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
