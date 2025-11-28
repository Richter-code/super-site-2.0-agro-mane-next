import type { Metadata } from 'next';
import { Container } from '@/components/ui/container';
import { CartPageClient } from '@/app/carrinho/CartPageClient';
import { brand } from '@/lib/brand';

export const metadata: Metadata = {
  title: `Carrinho | ${brand.nome}`,
  description: brand.descricao_curta,
  alternates: {
    canonical: '/carrinho',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function CartPage() {
  return (
    <main className="bg-brand-hero">
      <section className="py-12">
        <Container className="space-y-8">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-moss-600">
              Carrinho
            </p>
            <h1 className="text-4xl font-semibold text-moss-900">
              Revise seus itens
            </h1>
            <p className="max-w-2xl text-base text-moss-700">
              Produtos selecionados com curadoria Agro Mané. Ajuste quantidades,
              verifique valores e siga para um checkout seguro.
            </p>
          </div>

          <CartPageClient />
        </Container>
      </section>
    </main>
  );
}
