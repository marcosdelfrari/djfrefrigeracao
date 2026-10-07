import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

/** Preferências de uso de conteúdo para agentes/IA (Content Signals). */
const CONTENT_SIGNAL =
  "ai-train=no, search=yes, ai-input=yes" as const;

/** AI search crawlers — power answers in assistants; blocking hides you from AI search. */
const AI_SEARCH_BOTS = [
  "OAI-SearchBot",
  "Claude-SearchBot",
  "PerplexityBot",
] as const;

/** User-triggered fetchers — retrieve a page when a person asks an assistant. */
const AI_USER_BOTS = [
  "ChatGPT-User",
  "Claude-User",
  "Perplexity-User",
] as const;

/** Training crawlers — collect model training data; blocking does not affect AI search. */
const AI_TRAINING_BOTS = [
  "GPTBot",
  "ClaudeBot",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "Bytespider",
  "Amazonbot",
] as const;

const contentSignal = {
  "Content-Signal": CONTENT_SIGNAL,
};

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
        other: {
          ...contentSignal,
          /** ARD / AI Catalog discovery (Agentmap directive). */
          Agentmap: `${siteUrl}/.well-known/ai-catalog.json`,
        },
      },
      {
        userAgent: [...AI_SEARCH_BOTS],
        allow: "/",
        disallow: ["/api/"],
        other: contentSignal,
      },
      {
        userAgent: [...AI_USER_BOTS],
        allow: "/",
        disallow: ["/api/"],
        other: contentSignal,
      },
      {
        userAgent: [...AI_TRAINING_BOTS],
        disallow: "/",
        other: {
          "Content-Signal": "ai-train=no, search=no, ai-input=no",
        },
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
