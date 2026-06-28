// Pure markdown helpers — NO Node built-ins. Safe to import in client components.

/** Leading blockquote intro, with `>` markers stripped. */
export function firstBlockquote(md: string): string {
  const m = md.match(/^>\s?.+(?:\n>.*)*/m);
  if (!m) return "";
  return m[0].replace(/^>\s?/gm, "").trim();
}

/** Markdown content under a `## Name` heading (until the next heading or end). */
export function getSection(markdown: string, name: string): string {
  const re = new RegExp(`##\\s*${name}\\s*\\n([\\s\\S]*?)(?:\\n##\\s|$)`, "i");
  const m = markdown.match(re);
  return m ? m[1].trim() : "";
}

/** Parse the `## Ingredients` block into item strings (italic scaling notes excluded). */
export function splitIngredients(markdown: string): string[] {
  const block = getSection(markdown, "Ingredients");
  return block
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => /^[-*]\s+/.test(l))
    .map((l) => l.replace(/^[-*]\s+/, "").trim())
    .filter((l) => l.length > 0 && !l.startsWith("*"));
}
