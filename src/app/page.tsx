import Link from "next/link";
import { getSignature, OCCASIONS } from "@/lib/recipes";
import { RecipeCard } from "@/components/RecipeCard";

export default function Home() {
  const signature = getSignature();
  return (
    <main>
      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 pt-20 pb-12 text-center">
        <p className="mb-4 text-xs uppercase tracking-[0.25em] text-brandy">
          The Eligible Man&apos;s Cookbook
        </p>
        <h1 className="font-display text-5xl font-bold leading-[1.05] md:text-7xl">
          The Ultimate Bachelor Cookbook
        </h1>
        <p className="mt-5 font-display text-2xl italic text-brandy">&ldquo;Dinner is on you.&rdquo;</p>
        <p className="mx-auto mt-5 max-w-xl text-taupe">
          Feed yourself well. Impress everyone else. Date-night showstoppers, effortless hosting,
          and a dozen dishes worth mastering.
        </p>
      </section>

      {/* Occasion entry — the homepage IS the choice */}
      <section className="mx-auto grid max-w-6xl gap-5 px-6 md:grid-cols-3">
        {OCCASIONS.map((o) => (
          <Link
            key={o.slug}
            href={`/${o.slug}`}
            className="group rounded-card border border-line bg-bean p-8 transition hover:-translate-y-1 hover:border-brandy"
          >
            <h2 className="font-display text-3xl">{o.label}</h2>
            <p className="mt-2 text-taupe">{o.blurb}</p>
            <span className="mt-4 inline-block text-brandy group-hover:underline">Choose &rarr;</span>
          </Link>
        ))}
      </section>

      {/* Signature 12 */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-2">
          <h2 className="font-display text-4xl">The Signature 12</h2>
          <span className="text-taupe">A dozen dishes worth mastering</span>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {signature.map((r) => (
            <RecipeCard key={r.slug} recipe={r} />
          ))}
        </div>
      </section>
    </main>
  );
}
