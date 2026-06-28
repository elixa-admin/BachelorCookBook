import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { firstBlockquote } from "./markdown";

export type Occasion = "solo" | "date" | "host";
export type Difficulty = "easy" | "medium" | "hard";

export interface RecipeMeta {
  title: string;
  slug: string;
  category: string;
  occasion: Occasion;
  signature: boolean;
  time_min: number;
  difficulty: Difficulty;
  servings: number;
  tags: string[];
  kitchen_gear: string[];
  image: string;
  source: string;
}

export interface Recipe extends RecipeMeta {
  /** Leading blockquote intro, with `>` markers stripped. */
  intro: string;
  /** Full markdown body (no frontmatter). */
  markdown: string;
}

const RECIPES_DIR = path.join(process.cwd(), "knowledge", "recipes");

function readOne(file: string): Recipe {
  const slug = file.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(RECIPES_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const markdown = content.trim();
  return { ...(data as RecipeMeta), slug, markdown, intro: firstBlockquote(markdown) };
}

let cache: Recipe[] | null = null;

export function getAllRecipes(): Recipe[] {
  if (cache) return cache;
  const files = fs.readdirSync(RECIPES_DIR).filter((f) => f.endsWith(".md"));
  cache = files.map(readOne);
  return cache;
}

export function getRecipeBySlug(slug: string): Recipe | undefined {
  return getAllRecipes().find((r) => r.slug === slug);
}

export function getByOccasion(occasion: Occasion): Recipe[] {
  return getAllRecipes().filter((r) => r.occasion === occasion);
}

export function getSignature(): Recipe[] {
  return getAllRecipes().filter((r) => r.signature);
}

/** Public URL for a recipe image (frontmatter stores design/exports/x.jpg → /exports/x.jpg). */
export function imageUrl(recipe: Recipe): string {
  return recipe.image.replace(/^design\//, "/");
}

export const OCCASIONS: { slug: Occasion; label: string; blurb: string }[] = [
  { slug: "solo", label: "Just me", blurb: "Weeknight for one. Feed yourself like you matter." },
  { slug: "date", label: "A date", blurb: "Cook to impress. The showstoppers that close the evening." },
  { slug: "host", label: "A table", blurb: "Scale up, look effortless, be generous." },
];
