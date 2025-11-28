import { ProductCard } from '@/components/products/ProductCard';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import type { Product } from '@/data/products';

type ProductGridProps = {
  products: Product[];
  title?: string;
  subtitle?: string;
  summary?: string;
  isLoading?: boolean;
  hasMore?: boolean;
  isLoadingMore?: boolean;
  onLoadMore?: () => void;
};

export function ProductGrid({
  products,
  title,
  subtitle,
  summary,
  isLoading,
  hasMore,
  isLoadingMore,
  onLoadMore,
}: ProductGridProps) {
  return (
    <section className="py-12">
      <Container>
        {(title || subtitle) && (
          <div className="mb-8 space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-muted-foreground">
              Produtos
            </p>
            {title && (
              <h2 className="text-3xl font-semibold text-foreground">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-base text-muted-foreground">{subtitle}</p>
            )}
            {(summary || isLoading) && (
              <p className="text-sm text-muted-foreground">
                {isLoading ? 'Atualizando resultados…' : summary}
              </p>
            )}
          </div>
        )}

        {products.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border bg-card/90 p-10 text-center text-muted-foreground">
            Nenhum produto encontrado.
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {hasMore && onLoadMore && (
              <div className="mt-8 flex justify-center">
                <Button
                  onClick={onLoadMore}
                  disabled={isLoading || isLoadingMore}
                  className="focus-ring min-w-[200px] rounded-full"
                >
                  {isLoadingMore ? 'Carregando…' : 'Carregar mais'}
                </Button>
              </div>
            )}
          </>
        )}
      </Container>
    </section>
  );
}
