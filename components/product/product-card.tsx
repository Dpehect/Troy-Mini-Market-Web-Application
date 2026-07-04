"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Plus } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PriceDisplay } from "@/components/shared/price-display";
import { QuantityStepper } from "@/components/shared/quantity-stepper";
import { useCartStore } from "@/store/cart-store";
import { useFavoritesStore } from "@/store/favorites-store";
import { getDiscountPercent } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const item = useCartStore((state) => state.items.find((entry) => entry.productId === product.id));
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const isFavorite = useFavoritesStore((state) => state.isFavorite(product.id));
  const discount = getDiscountPercent(product.price, product.originalPrice);

  return (
    <motion.article
      whileHover={{ y: -3 }}
      transition={{ duration: 0.16, ease: "easeOut" }}
      className="product-minimal group flex h-full flex-col overflow-hidden rounded-[1.7rem] border border-border bg-card transition"
    >
      <div className="relative">
        <Link href={`/product/${product.slug}`} className="focus-ring relative block aspect-square overflow-hidden bg-muted">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition duration-300 group-hover:scale-[1.025]"
          />
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            {product.isFresh ? <Badge variant="fresh">Fresh</Badge> : null}
            {discount ? <Badge variant="discount">{discount}% off</Badge> : null}
          </div>
        </Link>

        <button
          type="button"
          onClick={() => toggleFavorite(product.id)}
          className="focus-ring absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-background/90 text-foreground backdrop-blur transition hover:scale-105"
          aria-label={`${isFavorite ? "Remove" : "Save"} ${product.name}`}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? "fill-foreground" : ""}`} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="min-h-[88px]">
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-muted-foreground">
            {product.category}
          </p>
          <Link href={`/product/${product.slug}`} className="focus-ring mt-2 block rounded-md">
            <h3 className="line-clamp-2 text-lg font-black leading-tight tracking-[-0.04em] transition hover:text-primary">
              {product.name}
            </h3>
          </Link>
          <p className="mt-1 text-sm font-semibold text-muted-foreground">
            {product.brand} · {product.size}
          </p>
        </div>

        <div className="mt-4">
          <PriceDisplay
            price={product.price}
            originalPrice={product.originalPrice}
            unitPrice={product.unitPrice}
            compact
          />
        </div>

        <div className="mt-3 flex items-center justify-between gap-3 text-xs font-black text-muted-foreground">
          <span>{product.deliveryTag}</span>
          <span>{product.stock > 0 ? "In stock" : "Out"}</span>
        </div>

        <div className="mt-5">
          {item ? (
            <QuantityStepper
              value={item.quantity}
              onDecrease={() => decreaseQuantity(product.id)}
              onIncrease={() => increaseQuantity(product.id)}
            />
          ) : (
            <Button
              type="button"
              className="w-full"
              onClick={() => addItem(product)}
              aria-label={`Add ${product.name} to cart`}
            >
              <Plus className="h-4 w-4" />
              Add
            </Button>
          )}
        </div>
      </div>
    </motion.article>
  );
}
