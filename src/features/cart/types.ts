import type { Product } from '@/data/products';
import type { CartItem, CartState } from '@/lib/cart';

export type { CartItem, CartState };

export type CartActions = {
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  hydrate: (state: CartState) => void;
};

export type CartStore = CartState & CartActions;
