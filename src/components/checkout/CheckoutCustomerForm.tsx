'use client';

import { Controller, type UseFormReturn } from 'react-hook-form';

import { CheckoutFormField } from '@/components/checkout/CheckoutFormField';
import { Input } from '@/components/ui/input';
import { cn, digitsOnly, formatCpfMask, formatPhoneMask } from '@/lib/utils';
import type { CheckoutFormValues } from '@/features/checkout/schema';

interface CheckoutCustomerFormProps {
  form: UseFormReturn<CheckoutFormValues>;
}

export function CheckoutCustomerForm({ form }: CheckoutCustomerFormProps) {
  const {
    register,
    control,
    formState: { errors },
  } = form;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <CheckoutFormField
          label="Nome completo"
          htmlFor="customer-name"
          error={errors.customer?.name?.message as string | undefined}
        >
          <Input
            id="customer-name"
            placeholder="Ex.: Maria da Silva"
            autoComplete="name"
            aria-invalid={Boolean(errors.customer?.name)}
            aria-describedby={
              errors.customer?.name ? 'customer-name-error' : undefined
            }
            className={cn(
              errors.customer?.name &&
                'border-red-300 focus-visible:outline-red-500',
            )}
            {...register('customer.name')}
          />
        </CheckoutFormField>
        <CheckoutFormField
          label="E-mail"
          htmlFor="customer-email"
          error={errors.customer?.email?.message as string | undefined}
        >
          <Input
            id="customer-email"
            type="email"
            placeholder="voce@email.com"
            autoComplete="email"
            aria-invalid={Boolean(errors.customer?.email)}
            aria-describedby={
              errors.customer?.email ? 'customer-email-error' : undefined
            }
            className={cn(
              errors.customer?.email &&
                'border-red-300 focus-visible:outline-red-500',
            )}
            {...register('customer.email')}
          />
        </CheckoutFormField>
        <CheckoutFormField
          label="Telefone"
          htmlFor="customer-phone"
          error={errors.customer?.phone?.message as string | undefined}
        >
          <Controller
            control={control}
            name="customer.phone"
            render={({ field }) => (
              <Input
                id="customer-phone"
                inputMode="tel"
                placeholder="(11) 99999-0000"
                autoComplete="tel-national"
                aria-invalid={Boolean(errors.customer?.phone)}
                aria-describedby={
                  errors.customer?.phone ? 'customer-phone-error' : undefined
                }
                className={cn(
                  errors.customer?.phone &&
                    'border-red-300 focus-visible:outline-red-500',
                )}
                value={formatPhoneMask(field.value ?? '')}
                onChange={(event) =>
                  field.onChange(digitsOnly(event.target.value))
                }
              />
            )}
          />
        </CheckoutFormField>
        <CheckoutFormField
          label="CPF (opcional)"
          htmlFor="customer-cpf"
          error={errors.customer?.cpf?.message as string | undefined}
          required={false}
        >
          <Controller
            control={control}
            name="customer.cpf"
            render={({ field }) => (
              <Input
                id="customer-cpf"
                inputMode="numeric"
                placeholder="000.000.000-00"
                aria-invalid={Boolean(errors.customer?.cpf)}
                aria-describedby={
                  errors.customer?.cpf ? 'customer-cpf-error' : undefined
                }
                className={cn(
                  errors.customer?.cpf &&
                    'border-red-300 focus-visible:outline-red-500',
                )}
                value={formatCpfMask(field.value ?? '')}
                onChange={(event) =>
                  field.onChange(digitsOnly(event.target.value))
                }
              />
            )}
          />
        </CheckoutFormField>
      </div>
    </div>
  );
}
