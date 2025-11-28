'use client';

import { Search } from 'lucide-react';
import type { ChangeEvent } from 'react';
import { Input } from '@/components/ui/input';

type ProductSearchInputProps = {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
};

export function ProductSearchInput({
  value,
  placeholder,
  onChange,
}: ProductSearchInputProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    onChange(event.target.value);
  const labelId = 'product-search-label';

  return (
    <div className="relative block w-full">
      <span id={labelId} className="sr-only">
        Buscar produtos por nome, uso ou tags
      </span>
      <Search
        className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-moss-400"
        aria-hidden
      />
      <Input
        value={value}
        onChange={handleChange}
        placeholder={placeholder ?? 'Buscar por nome, uso ou tags'}
        className="pl-10"
        aria-labelledby={labelId}
      />
    </div>
  );
}
