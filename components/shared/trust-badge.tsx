import {
  Leaf,
  MapPin,
  RefreshCcw,
  ShieldCheck,
  ShoppingBag,
  Truck
} from "lucide-react";
import type { TrustBadgeItem } from "@/types";

const icons = {
  Truck,
  ShoppingBag,
  Leaf,
  ShieldCheck,
  RefreshCcw,
  MapPin
};

export function TrustBadge({ item }: { item: TrustBadgeItem }) {
  const Icon = icons[item.icon as keyof typeof icons] ?? Leaf;

  return (
    <div className="rounded-3xl border border-border bg-card p-5 shadow-soft">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-base font-black">{item.title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
    </div>
  );
}
