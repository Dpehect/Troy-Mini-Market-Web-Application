export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Star } from "lucide-react";
import { Container } from "@/components/shared/container";
import { ProductGrid } from "@/components/product/product-grid";
import { ProductDetailActions } from "@/components/product/product-detail-actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PriceDisplay } from "@/components/shared/price-display";
import { getProductBySlug, getRelatedProducts } from "@/data/products";
import { getDiscountPercent } from "@/lib/utils";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product, 4);
  const discount = getDiscountPercent(product.price, product.originalPrice);

  return (
    <section className="py-8 md:py-14">
      <Container>
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/shop">
            <ArrowLeft className="h-4 w-4" />
            Shop
          </Link>
        </Button>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="relative aspect-square overflow-hidden rounded-[2.6rem] border border-border bg-muted">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 52vw"
              className="object-cover"
            />
            <div className="absolute left-5 top-5 flex flex-wrap gap-2">
              {product.isFresh ? <Badge variant="fresh">Fresh</Badge> : null}
              {discount ? <Badge variant="discount">{discount}% off</Badge> : null}
              {product.isLocal ? <Badge variant="secondary">Local</Badge> : null}
            </div>
          </div>

          <aside className="lg:sticky lg:top-24">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-muted-foreground">
              {product.category} · {product.subcategory}
            </p>
            <h1 className="mt-3 font-display text-6xl font-semibold leading-[0.88] tracking-[-0.08em] md:text-8xl">
              {product.name}
            </h1>
            <p className="mt-5 text-lg font-semibold text-muted-foreground">
              {product.brand} · {product.size}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-2 text-sm font-black">
                <Star className="h-4 w-4 fill-warning text-warning" />
                {product.rating}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-sm font-black">
                <Check className="h-4 w-4 text-fresh" />
                {product.stock > 0 ? "In stock" : "Out of stock"}
              </span>
              <span className="inline-flex rounded-full border border-border bg-card px-3 py-2 text-sm font-black">
                {product.deliveryTag}
              </span>
            </div>

            <div className="mt-7">
              <PriceDisplay
                price={product.price}
                originalPrice={product.originalPrice}
                unitPrice={product.unitPrice}
              />
            </div>

            <div className="mt-7">
              <ProductDetailActions product={product} />
            </div>

            <div className="mt-8 grid gap-3">
              <DetailLine title="Ingredients" value={product.ingredients?.length ? product.ingredients.join(", ") : "See package."} />
              <DetailLine title="Allergens" value={product.allergens?.length ? product.allergens.join(", ") : "No major allergens listed."} />
              <DetailLine title="Origin" value={product.origin ?? "USA"} />
            </div>
          </aside>
        </div>

        {related.length > 0 ? (
          <div className="mt-16">
            <div className="mb-7 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-muted-foreground">Related</p>
                <h2 className="mt-2 font-display text-4xl font-semibold tracking-[-0.06em] md:text-6xl">Add next.</h2>
              </div>
              <Button asChild variant="ghost">
                <Link href="/shop">More products</Link>
              </Button>
            </div>
            <ProductGrid products={related} />
          </div>
        ) : null}
      </Container>
    </section>
  );
}

function DetailLine({ title, value }: { title: string; value: string }) {
  return (
    <div className="border-t border-border py-4">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-muted-foreground">{title}</p>
      <p className="mt-1 text-sm font-semibold leading-6">{value}</p>
    </div>
  );
}
