import type { ReadonlyURLSearchParams } from 'next/navigation';
import type { ProductFilterOptions } from '@/lib/products';
import { productCategorySlugs, type ProductCategory } from '@/data/categories';

export const PRODUCT_SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevância' },
  { value: 'price_asc', label: 'Menor preço' },
  { value: 'price_desc', label: 'Maior preço' },
  { value: 'rating_desc', label: 'Melhor avaliados' },
  { value: 'newest', label: 'Novidades' },
] as const;

export type ProductSortOption = (typeof PRODUCT_SORT_OPTIONS)[number]['value'];

export type ProductFilterState = {
  search: string;
  category?: ProductCategory;
  sort: ProductSortOption;
  inStockOnly: boolean;
  priceMin?: number;
  priceMax?: number;
};

export const DEFAULT_FILTER_STATE: ProductFilterState = {
  search: '',
  sort: 'relevance',
  inStockOnly: false,
};

export type ProductFilterHandlers = {
  onSearchChange: (value: string) => void;
  onCategoryChange: (value?: ProductCategory) => void;
  onSortChange: (value: ProductSortOption) => void;
  onToggleInStock: (value: boolean) => void;
  onPriceChange: (range: { min?: number; max?: number }) => void;
};

export type ProductFilterSearchParams = {
  q?: string | null;
  categoria?: ProductCategory | null;
  ordenar?: ProductSortOption | null;
  estoque?: 'true' | 'false' | null;
  precoMin?: string | null;
  precoMax?: string | null;
};

const CATEGORY_VALUES: ProductCategory[] = [...productCategorySlugs];

export function parseFilterStateFromSearchParams(
  params?: URLSearchParams | ReadonlyURLSearchParams | null,
): ProductFilterState {
  if (!params) return DEFAULT_FILTER_STATE;

  const categoryParam = params.get('categoria');
  const category = CATEGORY_VALUES.includes(categoryParam as ProductCategory)
    ? (categoryParam as ProductCategory)
    : undefined;

  const sortParam = params.get('ordenar');
  const sort = PRODUCT_SORT_OPTIONS.some((option) => option.value === sortParam)
    ? (sortParam as ProductSortOption)
    : 'relevance';

  const search = params.get('q') ?? '';
  const inStockOnly = params.get('estoque') === 'true';
  const priceMin = toNumber(params.get('precoMin'));
  const priceMax = toNumber(params.get('precoMax'));

  return {
    search,
    category,
    sort,
    inStockOnly,
    priceMin,
    priceMax,
  };
}

export function buildSearchParamsFromState(
  state: ProductFilterState,
): URLSearchParams {
  const params = new URLSearchParams();

  if (state.search.trim()) params.set('q', state.search.trim());
  if (state.category) params.set('categoria', state.category);
  if (state.sort && state.sort !== 'relevance')
    params.set('ordenar', state.sort);
  if (state.inStockOnly) params.set('estoque', 'true');
  if (typeof state.priceMin === 'number')
    params.set('precoMin', String(state.priceMin));
  if (typeof state.priceMax === 'number')
    params.set('precoMax', String(state.priceMax));

  return params;
}

export function mergeStateWithOptions(
  state: ProductFilterState,
  overrides: Partial<ProductFilterOptions>,
): ProductFilterOptions {
  return {
    category: overrides.category ?? state.category,
    search: overrides.search ?? state.search,
    sort: overrides.sort ?? state.sort,
    inStockOnly: overrides.inStockOnly ?? state.inStockOnly,
    priceMin: overrides.priceMin ?? state.priceMin,
    priceMax: overrides.priceMax ?? state.priceMax,
  };
}

function toNumber(value: string | null): number | undefined {
  if (!value) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}
