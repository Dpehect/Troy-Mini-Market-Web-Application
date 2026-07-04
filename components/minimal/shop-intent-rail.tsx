import Link from "next/link";
import { ChefHat, Clock, Home, Sandwich } from "lucide-react";

const rails = [
  {
    title: "Fast",
    text: "Milk, eggs, bread, water",
    href: "/search?q=milk eggs bread water",
    icon: Clock
  },
  {
    title: "Dinner",
    text: "Pasta, tomatoes, cheese",
    href: "/search?q=pasta tomatoes cheese",
    icon: ChefHat
  },
  {
    title: "Deli",
    text: "Sandwiches, wraps, coffee",
    href: "/categories/deli",
    icon: Sandwich
  },
  {
    title: "Home",
    text: "Towels, soap, cleaner",
    href: "/search?q=paper towels soap cleaner",
    icon: Home
  }
];

export function ShopIntentRail() {
  return (
    <div className="mb-8 grid gap-3 md:grid-cols-4">
      {rails.map((rail) => {
        const Icon = rail.icon;
        return (
          <Link
            key={rail.title}
            href={rail.href}
            className="focus-ring rounded-[1.7rem] border border-border bg-card p-4 transition hover:-translate-y-0.5 hover:bg-foreground hover:text-background"
          >
            <Icon className="h-5 w-5" />
            <p className="mt-5 text-2xl font-black tracking-[-0.05em]">{rail.title}</p>
            <p className="mt-1 text-sm leading-6 opacity-70">{rail.text}</p>
          </Link>
        );
      })}
    </div>
  );
}
