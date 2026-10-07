/** WebMCP ModelContext (Chrome / spec); falls back to legacy navigator placement. */
export function getModelContext(): ModelContext | null {
  if (typeof document === "undefined") return null;

  const docMc = document.modelContext;
  if (docMc) return docMc;

  const nav = navigator as Navigator & { modelContext?: ModelContext };
  return nav.modelContext ?? null;
}

export type ModelContextTool = {
  name: string;
  title?: string;
  description: string;
  inputSchema?: Record<string, unknown>;
  annotations?: {
    readOnlyHint?: boolean;
    untrustedContentHint?: boolean;
    consequentialHint?: boolean;
    debugging?: boolean;
  };
  execute: (
    input: Record<string, unknown>,
    options: { signal: AbortSignal },
  ) => Promise<unknown>;
};

export type ModelContext = {
  registerTool: (
    tool: ModelContextTool,
    options?: { signal?: AbortSignal },
  ) => Promise<void>;
};

export const SITE_SECTIONS = [
  "inicio",
  "vantagens",
  "solucoes",
  "como-funciona",
  "depoimentos",
  "faq",
] as const;

export type SiteSection = (typeof SITE_SECTIONS)[number];
