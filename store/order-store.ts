"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, CheckoutDetails, Order } from "@/types";
import { buildOrderProgress } from "@/lib/checkout";

type OrderInput = {
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  details: CheckoutDetails;
};

type OrderState = {
  orders: Order[];
  lastOrderId?: string;
  createOrder: (input: OrderInput) => string;
  getOrder: (id: string) => Order | undefined;
  clearOrders: () => void;
};

function createOrderId() {
  const suffix = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `TMM-${new Date().getFullYear()}-${suffix}`;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],
      lastOrderId: undefined,

      createOrder: (input) => {
        const id = createOrderId();
        const order: Order = {
          id,
          date: new Date().toISOString(),
          status: input.details.deliveryType === "pickup" ? "Preparing" : "Preparing",
          items: input.items,
          subtotal: input.subtotal,
          deliveryFee: input.deliveryFee,
          discount: input.discount,
          total: input.total,
          deliveryType: input.details.deliveryType,
          deliveryAddress:
            input.details.deliveryType === "pickup"
              ? "Troy Mini Market pickup counter"
              : [input.details.address, input.details.apartment].filter(Boolean).join(", "),
          deliverySlot: input.details.deliverySlot,
          substitutionPreference: input.details.substitutionPreference,
          paymentMethod: input.details.paymentMethod,
          contact: {
            email: input.details.email,
            phone: input.details.phone,
            fullName: input.details.fullName
          },
          progress: buildOrderProgress(input.details.deliveryType)
        };

        set((state) => ({
          orders: [order, ...state.orders],
          lastOrderId: id
        }));

        return id;
      },

      getOrder: (id) => get().orders.find((order) => order.id === id),

      clearOrders: () => set({ orders: [], lastOrderId: undefined })
    }),
    {
      name: "troy-mini-market-orders"
    }
  )
);
