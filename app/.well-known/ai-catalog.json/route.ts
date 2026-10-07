import { getSiteUrl } from "@/lib/site";

function catalogHostname(siteUrl: string) {
  return new URL(siteUrl).hostname;
}

function buildCatalog() {
  const siteUrl = getSiteUrl();
  const host = catalogHostname(siteUrl);

  return {
    specVersion: "1.0",
    host: {
      displayName: "DJF Refrigeração",
      identifier: `did:web:${host}`,
    },
    entries: [
      {
        identifier: `urn:air:${host}:mcp:site`,
        displayName: "DJF Refrigeração MCP Server",
        description:
          "Servidor MCP Streamable HTTP com tools de contato, FAQ e WhatsApp da DJF Refrigeração.",
        type: "application/mcp-server-card+json",
        url: `${siteUrl}/.well-known/mcp/server-card.json`,
        capabilities: ["get-company-info", "search-faq", "open-whatsapp"],
        representativeQueries: [
          "qual o telefone e endereço da DJF Refrigeração",
          "buscar FAQ sobre garantia de refrigeração em BH",
          "gerar link de WhatsApp para orçamento de geladeira",
          "conectar ao MCP server da DJF Refrigeração",
        ],
      },
      {
        identifier: `urn:air:${host}:skill:request-quote`,
        displayName: "Solicitar orçamento DJF",
        description:
          "Skill para ajudar clientes a pedir orçamento de refrigeração ou ar-condicionado via WhatsApp em Belo Horizonte e região.",
        type: "application/ai-skill+md",
        url: `${siteUrl}/.well-known/agent-skills/request-quote/SKILL.md`,
        capabilities: ["request-quote", "whatsapp-contact"],
        representativeQueries: [
          "preciso de um orçamento para consertar minha geladeira em BH",
          "como agendar visita técnica de ar-condicionado na região metropolitana",
          "quero mandar foto do freezer pelo WhatsApp para orçamento",
          "DJF Refrigeração atendimento domiciliar Belo Horizonte",
        ],
      },
      {
        identifier: `urn:air:${host}:catalog:agent-skills`,
        displayName: "Índice Agent Skills",
        description:
          "Catálogo de Agent Skills publicadas pela DJF Refrigeração.",
        type: "application/json",
        url: `${siteUrl}/.well-known/agent-skills/index.json`,
        capabilities: ["agent-skills-discovery"],
        representativeQueries: [
          "quais skills de agente a DJF disponibiliza",
          "descobrir skill de orçamento de refrigeração",
          "listar Agent Skills do site da DJF",
        ],
      },
      {
        identifier: `urn:air:${host}:catalog:api`,
        displayName: "API Catalog",
        description:
          "Linkset RFC 9727 com documentação e recursos públicos do site.",
        type: "application/linkset+json",
        url: `${siteUrl}/.well-known/api-catalog`,
        capabilities: ["api-catalog", "service-discovery"],
        representativeQueries: [
          "onde está o catálogo de APIs da DJF Refrigeração",
          "descobrir endpoints e documentação do site da DJF",
          "linkset de serviços públicos da assistência técnica",
        ],
      },
      {
        identifier: `urn:air:${host}:agent:site`,
        displayName: "Índice de agentes HTTP",
        description:
          "agents.json com metadados do site para descoberta DNS-AID e clientes HTTP.",
        type: "application/json",
        url: `${siteUrl}/agents.json`,
        capabilities: ["company-info", "contact"],
        representativeQueries: [
          "qual o agente HTTP público da DJF Refrigeração",
          "informações de contato e capacidades do site da DJF",
          "descobrir agents.json da assistência técnica em BH",
        ],
      },
    ],
  };
}

const catalogHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Cache-Control": "public, max-age=3600, must-revalidate",
  Link: '</.well-known/ai-catalog.json>; rel="ai-catalog"; type="application/json"',
};

export function GET() {
  return new Response(JSON.stringify(buildCatalog(), null, 2), {
    headers: catalogHeaders,
  });
}

export function HEAD() {
  return new Response(null, { headers: catalogHeaders });
}

export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      ...catalogHeaders,
      "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
