export const dynamic = "force-dynamic";

import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";
import { CategoryCard } from "@/components/shared/category-card";
import { categories } from "@/data/categories";

export default function CategoriesPage() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <SectionHeader
          eyebrow="Categories"
          title="Shop by grocery category."
          description="A clear category system keeps the experience fast for everyday shopping, especially on mobile."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </Container>
    </section>
  );
}
