import {
  callMcpTool,
  MCP_PROTOCOL_VERSION,
  MCP_SERVER_INFO,
  MCP_TOOLS,
} from "@/lib/mcp-tools";

type JsonRpcId = string | number | null;

type JsonRpcRequest = {
  jsonrpc?: string;
  id?: JsonRpcId;
  method?: string;
  params?: Record<string, unknown>;
};

function jsonRpcResult(id: JsonRpcId, result: unknown) {
  return { jsonrpc: "2.0", id, result };
}

function jsonRpcError(
  id: JsonRpcId,
  code: number,
  message: string,
  data?: unknown,
) {
  return {
    jsonrpc: "2.0",
    id,
    error: data === undefined ? { code, message } : { code, message, data },
  };
}

async function handleSingle(message: JsonRpcRequest) {
  const id = message.id ?? null;
  const method = message.method ?? "";
  const params = message.params ?? {};

  // Notifications have no id and must not produce a response body entry.
  if (message.id === undefined && method.startsWith("notifications/")) {
    return null;
  }

  switch (method) {
    case "initialize":
      return jsonRpcResult(id, {
        protocolVersion: MCP_PROTOCOL_VERSION,
        capabilities: {
          tools: {},
        },
        serverInfo: {
          name: MCP_SERVER_INFO.name,
          title: MCP_SERVER_INFO.title,
          version: MCP_SERVER_INFO.version,
        },
        instructions: MCP_SERVER_INFO.description,
      });

    case "ping":
      return jsonRpcResult(id, {});

    case "tools/list":
      return jsonRpcResult(id, {
        tools: MCP_TOOLS.map(
          ({ name, title, description, inputSchema, annotations }) => ({
            name,
            title,
            description,
            inputSchema,
            annotations,
          }),
        ),
      });

    case "tools/call": {
      const name = typeof params.name === "string" ? params.name : "";
      const args =
        params.arguments &&
        typeof params.arguments === "object" &&
        !Array.isArray(params.arguments)
          ? (params.arguments as Record<string, unknown>)
          : {};

      try {
        const data = await callMcpTool(name, args);
        const text = JSON.stringify(data, null, 2);
        return jsonRpcResult(id, {
          content: [{ type: "text", text }],
          structuredContent: data,
        });
      } catch (error) {
        const messageText =
          error instanceof Error ? error.message : "Falha ao executar a tool";
        return jsonRpcResult(id, {
          content: [{ type: "text", text: messageText }],
          isError: true,
        });
      }
    }

    default:
      return jsonRpcError(id, -32601, `Method not found: ${method}`);
  }
}

export async function handleMcpJsonRpc(body: unknown) {
  if (Array.isArray(body)) {
    const results = [];
    for (const item of body) {
      const result = await handleSingle((item ?? {}) as JsonRpcRequest);
      if (result) results.push(result);
    }
    return results;
  }

  return handleSingle((body ?? {}) as JsonRpcRequest);
}

export const mcpCorsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Accept, MCP-Protocol-Version, Mcp-Session-Id",
  "Access-Control-Expose-Headers": "MCP-Protocol-Version",
};
