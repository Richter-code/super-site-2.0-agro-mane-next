'use server';

import {
  filterProducts,
  getCategoriesSummary,
  type ProductFilterOptions,
  type CategorySummary,
} from '@/lib/products';

export async function fetchCatalogProducts(options: ProductFilterOptions) {
  return filterProducts(options);
}

export async function fetchCategoriesSummary(): Promise<CategorySummary[]> {
  return getCategoriesSummary();
}
