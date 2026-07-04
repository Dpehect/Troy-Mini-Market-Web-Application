"use client";

import Image from "next/image";
import Link from "next/link";
import { RotateCcw, ShoppingBasket } from "lucide-react";
import type { Basket, Product } from "@/types";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { useOrderStore } from "@/store/order-store";
import { formatPrice } from "@/lib/utils";

export function ReorderClient({
  products,
  baskets
}: {
  products: Product[];
  baskets: Basket[];
}) {
  const orders = useOrderStore((state) => state.orders);
  const addItem = useCartStore((state) => state.addItem);

  function addProductIds(productIds: string[]) {
    productIds
      .map((id) => products.find((product) => product.id === id))
      .filter((product): product is Product => Boolean(product))
      .forEach((product) => addItem(product));
  }

  function addOrder(orderItems: { productId: string; quantity: number }[]) {
    orderItems.forEach((orderItem) => {
      const product = products.find((entry) => entry.id === orderItem.productId);
      if (product) addItem(product, orderItem.quantity);
    });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className="space-y-8">
        <section>
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black">Ready-made grocery baskets</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Add a full intent-based basket and edit the cart before checkout.
              </p>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {baskets.map((basket) => (
              <article key={basket.id} className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-soft">
                <div className="relative h-48 bg-muted">
                  <Image src={basket.image} alt={basket.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                </div>
                <div className="p-5">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">{basket.occasion}</p>
                  <h3 className="mt-2 text-2xl font-black tracking-tight">{basket.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{basket.description}</p>
                  <div className="mt-5 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold text-muted-foreground">{basket.itemCount} items</p>
                      <p className="text-xl font-black text-price">{formatPrice(basket.estimatedTotal)}</p>
                    </div>
                    <Button type="button" onClick={() => addProductIds(basket.productIds)}>
                      <ShoppingBasket className="h-4 w-4" />
                      Add basket
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-border bg-card p-6 shadow-soft">
          <h2 className="text-2xl font-black">Past orders</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Reorder from mock orders placed on this device.
          </p>

          {orders.length > 0 ? (
            <div className="mt-5 space-y-3">
              {orders.map((order) => (
                <div key={order.id} className="rounded-3xl border border-border bg-background p-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <Link href={`/orders/${order.id}`} className="focus-ring rounded-lg text-lg font-black hover:text-primary">
                        {order.id}
                      </Link>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {order.items.length} unique items · {formatPrice(order.total)} · {order.deliverySlot}
                      </p>
                    </div>
                    <Button type="button" variant="secondary" onClick={() => addOrder(order.items)}>
                      <RotateCcw className="h-4 w-4" />
                      Reorder
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-5 rounded-3xl border border-dashed border-border bg-background p-8 text-center">
              <p className="font-black">No past orders yet</p>
              <p className="mt-1 text-sm text-muted-foreground">Place a checkout order to unlock true reorder history.</p>
            </div>
          )}
        </section>
      </div>

      <aside className="h-fit rounded-[2rem] border border-border bg-primary p-6 text-primary-foreground shadow-card lg:sticky lg:top-28">
        <RotateCcw className="h-8 w-8 text-accent" />
        <h2 className="mt-4 text-2xl font-black">Reorder without rebuilding the basket.</h2>
        <p className="mt-3 text-sm leading-7 text-primary-foreground/75">
          Grocery UX should reduce repeated effort. Baskets and past orders are designed to help users finish a normal weekly shop in fewer steps.
        </p>
        <Button asChild variant="accent" className="mt-6 w-full">
          <Link href="/cart">Review cart</Link>
        </Button>
      </aside>
    </div>
  );
}
