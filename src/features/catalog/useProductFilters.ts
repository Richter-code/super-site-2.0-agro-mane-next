'use client';

import type { ReadonlyURLSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ProductFilterOptions } from '@/lib/products';
import {
  DEFAULT_FILTER_STATE,
  type ProductFilterHandlers,
  type ProductFilterState,
  type ProductSortOption,
  buildSearchParamsFromState,
  mergeStateWithOptions,
  parseFilterStateFromSearchParams,
} from '@/features/catalog/types';

export type UseProductFiltersOptions = {
  initialState?: ProductFilterState;
  onStateChange?: (state: ProductFilterState) => void;
};

export function useProductFilters(options: UseProductFiltersOptions = {}) {
  const { initialState = DEFAULT_FILTER_STATE, onStateChange } = options;
  const initialRef = useRef<ProductFilterState>(initialState);
  const [state, setState] = useState<ProductFilterState>(initialState);

  useEffect(() => {
    initialRef.current = initialState;
    setState(initialState);
  }, [initialState]);

  const updateState = useCallback(
    (updater: (previous: ProductFilterState) => ProductFilterState) => {
      setState((prev) => {
        const next = updater(prev);
        onStateChange?.(next);
        return next;
      });
    },
    [onStateChange],
  );

  const handlers: ProductFilterHandlers = {
    onSearchChange: (value) =>
      updateState((prev) => ({ ...prev, search: value })),
    onCategoryChange: (value) =>
      updateState((prev) => ({ ...prev, category: value })),
    onSortChange: (value: ProductSortOption) =>
      updateState((prev) => ({ ...prev, sort: value })),
    onToggleInStock: (value) =>
      updateState((prev) => ({ ...prev, inStockOnly: value })),
    onPriceChange: ({ min, max }) =>
      updateState((prev) => ({ ...prev, priceMin: min, priceMax: max })),
  };

  const filterOptions: ProductFilterOptions = useMemo(
    () => mergeStateWithOptions(state, {}),
    [state],
  );

  const searchParams = useMemo(
    () => buildSearchParamsFromState(state),
    [state],
  );

  return {
    state,
    handlers,
    filterOptions,
    searchParams,
    reset: () => updateState(() => initialRef.current),
  };
}

export function buildFiltersFromSearchParams(
  params: URLSearchParams | ReadonlyURLSearchParams | null,
) {
  return parseFilterStateFromSearchParams(params);
}
