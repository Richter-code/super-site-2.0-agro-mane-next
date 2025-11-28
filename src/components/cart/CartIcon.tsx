'use client';

import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/features/cart/CartProvider';
import { cn } from '@/lib/utils';

interface CartIconProps {
  onClick?: () => void;
  className?: string;
}

export function CartIcon({ onClick, className }: CartIconProps) {
  const totalItems = useCart((state) => state.totalItems);

  return (
    <Button
      size="icon"
      variant="outline"
      className={cn(
        'relative h-11 w-11 rounded-full border-moss-100 text-moss-900 hover:border-brand-200',
        className,
      )}
      onClick={onClick}
      aria-label="Abrir carrinho"
    >
      <ShoppingCart className="h-5 w-5" aria-hidden />
      {totalItems > 0 && (
        <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-brand-600 px-1 text-xs font-semibold text-white">
          {totalItems}
        </span>
      )}
    </Button>
  );
}
