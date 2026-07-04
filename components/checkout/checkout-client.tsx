"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, ArrowRight, CheckCircle2, CreditCard, MapPin, PackageCheck, ShoppingBasket, Store, Truck } from "lucide-react";
import { useForm } from "react-hook-form";
import type { CheckoutDetails, DeliverySlot, DeliveryType, PaymentMethod, SubstitutionPreference } from "@/types";
import { checkoutSchema, calculateDeliveryFee, calculateDiscount, deliverySlots, pickupSlots, type CheckoutFormValues } from "@/lib/checkout";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/shared/empty-state";
import { useCartStore } from "@/store/cart-store";
import { useOrderStore } from "@/store/order-store";

const substitutionOptions: { value: SubstitutionPreference; title: string; description: string }[] = [
  {
    value: "replace",
    title: "Replace with a similar item",
    description: "Best for keeping the order complete."
  },
  {
    value: "remove",
    title: "Remove from order",
    description: "Skip unavailable items automatically."
  },
  {
    value: "contact",
    title: "Contact me first",
    description: "Get a call or text before changes."
  },
  {
    value: "no-substitutions",
    title: "No substitutions",
    description: "Only send the exact items selected."
  }
];

const paymentOptions: { value: PaymentMethod; title: string; description: string }[] = [
  {
    value: "card",
    title: "Credit card",
    description: "Mock secure card payment UI."
  },
  {
    value: "apple-pay",
    title: "Apple Pay",
    description: "Fast wallet-style mock checkout."
  },
  {
    value: "cash-on-delivery",
    title: "Cash on delivery",
    description: "Pay when your order arrives."
  }
];

