export const dynamic = "force-dynamic";

import { Container } from "@/components/shared/container";
import { ShopClient } from "@/components/product/shop-client";
import { ShopIntentRail } from "@/components/minimal/shop-intent-rail";
import { categories } from "@/data/categories";
import { products } from "@/data/products";

export default function ShopPage() {
  return (
    <section className="py-10 md:py-14">
      <Container>
        <ShopIntentRail />
        <ShopClient
          products={products}
          categories={categories}
          title="Shop."
          description="Search, filter, add. The full market stays powerful, but every control has a job."
        />
      </Container>
    </section>
  );
}
