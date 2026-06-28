import { notFound } from "next/navigation";
import { getAllRecipes, getRecipeBySlug, imageUrl } from "@/lib/recipes";
import RecipeView from "@/components/RecipeView";
import { Badge } from "@/components/Badge";

export function generateStaticParams() {
  return getAllRecipes().map((r) => ({ slug: r.slug }));
}

export default async function RecipePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);
  if (!recipe) notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 py-14">
      <div className="mb-4 flex flex-wrap gap-2">
        <Badge tone="paprika">{recipe.occasion}</Badge>
        <Badge>{recipe.difficulty}</Badge>
        <Badge>{recipe.time_min} min</Badge>
        {recipe.signature && <Badge tone="brandy">Signature</Badge>}
      </div>
      <h1 className="font-display text-4xl font-bold leading-tight md:text-5xl">{recipe.title}</h1>
      {recipe.intro && (
        <p className="mt-4 font-display text-xl italic text-taupe">{recipe.intro}</p>
      )}
      <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-card border border-line">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageUrl(recipe)} alt={recipe.title} className="h-full w-full object-cover" />
      </div>
      <div className="mt-10">
        <RecipeView markdown={recipe.markdown} defaultServings={recipe.servings} />
      </div>
    </main>
  );
}
