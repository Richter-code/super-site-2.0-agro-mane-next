'use client';

import { Switch } from '@/components/ui/switch';

export type ProductAvailabilityToggleProps = {
  checked: boolean;
  onChange: (value: boolean) => void;
};

export function ProductAvailabilityToggle({
  checked,
  onChange,
}: ProductAvailabilityToggleProps) {
  return (
    <label className="inline-flex items-center gap-3 text-sm font-medium text-moss-700">
      <Switch
        checked={checked}
        onCheckedChange={onChange}
        aria-label="Filtrar apenas produtos em estoque"
      />
      Mostrar apenas disponíveis
    </label>
  );
}
