'use client';

import Link from 'next/link';
import { PawPrint, Sprout, Star, Waves, Wheat } from 'lucide-react';
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
      <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-brand-100 via-white to-sand-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-3xl bg-foreground text-background shadow-card transition duration-500 group-hover:scale-110 group-hover:shadow-dune">
            <div className="absolute -top-1 -left-1 h-2 w-2 rounded-sm bg-brand-400" aria-hidden />
            <div className="absolute -bottom-1 -right-1 h-2 w-2 rounded-sm bg-sand-400" aria-hidden />
            {icon}
          </div>
        </div>
        <div
          className={cn(
            'pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-500/10 to-foreground/5 opacity-0 transition group-hover:opacity-100',
            isHovered && 'opacity-100',
          )}
        />
        {product.highlight && (
          <span className="absolute left-4 top-4 rounded-full bg-card/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-foreground">
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
