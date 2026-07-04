"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search, ShoppingBag, Truck, Utensils, Wand2 } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/product/product-grid";
import { useCartStore } from "@/store/cart-store";
import { products, featuredProducts } from "@/data/products";

const essentials = ["Whole Milk", "Large Brown Eggs", "Sourdough Bread", "Organic Bananas"];
const dinner = ["Penne Pasta", "Roma Tomatoes", "Sharp Cheddar Cheese", "Sourdough Bread"];
const deli = ["Turkey Sandwich", "Chicken Caesar Wrap", "Fresh Coffee"];

const shortcuts = [
  {
    label: "Search",
    detail: "Find anything",
    href: "/search",
    icon: Search
  },
  {
    label: "Deli",
    detail: "Pickup today",
    href: "/categories/deli",
    icon: Utensils
  },
  {
    label: "Reorder",
    detail: "Buy again",
    href: "/reorder",
    icon: Wand2
  }
];

export function MinimalHome() {
  const addItem = useCartStore((state) => state.addItem);

  function addNamedProducts(names: string[]) {
    names
      .map((name) => products.find((product) => product.name === name))
      .filter(Boolean)
      .forEach((product) => addItem(product!));
  }

  return (
    <>
      <section className="ultra-hero relative overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1800&auto=format&fit=crop"
          alt="Fresh groceries in a minimal market basket"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="image-veil absolute inset-0" />

        <Container className="relative z-10 flex min-h-[calc(100svh-100px)] items-center py-10 md:py-16">
          <div className="grid w-full gap-10 lg:grid-cols-[1.03fr_0.97fr] lg:items-end">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, ease: "easeOut" }}
              className="max-w-5xl"
            >
              <p className="mb-5 text-xs font-black uppercase tracking-[0.24em] text-muted-foreground">
                Troy · grocery in fewer steps
              </p>

              <h1 className="big-type font-display text-7xl font-semibold leading-[0.82] md:text-9xl xl:text-[10.5rem]">
                Need. Add. Done.
              </h1>

              <p className="mt-7 max-w-xl text-lg font-semibold leading-8 text-muted-foreground md:text-xl">
                The whole experience is built around one move: get the right groceries into the cart with the least effort.
              </p>

              <div className="mt-8 max-w-2xl rounded-[2rem] border border-border bg-background/88 p-3 shadow-card backdrop-blur-xl">
                <Link
                  href="/search"
                  className="focus-ring flex h-16 items-center gap-4 rounded-[1.45rem] bg-card px-5 text-left transition hover:bg-muted"
                >
                  <Search className="h-5 w-5 text-muted-foreground" />
                  <span className="text-base font-black text-muted-foreground">Search milk, eggs, bread, deli…</span>
                  <ArrowRight className="ml-auto h-5 w-5 text-foreground" />
                </Link>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" onClick={() => addNamedProducts(essentials)}>
                  <ShoppingBag className="h-5 w-5" />
                  Add essentials
                </Button>
                <Button size="lg" variant="secondary" onClick={() => addNamedProducts(dinner)}>
                  Dinner kit
                </Button>
                <Button asChild size="lg" variant="ghost">
                  <Link href="/shop">Open market</Link>
                </Button>
                <Button asChild size="lg" variant="ghost">
                  <Link href="/case-study">Case study</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, ease: "easeOut", delay: 0.06 }}
              className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3"
            >
              {shortcuts.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="action-card focus-ring clean-glass hairline rounded-[2rem] p-5 hover:bg-foreground hover:text-background"
                  >
                    <Icon className="h-5 w-5" />
                    <p className="mt-8 text-3xl font-black tracking-[-0.06em]">{item.label}</p>
                    <p className="mt-1 text-sm font-bold opacity-60">{item.detail}</p>
                  </Link>
                );
              })}
            </motion.div>
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-background py-5">
        <Container>
          <div className="grid gap-3 text-sm font-black text-muted-foreground md:grid-cols-3">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-accent" />
              Delivery in 30–45 min
            </div>
            <div>Pickup available today</div>
            <div>No account required to start</div>
          </div>
        </Container>
      </section>

      <section className="py-14 md:py-20">
        <Container>
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-muted-foreground">Fast carts</p>
              <h2 className="mt-2 font-display text-5xl font-semibold leading-[0.9] tracking-[-0.08em] md:text-7xl">
                One tap if you already know.
              </h2>
            </div>
            <Button asChild variant="secondary">
              <Link href="/reorder">See reorder</Link>
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <QuickCart title="Essentials" detail="Milk, eggs, bread, bananas" price="$14.76" onClick={() => addNamedProducts(essentials)} />
            <QuickCart title="Dinner" detail="Pasta, tomatoes, cheese, bread" price="$16.46" onClick={() => addNamedProducts(dinner)} />
            <QuickCart title="Deli" detail="Sandwich, wrap, coffee" price="$20.97" onClick={() => addNamedProducts(deli)} />
          </div>
        </Container>
      </section>

      <section className="bg-muted/45 py-14 md:py-20">
        <Container>
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-muted-foreground">Popular</p>
              <h2 className="mt-2 font-display text-5xl font-semibold leading-[0.9] tracking-[-0.08em] md:text-7xl">
                Clear enough to scan.
              </h2>
            </div>
            <Button asChild variant="ghost">
              <Link href="/shop">All products</Link>
            </Button>
          </div>

          <ProductGrid products={featuredProducts.slice(0, 8)} />
        </Container>
      </section>
    </>
  );
}

function QuickCart({
  title,
  detail,
  price,
  onClick
}: {
  title: string;
  detail: string;
  price: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="action-card focus-ring group rounded-[2.25rem] border border-border bg-card p-6 text-left hover:border-foreground hover:bg-foreground hover:text-background"
    >
      <div className="mb-12 flex items-center justify-between">
        <span className="text-xs font-black uppercase tracking-[0.22em] text-muted-foreground group-hover:text-background/50">
          Cart
        </span>
        <span className="rounded-full border border-border px-3 py-1 text-sm font-black group-hover:border-background/20">
          {price}
        </span>
      </div>
      <h3 className="text-5xl font-black tracking-[-0.08em]">{title}</h3>
      <p className="mt-3 text-sm font-bold leading-6 text-muted-foreground group-hover:text-background/60">
        {detail}
      </p>
    </button>
  );
}
