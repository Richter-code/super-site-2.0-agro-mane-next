'use client';

import { Controller, type UseFormReturn } from 'react-hook-form';

import { CheckoutFormField } from '@/components/checkout/CheckoutFormField';
import { Input } from '@/components/ui/input';
import { cn, digitsOnly } from '@/lib/utils';
import type { CheckoutFormValues } from '@/features/checkout/schema';

const PAYMENT_OPTIONS = [
  {
    value: 'card',
    title: 'Cartão de crédito',
    description: 'Autorização imediata simulada',
  },
  {
    value: 'pix',
    title: 'Pix instantâneo',
    description: 'Mostramos o QR Code após a confirmação',
  },
  {
    value: 'boleto',
    title: 'Boleto bancário',
    description: 'Confirmação em até 2 dias úteis (simulação)',
  },
] as const;

interface CheckoutPaymentFormProps {
  form: UseFormReturn<CheckoutFormValues>;
}

export function CheckoutPaymentForm({ form }: CheckoutPaymentFormProps) {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = form;

  const method = watch('payment.method');

  return (
    <div className="space-y-6">
      <fieldset className="grid gap-3">
        <legend className="sr-only">Selecione o método de pagamento</legend>
        {PAYMENT_OPTIONS.map((option) => {
          const isSelected = method === option.value;
          const optionId = `checkout-payment-${option.value}`;
          return (
            <label
              key={option.value}
              htmlFor={optionId}
              className={cn(
                'flex cursor-pointer items-center justify-between gap-4 rounded-2xl border p-4 shadow-card transition',
                isSelected
                  ? 'border-brand-400 bg-brand-50'
                  : 'border-sand-100 bg-white/95 hover:border-brand-300',
              )}
            >
              <span>
                <span className="block text-sm font-semibold text-moss-900">
                  {option.title}
                </span>
                <span className="text-xs text-moss-500">
                  {option.description}
                </span>
              </span>
              <input
                id={optionId}
                type="radio"
                value={option.value}
                className="h-5 w-5 text-brand-600"
                {...register('payment.method')}
              />
            </label>
          );
        })}
      </fieldset>

      {method === 'card' && (
        <div className="grid gap-4 md:grid-cols-2">
          <CheckoutFormField
            label="Nome impresso no cartão"
            htmlFor="payment-card-name"
            error={
              errors.payment?.cardholderName?.message as string | undefined
            }
          >
            <Input
              id="payment-card-name"
              placeholder="Nome como aparece no cartão"
              aria-invalid={Boolean(errors.payment?.cardholderName)}
              aria-describedby={
                errors.payment?.cardholderName
                  ? 'payment-card-name-error'
                  : undefined
              }
              className={cn(
                errors.payment?.cardholderName &&
                  'border-red-300 focus-visible:outline-red-500',
              )}
              {...register('payment.cardholderName')}
            />
          </CheckoutFormField>
          <CheckoutFormField
            label="Últimos 4 dígitos"
            htmlFor="payment-card-last-digits"
            error={
              errors.payment?.cardLastDigits?.message as string | undefined
            }
          >
            <Controller
              control={control}
              name="payment.cardLastDigits"
              render={({ field }) => (
                <Input
                  id="payment-card-last-digits"
                  inputMode="numeric"
                  maxLength={4}
                  placeholder="1234"
                  aria-invalid={Boolean(errors.payment?.cardLastDigits)}
                  aria-describedby={
                    errors.payment?.cardLastDigits
                      ? 'payment-card-last-digits-error'
                      : undefined
                  }
                  className={cn(
                    errors.payment?.cardLastDigits &&
                      'border-red-300 focus-visible:outline-red-500',
                  )}
                  value={field.value ?? ''}
                  onChange={(event) =>
                    field.onChange(digitsOnly(event.target.value).slice(-4))
                  }
                />
              )}
            />
          </CheckoutFormField>
        </div>
      )}

      {(method === 'pix' || method === 'boleto') && (
        <div className="rounded-2xl border border-dashed border-brand-200 bg-brand-50/40 p-4 text-sm text-moss-700">
          <p className="font-semibold text-moss-900">Pagamento simulado</p>
          <p className="text-xs text-moss-600">
            Nesta etapa exibiremos o QR Code ou boleto apenas como demonstração.
            Nenhum dado real é processado.
          </p>
        </div>
      )}
    </div>
  );
}
