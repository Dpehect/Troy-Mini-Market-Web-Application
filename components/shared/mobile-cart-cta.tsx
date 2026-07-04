"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";

export function MobileCartCta() {
  const pathname = usePathname();
  const count = useCartStore((state) => state.cartCount());
  const subtotal = useCartStore((state) => state.subtotal());

  if (count === 0 || pathname === "/cart" || pathname === "/checkout") return null;

  return (
    <Link
      href="/cart"
      className="focus-ring fixed bottom-[76px] left-4 right-4 z-40 flex items-center justify-between rounded-full bg-foreground px-5 py-4 text-sm font-black text-background shadow-card md:hidden"
    >
      <span className="flex items-center gap-2">
        <ShoppingBag className="h-5 w-5" />
        {count} item{count > 1 ? "s" : ""}
      </span>
      <span>{formatPrice(subtotal)}</span>
    </Link>
  );
}
