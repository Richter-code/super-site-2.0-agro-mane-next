'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Minus, Plus, Trash2, PawPrint, Waves, Sprout, Wheat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartSummary } from '@/components/cart/CartSummary';
import { useCart } from '@/features/cart/CartProvider';
import { formatCurrency } from '@/lib/utils';

export function CartPageClient() {
  const items = useCart((state) => state.items);
  const subtotal = useCart((state) => state.subtotal);
  const setQuantity = useCart((state) => state.setQuantity);
  const removeFromCart = useCart((state) => state.removeFromCart);
  const clearCart = useCart((state) => state.clearCart);
  const router = useRouter();
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-border bg-card/90 p-10 text-center text-muted-foreground">
        <p className="text-2xl font-semibold text-foreground">
          Seu carrinho está vazio
        </p>
        <p className="max-w-md text-sm text-muted-foreground">
          Explore o catálogo completo e descubra soluções selecionadas para Pet,
          Piscina, Jardim e Agro.
        </p>
        <Button asChild size="lg">
          <Link href="/produtos">Explorar catálogo</Link>
        </Button>
        <div aria-live="polite" className="sr-only">
          {actionMessage}
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      <div
        className="space-y-4"
        role="region"
        aria-labelledby="cart-items-heading"
      >
        <div className="flex items-center justify-between">
          <h2
            id="cart-items-heading"
            className="text-sm font-semibold uppercase tracking-[0.35em] text-moss-500"
          >
            Itens ({items.length})
          </h2>
          <button
            type="button"
            className="text-sm font-medium text-moss-500 underline"
            onClick={() => {
              clearCart();
              setActionMessage('Carrinho esvaziado.');
            }}
          >
            Limpar carrinho
          </button>
        </div>
        <ul className="space-y-4" role="list">
          {items.map((item) => (
            <li
              key={item.productId}
              className="flex flex-col gap-4 rounded-3xl border border-border bg-card/90 p-5 shadow-card md:flex-row"
            >
              <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-brand-100 via-card to-sand-100">
                <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-foreground text-background shadow-card">
                  <div className="absolute -top-1 -left-1 h-2 w-2 rounded-sm bg-brand-400" aria-hidden />
                  <div className="absolute -bottom-1 -right-1 h-2 w-2 rounded-sm bg-sand-400" aria-hidden />
                  {getCartIcon(item.category)}
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <Link
                    href={`/produtos/${item.slug}`}
                    className="text-lg font-semibold text-foreground hover:text-brand-500"
                  >
                    {item.name}
                  </Link>
                  <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
                    {item.category}
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="inline-flex items-center rounded-full border border-sand-200">
                    <button
                      type="button"
                      className="flex h-9 w-9 items-center justify-center text-moss-600"
                      aria-label={`Diminuir quantidade de ${item.name}`}
                      onClick={() =>
                        setQuantity(
                          item.productId,
                          Math.max(1, item.quantity - 1),
                        )
                      }
                    >
                      <Minus size={16} />
                    </button>
                    <span className="min-w-[2.5rem] text-center text-sm font-semibold text-moss-900">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      className="flex h-9 w-9 items-center justify-center text-moss-600"
                      aria-label={`Aumentar quantidade de ${item.name}`}
                      onClick={() =>
                        setQuantity(item.productId, item.quantity + 1)
                      }
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">
                      {formatCurrency(item.price)} unidade
                    </p>
                    <p className="text-xl font-semibold text-foreground">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground"
                  onClick={() => {
                    removeFromCart(item.productId);
                    setActionMessage(`${item.name} removido do carrinho.`);
                  }}
                >
                  <Trash2 size={14} /> Remover
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div aria-live="polite" className="sr-only">
          {actionMessage}
        </div>
      </div>

      <CartSummary
        subtotal={subtotal}
        headingLevel="h2"
        onCheckout={() => router.push('/checkout')}
        ctaAriaLabel="Ir para checkout a partir do resumo do carrinho"
        footer={
          <Button
            variant="ghost"
            asChild
            className="w-full text-sm text-moss-600"
          >
            <Link href="/produtos">Continuar comprando</Link>
          </Button>
        }
      />
    </div>
  );
}

function getCartIcon(category: string) {
  switch (category) {
    case 'pet':
      return <PawPrint className="h-6 w-6" aria-hidden />;
    case 'piscina':
      return <Waves className="h-6 w-6" aria-hidden />;
    case 'jardim':
      return <Sprout className="h-6 w-6" aria-hidden />;
    case 'agro':
      return <Wheat className="h-6 w-6" aria-hidden />;
    default:
      return <Sprout className="h-6 w-6" aria-hidden />;
  }
}
