import Link from 'next/link';
import { PawPrint, Sprout, SproutIcon, Waves } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { CategoryDefinition } from '@/data/categories';

export type CategoryCardCategory = Pick<
  CategoryDefinition,
  'name' | 'slug' | 'description' | 'accent' | 'cardImage'
>;

type CategoryCardProps = {
  category: CategoryCardCategory;
};

export function CategoryCard({ category }: CategoryCardProps) {
  const icon = getCategoryIcon(category.slug);

  return (
    <Link
      href={`/categorias/${category.slug}`}
      role="link"
      aria-label={`Ver categoria ${category.name}`}
      className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <Card className="group border-border/70 bg-card/90 transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-dune">
        <CardHeader className="space-y-4">
          <div className="relative inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-foreground text-background shadow-card transition group-hover:scale-105 group-hover:shadow-dune">
            <div className="absolute -top-1 -left-1 h-2 w-2 rounded-sm bg-brand-400" aria-hidden />
            <div className="absolute -bottom-1 -right-1 h-2 w-2 rounded-sm bg-sand-400" aria-hidden />
            {icon}
          </div>
          <CardTitle className="text-2xl font-semibold text-foreground">
            {category.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          {category.description}
        </CardContent>
      </Card>
    </Link>
  );
}

function getCategoryIcon(slug: string) {
  switch (slug) {
    case 'pet':
      return <PawPrint className="h-7 w-7" aria-hidden />;
    case 'piscina':
      return <Waves className="h-7 w-7" aria-hidden />;
    case 'jardim':
      return <Sprout className="h-7 w-7" aria-hidden />;
    default:
      return <SproutIcon className="h-7 w-7" aria-hidden />;
  }
}
