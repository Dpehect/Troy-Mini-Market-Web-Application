"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "sonner";
import type { CartItem, Product } from "@/types";

type CartState = {
  items: CartItem[];
  deliveryFee: number;
  freeDeliveryThreshold: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  clearCart: () => void;
  subtotal: () => number;
  cartCount: () => number;
  amountUntilFreeDelivery: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      deliveryFee: 4.99,
      freeDeliveryThreshold: 35,

      addItem: (product, quantity = 1) => {
        set((state) => {
          const existing = state.items.find((item) => item.productId === product.id);

          if (existing) {
            return {
              items: state.items.map((item) =>
                item.productId === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              )
            };
          }

          return {
            items: [
              ...state.items,
              {
                productId: product.id,
                name: product.name,
                price: product.price,
                quantity,
                image: product.image,
                size: product.size
              }
            ]
          };
        });

        toast.success("Added to cart", {
          description: `${product.name} is now in your basket.`
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId)
        }));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
          )
        }));
      },

      increaseQuantity: (productId) => {
        const item = get().items.find((entry) => entry.productId === productId);
        if (item) get().updateQuantity(productId, item.quantity + 1);
      },

      decreaseQuantity: (productId) => {
        const item = get().items.find((entry) => entry.productId === productId);
        if (item) get().updateQuantity(productId, item.quantity - 1);
      },

      clearCart: () => set({ items: [] }),

      subtotal: () => get().items.reduce((total, item) => total + item.price * item.quantity, 0),

      cartCount: () => get().items.reduce((total, item) => total + item.quantity, 0),

      amountUntilFreeDelivery: () => Math.max(0, get().freeDeliveryThreshold - get().subtotal())
    }),
    {
      name: "troy-mini-market-cart"
    }
  )
);
