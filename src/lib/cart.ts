import type { Product } from '@/data/products';

export type CartItem = {
  id: string;
  productId: Product['id'];
  name: Product['name'];
  slug: Product['slug'];
  price: Product['price'];
  quantity: number;
  image: Product['image'];
  category: Product['category'];
};

export type CartState = {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
};

export function createEmptyCart(): CartState {
  return { items: [], totalItems: 0, subtotal: 0 };
}

export function addItem(
  cart: CartState,
  product: Product,
  quantity = 1,
): CartState {
  const existing = cart.items.find((item) => item.productId === product.id);
  const items = existing
    ? cart.items.map((item) =>
        item.productId === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item,
      )
    : [
        ...cart.items,
        {
          id: product.id,
          productId: product.id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          quantity,
          image: product.image,
          category: product.category,
        },
      ];

  return recompute({ ...cart, items });
}

export function removeItem(cart: CartState, productId: string): CartState {
  const items = cart.items.filter((item) => item.productId !== productId);
  return recompute({ ...cart, items });
}

export function updateQuantity(
  cart: CartState,
  productId: string,
  quantity: number,
): CartState {
  const normalized = Math.max(1, quantity);
  const items = cart.items.map((item) =>
    item.productId === productId ? { ...item, quantity: normalized } : item,
  );
  return recompute({ ...cart, items });
}

export function clearCart(): CartState {
  return createEmptyCart();
}

export function getCartTotals(cart: CartState) {
  const subtotal = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  return { subtotal, totalItems };
}

export function buildCartStateFromItems(items: CartItem[]): CartState {
  const cart = { items, subtotal: 0, totalItems: 0 } as CartState;
  return recompute(cart);
}

function recompute(cart: CartState): CartState {
  const { subtotal, totalItems } = getCartTotals(cart);
  return { ...cart, subtotal, totalItems };
}
