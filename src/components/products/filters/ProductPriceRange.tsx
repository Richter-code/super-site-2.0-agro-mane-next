'use client';

import { Input } from '@/components/ui/input';

export type ProductPriceRangeProps = {
  min?: number;
  max?: number;
  onChange: (range: { min?: number; max?: number }) => void;
};

export function ProductPriceRange({
  min,
  max,
  onChange,
}: ProductPriceRangeProps) {
  const handleMinChange = (value: string) =>
    onChange({ min: toNumber(value), max });
  const handleMaxChange = (value: string) =>
    onChange({ min, max: toNumber(value) });

  const minId = 'price-min';
  const maxId = 'price-max';

  return (
    <fieldset className="flex items-center gap-3">
      <legend className="sr-only">Faixa de preço</legend>
      <label htmlFor={minId} className="text-sm text-moss-700">
        Mínimo
      </label>
      <Input
        id={minId}
        type="number"
        min={0}
        value={typeof min === 'number' ? min : ''}
        placeholder="0"
        onChange={(event) => handleMinChange(event.target.value)}
        className="w-28"
      />
      <span className="text-sm text-moss-500">até</span>
      <label htmlFor={maxId} className="text-sm text-moss-700">
        Máximo
      </label>
      <Input
        id={maxId}
        type="number"
        min={0}
        value={typeof max === 'number' ? max : ''}
        placeholder="0"
        onChange={(event) => handleMaxChange(event.target.value)}
        className="w-28"
      />
    </fieldset>
  );
}

function toNumber(value: string): number | undefined {
  const parsed = Number(value);
  return Number.isFinite(parsed) && value !== '' ? parsed : undefined;
}
