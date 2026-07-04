import { formatPrice, getDiscountPercent } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function PriceDisplay({
  price,
  originalPrice,
  unitPrice,
  currency = "USD",
  compact = false
}: {
  price: number;
  originalPrice?: number;
  unitPrice?: string;
  currency?: string;
  compact?: boolean;
}) {
  const discount = getDiscountPercent(price, originalPrice);

  return (
    <div className="space-y-1">
      <div className="flex flex-wrap items-center gap-2">
        <span className={compact ? "text-lg font-black text-price" : "text-2xl font-black text-price"}>
          {formatPrice(price, currency)}
        </span>
        {originalPrice ? (
          <span className="text-sm font-medium text-muted-foreground line-through">
            {formatPrice(originalPrice, currency)}
          </span>
        ) : null}
        {discount ? <Badge variant="discount">{discount}% off</Badge> : null}
      </div>
      {unitPrice ? <p className="text-xs font-medium text-muted-foreground">{unitPrice}</p> : null}
    </div>
  );
}
