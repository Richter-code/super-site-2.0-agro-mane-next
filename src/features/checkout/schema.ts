import { z } from 'zod';

import { digitsOnly } from '@/lib/utils';

export const customerSchema = z.object({
  name: z.string().min(3, 'Informe o nome completo'),
  email: z.string().email('Informe um e-mail válido'),
  phone: z
    .string()
    .min(1, 'Informe o telefone')
    .transform((value) => digitsOnly(value))
    .pipe(
      z.string().refine((value) => value.length >= 10, {
        message: 'Telefone deve conter DDD e número',
      }),
    ),
  cpf: z
    .string()
    .optional()
    .transform((value) => (value ? digitsOnly(value) : ''))
    .pipe(
      z.string().refine((value) => value.length === 0 || value.length === 11, {
        message: 'CPF deve ter 11 dígitos',
      }),
    )
    .default(''),
});

export const addressSchema = z.object({
  cep: z
    .string()
    .min(1, 'Informe o CEP')
    .transform((value) => digitsOnly(value))
    .refine((value) => value.length === 8, {
      message: 'CEP deve ter 8 dígitos',
    }),
  street: z.string().min(3, 'Informe a rua'),
  number: z.string().min(1, 'Informe o número'),
  complement: z.string().optional().default(''),
  district: z.string().min(2, 'Informe o bairro'),
  city: z.string().min(2, 'Informe a cidade'),
  state: z.string().min(2, 'Informe o estado'),
});

export const paymentSchema = z
  .object({
    method: z.enum(['card', 'pix', 'boleto']),
    cardholderName: z.string().optional().default(''),
    cardLastDigits: z
      .string()
      .optional()
      .transform((value) => (value ? digitsOnly(value).slice(-4) : ''))
      .pipe(z.string())
      .default(''),
  })
  .superRefine((value, ctx) => {
    if (value.method === 'card') {
      if (!value.cardholderName || value.cardholderName.trim().length < 3) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['cardholderName'],
          message: 'Nome impresso é obrigatório',
        });
      }
      if (!value.cardLastDigits || value.cardLastDigits.length !== 4) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['cardLastDigits'],
          message: 'Informe os últimos 4 dígitos',
        });
      }
    }
  });

export const checkoutFormSchema = z.object({
  customer: customerSchema,
  address: addressSchema,
  payment: paymentSchema,
});

export type CheckoutCustomerSchema = z.infer<typeof customerSchema>;
export type CheckoutAddressSchema = z.infer<typeof addressSchema>;
export type CheckoutPaymentSchema = z.infer<typeof paymentSchema>;
export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
