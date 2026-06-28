import Link from "next/link";
import { Badge } from "./Badge";
import { imageUrl, type Recipe } from "@/lib/recipes";

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link
      href={`/recipes/${recipe.slug}`}
      className="group block overflow-hidden rounded-card border border-line bg-bean transition hover:-translate-y-1 hover:border-brandy"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl(recipe)}
          alt={recipe.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <div className="mb-2 flex flex-wrap gap-2">
          <Badge tone="paprika">{recipe.occasion}</Badge>
          <Badge>{recipe.time_min} min</Badge>
        </div>
        <h3 className="font-display text-xl leading-snug">{recipe.title}</h3>
      </div>
    </Link>
  );
}
