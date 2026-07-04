"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { QuantityStepper } from "@/components/shared/quantity-stepper";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";

export function CartPageClient() {
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.subtotal());
  const deliveryFee = useCartStore((state) => state.deliveryFee);
  const amountUntilFreeDelivery = useCartStore((state) => state.amountUntilFreeDelivery());
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  if (items.length === 0) {
    return (
      <EmptyState
        title="Your basket is empty"
        description="Add groceries, deli favorites, and everyday essentials to start your order."
        actionLabel="Shop groceries"
        actionHref="/shop"
      />
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.productId} className="flex gap-4 rounded-3xl border border-border bg-card p-4 shadow-soft">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-muted">
              <Image src={item.image} alt={item.name} fill sizes="96px" className="object-cover" />
            </div>
            <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-black">{item.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.size}</p>
                <p className="mt-2 font-bold text-price">{formatPrice(item.price)}</p>
              </div>
              <div className="flex items-center gap-3">
                <QuantityStepper
                  value={item.quantity}
                  onDecrease={() => decreaseQuantity(item.productId)}
                  onIncrease={() => increaseQuantity(item.productId)}
                />
                <button
                  type="button"
                  onClick={() => removeItem(item.productId)}
                  className="focus-ring rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-danger"
                  aria-label={`Remove ${item.name}`}
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <aside className="h-fit rounded-3xl border border-border bg-card p-6 shadow-card">
        <h2 className="text-xl font-black">Order summary</h2>
        <div className="mt-5 space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-bold">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Delivery fee</span>
            <span className="font-bold">{subtotal >= 35 ? "Free" : formatPrice(deliveryFee)}</span>
          </div>
          <div className="border-t border-border pt-3">
            {amountUntilFreeDelivery > 0 ? (
              <p className="rounded-2xl bg-muted p-3 text-sm font-semibold text-muted-foreground">
                Add {formatPrice(amountUntilFreeDelivery)} more for free delivery.
              </p>
            ) : (
              <p className="rounded-2xl bg-fresh/10 p-3 text-sm font-bold text-fresh">
                You unlocked free delivery.
              </p>
            )}
          </div>
          <div className="flex justify-between border-t border-border pt-4 text-lg">
            <span className="font-black">Total</span>
            <span className="font-black text-price">
              {formatPrice(subtotal + (subtotal >= 35 ? 0 : deliveryFee))}
            </span>
          </div>
        </div>
        <Button className="mt-6 w-full" asChild>
          <Link href="/checkout">Continue to checkout</Link>
        </Button>
      </aside>
    </div>
  );
}
