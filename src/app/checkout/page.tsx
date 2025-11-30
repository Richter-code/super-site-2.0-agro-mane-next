import type { Metadata } from 'next';
import { Container } from '@/components/ui/container';
import { CheckoutPageClient } from '@/app/checkout/CheckoutPageClient';
import { brand } from '@/lib/brand';

export const metadata: Metadata = {
  title: `Checkout | ${brand.nome}`,
  description: brand.descricao_curta,
  alternates: {
    canonical: '/checkout',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function CheckoutPage() {
  const stripeEnabled = Boolean(process.env.STRIPE_SECRET_KEY);
  return (
    <main className="bg-brand-hero">
      <section className="py-12">
        <Container className="space-y-8">
          {!stripeEnabled && (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              Checkout em modo sandbox – pagamentos reais estão desativados neste ambiente.
            </div>
          )}
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-moss-600">
              Checkout
            </p>
            <h1 className="text-4xl font-semibold text-moss-900">
            Confirme seus dados
          </h1>
            <p className="max-w-3xl text-base text-moss-700">
              Etapas transparentes para você revisar informações, escolher
              pagamento e finalizar a compra com apoio da equipe Agro Mané.
            </p>
          </div>

          <CheckoutPageClient stripeEnabled={stripeEnabled} />
        </Container>
      </section>
    </main>
  );
}
