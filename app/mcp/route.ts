import { handleMcpJsonRpc, mcpCorsHeaders } from "@/lib/mcp-http";
import { MCP_PROTOCOL_VERSION, MCP_SERVER_INFO } from "@/lib/mcp-tools";

const jsonHeaders = {
  "Content-Type": "application/json",
  "MCP-Protocol-Version": MCP_PROTOCOL_VERSION,
  ...mcpCorsHeaders,
};

export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: jsonHeaders,
  });
}

/** Stateless Streamable HTTP discovery for browsers / probes. */
export function GET() {
  return new Response(
    JSON.stringify(
      {
        name: MCP_SERVER_INFO.name,
        title: MCP_SERVER_INFO.title,
        version: MCP_SERVER_INFO.version,
        description: MCP_SERVER_INFO.description,
        transport: "streamable-http",
        protocolVersion: MCP_PROTOCOL_VERSION,
        serverCard: "/.well-known/mcp/server-card.json",
      },
      null,
      2,
    ),
    { headers: jsonHeaders },
  );
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({
        jsonrpc: "2.0",
        id: null,
        error: { code: -32700, message: "Parse error" },
      }),
      { status: 400, headers: jsonHeaders },
    );
  }

  const result = await handleMcpJsonRpc(body);

  // Notification-only batches / messages produce no JSON-RPC response body.
  if (result === null || (Array.isArray(result) && result.length === 0)) {
    return new Response(null, { status: 202, headers: jsonHeaders });
  }

  return new Response(JSON.stringify(result), { headers: jsonHeaders });
}
