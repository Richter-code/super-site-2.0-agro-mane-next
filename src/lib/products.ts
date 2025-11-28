import { products as catalog, type Product } from '@/data/products';
import {
  getProductCategories,
  type ProductCategory,
} from '@/data/categories';

const categoryDefinitions = getProductCategories();
const categoryLabels = categoryDefinitions.reduce<Record<ProductCategory, string>>(
  (acc, category) => {
    acc[category.slug as ProductCategory] = category.name;
    return acc;
  },
  { pet: 'Pet', piscina: 'Piscina', jardim: 'Jardim', agro: 'Agro' },
);

export type ProductFilterOptions = {
  category?: ProductCategory;
  search?: string;
  sort?: 'relevance' | 'price_asc' | 'price_desc' | 'rating_desc' | 'newest';
  inStockOnly?: boolean;
  priceMin?: number;
  priceMax?: number;
};

export type CategorySummary = {
  id: ProductCategory;
  label: string;
  count: number;
};

export type ProductFiltersMeta = {
  total: number;
  inStock: number;
  priceRange: {
    min: number;
    max: number;
  };
  page?: number;
  pageSize?: number;
  hasMore?: boolean;
};

export function getAllProducts(): Product[] {
  return catalog;
}

export function getProductBySlug(slug: string): Product | undefined {
  return catalog.find((product) => product.slug === slug);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return catalog.filter((product) => product.category === category);
}

export function getSimilarProducts(product: Product, limit = 4): Product[] {
  return catalog
    .filter(
      (item) =>
        item.category === product.category && item.slug !== product.slug,
    )
    .slice(0, limit);
}

export function searchProducts(query: string): Product[] {
  if (!query) return catalog;
  const tokens = normalizeQuery(query);
  return catalog.filter((product) =>
    tokens.some((token) => matchesToken(product, token)),
  );
}

export function filterProducts(options: ProductFilterOptions = {}): Product[] {
  const {
    category,
    search,
    sort = 'relevance',
    inStockOnly,
    priceMin,
    priceMax,
  } = options;
  const tokens = normalizeQuery(search ?? '');

  let result = [...catalog];

  if (category) {
    result = result.filter((product) => product.category === category);
  }

  if (typeof priceMin === 'number') {
    result = result.filter((product) => product.price >= priceMin);
  }

  if (typeof priceMax === 'number') {
    result = result.filter((product) => product.price <= priceMax);
  }

  if (inStockOnly) {
    result = result.filter((product) => product.inStock);
  }

  if (tokens.length > 0) {
    result = result.filter((product) =>
      tokens.every((token) => matchesToken(product, token)),
    );
  }

  const sorter = getSorter(sort, tokens);
  return result.sort(sorter);
}

export function getCategoriesSummary(): CategorySummary[] {
  const baseCounts = categoryDefinitions.reduce<Record<ProductCategory, number>>(
    (acc, category) => {
      acc[category.slug as ProductCategory] = 0;
      return acc;
    },
    { pet: 0, piscina: 0, jardim: 0, agro: 0 },
  );

  const counts = catalog.reduce<Record<ProductCategory, number>>((acc, product) => {
    acc[product.category] += 1;
    return acc;
  }, baseCounts);

  return (Object.keys(counts) as ProductCategory[]).map((id) => ({
    id,
    label: categoryLabels[id],
    count: counts[id],
  }));
}

export function getProductFiltersMeta(
  dataset: Product[] = catalog,
): ProductFiltersMeta {
  if (dataset.length === 0) {
    return {
      total: 0,
      inStock: 0,
      priceRange: { min: 0, max: 0 },
    };
  }

  let minPrice = Number.POSITIVE_INFINITY;
  let maxPrice = 0;
  let inStock = 0;

  dataset.forEach((product) => {
    minPrice = Math.min(minPrice, product.price);
    maxPrice = Math.max(maxPrice, product.price);
    if (product.inStock) {
      inStock += 1;
    }
  });

  return {
    total: dataset.length,
    inStock,
    priceRange: {
      min: Number.isFinite(minPrice) ? minPrice : 0,
      max: Number.isFinite(maxPrice) ? maxPrice : 0,
    },
  };
}

function normalizeQuery(query: string): string[] {
  return query.toLowerCase().trim().split(/\s+/).filter(Boolean);
}

function matchesToken(product: Product, token: string): boolean {
  return (
    product.name.toLowerCase().includes(token) ||
    product.description.toLowerCase().includes(token) ||
    product.tags.some((tag) => tag.toLowerCase().includes(token))
  );
}

function getSorter(sort: ProductFilterOptions['sort'], tokens: string[]) {
  switch (sort) {
    case 'price_asc':
      return (a: Product, b: Product) => a.price - b.price;
    case 'price_desc':
      return (a: Product, b: Product) => b.price - a.price;
    case 'rating_desc':
      return (a: Product, b: Product) => b.rating - a.rating;
    case 'newest':
      return (a: Product, b: Product) => getTimestamp(b) - getTimestamp(a);
    case 'relevance':
    default:
      return (a: Product, b: Product) =>
        relevanceScore(b, tokens) - relevanceScore(a, tokens);
  }
}

function relevanceScore(product: Product, tokens: string[]): number {
  if (tokens.length === 0) {
    return product.highlight ? 1 : 0;
  }

  return tokens.reduce((score, token) => {
    if (product.name.toLowerCase().includes(token)) return score + 3;
    if (product.description.toLowerCase().includes(token)) return score + 2;
    if (product.tags.some((tag) => tag.toLowerCase().includes(token)))
      return score + 1;
    return score;
  }, 0);
}

function getTimestamp(product: Product): number {
  if (product.releaseDate) {
    return new Date(product.releaseDate).getTime();
  }
  // Fallback: derive from id ordering to keep determinism
  return parseInt(product.id.replace(/\D/g, ''), 10) || 0;
}
