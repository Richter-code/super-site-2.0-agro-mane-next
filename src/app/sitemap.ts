import type { MetadataRoute } from 'next';
import { getAllProducts } from '@/lib/products';
import { siteUrl } from '@/lib/brand';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const products = getAllProducts().map((product) => ({
    url: `${siteUrl}/produtos/${product.slug}`,
    lastModified: now,
  }));

  const categories = Array.from(
    new Set(getAllProducts().map((product) => product.category)),
  ).map((category) => ({
    url: `${siteUrl}/categorias/${category}`,
    lastModified: now,
  }));

  const baseRoutes = ['', '/produtos', '/carrinho', '/checkout', '/login'].map(
    (path) => ({
      url: `${siteUrl}${path}`,
      lastModified: now,
    }),
  );

  return [...baseRoutes, ...categories, ...products];
}
