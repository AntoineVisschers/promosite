import { Token } from "./types/Token";

const alertRegex =
  /\[\[alert\s+variant=(info|warning|error)\]\]([\s\S]*?)\[\[\/alert\]\]/g;
const titleRegex = /^(#+)\s+(.*$)/gm; // Note le flag `m` pour le mode multiline
const emphaseRegex = /\*(.*?)\*/gm;

interface AlertMatch extends RegExpMatchArray {
  1: "info" | "warning" | "error"; // le variant de l'alerte
  2: string; // le contenu de l'alerte
}

interface TitleMatch extends RegExpMatchArray {
  1: string; // les `#`
  2: string; // le texte du titre
}

interface EmphaseMatch extends RegExpMatchArray {
  1: string; // le texte de l'emphase
}

export function parseContent(input: string): Token[] {
  const tokens: Token[] = [];
  let lastIndex = 0;

  // Trouver toutes les correspondances pour chaque regex
  const alertMatches = [...input.matchAll(alertRegex)] as AlertMatch[];
  const titleMatches = [...input.matchAll(titleRegex)] as TitleMatch[];
  const emphaseMatches = [...input.matchAll(emphaseRegex)] as EmphaseMatch[];

  // Combiner et trier les correspondances par leur position dans le texte
  const allMatches = [
    ...alertMatches.map((match) => ({ ...match, type: "alert" as const })),
    ...titleMatches.map((match) => ({ ...match, type: "title" as const })),
    ...emphaseMatches.map((match) => ({ ...match, type: "emphase" as const })),
  ].sort((a, b) => a.index! - b.index!);

  // Itérer sur les correspondances triées
  for (const match of allMatches) {
    const index = match.index!;
    const full = match[0];
    if ((match.index && match.index >= lastIndex) || lastIndex == 0) {
      // Ajouter le texte avant la correspondance
      if (index > lastIndex) {
        tokens.push({
          type: "text",
          value: input.slice(lastIndex, index),
        });
      }

      // Traiter selon le type de correspondance
      if (match.type === "alert") {
        const variant = match[1];
        const inner = match[2];
        const children = parseContent(inner);
        tokens.push({
          type: "alert",
          props: { variant: variant as "info" | "warning" | "error" },
          children: children,
        });
      } else if (match.type === "title") {
        const hashes = match[1];
        const text = match[2];
        const level = Math.min(6, Math.max(1, hashes.length)) as
          | 1
          | 2
          | 3
          | 4
          | 5
          | 6;
        const children = parseContent(text);
        tokens.push({
          type: "title",
          props: { level: level },
          children: children,
        });
      } else if (match.type === "emphase") {
        const text = match[1];
        const children = parseContent(text);
        tokens.push({
          type: "emphase",
          children: children,
        });
      }
    }
    lastIndex = index + full.length;
  }

  // Ajouter le texte restant
  if (lastIndex < input.length) {
    tokens.push({
      type: "text",
      value: input.slice(lastIndex),
    });
  }

  return tokens;
}
