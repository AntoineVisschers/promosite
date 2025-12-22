import { Token } from "./types/Token";

const alertRegex =
  /\[\[alert\s+variant=(info|warning|error)\]\]([\s\S]*?)\[\[\/alert\]\]/g;

export function parseContent(input: string): Token[] {
  const tokens: Token[] = [];
  let lastIndex = 0;

  for (const match of input.matchAll(alertRegex)) {
    const index = match.index!;
    const [full, variant, inner] = match;

    // texte avant
    if (index > lastIndex) {
      tokens.push({
        type: "text",
        value: input.slice(lastIndex, index),
      });
    }

    // composant
    tokens.push({
      type: "alert",
      props: { variant: variant as "info" | "warning" | "error" },
      children: [{ type: "text", value: inner.trim() }],
    });

    lastIndex = index + full.length;
  }

  // texte restant
  if (lastIndex < input.length) {
    tokens.push({
      type: "text",
      value: input.slice(lastIndex),
    });
  }

  return tokens;
}
