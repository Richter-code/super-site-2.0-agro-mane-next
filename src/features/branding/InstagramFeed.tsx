'use client';

import Link from 'next/link';
import { Instagram, MessageCircle, PawPrint, Sprout, Waves } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { brand, getInstagramLink } from '@/lib/brand';

const feedHighlights = [
  {
    id: 'pet',
    title: 'Bastidores Pet',
    copy: 'Dicas rápidas de nutrição, acessórios e bem-estar com orientação vet.',
    icon: PawPrint,
  },
  {
    id: 'piscina',
    title: 'Piscina sem dor de cabeça',
    copy: 'Manutenção segura, automação e cuidados semanais direto da equipe.',
    icon: Waves,
  },
  {
    id: 'jardim',
    title: 'Verde de casa e campo',
    copy: 'Irrigação inteligente, adubação e inspirações do nosso time.',
    icon: Sprout,
  },
];

export function InstagramFeed() {
  const instagramHref = getInstagramLink();
  const instagramLink = instagramHref || '#contato';
  const instagramTarget = instagramHref ? '_blank' : undefined;

  return (
    <section className="py-16">
      <Container className="space-y-10 rounded-[2.5rem] bg-card/90 p-10 shadow-dune ring-1 ring-border/70 backdrop-blur">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">
              Feed Vivo
            </p>
            <h2 className="text-3xl font-semibold text-foreground">
              Direto do Instagram da {brand.nome}
            </h2>
            <p className="text-base text-muted-foreground">
              Bastidores das lojas em Piracicaba, lançamentos e orientações da
              equipe. Sem fotos genéricas: só o dia a dia Agro Mané.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild className="focus-ring gap-2 rounded-full px-6">
              <Link
                href={instagramLink}
                target={instagramTarget}
                rel={instagramTarget ? 'noreferrer' : undefined}
                aria-label="Ver no Instagram (abre em uma nova aba)"
                aria-disabled={!instagramHref}
              >
                <Instagram size={18} aria-hidden /> Ver no Instagram
              </Link>
            </Button>
            <Button
              variant="secondary"
              asChild
              className="focus-ring rounded-full px-6"
            >
              <Link href="/produtos">Explorar catálogo</Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {feedHighlights.map((item, index) => (
            <article
              key={item.id}
              className="group overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br from-card to-muted/50 p-6 shadow-card transition hover:-translate-y-1 hover:shadow-dune animate-fade-in"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-foreground text-background shadow-card">
                <item.icon className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.copy}</p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-foreground/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                <MessageCircle size={14} aria-hidden /> Acompanhar pelo Insta
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
