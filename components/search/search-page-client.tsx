"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import type { Product } from "@/types";
import { ProductGrid } from "@/components/product/product-grid";
import { Button } from "@/components/ui/button";

const quickSearches = ["milk", "eggs", "bread", "deli", "snacks", "water", "fresh", "local"];

export function SearchPageClient({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return products.filter((product) => product.isPopular).slice(0, 12);

    return products.filter((product) =>
      [product.name, product.brand, product.category, product.subcategory, product.description]
        .join(" ")
        .toLowerCase()
        .includes(normalized)
    );
  }, [products, query]);

  return (
    <div>
      <div className="rounded-[2rem] border border-border bg-card p-3 shadow-soft">
        <label className="focus-within:ring-ring flex h-16 items-center gap-4 rounded-[1.45rem] bg-background px-5 transition focus-within:ring-2">
          <Search className="h-5 w-5 text-muted-foreground" />
          <span className="sr-only">Search groceries</span>
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="h-full flex-1 bg-transparent text-lg font-bold tracking-[-0.02em] outline-none placeholder:text-muted-foreground"
            placeholder="Search anything you need…"
            type="search"
          />
          {query ? (
            <button type="button" onClick={() => setQuery("")} className="focus-ring rounded-full p-2" aria-label="Clear search">
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
          ) : null}
        </label>

        <div className="mt-3 flex flex-wrap gap-2">
          {quickSearches.map((term) => (
            <Button key={term} variant="secondary" size="sm" onClick={() => setQuery(term)}>
              {term}
            </Button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-muted-foreground">
              {query ? `${results.length} results for “${query}”` : "Popular searches and quick picks"}
            </p>
            <h2 className="mt-1 font-display text-4xl font-semibold tracking-[-0.06em]">
              {query ? "Results" : "Start fast"}
            </h2>
          </div>
          {query ? <Button variant="ghost" onClick={() => setQuery("")}>Clear</Button> : null}
        </div>

        {results.length > 0 ? (
          <ProductGrid products={results} />
        ) : (
          <div className="rounded-[2rem] border border-dashed border-border bg-card p-10 text-center shadow-soft">
            <p className="text-2xl font-black tracking-[-0.04em]">No products found</p>
            <p className="mt-2 text-sm text-muted-foreground">Try a simpler term like milk, bread, deli, water, or fruit.</p>
          </div>
        )}
      </div>
    </div>
  );
}
