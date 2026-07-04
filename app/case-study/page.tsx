import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Code2, Gauge, Layers3, Search, ShoppingBag, Sparkles, Waypoints } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Process",
  description: "Product and design process behind Troy Mini Market, an ultra-minimal grocery ecommerce experience."
};

const highlights = [
  {
    label: "Product goal",
    value: "Reduce grocery shopping to the fewest useful steps."
  },
  {
    label: "Catalog depth",
    value: "152 realistic grocery items across fresh, deli, pantry, drinks, household and care."
  },
  {
    label: "Execution",
    value: "Typed data, persisted state, validated checkout and production build checks."
  }
];

const decisions = [
  {
    icon: Search,
    title: "Search before browsing",
    text: "Most grocery sessions begin with a known need. Search is placed before category exploration so users can move directly."
  },
  {
    icon: ShoppingBag,
    title: "One-tap baskets",
    text: "Essentials, dinner and deli lunch are available as fast actions for recurring shopping patterns."
  },
  {
    icon: Waypoints,
    title: "Predictable checkout",
    text: "Discovery can feel premium, but checkout must be calm, explicit and conventional."
  },
  {
    icon: Gauge,
    title: "Measured motion",
    text: "Motion is reserved for hierarchy and feedback. It never slows search, add-to-cart, filtering or checkout."
  }
];

const stack = [
  "Next.js App Router",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Radix UI patterns",
  "Framer Motion",
  "Zustand",
  "React Hook Form",
  "Zod",
  "Next Image",
  "Typed mock data"
];

const quality = [
  "Single manifest source",
  "No duplicate route warnings",
  "Search supports URL query state",
  "Cart, favorites, checkout and order state persist locally",
  "Mobile bottom navigation and floating cart CTA",
  "Production build validated",
  "Sitemap, robots and manifest routes",
  "Reduced-motion support"
];

export default function CaseStudyPage() {
  return (
    <section className="py-12 md:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-muted-foreground">Process</p>
            <h1 className="mt-4 max-w-5xl font-display text-6xl font-semibold leading-[0.86] tracking-[-0.085em] md:text-8xl xl:text-9xl">
              Designed around effort, not decoration.
            </h1>
          </div>

          <div className="rounded-[2.5rem] border border-border bg-card p-6 md:p-8">
            <p className="text-lg font-semibold leading-8 text-muted-foreground">
              Troy Mini Market is a complete grocery ecommerce experience built to feel commercially real: fast entry, clear product hierarchy, low-friction cart behavior and a calm checkout path.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <Link href="/shop">
                  View product flow
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/checkout">View checkout</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {highlights.map((item) => (
            <article key={item.label} className="rounded-[2rem] border border-border bg-card p-6">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">{item.label}</p>
              <p className="mt-4 text-2xl font-black leading-tight tracking-[-0.05em]">{item.value}</p>
            </article>
          ))}
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-muted-foreground">Decisions</p>
            <h2 className="mt-3 font-display text-5xl font-semibold leading-[0.9] tracking-[-0.075em] md:text-7xl">
              Premium because it is quiet.
            </h2>
            <p className="mt-5 text-base leading-8 text-muted-foreground">
              The storefront avoids unnecessary storytelling. It prioritizes the few moments that matter: find, add, review and checkout.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {decisions.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="rounded-[2rem] border border-border bg-card p-6">
                  <Icon className="h-6 w-6 text-accent" />
                  <h3 className="mt-7 text-2xl font-black tracking-[-0.05em]">{item.title}</h3>
                  <p className="mt-3 text-sm font-semibold leading-7 text-muted-foreground">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <article className="rounded-[2.5rem] bg-foreground p-8 text-background md:p-10">
            <Layers3 className="h-7 w-7 text-accent" />
            <h2 className="mt-8 font-display text-5xl font-semibold leading-[0.92] tracking-[-0.075em] md:text-7xl">
              Built like a product.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-background/70">
              The experience includes catalog data, category filtering, product detail routes, persisted cart state, checkout validation, order success, favorites, reorder flows, SEO routes and mobile navigation.
            </p>
          </article>

          <article className="rounded-[2.5rem] border border-border bg-card p-8 md:p-10">
            <Code2 className="h-7 w-7 text-accent" />
            <h2 className="mt-8 text-3xl font-black tracking-[-0.06em]">Stack</h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {stack.map((item) => (
                <span key={item} className="rounded-full border border-border bg-background px-3 py-2 text-xs font-black text-muted-foreground">
                  {item}
                </span>
              ))}
            </div>
          </article>
        </div>

        <div className="mt-16 rounded-[2.5rem] border border-border bg-card p-6 md:p-8">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-muted-foreground">Quality</p>
              <h2 className="mt-3 font-display text-5xl font-semibold tracking-[-0.075em] md:text-7xl">
                Details that hold up under review.
              </h2>
            </div>
            <Sparkles className="hidden h-8 w-8 text-accent md:block" />
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {quality.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl bg-background px-4 py-3">
                <Check className="h-5 w-5 text-fresh" />
                <span className="text-sm font-black">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
