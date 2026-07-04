"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import type { Category, Product, ProductFlagFilter, ProductSort } from "@/types";
import { ProductGrid } from "@/components/product/product-grid";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Drawer } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

const flagOptions: { id: ProductFlagFilter; label: string }[] = [
  { id: "in-stock", label: "In stock" },
  { id: "deals", label: "Deals" },
  { id: "fresh", label: "Fresh" },
  { id: "local", label: "Local" },
  { id: "organic", label: "Organic" },
  { id: "deli", label: "Deli" }
];

const sortOptions: { id: ProductSort; label: string }[] = [
  { id: "popular", label: "Popular" },
  { id: "price-low", label: "Lowest price" },
  { id: "price-high", label: "Highest price" },
  { id: "deals", label: "Deals" },
  { id: "fresh", label: "Fresh" },
  { id: "local", label: "Local" },
  { id: "rating", label: "Rated" }
];

function filterProducts({
  products,
  query,
  category,
  flags,
  sort
}: {
  products: Product[];
  query: string;
  category: string;
  flags: ProductFlagFilter[];
  sort: ProductSort;
}) {
  const normalizedQuery = query.trim().toLowerCase();

  const filtered = products.filter((product) => {
    const matchesQuery =
      !normalizedQuery ||
      [product.name, product.brand, product.category, product.subcategory, product.description]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery);

    const matchesCategory = category === "all" || product.category === category;

    const matchesFlags = flags.every((flag) => {
      if (flag === "in-stock") return product.stock > 0;
      if (flag === "deals") return product.isDiscounted;
      if (flag === "fresh") return product.isFresh;
      if (flag === "local") return product.isLocal;
      if (flag === "organic") return product.isOrganic;
      if (flag === "deli") return product.isDeliMade;
      return true;
    });

    return matchesQuery && matchesCategory && matchesFlags;
  });

  return filtered.sort((a, b) => {
    if (sort === "price-low") return a.price - b.price;
    if (sort === "price-high") return b.price - a.price;
    if (sort === "deals") return Number(b.isDiscounted) - Number(a.isDiscounted);
    if (sort === "fresh") return Number(b.isFresh) - Number(a.isFresh);
    if (sort === "local") return Number(b.isLocal) - Number(a.isLocal);
    if (sort === "rating") return (b.rating ?? 0) - (a.rating ?? 0);
    return Number(b.isPopular) - Number(a.isPopular);
  });
}

