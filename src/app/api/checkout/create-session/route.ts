import { NextResponse, type NextRequest } from 'next/server';
import Stripe from 'stripe';
import { z } from 'zod';

import { products as catalog } from '@/data/products';
import {
  customerSchema,
  addressSchema,
  paymentSchema,
} from '@/features/checkout/schema';
import { getStripeClient } from '@/server/payments/stripe';
import { resolveAppBaseUrl } from '@/server/utils/url';

const cartItemSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().positive(),
});

const payloadSchema = z.object({
  customer: customerSchema,
  address: addressSchema,
  payment: paymentSchema,
  items: z.array(cartItemSchema).min(1),
});

type StripeCheckoutMethod = 'card' | 'pix' | 'boleto';

const paymentMethodMap: Record<string, StripeCheckoutMethod[]> = {
  card: ['card'],
  pix: ['pix'],
  boleto: ['boleto'],
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = payloadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const { customer, address, payment, items } = parsed.data;

    const lineItems = items.map(({ productId, quantity }) => {
      const product = catalog.find((entry) => entry.id === productId);
      if (!product) {
        throw new Error('Produto não encontrado para checkout.');
      }
      return {
        price_data: {
          currency: 'brl',
          product_data: {
            name: product.name,
            metadata: {
              productId: product.id,
              slug: product.slug,
              category: product.category,
            },
          },
          unit_amount: Math.round(product.price * 100),
        },
        quantity,
      } satisfies Stripe.Checkout.SessionCreateParams.LineItem;
    });

    if (lineItems.length === 0) {
      return NextResponse.json({ error: 'Carrinho vazio' }, { status: 400 });
    }

    const stripe = getStripeClient();

    const paymentMethods = paymentMethodMap[payment.method] ?? ['card'];

    const baseUrl = resolveAppBaseUrl(request);

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: paymentMethods,
      locale: 'pt-BR',
      customer_email: customer.email,
      allow_promotion_codes: true,
      metadata: {
        customerName: customer.name,
        customerPhone: customer.phone,
        customerCpf: customer.cpf ?? '',
        address: JSON.stringify(address),
        preferredMethod: payment.method,
      },
      success_url: `${baseUrl}/checkout/sucesso?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout?etapa=review&cancelado=1`,
      line_items: lineItems,
      shipping_address_collection: {
        allowed_countries: ['BR'],
      },
      billing_address_collection: 'required',
    });

    if (!session.url) {
      return NextResponse.json(
        { error: 'Não foi possível criar a sessão de pagamento.' },
        { status: 502 },
      );
    }

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error('Erro ao criar sessão de checkout', error);
    return NextResponse.json(
      { error: 'Erro interno ao iniciar pagamento.' },
      { status: 500 },
    );
  }
}
