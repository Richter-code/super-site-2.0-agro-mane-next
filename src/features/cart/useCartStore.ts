'use client';

import { create } from 'zustand';
import type { Product } from '@/data/products';
import {
  addItem,
  buildCartStateFromItems,
  clearCart,
  createEmptyCart,
  removeItem,
  updateQuantity,
} from '@/lib/cart';
import type { CartStore } from '@/features/cart/types';

export const useCartStore = create<CartStore>((set) => ({
  ...createEmptyCart(),
  addToCart: (product: Product, quantity = 1) =>
    set((state) => addItem(state, product, quantity)),
  removeFromCart: (productId: string) =>
    set((state) => removeItem(state, productId)),
  setQuantity: (productId: string, quantity: number) =>
    set((state) => updateQuantity(state, productId, quantity)),
  clearCart: () => set(() => clearCart()),
  hydrate: (snapshot) => {
    if (!snapshot || !Array.isArray(snapshot.items)) {
      return;
    }
    set(() => buildCartStateFromItems(snapshot.items));
  },
}));
