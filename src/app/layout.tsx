import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartProvider } from '@/features/cart/CartProvider';
import {
  brand,
  getInstagramLink,
  getWhatsAppLink,
  siteUrl,
  socialImageVariants,
} from '@/lib/brand';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { themeInitScript } from '@/lib/design-system/theme';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
});

const toAbsoluteUrl = (value: string) =>
  value.startsWith('http')
    ? value
    : new URL(value, siteUrl).toString();

const socialImages = socialImageVariants.map((image) => {
  const absoluteUrl = toAbsoluteUrl(image);
  return {
    url: absoluteUrl,
    type: image.endsWith('.avif')
      ? 'image/avif'
      : image.endsWith('.webp')
        ? 'image/webp'
        : undefined,
  };
});

export const viewport = { width: 'device-width', initialScale: 1 };

export const themeColor = [
  { media: '(prefers-color-scheme: light)', color: '#efe7db' },
  { media: '(prefers-color-scheme: dark)', color: '#18130d' },
];

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: brand.nome,
  description: brand.descricao_curta,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: brand.nome,
    description: brand.descricao_curta,
    url: siteUrl,
    siteName: brand.nome,
    images: socialImages,
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: brand.nome,
    description: brand.descricao_curta,
    images: socialImageVariants,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const instagramLink = getInstagramLink();
  const whatsappLink = getWhatsAppLink();
  const socialImagesAbsolute = socialImageVariants.map(toAbsoluteUrl);
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: brand.nome,
    description: brand.descricao_curta,
    url: siteUrl,
    image: socialImagesAbsolute,
    telephone: brand.telefone || undefined,
    address:
      brand.endereco || brand.cidade
        ? {
            '@type': 'PostalAddress',
            streetAddress: brand.endereco || undefined,
            addressLocality: brand.cidade || undefined,
            addressCountry: 'BR',
          }
        : undefined,
    sameAs: [instagramLink].filter(Boolean),
    areaServed: brand.cidade
      ? { '@type': 'City', name: brand.cidade }
      : undefined,
    contactPoint: whatsappLink
      ? {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          url: whatsappLink,
          availableLanguage: ['pt-BR'],
        }
      : undefined,
  };

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://picsum.photos" />
      </head>
      <body
        className={`${inter.variable} antialiased bg-background text-foreground`}
      >
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <Script
          id="agro-mane-schema"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify(localBusinessSchema)}
        </Script>
        <a
          href="#conteudo-principal"
          className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-50 focus-visible:rounded-full focus-visible:bg-card focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:text-foreground focus-visible:shadow-card"
        >
          Pular para conteúdo
        </a>
        <ThemeProvider>
          <CartProvider>
            <div className="flex min-h-screen flex-col bg-background text-foreground transition-colors">
              <Header />
              <main id="conteudo-principal" className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
