import type { ReactNode } from "react";

export function Badge({
  children,
  tone = "brandy",
}: {
  children: ReactNode;
  tone?: "brandy" | "paprika" | "taupe";
}) {
  const tones: Record<string, string> = {
    brandy: "border-brandy/40 bg-brandy/10 text-brandy",
    paprika: "border-paprika/40 bg-paprika/10 text-paprika",
    taupe: "border-line text-taupe",
  };
  return (
    <span
      className={`inline-block rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wide ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