function FilterPanel({
  categories,
  selectedCategory,
  onCategoryChange,
  flags,
  onToggleFlag,
  onClear
}: {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  flags: ProductFlagFilter[];
  onToggleFlag: (flag: ProductFlagFilter) => void;
  onClear: () => void;
}) {
  return (
    <div className="space-y-8">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xs font-black uppercase tracking-[0.22em] text-muted-foreground">Aisle</h3>
          <button className="text-xs font-black text-foreground" onClick={onClear} type="button">
            Reset
          </button>
        </div>
        <div className="grid gap-1.5">
          <FilterButton
            active={selectedCategory === "all"}
            onClick={() => onCategoryChange("all")}
            label="All"
            count={categories.reduce((total, category) => total + category.productCount, 0)}
          />
          {categories.map((category) => (
            <FilterButton
              key={category.id}
              active={selectedCategory === category.name}
              onClick={() => onCategoryChange(category.name)}
              label={category.name}
              count={category.productCount}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-muted-foreground">Filters</h3>
        <div className="flex flex-wrap gap-2">
          {flagOptions.map((flag) => {
            const active = flags.includes(flag.id);
            return (
              <button
                key={flag.id}
                type="button"
                onClick={() => onToggleFlag(flag.id)}
                className={cn(
                  "focus-ring rounded-full border px-4 py-2 text-sm font-black transition",
                  active ? "border-foreground bg-foreground text-background" : "border-border bg-card hover:bg-muted"
                )}
              >
                {flag.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  label,
  count
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "focus-ring flex items-center justify-between rounded-2xl px-3 py-3 text-left text-sm font-black transition",
        active ? "bg-foreground text-background" : "hover:bg-muted"
      )}
    >
      <span>{label}</span>
      <span className={active ? "text-background/55" : "text-muted-foreground"}>{count}</span>
    </button>
  );
}

export function ShopClient({
  products,
  categories,
  initialCategory = "all",
  title = "Shop",
  description = "Search, filter, add. Nothing extra."
}: {
  products: Product[];
  categories: Category[];
  initialCategory?: string;
  title?: string;
  description?: string;
}) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [flags, setFlags] = useState<ProductFlagFilter[]>([]);
  const [sort, setSort] = useState<ProductSort>("popular");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredProducts = useMemo(
    () => filterProducts({ products, query, category: selectedCategory, flags, sort }),
    [products, query, selectedCategory, flags, sort]
  );

  const toggleFlag = (flag: ProductFlagFilter) => {
    setFlags((current) => current.includes(flag) ? current.filter((item) => item !== flag) : [...current, flag]);
  };

  const clearFilters = () => {
    setSelectedCategory("all");
    setFlags([]);
    setQuery("");
    setSort("popular");
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      <aside className="hidden lg:block">
        <div className="sticky top-24 rounded-[2rem] border border-border bg-card p-4">
          <FilterPanel
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            flags={flags}
            onToggleFlag={toggleFlag}
            onClear={clearFilters}
          />
        </div>
      </aside>

      <div>
        <div className="mb-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-muted-foreground">Market</p>
          <h1 className="mt-2 font-display text-6xl font-semibold leading-[0.9] tracking-[-0.08em] md:text-8xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">{description}</p>
        </div>

        <div className="mb-6 rounded-[2rem] border border-border bg-card p-3">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
            <label className="focus-within:ring-ring flex h-14 flex-1 items-center gap-3 rounded-[1.4rem] bg-background px-4 transition focus-within:ring-2">
              <Search className="h-5 w-5 text-muted-foreground" />
              <span className="sr-only">Search groceries</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="h-full w-full bg-transparent text-base font-bold outline-none placeholder:text-muted-foreground"
                placeholder="Search groceries…"
                type="search"
              />
              {query ? (
                <button type="button" onClick={() => setQuery("")} aria-label="Clear search">
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              ) : null}
            </label>

            <div className="flex gap-3">
              <Button className="lg:hidden" variant="secondary" onClick={() => setMobileFiltersOpen(true)}>
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>

              <label className="flex min-w-[180px] items-center gap-2 rounded-[1.4rem] bg-background px-4">
                <span className="text-xs font-black text-muted-foreground">Sort</span>
                <select
                  value={sort}
                  onChange={(event) => setSort(event.target.value as ProductSort)}
                  className="h-14 flex-1 bg-transparent text-sm font-black outline-none"
                >
                  {sortOptions.map((option) => (
                    <option key={option.id} value={option.id}>{option.label}</option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{filteredProducts.length} items</Badge>
            {selectedCategory !== "all" ? <Badge variant="fresh">{selectedCategory}</Badge> : null}
            {flags.map((flag) => (
              <Badge key={flag} variant="outline">{flagOptions.find((item) => item.id === flag)?.label ?? flag}</Badge>
            ))}
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} />
        ) : (
          <div className="rounded-[2rem] border border-dashed border-border bg-card p-10 text-center">
            <p className="text-2xl font-black tracking-[-0.04em]">No matches</p>
            <p className="mt-2 text-sm text-muted-foreground">Try another word or reset filters.</p>
            <Button className="mt-5" onClick={clearFilters}>Reset</Button>
          </div>
        )}
      </div>

      <Drawer open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen} title="Filters">
        <FilterPanel
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          flags={flags}
          onToggleFlag={toggleFlag}
          onClear={clearFilters}
        />
      </Drawer>
    </div>
  );
}
