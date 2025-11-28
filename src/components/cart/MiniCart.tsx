'use client';

import Link from 'next/link';
import { Minus, Plus, Trash2, PawPrint, Waves, Sprout, Wheat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartSummary } from '@/components/cart/CartSummary';
import { useCart } from '@/features/cart/CartProvider';
import { formatCurrency } from '@/lib/utils';

interface MiniCartProps {
  onCheckout?: () => void;
  onClose?: () => void;
}

export function MiniCart({ onCheckout, onClose }: MiniCartProps) {
  const items = useCart((state) => state.items);
  const subtotal = useCart((state) => state.subtotal);
  const removeFromCart = useCart((state) => state.removeFromCart);
  const setQuantity = useCart((state) => state.setQuantity);

  if (items.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 text-center text-moss-600">
        <p className="text-lg font-semibold text-moss-800">
          Seu carrinho está vazio
        </p>
        <p className="max-w-xs text-sm text-moss-500">
          Descubra os lançamentos e favoritos do momento direto no catálogo
          premium Agro do Mané.
        </p>
        <Button asChild onClick={onClose}>
          <Link href="/produtos">Explorar produtos</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-5">
      <div className="flex-1 space-y-4 overflow-y-auto pr-2">
        {items.map((item) => (
          <div
            key={item.productId}
            className="flex gap-4 rounded-2xl border border-sand-100/70 bg-white/90 p-4 shadow-card"
          >
            <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-brand-100 via-card to-sand-100">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-foreground text-background shadow-card">
                <div className="absolute -top-1 -left-1 h-2 w-2 rounded-sm bg-brand-400" aria-hidden />
                <div className="absolute -bottom-1 -right-1 h-2 w-2 rounded-sm bg-sand-400" aria-hidden />
                {getCartIcon(item.category)}
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <div>
                <p className="text-sm font-semibold text-moss-900">
                  {item.name}
                </p>
                <p className="text-xs uppercase tracking-[0.35em] text-moss-500">
                  {item.category}
                </p>
              </div>
              <div className="flex items-center justify-between text-sm text-moss-600">
                <span>{formatCurrency(item.price)}</span>
                <strong className="text-moss-900">
                  {formatCurrency(item.price * item.quantity)}
                </strong>
              </div>
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center rounded-full border border-sand-200">
                  <button
                    type="button"
                    className="flex h-8 w-8 items-center justify-center text-moss-600"
                    aria-label={`Diminuir quantidade de ${item.name}`}
                    onClick={() =>
                      setQuantity(
                        item.productId,
                        Math.max(1, item.quantity - 1),
                      )
                    }
                  >
                    <Minus size={14} />
                  </button>
                  <span className="min-w-[2rem] text-center text-sm font-semibold text-moss-900">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    className="flex h-8 w-8 items-center justify-center text-moss-600"
                    aria-label={`Aumentar quantidade de ${item.name}`}
                    onClick={() =>
                      setQuantity(item.productId, item.quantity + 1)
                    }
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.3em] text-moss-500"
                  onClick={() => removeFromCart(item.productId)}
                >
                  <Trash2 size={14} /> Remover
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <CartSummary
        subtotal={subtotal}
        ctaLabel="Ir para checkout"
        onCheckout={onCheckout}
        footer={
          <Button
            variant="ghost"
            asChild
            className="w-full text-sm text-moss-600"
            onClick={onClose}
          >
            <Link href="/carrinho">Ir para o carrinho</Link>
          </Button>
        }
      />
    </div>
  );
}

function getCartIcon(category: string) {
  switch (category) {
    case 'pet':
      return <PawPrint className="h-5 w-5" aria-hidden />;
    case 'piscina':
      return <Waves className="h-5 w-5" aria-hidden />;
    case 'jardim':
      return <Sprout className="h-5 w-5" aria-hidden />;
    case 'agro':
      return <Wheat className="h-5 w-5" aria-hidden />;
    default:
      return <Sprout className="h-5 w-5" aria-hidden />;
  }
}
