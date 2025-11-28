'use client';

import { cn } from '@/lib/utils';
import type { ProductCategory } from '@/data/categories';
import type { CategorySummary } from '@/lib/products';

export type ProductCategoryPillsProps = {
  categories: CategorySummary[];
  value?: ProductCategory;
  onChange: (value?: ProductCategory) => void;
};

export function ProductCategoryPills({
  categories,
  value,
  onChange,
}: ProductCategoryPillsProps) {
  const pills = [
    {
      id: undefined,
      label: 'Todos',
      count: categories.reduce((sum, item) => sum + item.count, 0),
    },
    ...categories,
  ];

  return (
    <div
      className="flex flex-wrap gap-2"
      role="group"
      aria-label="Categorias do catálogo"
    >
      {pills.map((pill) => {
        const isActive = pill.id === value || (!pill.id && !value);
        return (
          <button
            key={pill.id ?? 'all'}
            type="button"
            onClick={() => onChange(pill.id as ProductCategory | undefined)}
            className={cn(
              'rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-300',
              isActive
                ? 'border-brand-300 bg-brand-100/70 text-foreground shadow-card dark:bg-brand-200/20'
                : 'border-border bg-card/80 text-muted-foreground hover:border-brand-200 hover:text-foreground',
            )}
            aria-pressed={isActive ? 'true' : 'false'}
          >
            {pill.label}
            <span className="ml-2 rounded-full bg-brand-50/80 px-2 py-0.5 text-xs font-normal text-muted-foreground dark:bg-brand-200/20">
              {pill.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
