import { Award, HeartPulse, ShieldCheck, TimerReset } from 'lucide-react';

import { Container } from '@/components/ui/container';

type Badge = {
  title: string;
  description: string;
  icon: typeof Award;
  accent?: string;
};

const badges: Badge[] = [
  {
    title: '35+ anos de mercado',
    description: 'Rede fundada em 1989, com operação contínua em Piracicaba.',
    icon: TimerReset,
    accent: 'from-amber-500/20 via-amber-500/10 to-transparent',
  },
  {
    title: 'CRMV ativo',
    description: 'Equipe veterinária regularizada e protocolos claros de atendimento.',
    icon: HeartPulse,
    accent: 'from-emerald-500/20 via-emerald-500/10 to-transparent',
  },
  {
    title: 'Selo bem-estar',
    description: 'Produtos e serviços alinhados a boas práticas de bem-estar animal.',
    icon: ShieldCheck,
    accent: 'from-sky-500/20 via-sky-500/10 to-transparent',
  },
  {
    title: 'Entrega/retirada ágil',
    description: 'Separação rápida com estoque local e parceiros de entrega.',
    icon: Award,
    accent: 'from-sand-400/25 via-sand-400/10 to-transparent',
  },
];

export function CredibilityBadges() {
  return (
    <section className="relative overflow-hidden py-12">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(92,107,60,0.08),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(196,122,59,0.08),transparent_35%)]"
      />
      <div aria-hidden className="leaf-shape leaf-sway -right-8 top-6 scale-75 opacity-35" />
      <Container className="relative space-y-8 rounded-[1.75rem] border border-border/70 bg-card/90 p-8 shadow-dune ring-1 ring-border/70 backdrop-blur">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
              Credibilidade
            </p>
            <h2 className="text-3xl font-semibold text-foreground">
              Anos de estrada e cuidado registrado
            </h2>
            <p className="max-w-2xl text-sm text-muted-foreground leading-relaxed">
              Sinais claros de confiança: experiência local, CRMV ativo, selo de bem-estar e logística
              que acompanha seu ritmo.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-foreground/5 px-4 py-2 text-[0.75rem] font-semibold uppercase tracking-[0.32em] text-muted-foreground shadow-card ring-1 ring-border/70">
            Rede Agro Mané • Piracicaba
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {badges.map((badge) => (
            <article
              key={badge.title}
              className="group relative flex h-full flex-col gap-3 overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-br from-card/90 via-card/80 to-muted/70 p-5 shadow-card transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-dune"
            >
              <div
                aria-hidden
                className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${badge.accent || 'from-primary/8 via-transparent to-sand-400/10'}`}
                />
              </div>
              <div className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-foreground text-background shadow-card">
                <badge.icon size={22} aria-hidden />
              </div>
              <div className="relative space-y-1">
                <h3 className="text-base font-semibold text-foreground">{badge.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{badge.description}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
