import { NextResponse } from 'next/server';
import { filterProducts, getProductFiltersMeta } from '@/lib/products';
import { parseFilterStateFromSearchParams } from '@/features/catalog/types';

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const state = parseFilterStateFromSearchParams(searchParams);
  const pageParam = Number(searchParams.get('page') || '1');
  const pageSizeParam = Number(searchParams.get('pageSize') || '12');

  const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;
  const pageSize =
    Number.isFinite(pageSizeParam) && pageSizeParam > 0 ? pageSizeParam : 12;

  const all = filterProducts(state);
  const start = Math.max(0, (page - 1) * pageSize);
  const end = start + pageSize;
  const products = all.slice(start, end);
  const hasMore = end < all.length;

  const meta = getProductFiltersMeta(all);

  return NextResponse.json({
    products,
    meta: {
      ...meta,
      page,
      pageSize,
      hasMore,
    },
  });
}
