import { Suspense } from "react";
import { Container } from "@/components/shared/container";
import { SearchPageClient } from "@/components/search/search-page-client";
import { products } from "@/data/products";

export default function SearchPage() {
  return (
    <section className="py-10 md:py-16">
      <Container>
        <div className="mb-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-muted-foreground">Search</p>
          <h1 className="mt-2 font-display text-6xl font-semibold leading-[0.9] tracking-[-0.08em] md:text-8xl">
            Find it fast.
          </h1>
        </div>
        <Suspense fallback={<div className="rounded-[2rem] border border-border bg-card p-8 text-sm font-bold text-muted-foreground">Loading search…</div>}>
          <SearchPageClient products={products} />
        </Suspense>
      </Container>
    </section>
  );
}
