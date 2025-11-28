import type { CategoryCardCategory } from './CategoryCard';
import { CategoryCard } from './CategoryCard';
import { Container } from '@/components/ui/container';

type CategoryGridProps = {
  categories: CategoryCardCategory[];
  id?: string;
};

export function CategoryGrid({ categories, id }: CategoryGridProps) {
  const headingId = `${id ?? 'categorias'}-heading`;

  return (
    <section id={id} className="py-12" aria-labelledby={headingId}>
      <Container>
        <div className="mb-8 space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-muted-foreground">
            Categorias
          </p>
          <h2 id={headingId} className="text-3xl font-semibold text-foreground">
            Soluções para cada segmento
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </Container>
    </section>
  );
}
