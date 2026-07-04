export const dynamic = "force-dynamic";

import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";
import { FavoritesClient } from "@/components/account/favorites-client";
import { products } from "@/data/products";

export default function FavoritesPage() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <SectionHeader
          eyebrow="Favorites"
          title="Saved grocery picks."
          description="Keep repeat purchases close so weekly shopping is faster."
        />
        <FavoritesClient products={products} />
      </Container>
    </section>
  );
}
