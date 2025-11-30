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
  const [announcement, setAnnouncement] = React.useState('');
  const announceTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (disabled || !product.inStock) {
      return;
    }
    addToCart(product, quantity);
    setAnnouncement(`${product.name} adicionado ao carrinho.`);
    if (announceTimeoutRef.current) {
      clearTimeout(announceTimeoutRef.current);
    }
    announceTimeoutRef.current = setTimeout(() => setAnnouncement(''), 1200);
  };

  React.useEffect(() => {
    return () => {
      if (announceTimeoutRef.current) clearTimeout(announceTimeoutRef.current);
    };
  }, []);

  return (
    <>
      <Button
        {...props}
        disabled={disabled || !product.inStock}
        onClick={handleClick}
        aria-live="polite"
      >
        {children}
      </Button>
      <span className="sr-only" aria-live="polite">
        {announcement}
      </span>
    </>
  );
}
