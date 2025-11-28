'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { CartIcon } from '@/components/cart/CartIcon';
import { MiniCart } from '@/components/cart/MiniCart';

export function CartDrawer() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleCheckout = () => {
    setOpen(false);
    router.push('/checkout');
  };

  return (
    <>
      <CartIcon onClick={() => setOpen(true)} />
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent aria-describedby="mini-cart-description" role="dialog">
          <SheetHeader className="mb-4 text-left">
            <SheetTitle>Seu carrinho</SheetTitle>
            <SheetDescription id="mini-cart-description">
              Revise seus itens e siga para o checkout.
            </SheetDescription>
          </SheetHeader>
          <MiniCart
            onCheckout={handleCheckout}
            onClose={() => setOpen(false)}
          />
        </SheetContent>
      </Sheet>
    </>
  );
}
