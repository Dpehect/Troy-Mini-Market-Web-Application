"use client";

import Link from "next/link";
import { Home, Search, ShoppingBag, UserRound, Grid3X3 } from "lucide-react";
import { useCartStore } from "@/store/cart-store";

const mobileItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/shop", label: "Shop", icon: Grid3X3 },
  { href: "/search", label: "Search", icon: Search },
  { href: "/cart", label: "Cart", icon: ShoppingBag },
  { href: "/account", label: "Account", icon: UserRound }
];

export function MobileBottomNav() {
  const cartCount = useCartStore((state) => state.cartCount());

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/92 px-2 py-2 backdrop-blur-xl md:hidden" aria-label="Mobile bottom navigation">
      <div className="grid grid-cols-5 gap-1">
        {mobileItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="focus-ring relative flex flex-col items-center justify-center rounded-2xl px-2 py-2 text-[11px] font-black text-muted-foreground hover:bg-card hover:text-foreground"
            >
              <Icon className="mb-1 h-5 w-5" />
              {item.label}
              {item.label === "Cart" && cartCount > 0 ? (
                <span className="absolute right-4 top-1 rounded-full bg-foreground px-1.5 text-[10px] text-background">
                  {cartCount}
                </span>
              ) : null}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
