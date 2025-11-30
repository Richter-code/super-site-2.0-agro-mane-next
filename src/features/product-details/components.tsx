import Image from 'next/image';
import Link from 'next/link';
import { PawPrint, ShieldCheck, Sprout, Star, Truck, Waves, Wheat } from 'lucide-react';

import type { Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import { cn, formatCurrency } from '@/lib/utils';
import { AddToCartButton } from '@/components/cart/AddToCartButton';

interface ProductHeroProps {
  product: Product;
}

export function ProductHero({ product }: ProductHeroProps) {
  const badgeLabel = product.inStock ? 'Disponível' : 'Em reabastecimento';
  const icon = getCategoryIcon(product.category);

  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="relative aspect-square overflow-hidden rounded-3xl border border-border bg-muted/20">
        <Image
          src={product.image}
          alt={product.imageAlt || product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 40vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
        <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground shadow-card ring-1 ring-border/70">
          {icon}
          <span className="text-[0.75rem]">{product.category}</span>
        </div>
        <div className="absolute bottom-5 left-5 inline-flex rounded-full bg-foreground/90 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-background shadow-card">
          {badgeLabel}
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-muted-foreground">
            Agro Mané Selection
          </p>
          <h1 className="text-3xl font-semibold leading-tight lg:text-4xl">
            {product.name}
          </h1>
        </div>
        <p className="text-muted-foreground">{product.description}</p>
        <div className="flex flex-wrap items-center gap-6">
          <span className="text-4xl font-semibold">
            {formatCurrency(product.price)}
          </span>
          <div className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">
              {product.rating.toFixed(1)}
            </span>{' '}
            / 5 avaliação média
          </div>
        </div>
        <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          <TrustBadge icon={Truck} label="Entrega 48h" />
          <TrustBadge icon={ShieldCheck} label="Garantia 30d" />
          <TrustBadge icon={Star} label="Nota verificada" />
        </div>
        <div className="flex flex-wrap gap-3">
          <AddToCartButton
            product={product}
            className="focus-ring rounded-full px-8"
            size="lg"
          >
            Adicionar ao carrinho
          </AddToCartButton>
          <Button
            variant="outline"
            className="focus-ring rounded-full px-8"
            asChild
          >
            <Link href="/produtos">Voltar ao catálogo</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

interface ProductDetailListProps {
  title: string;
  items: Array<{ label: string; value: string | number | boolean | undefined }>;
  className?: string;
}

export function ProductDetailList({
  title,
  items,
  className,
}: ProductDetailListProps) {
  const filteredItems = items.filter(
    (item) => item.value !== undefined && item.value !== '',
  );
  if (!filteredItems.length) return null;

  return (
    <section className={cn('rounded-3xl border border-border p-6', className)}>
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
        {title}
      </h3>
      <dl className="grid gap-3 text-sm">
        {filteredItems.map((item) => (
          <div key={item.label} className="flex justify-between gap-4">
            <dt className="text-muted-foreground">{item.label}</dt>
            <dd className="font-medium text-right">
              {typeof item.value === 'boolean'
                ? item.value
                  ? 'Sim'
                  : 'Não'
                : item.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

interface ProductHighlightsProps {
  product: Product;
}

export function ProductHighlights({ product }: ProductHighlightsProps) {
  return (
    <section className="rounded-3xl border border-border p-8">
      <h2 className="text-2xl font-semibold">Por que a comunidade ama</h2>
      <p className="mt-3 text-muted-foreground">
        {`Selecionado pela curadoria Agro Mané para quem busca ${product.tags[0] ?? 'performance'} com praticidade e suporte especializado.`}
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        {product.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </section>
  );
}

interface SimilarProductsProps {
  products: Product[];
}

export function SimilarProducts({ products }: SimilarProductsProps) {
  if (!products.length) return null;

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Produtos relacionados</h2>
        <Link
          href="/produtos"
          className="focus-ring rounded-full px-3 py-1 text-sm font-medium text-muted-foreground"
        >
          Ver catálogo
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
        <Link
          key={product.slug}
          href={`/produtos/${product.slug}`}
          className="focus-ring group rounded-3xl border border-border/60 p-4 transition hover:border-foreground"
        >
          <div className="relative mb-4 flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-brand-100 via-card to-sand-100">
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-foreground text-background shadow-card transition group-hover:scale-110 group-hover:shadow-dune">
              <div className="absolute -top-1 -left-1 h-2 w-2 rounded-sm bg-brand-400" aria-hidden />
              <div className="absolute -bottom-1 -right-1 h-2 w-2 rounded-sm bg-sand-400" aria-hidden />
              {getCategoryIcon(product.category)}
            </div>
          </div>
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
            {product.category}
          </p>
            <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
            <p className="text-sm text-muted-foreground">
              {formatCurrency(product.price)}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

function getCategoryIcon(category: Product['category']) {
  switch (category) {
    case 'pet':
      return <PawPrint className="h-12 w-12" aria-hidden />;
    case 'piscina':
      return <Waves className="h-12 w-12" aria-hidden />;
    case 'jardim':
      return <Sprout className="h-12 w-12" aria-hidden />;
    case 'agro':
      return <Wheat className="h-12 w-12" aria-hidden />;
    default:
      return <Sprout className="h-12 w-12" aria-hidden />;
  }
}

function TrustBadge({
  icon: Icon,
  label,
}: {
  icon: typeof Truck;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-muted/40 px-3 py-1 text-[0.68rem]">
      <Icon size={12} aria-hidden /> {label}
    </span>
  );
}
