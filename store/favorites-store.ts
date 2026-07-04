"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type FavoritesState = {
  productIds: string[];
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  clearFavorites: () => void;
};

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      productIds: [],

      toggleFavorite: (productId) => {
        set((state) => ({
          productIds: state.productIds.includes(productId)
            ? state.productIds.filter((id) => id !== productId)
            : [...state.productIds, productId]
        }));
      },

      isFavorite: (productId) => get().productIds.includes(productId),

      clearFavorites: () => set({ productIds: [] })
    }),
    {
      name: "troy-mini-market-favorites"
    }
  )
);
