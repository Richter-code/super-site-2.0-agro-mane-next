'use client';

import * as React from 'react';
import type { Product } from '@/data/products';
import { Button, type ButtonProps } from '@/components/ui/button';
import { useCart } from '@/features/cart/CartProvider';

interface AddToCartButtonProps extends ButtonProps {
  product: Product;
  quantity?: number;
}

export function AddToCartButton({
  product,
  quantity = 1,
  children = 'Adicionar ao carrinho',
  disabled,
  onClick,
  ...props
}: AddToCartButtonProps) {
  const addToCart = useCart((state) => state.addToCart);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (disabled || !product.inStock) {
      return;
    }
    addToCart(product, quantity);
  };

  return (
    <Button
      {...props}
      disabled={disabled || !product.inStock}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
}
