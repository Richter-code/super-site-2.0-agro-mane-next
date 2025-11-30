import type { Metadata } from 'next';
import Link from 'next/link';
import { MessageCircle, MapPin } from 'lucide-react';
import { notFound } from 'next/navigation';
import Script from 'next/script';

import { Container } from '@/components/ui/container';
import {
  ProductDetailList,
  ProductHero,
  ProductHighlights,
  SimilarProducts,
} from '@/features/product-details/components';
import {
  loadProductBySlug,
  loadProductWithSimilar,
} from '@/features/product-details/loaders';
import { getAllProducts } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { brand, ogImage, siteUrl } from '@/lib/brand';
import { buildWhatsappLink } from '@/lib/whatsapp';
import { getStoreBySlug, type Store } from '@/data/stores';

type ProductPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return getAllProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await loadProductBySlug(params.slug);
  if (!product) {
    return {
      title: 'Produto não encontrado',
    };
  }

  const toAbsoluteUrl = (value: string) =>
    value && value.startsWith('http')
      ? value
      : new URL(value || ogImage, siteUrl).toString();

  const imageUrl = toAbsoluteUrl(product.image);
  const canonicalUrl = new URL(`/produtos/${product.slug}`, siteUrl).toString();

  return {
    title: `${product.name} | ${brand.nome}`,
    description: product.description,
    alternates: {
      canonical: `/produtos/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} | ${brand.nome}`,
      description: product.description,
      type: 'website',
      url: canonicalUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | ${brand.nome}`,
      description: product.description,
      images: [imageUrl],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const data = await loadProductWithSimilar(params.slug);

  if (!data) {
    notFound();
  }

  const { product, similar } = data;
  const toAbsoluteUrl = (value: string) =>
    value.startsWith('http')
      ? value
      : new URL(value, siteUrl).toString();
  const productUrl = new URL(`/produtos/${product.slug}`, siteUrl).toString();
  const productImage = toAbsoluteUrl(product.image || ogImage);
  const whatsappHref = buildWhatsappLink({
    message: `Olá! Gostaria de falar sobre ${product.name}.`,
  });
  const whatsappTarget = whatsappHref ? '_blank' : undefined;
  const availability = (product.availableAt ?? [])
    .map((slug) => getStoreBySlug(slug))
    .filter((store): store is Store => Boolean(store));

  const overviewItems = [
    { label: 'Categoria', value: product.category.toUpperCase() },
    {
      label: 'Disponibilidade',
      value: product.inStock ? 'Em estoque' : 'Indisponível',
    },
    { label: 'Avaliação média', value: `${product.rating.toFixed(1)} / 5` },
    { label: 'Tags', value: product.tags.join(', ') },
    {
      label: 'Lançamento',
      value: product.releaseDate
        ? new Date(product.releaseDate).toLocaleDateString('pt-BR')
        : undefined,
    },
  ];

  const serviceItems = [
    { label: 'Entrega', value: 'Todo o Brasil com parceiros selecionados' },
    { label: 'Pagamento', value: 'Cartão, PIX ou faturado Agro Mané' },
    { label: 'Suporte', value: 'Consultoria especializada pós-compra' },
  ];

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: productImage,
    description: product.description,
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: brand.nome,
    },
    url: productUrl,
    releaseDate: product.releaseDate || undefined,
    category: product.category,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'BRL',
      price: product.price.toFixed(2),
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: productUrl,
      seller: {
        '@type': 'Organization',
        name: brand.nome,
        url: siteUrl,
      },
      itemCondition: 'https://schema.org/NewCondition',
    },
    aggregateRating: product.rating
      ? {
          '@type': 'AggregateRating',
          ratingValue: product.rating,
          reviewCount: 12,
        }
      : undefined,
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Este produto ${product.inStock ? 'está disponível' : 'tem previsão de estoque'}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: product.inStock
            ? 'Sim, o item está em estoque imediato nas unidades indicadas e pode ser reservado pelo WhatsApp.'
            : 'No momento o item está em reabastecimento. Fale com a equipe para estimativa de chegada e alternativas compatíveis.',
        },
      },
      {
        '@type': 'Question',
        name: 'Posso comprar online e retirar na loja?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sim. Combine retirada rápida pelo WhatsApp ou escolha entrega com parceiros locais e transportadoras.',
        },
      },
    ],
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: brand.nome,
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Produtos',
        item: `${siteUrl}/produtos`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.name,
        item: productUrl,
      },
    ],
  };

  return (
    <main className="bg-gradient-to-b from-background to-muted/40 py-12">
      <Script id="product-jsonld" type="application/ld+json">
        {JSON.stringify(productJsonLd)}
      </Script>
      <Script id="product-faq-jsonld" type="application/ld+json">
        {JSON.stringify(faqJsonLd)}
      </Script>
      <Script id="product-breadcrumb-jsonld" type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </Script>
      <Container className="space-y-12">
        <ProductHero product={product} />

        <section className="flex flex-col gap-4 rounded-3xl border border-sand-100 bg-white/95 p-6 shadow-card md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-moss-500">
              Atendimento Agro Mané
            </p>
            <h2 className="text-2xl font-semibold text-moss-900">
              Chame um especialista no WhatsApp
            </h2>
            <p className="text-sm text-moss-600">
              Tire dúvidas sobre instalação, compatibilidade ou estoque em tempo
              real antes de finalizar sua compra.
            </p>
          </div>
          <Button asChild size="lg" className="focus-ring rounded-full px-8">
            <Link
              href={whatsappHref}
              target={whatsappTarget}
              rel={whatsappTarget ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center gap-2"
              aria-disabled={!whatsappHref}
            >
              <MessageCircle size={20} aria-hidden /> Falar com consultor
            </Link>
          </Button>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <ProductHighlights product={product} />
          <div className="space-y-6">
            <ProductDetailList title="Ficha rápida" items={overviewItems} />
            <ProductDetailList
              title="Serviços Agro Mané"
              items={serviceItems}
            />
          </div>
        </section>

        <ProductAvailability stores={availability} />

        <SimilarProducts products={similar ?? []} />
      </Container>
    </main>
  );
}

function ProductAvailability({ stores }: { stores: Store[] }) {
  if (!stores.length) return null;
  return (
    <section className="rounded-3xl border border-border/70 bg-card/90 p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
            Retirada ou consultoria local
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-foreground">
            Disponível em {stores.length}{' '}
            {stores.length === 1 ? 'loja' : 'lojas'} Agro Mané
          </h3>
        </div>
        <Button asChild variant="outline" className="focus-ring rounded-full">
          <Link href="/lojas">Ver todas as unidades</Link>
        </Button>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {stores.map((store) => (
          <div
            key={store.id}
            className="rounded-2xl border border-border/70 bg-muted/30 p-4"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              {store.shortName}
            </p>
            <p className="mt-1 text-sm font-semibold text-foreground">
              {store.name}
            </p>
            <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin size={14} aria-hidden />
              <span>
                {store.address.city}/{store.address.state}
              </span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {store.businessHours[0]?.label}: {store.businessHours[0]?.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
