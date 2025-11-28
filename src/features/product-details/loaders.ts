import type { Product } from '@/data/products';
import { getProductBySlug, getSimilarProducts } from '@/lib/products';

export async function loadProductBySlug(
  slug: string,
): Promise<Product | undefined> {
  return getProductBySlug(slug);
}

export async function loadProductWithSimilar(slug: string) {
  const product = await loadProductBySlug(slug);
  if (!product) return undefined;

  const similar = getSimilarProducts(product, 4);
  return { product, similar };
}
