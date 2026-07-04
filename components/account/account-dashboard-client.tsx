"use client";

import Link from "next/link";
import { Heart, MapPin, PackageCheck, RotateCcw, ShoppingBasket, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOrderStore } from "@/store/order-store";
import { useFavoritesStore } from "@/store/favorites-store";
import { formatPrice } from "@/lib/utils";

const savedAddresses = [
  {
    id: "home",
    label: "Home",
    line1: "71 Congress St, Troy, NY",
    apartment: "Apt 2B",
    instructions: "Leave at apartment door.",
    isDefault: true
  },
  {
    id: "work",
    label: "Work",
    line1: "Downtown Troy office",
    instructions: "Text when outside."
  }
];

export function AccountDashboardClient() {
  const orders = useOrderStore((state) => state.orders);
  const favoriteCount = useFavoritesStore((state) => state.productIds.length);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <MetricCard icon={<ShoppingBasket className="h-5 w-5" />} label="Saved orders" value={String(orders.length)} />
          <MetricCard icon={<Heart className="h-5 w-5" />} label="Favorites" value={String(favoriteCount)} />
          <MetricCard icon={<MapPin className="h-5 w-5" />} label="Addresses" value={String(savedAddresses.length)} />
        </div>

        <section className="rounded-[2rem] border border-border bg-card p-6 shadow-soft">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black">Recent orders</h2>
              <p className="mt-1 text-sm text-muted-foreground">Orders placed on this device are saved locally for tracking and reorder.</p>
            </div>
            <Button asChild variant="secondary">
              <Link href="/reorder">Reorder</Link>
            </Button>
          </div>

          {orders.length > 0 ? (
            <div className="space-y-3">
              {orders.slice(0, 4).map((order) => (
                <Link
                  key={order.id}
                  href={`/orders/${order.id}`}
                  className="focus-ring flex items-center justify-between gap-4 rounded-3xl border border-border bg-background p-4 transition hover:bg-muted"
                >
                  <div>
                    <p className="font-black">{order.id}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {order.items.length} items · {order.deliverySlot}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-black">{formatPrice(order.total)}</p>
                    <p className="mt-1 text-xs font-bold text-fresh">{order.status}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-border bg-background p-8 text-center">
              <PackageCheck className="mx-auto h-10 w-10 text-muted-foreground" />
              <p className="mt-3 font-black">No orders yet</p>
              <p className="mt-1 text-sm text-muted-foreground">Place a mock order at checkout to see it here.</p>
            </div>
          )}
        </section>
      </div>

      <aside className="space-y-6">
        <section className="rounded-[2rem] border border-border bg-primary p-6 text-primary-foreground shadow-card">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-foreground/12">
            <UserRound className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-black">Guest shopper</h2>
          <p className="mt-2 text-sm leading-6 text-primary-foreground/72">
            Account tools include favorites, saved orders, addresses, and reorder flows.
          </p>
          <div className="mt-5 grid gap-3">
            <Button asChild variant="accent">
              <Link href="/favorites">
                <Heart className="h-4 w-4" />
                View favorites
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/reorder">
                <RotateCcw className="h-4 w-4" />
                Reorder groceries
              </Link>
            </Button>
          </div>
        </section>

        <section className="rounded-[2rem] border border-border bg-card p-6 shadow-soft">
          <h2 className="text-xl font-black">Saved addresses</h2>
          <div className="mt-4 space-y-3">
            {savedAddresses.map((address) => (
              <div key={address.id} className="rounded-3xl border border-border bg-background p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-black">{address.label}</p>
                  {address.isDefault ? <span className="rounded-full bg-fresh/10 px-2 py-1 text-xs font-bold text-fresh">Default</span> : null}
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {address.line1}
                  {address.apartment ? `, ${address.apartment}` : ""}
                </p>
              </div>
            ))}
          </div>
        </section>
      </aside>
    </div>
  );
}

function MetricCard({
  icon,
  label,
  value
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[2rem] border border-border bg-card p-5 shadow-soft">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        {icon}
      </div>
      <p className="text-3xl font-black">{value}</p>
      <p className="mt-1 text-sm font-bold text-muted-foreground">{label}</p>
    </div>
  );
}
