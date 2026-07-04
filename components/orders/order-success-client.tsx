"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Clock, MapPin, PackageCheck, ShoppingBasket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";
import { useOrderStore } from "@/store/order-store";
import { formatPrice } from "@/lib/utils";

export function OrderSuccessClient() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order");
  const lastOrderId = useOrderStore((state) => state.lastOrderId);
  const getOrder = useOrderStore((state) => state.getOrder);
  const order = getOrder(orderId ?? lastOrderId ?? "");

  if (!order) {
    return (
      <EmptyState
        title="No recent order found"
        description="Place a mock grocery order to see the order confirmation experience."
        actionLabel="Shop groceries"
        actionHref="/shop"
      />
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="rounded-[2rem] border border-border bg-card p-6 text-center shadow-card md:p-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-fresh/10 text-fresh">
          <CheckCircle2 className="h-9 w-9" />
        </div>
        <p className="mt-5 text-xs font-black uppercase tracking-[0.22em] text-accent">Order placed</p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight md:text-6xl">
          We’re getting your groceries ready.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
          Your order has been saved to order history on this device. You can track the current status, reorder later, or keep shopping.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <InfoCard icon={<PackageCheck className="h-5 w-5" />} label="Order number" value={order.id} />
          <InfoCard icon={<Clock className="h-5 w-5" />} label={order.deliveryType === "delivery" ? "Delivery window" : "Pickup window"} value={order.deliverySlot} />
          <InfoCard icon={<ShoppingBasket className="h-5 w-5" />} label="Order total" value={formatPrice(order.total)} />
        </div>

        <div className="mt-8 rounded-3xl bg-muted p-5 text-left">
          <div className="flex gap-3">
            <MapPin className="mt-1 h-5 w-5 shrink-0 text-accent" />
            <div>
              <p className="font-black">{order.deliveryType === "delivery" ? "Delivery address" : "Pickup location"}</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{order.deliveryAddress}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href={`/orders/${order.id}`}>Track order</Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/shop">Keep shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function InfoCard({
  icon,
  label,
  value
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl border border-border bg-background p-4 text-left">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        {icon}
      </div>
      <p className="text-xs font-black uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-black">{value}</p>
    </div>
  );
}
