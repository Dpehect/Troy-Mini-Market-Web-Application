export const dynamic = "force-dynamic";

import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";
import { CartPageClient } from "@/components/cart/cart-page-client";

export default function CartPage() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <SectionHeader
          eyebrow="Cart"
          title="Your grocery basket."
          description="Review quantities, delivery progress, and order total before checkout."
        />
        <CartPageClient />
      </Container>
    </section>
  );
}
