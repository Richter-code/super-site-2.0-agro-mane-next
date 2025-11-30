import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import {
  Clock,
  MapPin,
  MessageCircle,
  Phone,
  Star,
  Store as StoreIcon,
} from 'lucide-react';

import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { brand, ogImage, siteUrl } from '@/lib/brand';
import { buildWhatsappLink } from '@/lib/whatsapp';
import {
  getStoreBySlug,
  getStoreSlugs,
  type Store,
} from '@/data/stores';

type StorePageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return getStoreSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: StorePageProps): Metadata {
  const store = getStoreBySlug(params.slug);
  if (!store) {
    return {
      title: 'Loja não encontrada',
    };
  }

  return {
    title: `${store.name} | ${brand.nome}`,
    description: store.description,
    alternates: {
      canonical: `/lojas/${store.slug}`,
    },
    openGraph: {
      title: `${store.name} | ${brand.nome}`,
      description: store.description,
      url: `${siteUrl}/lojas/${store.slug}`,
      images: [store.heroImage, ogImage].filter(Boolean).map((image) => ({
        url: image,
        width: 1200,
        height: 630,
        alt: store.name,
      })),
    },
  };
}

export default function StorePage({ params }: StorePageProps) {
  const store = getStoreBySlug(params.slug);
  if (!store) {
    notFound();
  }

  const whatsappHref = buildWhatsappLink({
    phone: store.whatsapp,
    message:
      store.whatsappMessage ??
      `Olá! Gostaria de falar com a unidade ${store.shortName}.`,
  });
  const whatsappTarget = whatsappHref ? '_blank' : undefined;
  const storeUrl = `${siteUrl}/lojas/${store.slug}`;

  const storeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: store.name,
    url: storeUrl,
    telephone: store.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: store.address.street,
      addressLocality: store.address.city,
      addressRegion: store.address.state,
      postalCode: store.address.zip,
      addressCountry: 'BR',
    },
    geo: store.address.coordinates
      ? {
          '@type': 'GeoCoordinates',
          latitude: store.address.coordinates.lat,
          longitude: store.address.coordinates.lng,
        }
      : undefined,
    image: store.heroImage || ogImage,
    sameAs: [brand.instagram].filter(Boolean),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: brand.nome, item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Lojas', item: `${siteUrl}/lojas` },
      { '@type': 'ListItem', position: 3, name: store.name, item: storeUrl },
    ],
  };

  return (
    <main className="bg-brand-hero">
      <Script id="store-jsonld" type="application/ld+json">
        {JSON.stringify(storeSchema)}
      </Script>
      <Script id="store-breadcrumb-jsonld" type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </Script>
      <div className="relative h-[260px] w-full overflow-hidden bg-gradient-to-br from-brand-100 via-card to-sand-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative flex h-20 w-20 items-center justify-center rounded-[2rem] bg-foreground text-background shadow-card">
            <div className="absolute -top-2 -left-2 h-3 w-3 rounded-sm bg-brand-400" aria-hidden />
            <div className="absolute -bottom-2 -right-2 h-3 w-3 rounded-sm bg-sand-400" aria-hidden />
            <StoreIcon className="h-10 w-10" aria-hidden />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-transparent" />
        <div className="relative z-10 flex h-full items-end">
          <Container className="pb-8 text-foreground">
            <p className="text-xs font-semibold uppercase tracking-[0.45em] text-muted-foreground">
              {store.shortName}
            </p>
            <h1 className="mt-3 text-4xl font-semibold">{store.name}</h1>
            <p className="mt-2 max-w-3xl text-muted-foreground">
              {store.description}
            </p>
          </Container>
        </div>
      </div>

      <section className="pb-12">
        <Container className="space-y-10">
          <Card className="border-border/70 shadow-dune">
            <CardContent className="grid gap-6 p-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-6">
                <StoreMetaBlock store={store} />
                <ContactSection
                  store={store}
                  whatsappHref={whatsappHref}
                  whatsappTarget={whatsappTarget}
                />
              </div>
              <StoreServices store={store} />
            </CardContent>
          </Card>

          <StoreHighlights store={store} />
          <StoreGallery store={store} />
        </Container>
      </section>
    </main>
  );
}

