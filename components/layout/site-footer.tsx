import Link from "next/link";
import { Container } from "@/components/shared/container";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/search", label: "Search" },
  { href: "/categories/deli", label: "Deli" },
  { href: "/deals", label: "Deals" },
  { href: "/reorder", label: "Reorder" },
  { href: "/about", label: "About" }
];

const serviceLinks = [
  { href: "/checkout", label: "Checkout" },
  { href: "/favorites", label: "Favorites" },
  { href: "/account", label: "Account" },
  { href: "/case-study", label: "Process" }
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <p className="text-2xl font-black tracking-[-0.04em]">Troy Mini Market</p>
            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              Local groceries, deli favorites, and household essentials with a faster path from need to cart.
            </p>
            <p className="mt-5 text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">
              Delivery 30–45 min · Pickup today
            </p>
          </div>

          <nav className="flex flex-col gap-3" aria-label="Footer shopping navigation">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Market</p>
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm font-bold text-muted-foreground hover:text-foreground">
                {link.label}
              </Link>
            ))}
          </nav>

          <nav className="flex flex-col gap-3" aria-label="Footer service navigation">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Service</p>
            {serviceLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm font-bold text-muted-foreground hover:text-foreground">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-5 text-xs font-semibold text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Troy Mini Market.</span>
          <span>Fresh, direct, and built around fewer steps.</span>
        </div>
      </Container>
    </footer>
  );
}
