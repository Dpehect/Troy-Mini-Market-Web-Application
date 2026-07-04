export const dynamic = "force-dynamic";

import Image from "next/image";
import { Clock, Users } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { recipes } from "@/data/recipes";

export default function RecipesPage() {
  return (
    <section className="py-10 md:py-16">
      <Container>
        <div className="mb-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-muted-foreground">Recipes</p>
          <h1 className="mt-2 font-display text-6xl font-semibold leading-[0.9] tracking-[-0.08em] md:text-8xl">
            Dinner, solved.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
            Short recipes connected to real groceries, so the next move is obvious.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {recipes.map((recipe) => (
            <article key={recipe.id} className="overflow-hidden rounded-[2rem] border border-border bg-card">
              <div className="relative h-64 bg-muted">
                <Image src={recipe.image} alt={recipe.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
              </div>
              <div className="p-5">
                <h3 className="text-3xl font-black tracking-[-0.05em]">{recipe.title}</h3>
                <div className="mt-3 flex gap-4 text-sm font-bold text-muted-foreground">
                  <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> {recipe.duration}</span>
                  <span className="flex items-center gap-2"><Users className="h-4 w-4" /> {recipe.servings} servings</span>
                </div>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  Ingredients: {recipe.ingredients.join(", ")}.
                </p>
                <Button className="mt-5" variant="secondary">Preview ingredients</Button>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
