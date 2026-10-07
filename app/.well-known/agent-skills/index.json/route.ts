import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";

const SCHEMA =
  "https://schemas.agentskills.io/discovery/0.2.0/schema.json" as const;

const SKILLS_ROOT = path.join(
  process.cwd(),
  "public",
  ".well-known",
  "agent-skills",
);

type SkillDefinition = {
  name: string;
  type: "skill-md";
  description: string;
  artifactPath: string;
};

const SKILL_DEFINITIONS: SkillDefinition[] = [
  {
    name: "request-quote",
    type: "skill-md",
    description:
      "Help a customer request a refrigeration or air-conditioning service quote from DJF Refrigeração via WhatsApp. Use when the user needs repair, maintenance, or a home visit in Belo Horizonte and the metro area.",
    artifactPath: "request-quote/SKILL.md",
  },
];

async function buildIndex() {
  const skills = await Promise.all(
    SKILL_DEFINITIONS.map(async (skill) => {
      const bytes = await readFile(path.join(SKILLS_ROOT, skill.artifactPath));
      const digest = `sha256:${createHash("sha256").update(bytes).digest("hex")}`;

      return {
        name: skill.name,
        type: skill.type,
        description: skill.description,
        url: `/.well-known/agent-skills/${skill.artifactPath}`,
        digest,
      };
    }),
  );

  return {
    $schema: SCHEMA,
    skills,
  };
}

export async function GET() {
  const body = JSON.stringify(await buildIndex(), null, 2);

  return new Response(body, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=300, must-revalidate",
    },
  });
}
