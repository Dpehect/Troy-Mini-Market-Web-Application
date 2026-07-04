"use client";

import Link from "next/link";
import { Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/ui/drawer";
import { Container } from "@/components/shared/container";
import { useCartStore } from "@/store/cart-store";

const navItems = [
  { href: "/shop", label: "Shop" },
  { href: "/search", label: "Search" },
  { href: "/categories/deli", label: "Deli" },
  { href: "/deals", label: "Deals" },
  { href: "/reorder", label: "Reorder" }
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const cartCount = useCartStore((state) => state.cartCount());

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-xl">
      <Container>
        <div className="flex h-16 items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <Link href="/" className="focus-ring rounded-lg text-lg font-black tracking-[-0.035em]">
            Troy Mini Market
          </Link>

          <nav className="ml-8 hidden items-center gap-7 lg:flex" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="focus-ring rounded-md text-sm font-bold text-muted-foreground transition hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <Button asChild variant="ghost" size="icon" className="hidden md:inline-flex" aria-label="Search">
              <Link href="/search">
                <Search className="h-5 w-5" />
              </Link>
            </Button>

            <Button asChild variant="ghost" size="icon" className="hidden md:inline-flex" aria-label="Account">
              <Link href="/account">
                <UserRound className="h-5 w-5" />
              </Link>
            </Button>

            <Link
              href="/cart"
              className="focus-ring inline-flex h-11 items-center justify-center gap-2 rounded-full bg-foreground px-4 text-sm font-black text-background transition hover:opacity-90"
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 ? (
                <span className="rounded-full bg-accent px-2 py-0.5 text-xs text-accent-foreground">
                  {cartCount}
                </span>
              ) : null}
            </Link>
          </div>
        </div>
      </Container>

      <Drawer open={menuOpen} onOpenChange={setMenuOpen} title="Menu">
        <div className="space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="focus-ring flex items-center justify-between rounded-3xl border border-border bg-background px-5 py-4 text-2xl font-black tracking-tight"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
              <span className="text-muted-foreground">→</span>
            </Link>
          ))}
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="focus-ring mt-5 flex items-center gap-2 rounded-full px-4 py-3 text-sm font-bold text-muted-foreground"
          >
            <X className="h-4 w-4" />
            Close
          </button>
        </div>
      </Drawer>
    </header>
  );
}
