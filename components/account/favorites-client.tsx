"use client";

import { Heart } from "lucide-react";
import type { Product } from "@/types";
import { ProductGrid } from "@/components/product/product-grid";
import { EmptyState } from "@/components/shared/empty-state";
import { useFavoritesStore } from "@/store/favorites-store";

export function FavoritesClient({ products }: { products: Product[] }) {
  const productIds = useFavoritesStore((state) => state.productIds);
  const favorites = products.filter((product) => productIds.includes(product.id));

  if (favorites.length === 0) {
    return (
      <EmptyState
        title="No favorites yet"
        description="Tap the heart on product cards to save grocery staples, deli picks, and local favorites."
        actionLabel="Shop groceries"
        actionHref="/shop"
      />
    );
  }

  return (
    <div>
      <div className="mb-6 rounded-3xl border border-border bg-card p-5 shadow-soft">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-discount/10 text-discount">
            <Heart className="h-5 w-5 fill-current" />
          </div>
          <div>
            <p className="text-xl font-black">{favorites.length} saved products</p>
            <p className="text-sm text-muted-foreground">Favorites are saved locally on this device.</p>
          </div>
        </div>
      </div>
      <ProductGrid products={favorites} />
    </div>
  );
}
