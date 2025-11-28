import Link from 'next/link';
import type { ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatCurrency, cn } from '@/lib/utils';
import { buildWhatsappLink } from '@/lib/whatsapp';

interface CartSummaryProps {
  subtotal: number;
  className?: string;
  ctaLabel?: string;
  onCheckout?: () => void;
  ctaDisabled?: boolean;
  footer?: ReactNode;
  headingLevel?: 'h2' | 'h3';
  ctaAriaLabel?: string;
}

export function CartSummary({
  subtotal,
  className,
  ctaLabel = 'Ir para checkout',
  onCheckout,
  ctaDisabled,
  footer,
  headingLevel = 'h3',
  ctaAriaLabel,
}: CartSummaryProps) {
  const shippingLabel = 'Calculado no checkout';
  const total = subtotal;
  const Heading = headingLevel;
  const whatsappHref = buildWhatsappLink({
    message: 'Olá! Preciso de ajuda com meu carrinho no site.',
  });
  const whatsappTarget = whatsappHref ? '_blank' : undefined;

  return (
    <Card className={cn('space-y-4 rounded-3xl p-6', className)}>
      <div>
        <Heading className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
          Resumo
        </Heading>
      </div>
      <div className="space-y-2 text-sm text-muted-foreground">
        <div className="flex items-center justify-between">
          <span>Subtotal</span>
          <span className="font-semibold text-foreground">
            {formatCurrency(subtotal)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Frete</span>
          <span className="text-muted-foreground">{shippingLabel}</span>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-border pt-4">
        <span className="text-sm font-semibold uppercase tracking-[0.35em] text-muted-foreground">
          Total
        </span>
        <span className="text-2xl font-semibold text-foreground">
          {formatCurrency(total)}
        </span>
      </div>
      <Button
        className="focus-ring w-full"
        size="lg"
        onClick={onCheckout}
        disabled={ctaDisabled}
        aria-label={ctaAriaLabel}
        type="button"
      >
        {ctaLabel}
      </Button>
      <Button variant="outline" asChild className="focus-ring w-full">
        <Link
          href={whatsappHref || '#contato'}
          target={whatsappTarget}
          rel={whatsappTarget ? 'noopener noreferrer' : undefined}
          className="inline-flex items-center justify-center gap-2"
          aria-disabled={!whatsappHref}
        >
          Preciso de ajuda no WhatsApp
        </Link>
      </Button>
      {footer}
    </Card>
  );
}
