'use client';

import type { ElementType } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Leaf, MapPin, MessageCircle, Phone } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { brand } from '@/lib/brand';
import { buildWhatsappLink } from '@/lib/whatsapp';

const heroMotion = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

type HighlightCard = {
  label: string;
  value: string;
  icon: LucideIcon;
  href?: string;
};

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
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
  return (
    <section className="bg-brand-hero py-16 dark:bg-[radial-gradient(circle_at_20%_20%,rgba(63,148,88,0.12),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(163,125,69,0.12),transparent_45%),linear-gradient(135deg,#0b120d,#0f1a14)]">
      <Container className="grid gap-8 rounded-[2.5rem] bg-card/90 p-8 shadow-dune ring-1 ring-border/70 backdrop-blur-xl lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={shouldReduceMotion ? 'visible' : 'hidden'}
          animate="visible"
          variants={heroMotion}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.7 }}
        >
          <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.35em] text-muted-foreground">
            <Leaf size={18} aria-hidden />
            Rede Agro Mané
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-foreground lg:text-4xl">
            Loja oficial de Piracicaba para pet, piscina e jardim.
          </h1>
          <p className="mt-4 text-base text-muted-foreground">
            {brand.descricao_curta}{' '}
            {brand.cidade
              ? `Rede em ${brand.cidade} com orientação técnica e veterinária todos os dias.`
              : ''}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="focus-ring">
              <Link href="/produtos">Explorar catálogo</Link>
            </Button>
            <Button variant="secondary" asChild className="focus-ring">
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
                className="surface-card rounded-2xl border border-border/60 p-4 shadow-card"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
                  {label}
                </span>
                  <Wrapper
                    {...wrapperProps}
                    className="mt-2 inline-flex items-center gap-2 text-base font-semibold text-foreground"
                  >
                    <Icon size={16} aria-hidden /> {value}
                  </Wrapper>
                </div>
              );
            })}
          </div>
        </motion.div>
        <motion.div
          className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-black"
          aria-hidden
          initial={
            shouldReduceMotion
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 24 }
          }
          animate={{ opacity: 1, y: 0 }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 0.7, delay: 0.15 }
          }
        >
          <Image
            src="/brand/hero-centro.webp"
            alt="Fachada da Agro Mané loja Centro em Piracicaba"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 90vw, 40vw"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/35 via-primary/15 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl bg-black/55 p-4 text-white backdrop-blur-lg">
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-white/70">
                Piracicaba • Loja Centro
              </p>
              <p className="text-base font-semibold">Rua São José, 1122</p>
            </div>
            <span className="text-sm font-semibold text-emerald-200">Atendimento hoje</span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
