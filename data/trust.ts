import type { TrustBadgeItem } from "@/types";

export const trustBadges: TrustBadgeItem[] = [
  {
    id: "trust-delivery",
    title: "Same-day delivery",
    description: "Fresh groceries delivered across Troy in practical local time windows.",
    icon: "Truck"
  },
  {
    id: "trust-pickup",
    title: "Pickup available",
    description: "Order ahead and pick up your groceries or deli favorites today.",
    icon: "ShoppingBag"
  },
  {
    id: "trust-freshness",
    title: "Freshness guaranteed",
    description: "Produce, bakery, and deli items are selected with care every day.",
    icon: "Leaf"
  },
  {
    id: "trust-secure",
    title: "Secure checkout",
    description: "A clean, simple order flow designed to reduce friction and confusion.",
    icon: "ShieldCheck"
  },
  {
    id: "trust-substitution",
    title: "Easy substitutions",
    description: "Choose how we should handle unavailable items before placing an order.",
    icon: "RefreshCcw"
  },
  {
    id: "trust-local",
    title: "Local service",
    description: "A neighborhood market experience made for everyday convenience.",
    icon: "MapPin"
  }
];
