// Pragmatic ingredient scaling for v1.
// Scales the LEADING quantity in an ingredient line by `factor`.
// Honest about its limits: handles integers, decimals, common unicode fractions,
// and "N × ..." tins. Lines with no leading quantity ("a pinch", "to taste") are unchanged.

const FRACTIONS: Record<string, number> = {
  "½": 1 / 2,
  "⅓": 1 / 3,
  "⅔": 2 / 3,
  "¼": 1 / 4,
  "¾": 3 / 4,
};

function formatQty(n: number): string {
  const rounded = Math.round(n * 4) / 4; // nearest 0.25
  if (Number.isInteger(rounded)) return String(rounded);
  const fracMap: Record<string, number> = { "½": 0.5, "¼": 0.25, "¾": 0.75 };
  for (const [sym, val] of Object.entries(fracMap)) {
    if (Math.abs(rounded - val) < 1e-6) return sym;
  }
  return String(Number(rounded.toFixed(2)));
}

export function scaleLine(line: string, factor: number): string {
  if (factor === 1) return line;
  const m = line.match(/^(\s*)(½|⅓|⅔|¼|¾|\d+(?:\.\d+)?)(\s*×\s*)?/);
  if (!m) return line;
  const numStr = m[2];
  const qty = numStr in FRACTIONS ? FRACTIONS[numStr] : parseFloat(numStr);
  if (!isFinite(qty) || qty === 0) return line;
  return m[1] + formatQty(qty * factor) + line.slice(m[0].length);
}
