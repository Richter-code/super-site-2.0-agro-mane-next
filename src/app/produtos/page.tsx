import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import {
  filterProducts,
  getCategoriesSummary,
  getProductFiltersMeta,
} from '@/lib/products';
import { parseFilterStateFromSearchParams } from '@/features/catalog/types';
import { ProductsPageClient } from '@/app/produtos/ProductsPageClient';
import { brand } from '@/lib/brand';
import { getProductCategories, type CategoryDefinition } from '@/data/categories';

export const metadata: Metadata = {
  title: `Catálogo de produtos | ${brand.nome}`,
  description: brand.descricao_curta,
  openGraph: {
    title: `Catálogo oficial ${brand.nome}`,
    description: brand.descricao_curta,
  },
  alternates: {
    canonical: '/produtos',
  },
};

type ProductsPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = buildSearchParams(searchParams);
  const initialState = parseFilterStateFromSearchParams(params);
  const categories = getCategoriesSummary();
  const categoryDefinitions = getProductCategories();

  // Server-side pagination: read page/pageSize from search params
  const rawPage = Number(params.get('page') || '1');
  const rawPageSize = Number(params.get('pageSize') || '12');
  const normalizedPage = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;
  const normalizedPageSize =
    Number.isFinite(rawPageSize) && rawPageSize > 0 ? rawPageSize : 12;

  const allProducts = filterProducts(initialState);
  const start = Math.max(0, (normalizedPage - 1) * normalizedPageSize);
  const end = start + normalizedPageSize;
  const products = allProducts.slice(start, end);
  const hasMore = end < allProducts.length;

  const paginationMeta = {
    page: normalizedPage,
    pageSize: normalizedPageSize,
    hasMore,
  } as const;

  const catalogMeta = {
    ...getProductFiltersMeta(allProducts),
    ...paginationMeta,
  };
  const currentMeta = {
    ...getProductFiltersMeta(products),
    ...paginationMeta,
  };

  return (
    <main className="bg-brand-hero dark:bg-[linear-gradient(135deg,#0b120d,#0f1a14)]">
      <section className="pt-12">
        <Container className="rounded-3xl bg-card/90 p-10 shadow-dune ring-1 ring-border/70">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-muted-foreground">
            Catálogo oficial
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-foreground">
            Tudo para Pet, Piscina, Jardim e Agro
          </h1>
          <p className="mt-4 max-w-3xl text-base text-muted-foreground">
            Produtos selecionados com foco em performance, sustentabilidade e
            entrega rápida. Filtre por categoria e encontre soluções para todo o
            ecossistema AgroMané.
          </p>
          <CategoryQuickLinks categories={categoryDefinitions} />
        </Container>
      </section>

      <ProductsPageClient
        initialState={initialState}
        initialProducts={products}
        initialPage={normalizedPage}
        pageSize={normalizedPageSize}
        categories={categories}
        catalogMeta={catalogMeta}
        currentMeta={currentMeta}
      />
    </main>
  );
}

type CategoryQuickLinksProps = {
  categories: CategoryDefinition[];
};

function CategoryQuickLinks({ categories }: CategoryQuickLinksProps) {
  if (!categories.length) return null;
  return (
    <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/categorias/${category.slug}`}
          className="focus-ring rounded-2xl border border-border/70 bg-muted/30 p-4 transition hover:border-brand-200"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
            {category.eyebrow}
          </p>
          <p className="mt-2 text-sm font-semibold text-foreground">
            {category.heroTitle}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {category.description}
          </p>
        </Link>
      ))}
    </div>
  );
}

function buildSearchParams(
  searchParams?: Record<string, string | string[] | undefined>,
) {
  const params = new URLSearchParams();
  if (!searchParams) return params;

  Object.entries(searchParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      if (value.length > 0 && value[0] !== undefined) {
        params.set(key, value[0]);
      }
    } else if (typeof value === 'string') {
      params.set(key, value);
    }
  });

  return params;
}
