"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Circle, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";
import { useOrderStore } from "@/store/order-store";
import { formatPrice } from "@/lib/utils";

export function OrderTrackingClient({ orderId }: { orderId: string }) {
  const order = useOrderStore((state) => state.getOrder(orderId));

  if (!order) {
    return (
      <EmptyState
        title="Order not found"
        description="This order is not in the local order history on this device."
        actionLabel="Shop groceries"
        actionHref="/shop"
      />
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
      <div className="space-y-6">
        <section className="rounded-[2rem] border border-border bg-card p-6 shadow-card">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">Order tracking</p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight md:text-6xl">{order.id}</h1>
          <p className="mt-3 text-base leading-7 text-muted-foreground">
            Status: <strong className="text-foreground">{order.status}</strong>. This is a polished mock tracking experience for a local grocery order.
          </p>

          <div className="mt-8 space-y-4">
            {order.progress?.map((step, index) => (
              <div key={step.label} className="flex gap-4">
                <div className="flex flex-col items-center">
                  {step.completed ? (
                    <CheckCircle2 className="h-7 w-7 text-fresh" />
                  ) : (
                    <Circle className="h-7 w-7 text-muted-foreground" />
                  )}
                  {index < (order.progress?.length ?? 0) - 1 ? (
                    <div className="mt-2 h-10 w-px bg-border" />
                  ) : null}
                </div>
                <div>
                  <p className="font-black">{step.label}</p>
                  {step.time ? <p className="mt-1 text-sm text-muted-foreground">{step.time}</p> : null}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-border bg-card p-6 shadow-soft">
          <h2 className="text-2xl font-black">Order items</h2>
          <div className="mt-5 space-y-3">
            {order.items.map((item) => (
              <div key={item.productId} className="flex gap-3 rounded-2xl bg-muted/65 p-3">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-background">
                  <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" />
                </div>
                <div className="flex flex-1 items-center justify-between gap-3">
                  <div>
                    <p className="font-black">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.quantity} × {formatPrice(item.price)} · {item.size}</p>
                  </div>
                  <p className="font-black">{formatPrice(item.price * item.quantity)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <aside className="h-fit rounded-[2rem] border border-border bg-card p-6 shadow-card lg:sticky lg:top-28">
        <h2 className="text-2xl font-black">Summary</h2>
        <div className="mt-5 space-y-3 text-sm">
          <SummaryLine label="Subtotal" value={formatPrice(order.subtotal)} />
          <SummaryLine label="Delivery / pickup" value={order.deliveryFee === 0 ? "Free" : formatPrice(order.deliveryFee)} />
          <SummaryLine label="Discount" value={order.discount ? `-${formatPrice(order.discount)}` : "$0.00"} />
          <div className="border-t border-border pt-4">
            <SummaryLine label="Total" value={formatPrice(order.total)} strong />
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="rounded-3xl bg-muted p-4">
            <div className="flex gap-3">
              <Clock className="mt-1 h-5 w-5 text-accent" />
              <div>
                <p className="font-black">{order.deliveryType === "delivery" ? "Delivery time" : "Pickup time"}</p>
                <p className="mt-1 text-sm text-muted-foreground">{order.deliverySlot}</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-muted p-4">
            <div className="flex gap-3">
              <MapPin className="mt-1 h-5 w-5 text-accent" />
              <div>
                <p className="font-black">{order.deliveryType === "delivery" ? "Address" : "Pickup"}</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{order.deliveryAddress}</p>
              </div>
            </div>
          </div>
        </div>

        <Button asChild className="mt-6 w-full">
          <Link href="/reorder">Reorder essentials</Link>
        </Button>
      </aside>
    </div>
  );
}

function SummaryLine({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={strong ? "flex justify-between text-lg font-black" : "flex justify-between"}>
      <span className={strong ? "" : "text-muted-foreground"}>{label}</span>
      <span className="font-black">{value}</span>
    </div>
  );
}
