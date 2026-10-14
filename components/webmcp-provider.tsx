"use client";

import { useEffect, useRef } from "react";
import { faqs } from "@/lib/faq-data";
import {
  getModelContext,
  SITE_SECTIONS,
  type SiteSection,
} from "@/lib/webmcp";
import {
  ADDRESS_LINE,
  MAPS_URL,
  PHONE_DISPLAY,
  PHONE_SECONDARY,
  whatsappUrl,
} from "@/lib/whatsapp";

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

function registerSiteTools(signal: AbortSignal) {
  const modelContext = getModelContext();
  if (!modelContext) return;

  const tools = [
    {
      name: "get-company-info",
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
      name: "navigate-to-section",
      description:
        "Rola a página até uma seção do site (âncoras do menu principal).",
      inputSchema: {
        type: "object",
        properties: {
          section: {
            type: "string",
            enum: [...SITE_SECTIONS],
            description:
              "ID da seção: inicio, vantagens, solucoes, como-funciona, depoimentos ou faq.",
          },
        },
        required: ["section"],
      },
      annotations: { readOnlyHint: true },
      async execute(input: Record<string, unknown>) {
        const section = String(input.section ?? "") as SiteSection;
        if (!SITE_SECTIONS.includes(section)) {
          throw new Error(`Seção inválida: ${section}`);
        }
        const el = document.getElementById(section);
        if (!el) {
          return { ok: false, section, message: "Seção não encontrada no DOM." };
        }
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        if (typeof history !== "undefined" && history.pushState) {
          history.pushState(null, "", `#${section}`);
        }
        return { ok: true, section, url: `${location.origin}${location.pathname}#${section}` };
      },
    },
    {
      name: "search-faq",
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
      async execute(input: Record<string, unknown>) {
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
          openInNewTab: {
            type: "boolean",
            description:
              "Se true, abre o WhatsApp em nova aba no navegador do usuário.",
          },
        },
        additionalProperties: false,
      },
      annotations: { consequentialHint: true },
      async execute(input: Record<string, unknown>) {
        const intent =
          typeof input.intent === "string" ? input.intent : undefined;
        const custom =
          typeof input.message === "string" ? input.message.trim() : "";
        const message =
          custom ||
          (intent && WHATSAPP_INTENT_MESSAGES[intent]) ||
          WHATSAPP_INTENT_MESSAGES.general;
        const url = whatsappUrl(message);
        if (input.openInNewTab === true) {
          window.open(url, "_blank", "noopener,noreferrer");
        }
        return { whatsappUrl: url, message };
      },
    },
  ];

  for (const tool of tools) {
    void modelContext.registerTool(tool, { signal });
  }
}

function handleWhatsappToolSubmit(event: React.FormEvent<HTMLFormElement>) {
  const native = event.nativeEvent as SubmitEvent & {
    agentInvoked?: boolean;
    respondWith?: (promise: Promise<unknown>) => void;
  };

  event.preventDefault();

  const form = event.currentTarget;
  const data = new FormData(form);
  const equipment = String(data.get("equipment") ?? "").trim();
  const problem = String(data.get("problem") ?? "").trim();

  const message = [
    "Olá! Preciso de assistência técnica.",
    equipment ? `Equipamento: ${equipment}` : null,
    problem ? `Problema: ${problem}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const url = whatsappUrl(message);
  const result = { whatsappUrl: url, message };

  if (native.agentInvoked && typeof native.respondWith === "function") {
    native.respondWith(Promise.resolve(result));
  }

  window.open(url, "_blank", "noopener,noreferrer");
}

export function WebMcpProvider() {
  const registered = useRef(false);

  useEffect(() => {
    if (registered.current) return;
    registered.current = true;

    const controller = new AbortController();
    registerSiteTools(controller.signal);

    return () => {
      controller.abort();
      registered.current = false;
    };
  }, []);

  return (
    <form
      toolname="request-whatsapp-assistance"
      tooldescription="Solicita atendimento via WhatsApp informando equipamento e descrição do problema."
      toolautosubmit=""
      className="sr-only"
      aria-hidden="true"
      onSubmit={handleWhatsappToolSubmit}
    >
      <input
        type="text"
        name="equipment"
        required
        toolparamdescription="Tipo de equipamento (ex.: geladeira, ar-condicionado, freezer)."
        autoComplete="off"
        tabIndex={-1}
      />
      <textarea
        name="problem"
        required
        toolparamdescription="Descrição do problema, sintomas ou urgência."
        rows={3}
        autoComplete="off"
        tabIndex={-1}
      />
      <button type="submit" tabIndex={-1}>Enviar pelo WhatsApp</button>
    </form>
  );
}
