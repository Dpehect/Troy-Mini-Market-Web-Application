import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";
import { CategoryCard } from "@/components/shared/category-card";
import { PromoCard } from "@/components/shared/promo-card";
import { BasketCard } from "@/components/shared/basket-card";
import { TrustBadge } from "@/components/shared/trust-badge";
import { ProductGrid } from "@/components/product/product-grid";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/categories";
import { deals } from "@/data/deals";
import { baskets } from "@/data/baskets";
import { featuredProducts, deliFavorites } from "@/data/products";
import { trustBadges } from "@/data/trust";

export function CategoryPreview() {
  return (
    <section className="py-14 md:py-20">
      <Container>
        <SectionHeader
          eyebrow="Shop faster"
          title="The full aisle map is still one tap away."
          description="After the creative homepage shortcuts, the traditional category grid remains available for users who prefer direct browsing."
          action={
            <Button asChild variant="secondary">
              <Link href="/categories">
                View all categories
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          }
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.slice(0, 8).map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export function EssentialsPreview() {
  return (
    <section className="bg-muted/45 py-14 md:py-20">
      <Container>
        <SectionHeader
          eyebrow="Today’s essentials"
          title="Essential products stay clear and quick."
          description="Even with a stronger visual identity, product cards keep the grocery basics visible: name, size, price, stock, delivery status, and add-to-cart."
          action={
            <Button asChild>
              <Link href="/shop">
                Shop all groceries
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          }
        />
        <ProductGrid products={featuredProducts} />
      </Container>
    </section>
  );
}

export function DealsPreview() {
  return (
    <section className="py-14 md:py-20">
      <Container>
        <SectionHeader
          eyebrow="Fresh deals"
          title="Useful offers without banner clutter."
          description="Promotions are designed to help decisions, not distract from shopping."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {deals.map((deal) => (
            <PromoCard key={deal.id} deal={deal} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export function BasketsPreview() {
  return (
    <section className="bg-primary py-14 text-primary-foreground md:py-20">
      <Container>
        <SectionHeader
          eyebrow="Shop by moment"
          title="Ready-made baskets for real-life grocery needs."
          description="Breakfast, dinner, cleaning day, weekly reset — users can shop by intent instead of hunting every item one by one."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {baskets.map((basket) => (
            <BasketCard key={basket.id} basket={basket} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export function DeliPreview() {
  return (
    <section className="py-14 md:py-20">
      <Container>
        <SectionHeader
          eyebrow="Fresh from the deli"
          title="Made-today lunch picks from the neighborhood counter."
          description="Deli items give the site a realistic local American mini-market feel and create a stronger ordering use case."
          action={
            <Button asChild variant="secondary">
              <Link href="/categories/deli">
                Browse deli
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          }
        />
        <ProductGrid products={deliFavorites} />
      </Container>
    </section>
  );
}

export function TrustSection() {
  return (
    <section className="bg-muted/45 py-14 md:py-20">
      <Container>
        <SectionHeader
          align="center"
          eyebrow="Built for confidence"
          title="A market experience that feels clear before it feels clever."
          description="The strongest UX details are practical: delivery clarity, pickup options, freshness expectations, and substitution control."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {trustBadges.map((item) => (
            <TrustBadge key={item.id} item={item} />
          ))}
        </div>
      </Container>
    </section>
  );
}
