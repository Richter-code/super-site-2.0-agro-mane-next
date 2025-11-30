'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { LucideIcon } from 'lucide-react';
import {
  PawPrint,
  ShieldCheck,
  Sprout,
  Star,
  Truck,
  Waves,
  Wheat,
} from 'lucide-react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn, formatCurrency } from '@/lib/utils';
import type { Product } from '@/data/products';
import { AddToCartButton } from '@/components/cart/AddToCartButton';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const icon = getCategoryIcon(product.category);

  return (
    <Card
      className={cn(
        'group flex w-full flex-col overflow-hidden p-0 transition-all duration-500 hover:border-brand-200',
        { 'ring-2 ring-brand-200': product.highlight },
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-56 w-full overflow-hidden bg-muted/20">
        <Image
          src={product.image}
          alt={product.imageAlt || product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={cn(
            'object-cover transition duration-700 ease-out',
            isHovered ? 'scale-105' : 'scale-100',
          )}
        />
        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground shadow-card ring-1 ring-border/70">
          {icon}
          <span className="text-[0.7rem]">{product.category}</span>
        </div>
        {product.highlight && (
          <span className="absolute right-4 top-4 rounded-full bg-card/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-foreground shadow-card">
            Destaque
          </span>
        )}
      </div>
      <CardHeader className="space-y-3 px-6 pt-6">
        <CardTitle className="text-xl text-foreground">
          {product.name}
        </CardTitle>
        <span className="inline-flex items-center text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
          {product.category}
        </span>
        <div
          className="flex items-center gap-1 text-sm text-amber-500"
          aria-label={`Nota ${product.rating}`}
        >
          <Star size={16} fill="currentColor" />
          <span>{product.rating.toFixed(1)}</span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
      </CardHeader>
      <CardContent className="mt-auto flex flex-col gap-4 px-6 pb-6">
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          <TrustBadge icon={Truck} label="Entrega 48h" />
          <TrustBadge icon={ShieldCheck} label="Garantia 30d" />
          <TrustBadge icon={Star} label={`${product.rating.toFixed(1)} / 5`} />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">A partir de</span>
          <strong className="text-2xl font-semibold text-foreground">
            {formatCurrency(product.price)}
          </strong>
        </div>
        <div className="flex flex-col gap-3">
          <AddToCartButton
            product={product}
            className="focus-ring w-full"
            size="lg"
          >
            Adicionar ao carrinho
          </AddToCartButton>
          <Button variant="outline" className="focus-ring w-full" asChild>
            <Link href={`/produtos/${product.slug}`}>Ver detalhes</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function getCategoryIcon(category: Product['category']) {
  switch (category) {
    case 'pet':
      return <PawPrint className="h-7 w-7" aria-hidden />;
    case 'piscina':
      return <Waves className="h-7 w-7" aria-hidden />;
    case 'jardim':
      return <Sprout className="h-7 w-7" aria-hidden />;
    case 'agro':
      return <Wheat className="h-7 w-7" aria-hidden />;
    default:
      return <Sprout className="h-7 w-7" aria-hidden />;
  }
}

function TrustBadge({
  icon: Icon,
  label,
}: {
  icon: LucideIcon;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-muted/50 px-3 py-1 font-semibold uppercase tracking-[0.3em] text-[0.68rem]">
      <Icon size={12} aria-hidden /> {label}
    </span>
  );
}
