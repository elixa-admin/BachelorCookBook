"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getSection, splitIngredients } from "@/lib/markdown";
import { scaleLine } from "@/lib/scale";

export default function RecipeView({
  markdown,
  defaultServings,
}: {
  markdown: string;
  defaultServings: number;
}) {
  const [servings, setServings] = useState(defaultServings);
  const [detail, setDetail] = useState(true);

  const factor = servings / defaultServings;
  const ingredients = splitIngredients(markdown);
  const steps = getSection(markdown, "Steps");
  const move = getSection(markdown, "The move");
  const drink = getSection(markdown, "To drink");

  return (
    <div className="space-y-10">
      {/* Serving scaler + detail slider */}
      <div className="flex flex-wrap items-center gap-6 border-y border-line py-4">
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase tracking-[0.2em] text-taupe">Serves</span>
          <div className="flex items-center gap-1.5">
            {[1, 2, 4, 6].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setServings(n)}
                aria-pressed={servings === n}
                className={`h-9 w-9 rounded-full border text-sm transition ${
                  servings === n
                    ? "border-brandy bg-brandy font-semibold text-espresso"
                    : "border-line text-parchment hover:border-brandy"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={() => setDetail((d) => !d)}
          className="ml-auto rounded-full border border-line px-4 py-2 text-sm text-taupe transition hover:border-brandy hover:text-parchment"
        >
          {detail ? "Straight to it" : "More hand-holding"}
        </button>
      </div>

      <section>
        <h2 className="mb-4 font-display text-2xl">Ingredients</h2>
        <ul className="space-y-2.5">
          {ingredients.map((line, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-[0.4rem] text-brandy">&#9679;</span>
              <span>{scaleLine(line, factor)}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-4 font-display text-2xl">Steps</h2>
        <div className="prose-recipe">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{steps}</ReactMarkdown>
        </div>
      </section>

      {detail && move && (
        <section className="rounded-card border border-line bg-bean p-6">
          <h2 className="mb-2 font-display text-xl text-brandy">The move</h2>
          <p className="text-parchment/90">{move}</p>
        </section>
      )}

      {drink && (
        <section>
          <h2 className="mb-2 font-display text-xl text-taupe">To drink</h2>
          <p className="text-parchment/90">{drink}</p>
        </section>
      )}
    </div>
  );
}
