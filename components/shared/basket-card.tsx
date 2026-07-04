import Image from "next/image";
import { ArrowRight, ShoppingBasket } from "lucide-react";
import type { Basket } from "@/types";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

export function BasketCard({ basket }: { basket: Basket }) {
  return (
    <article className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
      <div className="relative h-44 overflow-hidden bg-muted">
        <Image src={basket.image} alt={basket.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
        <div className="absolute left-3 top-3 rounded-full bg-card/90 px-3 py-1 text-xs font-bold backdrop-blur">
          {basket.occasion}
        </div>
      </div>
      <div className="p-5">
        <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-accent">
          <ShoppingBasket className="h-4 w-4" />
          {basket.itemCount} items
        </div>
        <h3 className="text-xl font-black tracking-tight">{basket.title}</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{basket.description}</p>
        <div className="mt-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold text-muted-foreground">Estimated total</p>
            <p className="text-xl font-black text-price">{formatPrice(basket.estimatedTotal)}</p>
          </div>
          <Button variant="secondary" className="group">
            Preview
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </Button>
        </div>
      </div>
    </article>
  );
}
