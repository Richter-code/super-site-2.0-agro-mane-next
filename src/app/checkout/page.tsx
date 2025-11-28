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
  return (
    <main className="bg-brand-hero">
      <section className="py-12">
        <Container className="space-y-8">
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

          <CheckoutPageClient />
        </Container>
      </section>
    </main>
  );
}