function StoreMetaBlock({ store }: { store: Store }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <InfoItem
        icon={MapPin}
        title="Endereço"
        description={store.address.street}
        detail={`${store.address.city}/${store.address.state}`}
      />
      <InfoItem
        icon={Clock}
        title="Horários"
        description={store.businessHours.map((entry) => `${entry.label}: ${entry.value}`).join(' • ')}
      />
    </div>
  );
}

function ContactSection({
  store,
  whatsappHref,
  whatsappTarget,
}: {
  store: Store;
  whatsappHref: string;
  whatsappTarget?: string;
}) {
  return (
    <div className="rounded-3xl border border-brand-200/60 bg-brand-50/70 p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-700">
        Atendimento dedicado
      </p>
      <h2 className="mt-2 text-2xl font-semibold text-brand-900">
        Consultores especialistas em {store.shortName}
      </h2>
      <p className="mt-2 text-sm text-brand-800">
        {store.whatsappMessage ?? 'Chame o time para montar pedidos, reservar produtos e verificar disponibilidade em tempo real.'}
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href={whatsappHref || '#contato'}
          target={whatsappTarget}
          rel={whatsappTarget ? 'noreferrer' : undefined}
          className="focus-ring inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white"
          aria-disabled={!whatsappHref}
        >
          <MessageCircle size={18} aria-hidden /> Falar via WhatsApp
        </Link>
        <Link
          href={`/lojas`}
          className="focus-ring inline-flex items-center gap-2 rounded-full border border-brand-400 px-6 py-3 text-sm font-semibold text-brand-800"
        >
          <StoreIcon size={18} aria-hidden /> Ver todas as lojas
        </Link>
      </div>
      <div className="mt-4 grid gap-4 text-sm text-brand-900 md:grid-cols-2">
        <InfoItem icon={Phone} title="Telefone" description={store.phone} />
        {store.email && (
          <InfoItem icon={Star} title="Email" description={store.email} />
        )}
      </div>
    </div>
  );
}

function StoreServices({ store }: { store: Store }) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold uppercase tracking-[0.35em] text-muted-foreground">
        Serviços e especialidades
      </h3>
      <div className="grid gap-3">
        {store.services.map((service) => (
          <div
            key={service.id}
            className="rounded-2xl border border-border/70 bg-card/80 p-4"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              {service.label}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function StoreHighlights({ store }: { store: Store }) {
  if (!store.highlights.length) return null;
  return (
    <section className="rounded-3xl border border-border/70 bg-card/80 p-8">
      <h3 className="text-sm font-semibold uppercase tracking-[0.35em] text-muted-foreground">
        Diferenciais da unidade
      </h3>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {store.highlights.map((highlight) => (
          <div key={highlight} className="rounded-2xl border border-border/60 bg-muted/40 p-4 text-sm text-muted-foreground">
            {highlight}
          </div>
        ))}
      </div>
    </section>
  );
}

function StoreGallery({ store }: { store: Store }) {
  if (!store.gallery.length) return null;
  return (
    <section className="space-y-4">
      <h3 className="text-sm font-semibold uppercase tracking-[0.35em] text-muted-foreground">
        Espaços e showroom
      </h3>
      <div className="grid gap-4 md:grid-cols-3">
        {store.gallery.map((image) => (
          <div
            key={image}
            className="relative flex h-56 items-center justify-center rounded-2xl border border-border/60 bg-gradient-to-br from-brand-100 via-card to-sand-100 text-muted-foreground"
          >
            <StoreIcon className="h-8 w-8" aria-hidden />
            <span className="sr-only">Galeria da {store.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

type InfoItemProps = {
  icon: typeof MapPin;
  title: string;
  description?: string;
  detail?: string;
};

function InfoItem({ icon: Icon, title, description, detail }: InfoItemProps) {
  if (!description) return null;
  return (
    <div className="rounded-2xl border border-border/60 bg-card/70 p-4">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
        <Icon size={16} aria-hidden /> {title}
      </div>
      <p className="mt-2 text-sm text-foreground">{description}</p>
      {detail && <p className="text-xs text-muted-foreground">{detail}</p>}
    </div>
  );
}
