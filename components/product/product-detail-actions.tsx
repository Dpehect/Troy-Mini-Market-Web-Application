"use client";

import { Plus, ShoppingBasket } from "lucide-react";
import type { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { QuantityStepper } from "@/components/shared/quantity-stepper";
import { useCartStore } from "@/store/cart-store";

export function ProductDetailActions({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const item = useCartStore((state) => state.items.find((entry) => entry.productId === product.id));
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

  return (
    <div className="space-y-4">
      {item ? (
        <div className="flex flex-wrap items-center gap-3">
          <QuantityStepper
            value={item.quantity}
            onDecrease={() => decreaseQuantity(product.id)}
            onIncrease={() => increaseQuantity(product.id)}
          />
          <Button size="lg" className="flex-1">
            <ShoppingBasket className="h-5 w-5" />
            {item.quantity} in cart
          </Button>
        </div>
      ) : (
        <Button size="lg" className="w-full" onClick={() => addItem(product)}>
          <Plus className="h-5 w-5" />
          Add to cart
        </Button>
      )}
      <p className="text-sm leading-6 text-muted-foreground">
        Add this item directly from the product detail page or continue browsing with quick add from the shop grid.
      </p>
    </div>
  );
}
