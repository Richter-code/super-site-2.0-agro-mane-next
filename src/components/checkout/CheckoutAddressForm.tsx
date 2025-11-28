'use client';

import { Controller, type UseFormReturn } from 'react-hook-form';

import { CheckoutFormField } from '@/components/checkout/CheckoutFormField';
import { Input } from '@/components/ui/input';
import { cn, digitsOnly, formatCepMask } from '@/lib/utils';
import type { CheckoutFormValues } from '@/features/checkout/schema';

interface CheckoutAddressFormProps {
  form: UseFormReturn<CheckoutFormValues>;
}

export function CheckoutAddressForm({ form }: CheckoutAddressFormProps) {
  const {
    register,
    control,
    formState: { errors },
  } = form;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <CheckoutFormField
          label="CEP"
          htmlFor="checkout-cep"
          error={errors.address?.cep?.message as string | undefined}
        >
          <Controller
            control={control}
            name="address.cep"
            render={({ field }) => (
              <Input
                id="checkout-cep"
                placeholder="00000-000"
                inputMode="numeric"
                aria-invalid={Boolean(errors.address?.cep)}
                aria-describedby={
                  errors.address?.cep ? 'checkout-cep-error' : undefined
                }
                className={cn(
                  errors.address?.cep &&
                    'border-red-300 focus-visible:outline-red-500',
                )}
                value={formatCepMask(field.value ?? '')}
                onChange={(event) =>
                  field.onChange(digitsOnly(event.target.value))
                }
              />
            )}
          />
          {/* TODO: integrar consulta automática de endereço ao digitar CEP válido */}
        </CheckoutFormField>
        <CheckoutFormField
          label="Rua"
          htmlFor="checkout-street"
          error={errors.address?.street?.message as string | undefined}
          description="Endereço completo"
        >
          <Input
            id="checkout-street"
            placeholder="Nome da rua/avenida"
            autoComplete="street-address"
            aria-invalid={Boolean(errors.address?.street)}
            aria-describedby={
              errors.address?.street ? 'checkout-street-error' : undefined
            }
            className={cn(
              errors.address?.street &&
                'border-red-300 focus-visible:outline-red-500',
            )}
            {...register('address.street')}
          />
        </CheckoutFormField>
        <CheckoutFormField
          label="Número"
          htmlFor="checkout-number"
          error={errors.address?.number?.message as string | undefined}
        >
          <Input
            id="checkout-number"
            placeholder="123"
            autoComplete="address-line2"
            aria-invalid={Boolean(errors.address?.number)}
            aria-describedby={
              errors.address?.number ? 'checkout-number-error' : undefined
            }
            className={cn(
              errors.address?.number &&
                'border-red-300 focus-visible:outline-red-500',
            )}
            {...register('address.number')}
          />
        </CheckoutFormField>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <CheckoutFormField
          label="Complemento"
          htmlFor="checkout-complement"
          required={false}
          error={errors.address?.complement?.message as string | undefined}
        >
          <Input
            id="checkout-complement"
            placeholder="Apartamento, bloco, referência"
            autoComplete="off"
            aria-invalid={Boolean(errors.address?.complement)}
            aria-describedby={
              errors.address?.complement
                ? 'checkout-complement-error'
                : undefined
            }
            className={cn(
              errors.address?.complement &&
                'border-red-300 focus-visible:outline-red-500',
            )}
            {...register('address.complement')}
          />
        </CheckoutFormField>
        <CheckoutFormField
          label="Bairro"
          htmlFor="checkout-district"
          error={errors.address?.district?.message as string | undefined}
        >
          <Input
            id="checkout-district"
            placeholder="Bairro"
            autoComplete="address-level2"
            aria-invalid={Boolean(errors.address?.district)}
            aria-describedby={
              errors.address?.district ? 'checkout-district-error' : undefined
            }
            className={cn(
              errors.address?.district &&
                'border-red-300 focus-visible:outline-red-500',
            )}
            {...register('address.district')}
          />
        </CheckoutFormField>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <CheckoutFormField
          label="Cidade"
          htmlFor="checkout-city"
          error={errors.address?.city?.message as string | undefined}
        >
          <Input
            id="checkout-city"
            placeholder="Cidade"
            autoComplete="address-level2"
            aria-invalid={Boolean(errors.address?.city)}
            aria-describedby={
              errors.address?.city ? 'checkout-city-error' : undefined
            }
            className={cn(
              errors.address?.city &&
                'border-red-300 focus-visible:outline-red-500',
            )}
            {...register('address.city')}
          />
        </CheckoutFormField>
        <CheckoutFormField
          label="Estado"
          htmlFor="checkout-state"
          error={errors.address?.state?.message as string | undefined}
        >
          <Input
            id="checkout-state"
            placeholder="UF"
            autoComplete="address-level1"
            aria-invalid={Boolean(errors.address?.state)}
            aria-describedby={
              errors.address?.state ? 'checkout-state-error' : undefined
            }
            className={cn(
              errors.address?.state &&
                'border-red-300 focus-visible:outline-red-500',
            )}
            {...register('address.state')}
            maxLength={2}
          />
        </CheckoutFormField>
      </div>
    </div>
  );
}
