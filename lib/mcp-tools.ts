import { faqs } from "@/lib/faq-data";
import {
  ADDRESS_LINE,
  MAPS_URL,
  PHONE_DISPLAY,
  PHONE_SECONDARY,
  whatsappUrl,
} from "@/lib/whatsapp";

export const MCP_SERVER_INFO = {
  name: "djf-refrigeracao",
  title: "DJF Refrigeração",
  version: "0.1.0",
  description:
    "Informações de contato, FAQ e links de WhatsApp da DJF Refrigeração em Belo Horizonte e região.",
} as const;

export const MCP_PROTOCOL_VERSION = "2025-06-18";

const WHATSAPP_INTENT_MESSAGES: Record<string, string> = {
  quote: "Olá! Quero um orçamento — vou enviar foto do problema.",
  visit: "Olá! Quero agendar uma visita técnica.",
  general: "Olá, Vim pelo site, pode passar mais informações?",
};

function normalizeQuery(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase();
}

export type McpToolDefinition = {
  name: string;
  title: string;
  description: string;
  inputSchema: Record<string, unknown>;
  annotations?: {
    readOnlyHint?: boolean;
    consequentialHint?: boolean;
  };
  execute: (input: Record<string, unknown>) => Promise<unknown>;
};

export const MCP_TOOLS: McpToolDefinition[] = [
  {
    name: "get-company-info",
    title: "Informações da empresa",
    description:
      "Retorna informações de contato, endereço, horário e serviços da DJF Refrigeração em Belo Horizonte.",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true },
    async execute() {
      return {
        name: "DJF Refrigeração",
        description:
          "Assistência técnica em refrigeração e ar-condicionado em Belo Horizonte e região.",
        phone: PHONE_DISPLAY,
        phoneSecondary: PHONE_SECONDARY,
        address: ADDRESS_LINE,
        mapsUrl: MAPS_URL,
        hours: "Segunda a domingo — atendimento domiciliar",
        serviceArea: "Belo Horizonte e região metropolitana (MG)",
        services: [
          "Geladeiras e freezers (todas as marcas)",
          "Ar-condicionado",
          "Expositores comerciais",
          "Cervejeiras",
          "Frigobares",
        ],
        warranty: "6 meses de garantia nos serviços",
        whatsappDefaultUrl: whatsappUrl(),
      };
    },
  },
  {
    name: "search-faq",
    title: "Buscar FAQ",
    description:
      "Lista perguntas frequentes da DJF Refrigeração, com filtro opcional por palavra-chave.",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description:
            "Termo opcional para filtrar perguntas e respostas (ex.: garantia, orçamento).",
        },
      },
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true },
    async execute(input) {
      const rawQuery = typeof input.query === "string" ? input.query.trim() : "";
      const items = rawQuery
        ? faqs.filter((item) => {
            const hay = normalizeQuery(`${item.q} ${item.a}`);
            const needle = normalizeQuery(rawQuery);
            return hay.includes(needle);
          })
        : [...faqs];
      return {
        count: items.length,
        items: items.map((item) => ({ question: item.q, answer: item.a })),
      };
    },
  },
  {
    name: "open-whatsapp",
    title: "Abrir WhatsApp",
    description:
      "Gera o link do WhatsApp da DJF com uma mensagem personalizada ou intent pré-definido (quote, visit, general).",
    inputSchema: {
      type: "object",
      properties: {
        message: {
          type: "string",
          description: "Texto completo da mensagem (opcional se intent for usado).",
        },
        intent: {
          type: "string",
          enum: ["quote", "visit", "general"],
          description:
            "Mensagem padrão: quote (orçamento), visit (agendar visita) ou general.",
        },
      },
      additionalProperties: false,
    },
    annotations: { consequentialHint: true },
    async execute(input) {
      const intent = typeof input.intent === "string" ? input.intent : undefined;
      const custom =
        typeof input.message === "string" ? input.message.trim() : "";
      const message =
        custom ||
        (intent && WHATSAPP_INTENT_MESSAGES[intent]) ||
        WHATSAPP_INTENT_MESSAGES.general;
      return { whatsappUrl: whatsappUrl(message), message };
    },
  },
];

export function listMcpToolsForCard() {
  return MCP_TOOLS.map(({ name, title, description, inputSchema }) => ({
    name,
    title,
    description,
    inputSchema,
  }));
}

export async function callMcpTool(
  name: string,
  args: Record<string, unknown> = {},
) {
  const tool = MCP_TOOLS.find((item) => item.name === name);
  if (!tool) {
    throw new Error(`Tool desconhecida: ${name}`);
  }
  return tool.execute(args);
}
