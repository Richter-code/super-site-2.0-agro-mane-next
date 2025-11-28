'use client';

import { createContext, useContext, useEffect } from 'react';
import { useStore, type StoreApi } from 'zustand';
import type { UseBoundStore } from 'zustand';
import type { CartStore } from '@/features/cart/types';
import { useCartStore } from '@/features/cart/useCartStore';

const CART_STORAGE_KEY = 'agromane.cart';
const CartStoreContext = createContext<UseBoundStore<
  StoreApi<CartStore>
> | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const store = useCartStore;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const saved = window.localStorage.getItem(CART_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        store
          .getState()
          .hydrate({ items: parsed.items ?? [], subtotal: 0, totalItems: 0 });
      } catch (error) {
        console.warn('Failed to parse cart from storage', error);
      }
    }

    const unsubscribe = store.subscribe((state) => {
      window.localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify({ items: state.items }),
      );
    });

    return () => unsubscribe();
  }, [store]);

  return (
    <CartStoreContext.Provider value={store}>
      {children}
    </CartStoreContext.Provider>
  );
}

export function useCart<T>(selector: (state: CartStore) => T): T {
  const store = useContext(CartStoreContext);
  if (!store) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return useStore(store, selector);
}
