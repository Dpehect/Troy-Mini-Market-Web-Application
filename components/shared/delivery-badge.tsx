import { Clock, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export function DeliveryBadge({
  type = "delivery",
  className
}: {
  type?: "delivery" | "pickup";
  className?: string;
}) {
  const Icon = type === "delivery" ? Clock : MapPin;
  const label = type === "delivery" ? "Delivery in 30–45 min" : "Pickup available today";

  return (
    <div className={cn("inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-xs font-bold text-foreground shadow-soft", className)}>
      <Icon className="h-4 w-4 text-accent" aria-hidden="true" />
      {label}
    </div>
  );
}
