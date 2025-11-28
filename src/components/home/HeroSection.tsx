'use client';

import Link from 'next/link';
import { Leaf } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { brand } from '@/lib/brand';
import { buildWhatsappLink } from '@/lib/whatsapp';

const heroMotion = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const whatsappHref = buildWhatsappLink({
    message:
      'Olá! Vim pelo site da Agro Mané e quero falar com um especialista em Pet/Piscina/Jardim.',
  });
  const whatsappTarget = whatsappHref ? '_blank' : undefined;
  const whatsappRel = whatsappTarget ? 'noopener noreferrer' : undefined;
  return (
    <section className="bg-brand-hero py-16 dark:bg-[radial-gradient(circle_at_20%_20%,rgba(63,148,88,0.12),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(163,125,69,0.12),transparent_45%),linear-gradient(135deg,#0b120d,#0f1a14)]">
      <Container className="grid gap-8 rounded-3xl bg-card/90 p-8 shadow-dune ring-1 ring-border/70 backdrop-blur-xl lg:grid-cols-2">
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
            Soluções para pets, piscina e jardim com atendimento humano.
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
              <Link href="/lojas">Encontrar loja em Piracicaba</Link>
            </Button>
          </div>
        </motion.div>
        <motion.div
          className="rounded-3xl bg-grain"
          aria-hidden
          initial={
            shouldReduceMotion
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.92 }
          }
          animate={{ opacity: 1, scale: 1 }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 0.7, delay: 0.15 }
          }
        />
      </Container>
    </section>
  );
}
