'use client';

import { ProductAvailabilityToggle } from '@/components/products/filters/ProductAvailabilityToggle';
import { ProductCategoryPills } from '@/components/products/filters/ProductCategoryPills';
import { ProductPriceRange } from '@/components/products/filters/ProductPriceRange';
import { ProductSearchInput } from '@/components/products/filters/ProductSearchInput';
import { ProductSortSelect } from '@/components/products/filters/ProductSortSelect';
import { Button } from '@/components/ui/button';
import type { CategorySummary, ProductFiltersMeta } from '@/lib/products';
import type {
  ProductFilterHandlers,
  ProductFilterState,
} from '@/features/catalog/types';

export type ProductFiltersBarProps = {
  state: ProductFilterState;
  handlers: ProductFilterHandlers;
  categories: CategorySummary[];
  onReset?: () => void;
  catalogMeta?: ProductFiltersMeta;
  currentMeta?: ProductFiltersMeta;
  isLoading?: boolean;
};

export function ProductFiltersBar({
  state,
  handlers,
  categories,
  onReset,
  catalogMeta,
  currentMeta,
  isLoading,
}: ProductFiltersBarProps) {
  const headingId = 'product-filters-heading';

  return (
    <section
      className="space-y-4 rounded-3xl border border-sand-100/70 bg-card-soft p-6 shadow-card"
      aria-labelledby={headingId}
    >
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-moss-500">
          Filtros
        </p>
        <h2 id={headingId} className="text-2xl font-semibold text-moss-900">
          Refine sua busca
        </h2>
        {catalogMeta && (
          <p className="text-xs text-muted-foreground">
            Catálogo completo: {catalogMeta.total} itens • {catalogMeta.inStock}{' '}
            em estoque
          </p>
        )}
      </div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="flex-1">
          <ProductSearchInput
            value={state.search}
            onChange={handlers.onSearchChange}
          />
        </div>
        <ProductSortSelect
          value={state.sort}
          onChange={handlers.onSortChange}
        />
        <Button
          variant="ghost"
          onClick={onReset}
          className="text-sm text-moss-600"
          type="button"
        >
          Limpar filtros
        </Button>
      </div>

      <ProductCategoryPills
        categories={categories}
        value={state.category}
        onChange={handlers.onCategoryChange}
      />

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <ProductAvailabilityToggle
          checked={state.inStockOnly}
          onChange={handlers.onToggleInStock}
        />
        <p className="text-sm text-muted-foreground">
          {isLoading
            ? 'Atualizando resultados…'
            : currentMeta
              ? `${currentMeta.total} itens • ${currentMeta.inStock} em estoque`
              : 'Catálogo pronto'}
        </p>
        <ProductPriceRange
          min={state.priceMin}
          max={state.priceMax}
          onChange={handlers.onPriceChange}
        />
      </div>
    </section>
  );
}
