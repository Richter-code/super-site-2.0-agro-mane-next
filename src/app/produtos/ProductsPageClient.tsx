'use client';

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from 'react';
import { useRouter } from 'next/navigation';
import { ProductFiltersBar } from '@/components/products/filters/ProductFiltersBar';
import { ProductGrid } from '@/components/products/ProductGrid';
import type { Product } from '@/data/products';
import type {
  CategorySummary,
  ProductFiltersMeta,
} from '@/lib/products';
import {
  type ProductFilterState,
  buildSearchParamsFromState,
} from '@/features/catalog/types';
import { useProductFilters } from '@/features/catalog/useProductFilters';

export type ProductsPageClientProps = {
  initialState: ProductFilterState;
  initialProducts: Product[];
  initialPage?: number;
  pageSize?: number;
  categories: CategorySummary[];
  catalogMeta: ProductFiltersMeta;
  currentMeta: ProductFiltersMeta;
};

export function ProductsPageClient({
  initialState,
  initialProducts,
  initialPage = 1,
  pageSize = 12,
  categories,
  catalogMeta,
  currentMeta,
}: ProductsPageClientProps) {
  const router = useRouter();
  const { state, handlers, reset } = useProductFilters({
    initialState,
  });
  const [products, setProducts] = useState(initialProducts);
  const [resultsMeta, setResultsMeta] = useState(currentMeta);
  const [isHydrating, setIsHydrating] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(Boolean(currentMeta?.hasMore));
  const abortControllerRef = useRef<AbortController | null>(null);
  const loadMoreControllerRef = useRef<AbortController | null>(null);
  const isFirstRender = useRef(true);
  const [isPending, startTransition] = useTransition();
  const pageSizeRef = useRef(pageSize);

  useEffect(() => {
    return () => {
      loadMoreControllerRef.current?.abort();
    };
  }, []);

  useEffect(() => {
    const nextParams = buildSearchParamsFromState(state);
    nextParams.set('page', '1');
    nextParams.set('pageSize', String(pageSizeRef.current));
    router.replace(`?${nextParams.toString()}`, { scroll: false });
    // Avoid fetching on first render because server already provided initialProducts
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setPage(1);
    setHasMore(false);

    startTransition(() => {
      abortControllerRef.current?.abort();
      const controller = new AbortController();
      abortControllerRef.current = controller;
      setIsHydrating(true);

      // Add simple pagination passthrough if present in params
      const query = nextParams.toString();
      fetch(`/api/produtos?${query}`, {
        signal: controller.signal,
        cache: 'no-store',
      })
        .then((response) => response.json())
        .then((data: { products: Product[]; meta: ProductFiltersMeta }) => {
          setProducts(data.products);
          setResultsMeta(data.meta);
          setPage(data.meta.page ?? 1);
          setHasMore(Boolean(data.meta.hasMore));
        })
        .catch((error: unknown) => {
          if (error instanceof DOMException && error.name === 'AbortError') {
            return;
          }
          console.error('Erro ao atualizar catálogo', error);
        })
        .finally(() => {
          if (abortControllerRef.current === controller) {
            setIsHydrating(false);
          }
        });
    });

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [router, state]);

  const loadMore = () => {
    if (isLoadingMore || !hasMore) return;

    const nextPage = page + 1;
    const params = buildSearchParamsFromState(state);
    params.set('page', String(nextPage));
    params.set('pageSize', String(pageSizeRef.current));

    router.replace(`?${params.toString()}`, { scroll: false });

    loadMoreControllerRef.current?.abort();
    const controller = new AbortController();
    loadMoreControllerRef.current = controller;

    setIsLoadingMore(true);

    fetch(`/api/produtos?${params.toString()}`, {
      signal: controller.signal,
      cache: 'no-store',
    })
      .then((response) => response.json())
      .then((data: { products: Product[]; meta: ProductFiltersMeta }) => {
        setProducts((prev) => [...prev, ...data.products]);
        setResultsMeta(data.meta);
        setPage(data.meta.page ?? nextPage);
        setHasMore(Boolean(data.meta.hasMore));
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }
        console.error('Erro ao carregar mais produtos', error);
      })
      .finally(() => {
        if (loadMoreControllerRef.current === controller) {
          setIsLoadingMore(false);
        }
      });
  };

  const resultsSummary = useMemo(() => buildResultsSummary(resultsMeta), [
    resultsMeta,
  ]);
  const isLoading = isPending || isHydrating;

  return (
    <div className="space-y-8 py-8">
      <ProductFiltersBar
        state={state}
        handlers={handlers}
        categories={categories}
        onReset={reset}
        catalogMeta={catalogMeta}
        currentMeta={resultsMeta}
        isLoading={isLoading}
      />
      <ProductGrid
        products={products}
        title="Resultados"
        summary={resultsSummary}
        isLoading={isLoading}
        onLoadMore={hasMore ? loadMore : undefined}
        hasMore={hasMore}
        isLoadingMore={isLoadingMore}
      />
    </div>
  );
}

function buildResultsSummary(meta?: ProductFiltersMeta) {
  if (!meta) return undefined;
  const parts = [
    `${meta.total} ${meta.total === 1 ? 'item' : 'itens'}`,
    `${meta.inStock} em estoque imediato`,
  ];
  return parts.join(' • ');
}
