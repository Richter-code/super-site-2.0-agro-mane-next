'use client';

import Link from 'next/link';
import { CheckCircle2, Loader2 } from 'lucide-react';
import type { ReactNode } from 'react';

import { CartSummary } from '@/components/cart/CartSummary';
import { Button } from '@/components/ui/button';
import type { CheckoutStep } from '@/lib/checkout';
import type { CheckoutFormValues } from '@/features/checkout/schema';
import { useCart } from '@/features/cart/CartProvider';
import {
  formatCepMask,
  formatCpfMask,
  formatPhoneMask,
  formatCurrency,
} from '@/lib/utils';
import type { ReviewStatus } from '@/features/checkout/useCheckoutForm';

interface CheckoutReviewSectionProps {
  values: CheckoutFormValues;
  status: ReviewStatus;
  onConfirm: () => Promise<void>;
  onEditStep?: (step: CheckoutStep) => void;
  errorMessage?: string | null;
}

export function CheckoutReviewSection({
  values,
  status,
  onConfirm,
  onEditStep,
  errorMessage,
}: CheckoutReviewSectionProps) {
  const items = useCart((state) => state.items);
  const subtotal = useCart((state) => state.subtotal);

  const ctaLabel =
    status === 'success'
      ? 'Redirecionando...'
      : status === 'loading'
        ? 'Preparando pagamento...'
        : 'Finalizar pagamento seguro';

  return (
    <div className="space-y-6">
      <ReviewCard
        title="Dados do cliente"
        onEdit={() => onEditStep?.('customer')}
      >
        <dl className="grid gap-1 text-sm text-moss-800">
          <Row label="Nome" value={values.customer.name} />
          <Row label="E-mail" value={values.customer.email} />
          <Row
            label="Telefone"
            value={formatPhoneMask(values.customer.phone)}
          />
          {values.customer.cpf && (
            <Row label="CPF" value={formatCpfMask(values.customer.cpf)} />
          )}
        </dl>
      </ReviewCard>

      <ReviewCard title="Endereço" onEdit={() => onEditStep?.('address')}>
        <dl className="grid gap-1 text-sm text-moss-800">
          <Row label="CEP" value={formatCepMask(values.address.cep)} />
          <Row
            label="Rua"
            value={`${values.address.street}, ${values.address.number}`}
          />
          {values.address.complement && (
            <Row label="Complemento" value={values.address.complement} />
          )}
          <Row label="Bairro" value={values.address.district} />
          <Row
            label="Cidade"
            value={`${values.address.city} / ${values.address.state.toUpperCase()}`}
          />
        </dl>
      </ReviewCard>

      <ReviewCard title="Pagamento" onEdit={() => onEditStep?.('payment')}>
        <dl className="grid gap-1 text-sm text-moss-800">
          <Row label="Método" value={mapPayment(values.payment.method)} />
          {values.payment.cardLastDigits && (
            <Row
              label="Cartão"
              value={`Final ${values.payment.cardLastDigits}`}
            />
          )}
        </dl>
        <p className="mt-3 text-xs text-moss-500">
          Pagamento processado via Stripe Checkout com criptografia de ponta a
          ponta.
        </p>
      </ReviewCard>

      <div className="space-y-4 rounded-3xl border border-sand-100 bg-white/95 p-6 shadow-card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-moss-500">
              Itens
            </p>
            <h3 className="text-lg font-semibold text-moss-900">
              Resumo do carrinho
            </h3>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/carrinho">Editar carrinho</Link>
          </Button>
        </div>
        <ul className="space-y-2 text-sm text-moss-700">
          {items.map((item) => (
            <li
              key={item.productId}
              className="flex items-center justify-between"
            >
              <span>
                {item.quantity}x {item.name}
              </span>
              <span className="font-semibold text-moss-900">
                {formatCurrency(item.price * item.quantity)}
              </span>
            </li>
          ))}
        </ul>
        <CartSummary
          subtotal={subtotal}
          ctaLabel={ctaLabel}
          ctaAriaLabel="Finalizar pagamento seguro a partir do resumo"
          ctaDisabled={status !== 'idle'}
          onCheckout={onConfirm}
          footer={
            <ReviewFooter
              status={status}
              errorMessage={errorMessage ?? undefined}
            />
          }
        />
      </div>
    </div>
  );
}

function ReviewCard({
  title,
  onEdit,
  children,
}: {
  title: string;
  onEdit?: () => void;
  children: ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-sand-100 bg-white/95 p-6 shadow-card">
      <header className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-moss-900">{title}</h3>
        {onEdit && (
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={onEdit}
            aria-label={`Editar seção ${title}`}
          >
            Editar
          </Button>
        )}
      </header>
      {children}
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-xs font-semibold uppercase tracking-[0.35em] text-moss-500">
        {label}
      </span>
      <span className="text-sm text-moss-900">{value}</span>
    </div>
  );
}

function ReviewFooter({
  status,
  errorMessage,
}: {
  status: ReviewStatus;
  errorMessage?: string;
}) {
  if (errorMessage) {
    return (
      <p className="text-sm font-medium text-red-600" role="alert">
        {errorMessage}
      </p>
    );
  }

  if (status === 'loading') {
    return (
      <div
        className="flex items-center gap-2 text-sm text-moss-600"
        aria-live="polite"
      >
        <Loader2 className="h-4 w-4 animate-spin text-brand-600" aria-hidden />
        Processando pedido...
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div
        className="flex items-center gap-2 text-sm font-semibold text-brand-700"
        aria-live="polite"
      >
        <CheckCircle2 className="h-5 w-5 text-brand-600" aria-hidden />
        Pagamento iniciado com sucesso!
      </div>
    );
  }

  return (
    <p className="text-xs text-moss-500" aria-live="polite">
      Você será redirecionado para concluir o pagamento com segurança.
    </p>
  );
}

function mapPayment(method: CheckoutFormValues['payment']['method']) {
  switch (method) {
    case 'card':
      return 'Cartão de crédito';
    case 'pix':
      return 'Pix instantâneo';
    case 'boleto':
      return 'Boleto bancário';
    default:
      return method;
  }
}
