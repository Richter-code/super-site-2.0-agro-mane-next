'use client';

import type { ElementType } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Leaf, MapPin, MessageCircle, Phone } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { brand } from '@/lib/brand';
import { buildWhatsappLink } from '@/lib/whatsapp';

type HighlightCard = {
  label: string;
  value: string;
  icon: LucideIcon;
  href?: string;
};

export function HeroSection() {
  const whatsappHref = buildWhatsappLink({
    message:
      'Olá! Vim pelo site da Agro Mané e quero falar com um especialista em Pet/Piscina/Jardim.',
  });
  const whatsappTarget = whatsappHref ? '_blank' : undefined;
  const whatsappRel = whatsappTarget ? 'noopener noreferrer' : undefined;
  const linktreeHref = brand.links_uteis.find(
    (link) => link.rotulo.toLowerCase() === 'linktree',
  )?.url;
  const linktreeTarget = linktreeHref ? '_blank' : undefined;
  const formatPhone = (value?: string) => {
    if (!value) return '';
    const digits = value.replace(/\D/g, '');
    const localDigits = digits.length > 11 ? digits.slice(-11) : digits;
    if (localDigits.length === 11) {
      return `(${localDigits.slice(0, 2)}) ${localDigits.slice(2, 7)}-${localDigits.slice(7)}`;
    }
    if (localDigits.length === 10) {
      return `(${localDigits.slice(0, 2)}) ${localDigits.slice(2, 6)}-${localDigits.slice(6)}`;
    }
    return value;
  };
  const [streetFragment] = brand.endereco?.split('-') ?? [];
  const streetLabel = streetFragment?.trim() || 'Piracicaba/SP';
  const whatsappDisplay = formatPhone(brand.whatsapp);
  const telefoneDisplay = formatPhone(brand.telefone);
  const telefoneDigits = brand.telefone?.replace(/\D/g, '') ?? '';
  const highlightCards: HighlightCard[] = [
    {
      label: 'Endereço',
      value: streetLabel,
      icon: MapPin,
    },
    {
      label: 'WhatsApp Centro',
      value: whatsappDisplay,
      href: whatsappHref,
      icon: MessageCircle,
    },
    {
      label: 'Telefone fixo',
      value: telefoneDisplay,
      icon: Phone,
      href: telefoneDigits ? `tel:+${telefoneDigits}` : undefined,
    },
  ].filter((card): card is HighlightCard => Boolean(card.value));
  const cityLabel = brand.cidade || 'Piracicaba/SP';

  return (
    <section className="relative overflow-hidden bg-brand-hero py-16 dark:bg-[radial-gradient(circle_at_20%_20%,rgba(63,148,88,0.12),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(163,125,69,0.12),transparent_45%),linear-gradient(135deg,#0b120d,#0f1a14)]">
      <Image
        src="/brand/pet-hero.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        placeholder="blur"
        blurDataURL="/brand/pet-hero.webp"
        aria-hidden
        className="pointer-events-none select-none object-cover object-[55%_35%] sm:object-[50%_30%] lg:object-[45%_30%] opacity-45 saturate-[1.05]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-[#040f09]/55 sm:from-[#040f09]/35 via-[#030b07]/78 sm:via-[#030b07]/72 to-[#020604]/94"
      />
      <div
        aria-hidden
        className="absolute -left-10 top-10 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -right-6 bottom-4 h-56 w-56 rounded-full bg-sand-400/10 blur-3xl"
      />
      <Container className="relative z-10 grid gap-10 rounded-[2.5rem] border border-white/10 bg-white/75 p-6 shadow-dune ring-1 ring-border/70 backdrop-blur-2xl dark:border-white/10 dark:bg-[#0c140f]/70 dark:ring-white/10 sm:p-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="animate-fade-in-slow">
          <div className="inline-flex items-center gap-2 rounded-full bg-foreground/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-muted-foreground shadow-card ring-1 ring-border/70">
            <Leaf size={16} aria-hidden />
            Rede Agro Mané • {cityLabel}
          </div>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-foreground sm:text-[2.65rem] lg:text-5xl">
            Loja oficial de Piracicaba para pet, piscina e jardim. Com pessoas de verdade do outro lado.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            {brand.descricao_curta}{' '}
            {brand.cidade
              ? `Rede em ${brand.cidade} com orientação técnica e veterinária feita por gente que escuta antes de indicar.`
              : 'Atendimento que escuta primeiro e orienta com cuidado.'}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild className="focus-ring">
              <Link href="/produtos">Explorar catálogo</Link>
            </Button>
            <Button variant="secondary" asChild className="focus-ring border-primary/40 bg-primary/5 text-primary hover:border-primary hover:bg-primary/10">
              <Link
                href={whatsappHref}
                target={whatsappTarget}
                rel={whatsappRel}
                aria-label="Falar com especialista no WhatsApp"
                aria-disabled={!whatsappHref}
              >
                Falar com especialista
              </Link>
            </Button>
            <Button variant="ghost" asChild className="focus-ring">
              <Link
                href={linktreeHref || '/lojas'}
                target={linktreeTarget}
                rel={linktreeTarget ? 'noreferrer' : undefined}
              >
                Atendimento por unidade
              </Link>
            </Button>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {highlightCards.map(({ label, value, href, icon: Icon }) => {
              const isExternal = href?.startsWith('http');
              const isInteractive = Boolean(href);
              const Wrapper: ElementType = isInteractive ? 'a' : 'p';
              const wrapperProps = isInteractive
                ? {
                    href,
                    target: isExternal ? '_blank' : undefined,
                    rel: isExternal ? 'noreferrer' : undefined,
                  }
                : {};
              return (
                <div
                  key={label}
                  className="group relative overflow-hidden rounded-2xl border border-border/60 bg-white/75 p-4 shadow-card backdrop-blur dark:bg-foreground/5"
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-sand-400/10" />
                  </div>
                  <span className="inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-muted-foreground">
                    {label}
                  </span>
                  <Wrapper
                    {...wrapperProps}
                    className="mt-2 inline-flex items-center gap-2 text-base font-semibold text-foreground transition-colors group-hover:text-primary"
                  >
                    <Icon size={16} aria-hidden /> {value}
                  </Wrapper>
                </div>
              );
            })}
          </div>
        </div>
        <div
          className="relative overflow-hidden rounded-[2rem] border border-white/25 bg-black/80 shadow-2xl shadow-black/30 animate-fade-in-delay"
          aria-hidden
        >
          <Image
            src="/brand/hero-centro.webp"
            alt="Fachada da Agro Mané loja Centro em Piracicaba"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 90vw, 40vw"
            placeholder="blur"
            blurDataURL="/brand/hero-centro.webp"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-primary/10 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl bg-black/60 p-4 text-white backdrop-blur-lg ring-1 ring-white/10">
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-white/70">
                {cityLabel} • Loja Centro
              </p>
              <p className="text-base font-semibold">{streetLabel}</p>
            </div>
            <span className="text-sm font-semibold text-emerald-200">Atendimento hoje</span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
