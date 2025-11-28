import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import { getStripeClient } from '@/server/payments/stripe';
import { brand } from '@/lib/brand';
import { buildWhatsappLink } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: `Pedido confirmado | ${brand.nome}`,
  description: brand.descricao_curta,
  alternates: {
    canonical: '/checkout/sucesso',
  },
  robots: {
    index: false,
    follow: false,
  },
};

async function getCheckoutSession(sessionId?: string) {
  if (!sessionId) {
    return null;
  }

  try {
    const stripe = getStripeClient();
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items'],
    });
    return session;
  } catch (error) {
    console.error('Erro ao buscar sessão do Stripe', error);
    return null;
  }
}

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  const session = await getCheckoutSession(searchParams.session_id);
  const amountTotal = session?.amount_total ? session.amount_total / 100 : null;
  const paymentStatus = session?.payment_status ?? 'processing';
  const paymentMethod = session?.payment_method_types?.[0];
  const customerEmail =
    session?.customer_details?.email ?? session?.customer_email ?? '';
  const whatsappHref = buildWhatsappLink({
    message: 'Olá! Preciso de ajuda com meu pedido realizado no site.',
  });
  const whatsappLink = whatsappHref || '#contato';
  const whatsappTarget = whatsappHref ? '_blank' : undefined;

  return (
    <main className="bg-brand-hero">
      <section className="py-16">
        <Container className="space-y-10">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-brand-700 shadow-card">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-moss-500">
                Pedido confirmado
              </p>
              <h1 className="text-3xl font-semibold text-moss-900">
                Obrigado por comprar na {brand.nome}
              </h1>
              <p className="max-w-2xl text-sm text-moss-600">
                Enviamos um e-mail com todos os detalhes
                {customerEmail ? ` para ${customerEmail}` : ''}. Assim que o
                pagamento for confirmado, nossa equipe iniciará a separação dos
                produtos e você pode acompanhar tudo pelo WhatsApp.
              </p>
            </div>
          </div>

          <div className="grid gap-6 rounded-3xl border border-sand-100 bg-white/95 p-8 shadow-card lg:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-moss-900">
                Resumo do pagamento
              </h2>
              <div className="space-y-2 text-sm text-moss-700">
                <div className="flex items-center justify-between">
                  <span className="text-moss-500">Status</span>
                  <span className="font-semibold text-moss-900">
                    {statusLabel(paymentStatus)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-moss-500">Método</span>
                  <span className="font-semibold text-moss-900">
                    {mapPaymentMethod(paymentMethod)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-moss-500">Total cobrado</span>
                  <span className="text-lg font-semibold text-moss-900">
                    {amountTotal
                      ? formatCurrency(amountTotal)
                      : 'Em processamento'}
                  </span>
                </div>
              </div>
              <p className="text-xs text-moss-500">
                Precisa alterar algo? Nossa equipe está pronta para te ajudar
                pelo WhatsApp ou Instagram.
              </p>
            </div>

            <div className="space-y-4 rounded-2xl border border-dashed border-brand-200 bg-brand-50/40 p-6 text-sm text-moss-700">
              <h2 className="text-base font-semibold text-moss-900">
                Próximos passos
              </h2>
              <ul className="space-y-3">
                <li>
                  1. Confirme o pagamento no seu banco ou no comprovante do
                  Stripe.
                </li>
                <li>
                  2. Aguarde nosso e-mail com o status atualizado do pedido.
                </li>
                <li>
                  3. Falou com a equipe? Tenha o número da sessão:{' '}
                  {searchParams.session_id ?? '---'}.
                </li>
              </ul>
              <div className="flex flex-col gap-3 pt-2 md:flex-row">
                <Button asChild className="focus-ring flex-1">
                  <Link href="/produtos">Voltar para o catálogo</Link>
                </Button>
                <Button asChild variant="outline" className="focus-ring flex-1">
                  <Link
                    href={whatsappLink}
                    target={whatsappTarget}
                    rel={whatsappTarget ? 'noopener noreferrer' : undefined}
                    aria-disabled={!whatsappHref}
                  >
                    Falar no WhatsApp
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

function statusLabel(status: string) {
  switch (status) {
    case 'paid':
      return 'Pago';
    case 'unpaid':
      return 'Pendente';
    case 'processing':
      return 'Em processamento';
    default:
      return status;
  }
}

function mapPaymentMethod(method?: string) {
  switch (method) {
    case 'pix':
      return 'Pix instantâneo';
    case 'boleto':
      return 'Boleto bancário';
    case 'card':
      return 'Cartão de crédito';
    default:
      return method ? method.toUpperCase() : '—';
  }
}
