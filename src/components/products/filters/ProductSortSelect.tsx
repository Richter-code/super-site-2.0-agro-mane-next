'use client';

import {
  PRODUCT_SORT_OPTIONS,
  type ProductSortOption,
} from '@/features/catalog/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export type ProductSortSelectProps = {
  value: ProductSortOption;
  onChange: (value: ProductSortOption) => void;
};

export function ProductSortSelect({ value, onChange }: ProductSortSelectProps) {
  return (
    <div className="w-full sm:w-auto">
      <label className="text-xs font-semibold uppercase tracking-[0.35em] text-moss-500">
        Ordenar por
      </label>
      <Select
        value={value}
        onValueChange={(val) => onChange(val as ProductSortOption)}
      >
        <SelectTrigger className="mt-1">
          <SelectValue placeholder="Ordenar" />
        </SelectTrigger>
        <SelectContent>
          {PRODUCT_SORT_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
