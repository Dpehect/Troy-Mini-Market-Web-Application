import { z } from "zod";
import type { CartItem, DeliverySlot } from "@/types";

export const checkoutSchema = z.object({
  email: z.string().email("Enter a valid email address."),
  phone: z.string().min(7, "Enter a phone number we can use for order updates."),
  fullName: z.string().min(2, "Enter the name for this order."),
  deliveryType: z.enum(["delivery", "pickup"]),
  address: z.string().min(5, "Enter a delivery address."),
  apartment: z.string().optional(),
  instructions: z.string().optional(),
  deliverySlot: z.string().min(1, "Choose a delivery or pickup time."),
  substitutionPreference: z.enum(["replace", "remove", "contact", "no-substitutions"]),
  paymentMethod: z.enum(["card", "apple-pay", "cash-on-delivery"]),
  promoCode: z.string().optional(),
  bagPreference: z.enum(["paper", "reusable", "no-preference"])
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export const deliverySlots: DeliverySlot[] = [
  {
    id: "asap",
    label: "ASAP",
    window: "30–45 min",
    feeLabel: "$4.99 delivery",
    availability: "available"
  },
  {
    id: "today-430",
    label: "Today",
    window: "4:30 PM – 5:15 PM",
    feeLabel: "$3.99 delivery",
    availability: "available"
  },
  {
    id: "today-530",
    label: "Today",
    window: "5:30 PM – 6:15 PM",
    feeLabel: "$3.99 delivery",
    availability: "busy"
  },
  {
    id: "tomorrow-900",
    label: "Tomorrow",
    window: "9:00 AM – 10:00 AM",
    feeLabel: "$2.99 delivery",
    availability: "available"
  }
];

export const pickupSlots: DeliverySlot[] = [
  {
    id: "pickup-20",
    label: "Today",
    window: "Ready in 20 min",
    feeLabel: "Free pickup",
    availability: "available"
  },
  {
    id: "pickup-45",
    label: "Today",
    window: "4:45 PM – 5:15 PM",
    feeLabel: "Free pickup",
    availability: "available"
  },
  {
    id: "pickup-tomorrow",
    label: "Tomorrow",
    window: "9:00 AM – 10:00 AM",
    feeLabel: "Free pickup",
    availability: "available"
  }
];

export function calculateSubtotal(items: CartItem[]) {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

export function calculateDiscount(subtotal: number, promoCode?: string) {
  const normalized = promoCode?.trim().toUpperCase();
  if (!normalized) return 0;
  if (normalized === "LOCAL10") return Math.min(subtotal * 0.1, 15);
  if (normalized === "FRESH5") return subtotal >= 35 ? 5 : 0;
  return 0;
}

export function calculateDeliveryFee(subtotal: number, deliveryType: "delivery" | "pickup") {
  if (deliveryType === "pickup") return 0;
  if (subtotal >= 35) return 0;
  return 4.99;
}

export function buildOrderProgress(deliveryType: "delivery" | "pickup") {
  if (deliveryType === "pickup") {
    return [
      { label: "Order received", completed: true, time: "Now" },
      { label: "Preparing your groceries", completed: true, time: "Next" },
      { label: "Ready for pickup", completed: false },
      { label: "Picked up", completed: false }
    ];
  }

  return [
    { label: "Order received", completed: true, time: "Now" },
    { label: "Preparing your groceries", completed: true, time: "Next" },
    { label: "Out for delivery", completed: false },
    { label: "Delivered", completed: false }
  ];
}
