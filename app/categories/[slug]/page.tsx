export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { Container } from "@/components/shared/container";
import { ShopClient } from "@/components/product/shop-client";
import { categories, getCategoryBySlug } from "@/data/categories";
import { products } from "@/data/products";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  return (
    <section className="py-10 md:py-14">
      <Container>
        <ShopClient
          products={products}
          categories={categories}
          initialCategory={category.name}
          title={category.name}
          description={category.description}
        />
      </Container>
    </section>
  );
}
