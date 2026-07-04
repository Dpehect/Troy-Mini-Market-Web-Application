export const dynamic = "force-dynamic";

import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";
import { ReorderClient } from "@/components/account/reorder-client";
import { baskets } from "@/data/baskets";
import { products } from "@/data/products";

export default function ReorderPage() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <SectionHeader
          eyebrow="Reorder"
          title="Repeat grocery runs faster."
          description="Use ready-made baskets or reorder past purchases without searching for every item again."
        />
        <ReorderClient products={products} baskets={baskets} />
      </Container>
    </section>
  );
}
