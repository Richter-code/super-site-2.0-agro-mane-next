import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MessageCircle, Sparkles } from 'lucide-react';
import { getProductsByCategory } from '@/lib/products';
import { Container } from '@/components/ui/container';
import { ProductGrid } from '@/components/products/ProductGrid';
import { brand } from '@/lib/brand';
import {
  getCategoryBySlug,
  productCategorySlugs,
  type ProductCategory,
} from '@/data/categories';
import { buildWhatsappLink } from '@/lib/whatsapp';

const productCategorySet = new Set<ProductCategory>(productCategorySlugs);

type CategoryPageProps = {
  params: { category: string };
};

export function generateStaticParams() {
  return productCategorySlugs.map((category) => ({ category }));
}

export function generateMetadata({ params }: CategoryPageProps): Metadata {
  const category = params.category as ProductCategory;
  const definition = getCategoryBySlug(category);
  if (!definition || !definition.hasProductListing) {
    return { title: 'Categoria não encontrada' };
  }

  return {
    title: `${definition.heroTitle} | ${brand.nome}`,
    description: definition.heroDescription,
    alternates: {
      canonical: `/categorias/${definition.slug}`,
    },
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = params.category as ProductCategory;
  if (!productCategorySet.has(category)) {
    notFound();
  }

  const definition = getCategoryBySlug(category);
  if (!definition || !definition.hasProductListing) {
    notFound();
  }

  const products = getProductsByCategory(category);

  return (
    <main className="bg-brand-hero">
      <section className="py-12">
        <Container className="rounded-3xl bg-card-soft p-10 shadow-dune ring-1 ring-brand-100/40">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-moss-600">
            {definition.eyebrow}
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-moss-900">
            {definition.heroTitle}
          </h1>
          <p className="mt-4 max-w-3xl text-base text-moss-700">
            {definition.heroDescription}
          </p>
          <CategoryHighlights highlights={definition.highlights} />
          <CategorySupportCTA category={definition.name} />
        </Container>
      </section>

      <ProductGrid products={products} title="" />
    </main>
  );
}

type CategoryHighlightsProps = {
  highlights: string[];
};

function CategoryHighlights({ highlights }: CategoryHighlightsProps) {
  if (!highlights.length) return null;
  return (
    <div className="mt-8 grid gap-4 rounded-2xl border border-moss-100/70 bg-white/80 p-6 text-moss-700 md:grid-cols-3">
      {highlights.map((highlight) => (
        <div key={highlight} className="flex items-start gap-3">
          <Sparkles size={16} className="mt-1 text-moss-500" aria-hidden />
          <p className="text-sm leading-relaxed">{highlight}</p>
        </div>
      ))}
    </div>
  );
}

function CategorySupportCTA({ category }: { category: string }) {
  const whatsappHref = buildWhatsappLink({
    message: `Olá! Preciso de ajuda para montar meu projeto na linha ${category}.`,
  });
  const whatsappTarget = whatsappHref ? '_blank' : undefined;
  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-brand-100 bg-brand-50/60 p-5 text-moss-900">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-600">
          Consultoria Agro Mané
        </p>
        <p className="mt-1 text-sm text-moss-700">
          Precisa de ajuda para montar o mix de {category}? Fale com o time no
          WhatsApp ou visite a loja mais próxima.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Link
          href="/lojas"
          className="focus-ring rounded-full border border-brand-400 px-5 py-2 text-sm font-semibold text-brand-700"
        >
          Ver lojas
        </Link>
        <Link
          href={whatsappHref || '#contato'}
          target={whatsappTarget}
          rel={whatsappTarget ? 'noreferrer' : undefined}
          className="focus-ring inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-2 text-sm font-semibold text-white"
          aria-disabled={!whatsappHref}
        >
          <MessageCircle size={16} aria-hidden /> Chamar no WhatsApp
        </Link>
      </div>
    </div>
  );
}
