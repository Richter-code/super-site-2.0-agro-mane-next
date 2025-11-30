import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  Sparkles,
  Truck,
  MessageCircle,
  Sprout,
  Stethoscope,
} from 'lucide-react';

import { CategoryGrid } from '@/components/home/CategoryGrid';
import { CredibilityBadges } from '@/components/home/CredibilityBadges';
import { HeroSection } from '@/components/home/HeroSection';
import { OurStorySection } from '@/components/home/OurStorySection';
import { TestimonialsGrid } from '@/components/home/TestimonialsGrid';
import { DifferentialsSection } from '@/components/home/DifferentialsSection';
import { TeamSection } from '@/components/home/TeamSection';
import { InstagramFeed } from '@/features/branding/InstagramFeed';
import { Container } from '@/components/ui/container';
import { brand, ogImage, siteUrl } from '@/lib/brand';
import {
  getCategoryBySlug,
  getHomeCategories,
  type CategoryDefinition,
} from '@/data/categories';

export const metadata: Metadata = {
  title: `${brand.nome} | Pet, Piscina, Jardim e Agro`,
  description: brand.descricao_curta,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: `${brand.nome} | Experiência completa em pet, piscina e agro`,
    description: brand.descricao_curta,
    type: 'website',
    url: siteUrl,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: `Logomarca ${brand.nome}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${brand.nome} | Pet, Piscina, Jardim e Agro`,
    description: brand.descricao_curta,
    images: [ogImage],
  },
};

const homeCategories = getHomeCategories(brand.categorias);
const primaryCategories = homeCategories.filter((category) =>
  ['pet', 'piscina', 'jardim'].includes(category.slug),
);
const agroCategory = getCategoryBySlug('agro');
const vetCategory = getCategoryBySlug('vet');

const benefitIcons = [ShieldCheck, Truck, Sparkles, MessageCircle];

const defaultBenefits = [
  {
    icon: ShieldCheck,
    title: 'Rede Agro Mané',
      description: 'Várias lojas em Piracicaba com estoque e serviços completos.',
    },
    {
      icon: Truck,
      title: 'Atendimento próximo',
      description:
      'Fale no WhatsApp e combine retirada rápida ou entrega com parceiros locais, sem enrolação.',
    },
    {
      icon: Sparkles,
      title: 'Orientação especializada',
      description:
      'Equipe técnica e veterinária para montar o mix ideal e evitar compras erradas.',
    },
    {
      icon: MessageCircle,
      title: 'Pós-venda humano',
      description:
      'Suporte contínuo para piscina, jardim, pets e fazenda — com resposta rápida e sem burocracia.',
    },
];

const benefitCopy =
  brand.beneficios.length > 0
    ? brand.beneficios
    : defaultBenefits.map((item) => item.title);

const benefits = benefitCopy.map((benefit, index) => {
  const fallback = defaultBenefits[index % defaultBenefits.length];
  const icon = benefitIcons[index % benefitIcons.length];
  return {
    icon,
    title: benefit,
    description: fallback.description,
  };
});

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <OurStorySection />
      <BenefitsHighlights />
      <CredibilityBadges />
      <DifferentialsSection />
      <TeamSection />
      <TestimonialsGrid />
      <CategoryGrid categories={primaryCategories} id="categorias" />
      <AgroVetSection agro={agroCategory} vet={vetCategory} />
      <InstagramFeed />
    </main>
  );
}

function BenefitsHighlights() {
  return (
    <section className="py-12">
      <Container className="space-y-8 rounded-[2rem] border border-border/70 bg-card/95 p-8 shadow-dune ring-1 ring-border/70 backdrop-blur">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
              Benefícios da rede
            </p>
            <h2 className="text-3xl font-semibold text-foreground">
              Atendimento próximo e completo
            </h2>
            <p className="max-w-2xl text-sm text-muted-foreground">
              Estoque local, time técnico e suporte pós-compra para pet, piscina
              e projetos de campo.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-foreground/5 px-4 py-2 text-[0.75rem] font-semibold uppercase tracking-[0.32em] text-muted-foreground shadow-card ring-1 ring-border/70">
            Rede Agro Mané • Piracicaba
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="group relative flex h-full flex-col gap-3 overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-br from-card/90 via-card/80 to-muted/70 p-5 shadow-card transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-dune"
            >
              <div
                aria-hidden
                className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-sand-400/10" />
              </div>
              <div className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-foreground text-background shadow-card">
                <Icon size={22} aria-hidden />
              </div>
              <div className="relative space-y-1">
                <h3 className="text-base font-semibold text-foreground">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

type AgroVetSectionProps = {
  agro?: CategoryDefinition;
  vet?: CategoryDefinition;
};

function AgroVetSection({ agro, vet }: AgroVetSectionProps) {
  const cards = [
    agro && {
      title: 'Agro',
      eyebrow: agro.eyebrow || 'Linha Agro',
      description:
        agro.heroDescription ||
        'Insumos agrícolas, sementes e produtividade no campo com suporte próximo.',
      icon: Sprout,
      href: '/categorias/agro',
    },
    vet && {
      title: 'Vet',
      eyebrow: vet.eyebrow || 'Clínica Vet',
      description:
        vet.heroDescription ||
        'Serviços clínicos, exames rápidos e linha hospitalar para pets.',
      icon: Stethoscope,
      href: '/categorias/vet',
    },
  ].filter(Boolean) as Array<{
    title: string;
    eyebrow: string;
    description: string;
    icon: typeof Sprout;
    href: string;
  }>;

  if (!cards.length) return null;

  return (
    <section className="py-12">
      <Container className="space-y-6 rounded-[2rem] bg-card/90 p-8 shadow-dune ring-1 ring-border/70">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
            Soluções técnicas
          </p>
          <h2 className="text-3xl font-semibold text-foreground">
            Agro e Vet com assinatura Agro Mané
          </h2>
          <p className="max-w-3xl text-sm text-muted-foreground">
            Consultoria direta da equipe para fazenda e clínica: escolhemos juntos insumos agrícolas
            ou atendimento veterinário com segurança e linguagem simples.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {cards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group relative flex flex-col gap-3 overflow-hidden rounded-3xl border border-border/80 bg-foreground text-background p-6 shadow-card transition hover:-translate-y-1 hover:shadow-dune focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-ring"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-500/15 via-transparent to-sand-400/15" />
              <div className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-background text-foreground shadow-card">
                <card.icon className="h-6 w-6" aria-hidden />
              </div>
              <div className="relative space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sand-200">
                  {card.eyebrow}
                </p>
                <h3 className="text-2xl font-semibold">{card.title}</h3>
                <p className="text-sm text-sand-50/80">{card.description}</p>
              </div>
              <div className="relative mt-2 inline-flex items-center gap-2 rounded-full bg-background/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-sand-50 transition group-hover:bg-background/20">
                Ver detalhes
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