export function CheckoutClient() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const createOrder = useOrderStore((state) => state.createOrder);
  const [placed, setPlaced] = useState(false);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: "",
      phone: "",
      fullName: "",
      deliveryType: "delivery",
      address: "",
      apartment: "",
      instructions: "",
      deliverySlot: "asap",
      substitutionPreference: "replace",
      paymentMethod: "card",
      promoCode: "",
      bagPreference: "paper"
    }
  });

  const deliveryType = form.watch("deliveryType");
  const promoCode = form.watch("promoCode");
  const activeSlots = deliveryType === "delivery" ? deliverySlots : pickupSlots;
  const selectedSlot = activeSlots.find((slot) => slot.id === form.watch("deliverySlot")) ?? activeSlots[0];

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items]
  );
  const discount = calculateDiscount(subtotal, promoCode);
  const deliveryFee = calculateDeliveryFee(subtotal, deliveryType);
  const total = Math.max(0, subtotal + deliveryFee - discount);

  function setDeliveryType(value: DeliveryType) {
    form.setValue("deliveryType", value, { shouldValidate: true });
    form.setValue("deliverySlot", value === "delivery" ? deliverySlots[0].id : pickupSlots[0].id, {
      shouldValidate: true
    });
  }

  function onSubmit(values: CheckoutFormValues) {
    if (items.length === 0 || placed) return;

    const selected = (values.deliveryType === "delivery" ? deliverySlots : pickupSlots).find(
      (slot) => slot.id === values.deliverySlot
    );

    const details: CheckoutDetails = {
      ...values,
      deliverySlot: selected ? `${selected.label}, ${selected.window}` : values.deliverySlot
    };

    setPlaced(true);
    const orderId = createOrder({
      items,
      subtotal,
      deliveryFee,
      discount,
      total,
      details
    });
    clearCart();
    router.push(`/order-success?order=${orderId}`);
  }

  if (items.length === 0 && !placed) {
    return (
      <EmptyState
        title="Your basket is empty"
        description="Add groceries first, then return to checkout to choose delivery or pickup."
        actionLabel="Shop groceries"
        actionHref="/shop"
      />
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-8 lg:grid-cols-[1fr_380px]">
      <div className="space-y-6">
        <CheckoutPanel
          step="1"
          title="Contact"
          description="We’ll use this for order updates and substitution questions."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Full name" error={form.formState.errors.fullName?.message}>
              <input {...form.register("fullName")} className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm font-semibold outline-none focus:ring-2 focus:ring-ring" placeholder="Alex Morgan" />
            </Field>
            <Field label="Phone" error={form.formState.errors.phone?.message}>
              <input {...form.register("phone")} className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm font-semibold outline-none focus:ring-2 focus:ring-ring" placeholder="(518) 555-0142" />
            </Field>
            <Field label="Email" error={form.formState.errors.email?.message} className="md:col-span-2">
              <input {...form.register("email")} type="email" className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm font-semibold outline-none focus:ring-2 focus:ring-ring" placeholder="alex@example.com" />
            </Field>
          </div>
        </CheckoutPanel>

        <CheckoutPanel
          step="2"
          title="Delivery or pickup"
          description="Show the most important fulfillment decision before payment."
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setDeliveryType("delivery")}
              className={choiceClass(deliveryType === "delivery")}
            >
              <Truck className="h-5 w-5 text-accent" />
              <span className="block text-base font-black">Delivery</span>
              <span className="mt-1 block text-sm text-muted-foreground">Local delivery in practical time windows.</span>
            </button>
            <button
              type="button"
              onClick={() => setDeliveryType("pickup")}
              className={choiceClass(deliveryType === "pickup")}
            >
              <Store className="h-5 w-5 text-accent" />
              <span className="block text-base font-black">Pickup</span>
              <span className="mt-1 block text-sm text-muted-foreground">Order ahead and pick up at the deli counter.</span>
            </button>
          </div>

          {deliveryType === "delivery" ? (
            <div className="mt-5 grid gap-4 md:grid-cols-[1fr_160px]">
              <Field label="Delivery address" error={form.formState.errors.address?.message}>
                <input {...form.register("address")} className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm font-semibold outline-none focus:ring-2 focus:ring-ring" placeholder="71 Congress St, Troy, NY" />
              </Field>
              <Field label="Apt / unit">
                <input {...form.register("apartment")} className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm font-semibold outline-none focus:ring-2 focus:ring-ring" placeholder="Apt 2B" />
              </Field>
              <Field label="Delivery instructions" className="md:col-span-2">
                <textarea {...form.register("instructions")} className="min-h-24 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-ring" placeholder="Gate code, drop-off notes, or contact preference." />
              </Field>
            </div>
          ) : (
            <div className="mt-5 rounded-3xl bg-muted p-4">
              <div className="flex gap-3">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-accent" />
                <div>
                  <p className="font-black">Pickup at Troy Mini Market</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    71 Congress St, Troy, NY · Your order will be held at the pickup counter.
                  </p>
                </div>
              </div>
            </div>
          )}
        </CheckoutPanel>

        <CheckoutPanel
          step="3"
          title={deliveryType === "delivery" ? "Delivery time" : "Pickup time"}
          description="Time windows are shown before payment so users know what they’re committing to."
        >
          <div className="grid gap-3 md:grid-cols-2">
            {activeSlots.map((slot) => (
              <SlotButton
                key={slot.id}
                slot={slot}
                active={form.watch("deliverySlot") === slot.id}
                onClick={() => form.setValue("deliverySlot", slot.id, { shouldValidate: true })}
              />
            ))}
          </div>
          {form.formState.errors.deliverySlot?.message ? (
            <p className="mt-3 text-sm font-bold text-danger">{form.formState.errors.deliverySlot.message}</p>
          ) : null}
        </CheckoutPanel>

        <CheckoutPanel
          step="4"
          title="Unavailable items"
          description="Substitution control makes grocery orders feel realistic and trustworthy."
        >
          <div className="grid gap-3 md:grid-cols-2">
            {substitutionOptions.map((option) => (
              <button
                type="button"
                key={option.value}
                onClick={() => form.setValue("substitutionPreference", option.value, { shouldValidate: true })}
                className={choiceClass(form.watch("substitutionPreference") === option.value)}
              >
                <span className="block text-base font-black">{option.title}</span>
                <span className="mt-1 block text-sm text-muted-foreground">{option.description}</span>
              </button>
            ))}
          </div>
        </CheckoutPanel>

        <CheckoutPanel
          step="5"
          title="Payment"
          description="Secure payment UI preview. No real payment is processed in this build."
        >
          <div className="grid gap-3 md:grid-cols-3">
            {paymentOptions.map((option) => (
              <button
                type="button"
                key={option.value}
                onClick={() => form.setValue("paymentMethod", option.value, { shouldValidate: true })}
                className={choiceClass(form.watch("paymentMethod") === option.value)}
              >
                <CreditCard className="h-5 w-5 text-accent" />
                <span className="block text-base font-black">{option.title}</span>
                <span className="mt-1 block text-sm text-muted-foreground">{option.description}</span>
              </button>
            ))}
          </div>

          {form.watch("paymentMethod") === "card" ? (
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <Field label="Card number">
                <input className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm font-semibold outline-none focus:ring-2 focus:ring-ring" placeholder="4242 4242 4242 4242" inputMode="numeric" />
              </Field>
              <Field label="Name on card">
                <input className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm font-semibold outline-none focus:ring-2 focus:ring-ring" placeholder="Alex Morgan" />
              </Field>
              <Field label="Expiry">
                <input className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm font-semibold outline-none focus:ring-2 focus:ring-ring" placeholder="MM / YY" />
              </Field>
              <Field label="CVC">
                <input className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm font-semibold outline-none focus:ring-2 focus:ring-ring" placeholder="123" inputMode="numeric" />
              </Field>
            </div>
          ) : null}
        </CheckoutPanel>
      </div>

      <aside className="h-fit rounded-[2rem] border border-border bg-card p-5 shadow-card lg:sticky lg:top-28">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <ShoppingBasket className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-black">Order summary</h2>
            <p className="text-sm text-muted-foreground">{items.length} unique items</p>
          </div>
        </div>

        <div className="max-h-72 space-y-3 overflow-y-auto pr-1">
          {items.map((item) => (
            <div key={item.productId} className="flex gap-3 rounded-2xl bg-muted/65 p-3">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-background">
                <Image src={item.image} alt={item.name} fill sizes="56px" className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="line-clamp-1 text-sm font-black">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.quantity} × {formatPrice(item.price)}</p>
              </div>
              <p className="text-sm font-black">{formatPrice(item.price * item.quantity)}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-3xl bg-muted p-4">
          <div className="flex items-start gap-3">
            <PackageCheck className="mt-1 h-5 w-5 shrink-0 text-accent" />
            <div>
              <p className="text-sm font-black">
                {deliveryType === "delivery" ? "Delivery" : "Pickup"} · {selectedSlot.window}
              </p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">{selectedSlot.feeLabel}</p>
            </div>
          </div>
        </div>

        <Field label="Promo code" className="mt-5">
          <input
            {...form.register("promoCode")}
            className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm font-semibold uppercase outline-none focus:ring-2 focus:ring-ring"
            placeholder="LOCAL10"
          />
        </Field>

        <div className="mt-5 space-y-3 text-sm">
          <SummaryLine label="Subtotal" value={formatPrice(subtotal)} />
          <SummaryLine label="Delivery / pickup" value={deliveryFee === 0 ? "Free" : formatPrice(deliveryFee)} />
          <SummaryLine label="Discount" value={discount > 0 ? `-${formatPrice(discount)}` : "$0.00"} />
          <div className="border-t border-border pt-4">
            <SummaryLine label="Total" value={formatPrice(total)} strong />
          </div>
        </div>

        {subtotal < 35 && deliveryType === "delivery" ? (
          <div className="mt-5 rounded-2xl bg-warning/15 p-3 text-sm font-semibold text-foreground">
            Add {formatPrice(35 - subtotal)} more for free delivery.
          </div>
        ) : deliveryType === "delivery" ? (
          <div className="mt-5 rounded-2xl bg-fresh/10 p-3 text-sm font-bold text-fresh">
            <CheckCircle2 className="mr-2 inline h-4 w-4" />
            Free delivery unlocked.
          </div>
        ) : null}

        <label className="mt-5 block">
          <span className="mb-2 block text-sm font-black">Bag preference</span>
          <select
            {...form.register("bagPreference")}
            className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm font-semibold outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="paper">Paper bags</option>
            <option value="reusable">Reusable bags if available</option>
            <option value="no-preference">No preference</option>
          </select>
        </label>

        <Button type="submit" size="lg" className="mt-6 w-full" disabled={placed}>
          {placed ? "Placing order..." : "Place order"}
          <ArrowRight className="h-5 w-5" />
        </Button>

        <div className="mt-4 flex items-start gap-2 rounded-2xl bg-background p-3 text-xs leading-5 text-muted-foreground">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          Payment preview only. No real payment is processed.
        </div>
      </aside>
    </form>
  );
}

function CheckoutPanel({
  step,
  title,
  description,
  children
}: {
  step: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[2rem] border border-border bg-card p-5 shadow-soft md:p-6">
      <div className="mb-5 flex gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary text-sm font-black text-primary-foreground">
          {step}
        </div>
        <div>
          <h2 className="text-2xl font-black tracking-tight">{title}</h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

function Field({
  label,
  error,
  className,
  children
}: {
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={className}>
      <span className="mb-2 block text-sm font-black">{label}</span>
      {children}
      {error ? <span className="mt-2 block text-xs font-bold text-danger">{error}</span> : null}
    </label>
  );
}

function SlotButton({
  slot,
  active,
  onClick
}: {
  slot: DeliverySlot;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={slot.availability === "full"}
      onClick={onClick}
      className={choiceClass(active, slot.availability === "full")}
    >
      <span className="flex items-center justify-between gap-3">
        <span className="text-base font-black">{slot.label}</span>
        <Badge variant={slot.availability === "busy" ? "warning" : "secondary"}>
          {slot.availability === "busy" ? "Busy" : slot.availability === "full" ? "Full" : "Available"}
        </Badge>
      </span>
      <span className="mt-2 block text-sm font-semibold text-muted-foreground">{slot.window}</span>
      <span className="mt-1 block text-xs font-bold text-accent">{slot.feeLabel}</span>
    </button>
  );
}

function SummaryLine({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={strong ? "flex justify-between text-lg font-black" : "flex justify-between"}>
      <span className={strong ? "" : "text-muted-foreground"}>{label}</span>
      <span className="font-black">{value}</span>
    </div>
  );
}

function choiceClass(active: boolean, disabled = false) {
  return [
    "focus-ring rounded-3xl border p-4 text-left transition",
    active ? "border-primary bg-primary/10 shadow-soft" : "border-border bg-background hover:bg-muted",
    disabled ? "cursor-not-allowed opacity-50" : ""
  ].join(" ");
}
