export const dynamic = "force-dynamic";

import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";
import { PromoCard } from "@/components/shared/promo-card";
import { ProductGrid } from "@/components/product/product-grid";
import { deals } from "@/data/deals";
import { dealProducts } from "@/data/products";

export default function DealsPage() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <SectionHeader
          eyebrow="Deals"
          title="Fresh deals near you."
          description="Useful promotions and discounted grocery picks without distracting banner clutter."
        />
        <div className="mb-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {deals.map((deal) => (
            <PromoCard key={deal.id} deal={deal} />
          ))}
        </div>

        <SectionHeader
          eyebrow="Discounted products"
          title="Current product savings."
          description="Discounted items stay clear: original price, current price, size, delivery status, and quick add."
        />
        <ProductGrid products={dealProducts} />
      </Container>
    </section>
  );
}
