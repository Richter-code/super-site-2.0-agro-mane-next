import Image from 'next/image';
import { brand, primaryLogo } from '@/lib/brand';
import { cn } from '@/lib/utils';

export type BrandMarkProps = {
  className?: string;
  priority?: boolean;
  sizes?: string;
  width?: number;
  height?: number;
};

export function BrandMark({
  className,
  priority = false,
  sizes = '(max-width: 768px) 40vw, 180px',
  width = 176,
  height = 64,
}: BrandMarkProps) {
  return (
    <Image
      src={primaryLogo}
      alt={`Logomarca ${brand.nome}`}
      width={width}
      height={height}
      priority={priority}
      loading={priority ? 'eager' : 'lazy'}
      sizes={sizes}
      className={cn('h-auto w-auto', className)}
    />
  );
}
