import { notFound } from "next/navigation";
import { getByOccasion, OCCASIONS, type Occasion } from "@/lib/recipes";
import { RecipeCard } from "@/components/RecipeCard";

const VALID = new Set<Occasion>(["solo", "date", "host"]);

export function generateStaticParams() {
  return OCCASIONS.map((o) => ({ occasion: o.slug }));
}

export default async function OccasionPage({
  params,
}: {
  params: Promise<{ occasion: string }>;
}) {
  const { occasion } = await params;
  if (!VALID.has(occasion as Occasion)) notFound();

  const occ = occasion as Occasion;
  const meta = OCCASIONS.find((o) => o.slug === occ)!;
  const recipes = getByOccasion(occ);

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <p className="mb-3 text-xs uppercase tracking-[0.2em] text-brandy">Occasion</p>
      <h1 className="font-display text-5xl">{meta.label}</h1>
      <p className="mt-3 max-w-xl text-taupe">{meta.blurb}</p>

      {recipes.length === 0 ? (
        <p className="mt-12 text-taupe">More {meta.label.toLowerCase()} dishes coming soon.</p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((r) => (
            <RecipeCard key={r.slug} recipe={r} />
          ))}
        </div>
      )}
    </main>
  );
}
