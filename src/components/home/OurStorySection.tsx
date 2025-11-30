import { HandHeart, Leaf, Route, ShieldCheck, Sprout } from 'lucide-react';

import { Container } from '@/components/ui/container';

type Milestone = {
  year: string;
  title: string;
  description: string;
};

type ValueCard = {
  title: string;
  description: string;
  icon: typeof Leaf;
};

const milestones: Milestone[] = [
  {
    year: '1989',
    title: 'Raiz no campo',
    description:
      'Agro Mané nasce atendendo produtores de Piracicaba com insumos e orientação direta do time técnico.',
  },
  {
    year: '2005',
    title: 'Vet e pet entram na rota',
    description:
      'Montamos o portfólio de clínica e produtos pet, trazendo veterinários para somar com o agro.',
  },
  {
    year: '2015',
    title: 'Rede multiloja',
    description:
      'Expansão para mais unidades na cidade com estoque próprio e parceiros de entrega rápidos.',
  },
  {
    year: '2024',
    title: 'Experiência completa',
    description:
      'Integramos piscina, jardim, agro e vet num só atendimento, com suporte humano e pós-venda próximo.',
  },
];

const values: ValueCard[] = [
  {
    title: 'Escuta de campo',
    description: 'Decisões guiadas pelo que o produtor e os tutores pedem no dia a dia.',
    icon: Route,
  },
  {
    title: 'Cuidado veterinário',
    description: 'Clínica e orientações com CRMV ativo e protocolos claros.',
    icon: HandHeart,
  },
  {
    title: 'Sustentabilidade real',
    description: 'Linhas e práticas que respeitam o solo, a água e o bem-estar animal.',
    icon: Sprout,
  },
  {
    title: 'Confiança local',
    description: 'Estoques em Piracicaba, equipe fixa e suporte pós-compra sem burocracia.',
    icon: ShieldCheck,
  },
];

export function OurStorySection() {
  return (
    <section className="relative overflow-hidden py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(92,107,60,0.08),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(196,122,59,0.08),transparent_30%)]"
      />
      <div aria-hidden className="leaf-shape leaf-sway -left-10 top-10 opacity-40" />
      <Container className="relative grid gap-10 rounded-[2rem] border border-border/80 bg-card/90 p-8 shadow-dune ring-1 ring-border/70 backdrop-blur lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="inline-flex items-center gap-2 rounded-full bg-foreground/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-muted-foreground shadow-card ring-1 ring-border/70">
              <Leaf size={16} aria-hidden />
              Nossa história
            </p>
            <h2 className="text-3xl font-semibold text-foreground sm:text-[2rem]">
              Caminho aberto com quem vive o campo e cuida dos pets.
            </h2>
            <p className="max-w-2xl text-sm text-muted-foreground leading-relaxed">
              Desde o início, escutamos produtores, tutores e profissionais de Piracicaba para
              construir uma rede que entrega orientação técnica, clínica e produtos prontos para usar.
            </p>
          </div>
          <div className="relative space-y-6 border-l border-border/70 pl-6 sm:pl-8">
            <div className="absolute left-0 top-1 h-full w-[1px] -translate-x-[0.5px] bg-gradient-to-b from-primary/60 via-border to-transparent" />
            {milestones.map((item) => (
              <article
                key={item.year}
                className="group relative rounded-2xl border border-border/60 bg-card/80 p-5 shadow-card transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-dune"
              >
                <div className="absolute -left-[1.3rem] top-5 flex h-8 w-8 items-center justify-center rounded-full bg-background shadow-card ring-1 ring-border/80">
                  <span className="text-xs font-semibold text-primary">{item.year}</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-sand-400/10" />
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
            Valores que guiam
          </p>
          <div aria-hidden className="leaf-shape leaf-sway -right-6 -top-6 rotate-3 opacity-30" />
          <div className="grid gap-4 sm:grid-cols-2">
            {values.map((value) => (
              <article
                key={value.title}
                className="group relative flex h-full flex-col gap-3 overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-br from-card/90 via-card/80 to-muted/70 p-5 shadow-card transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-dune"
              >
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-sand-400/10" />
                </div>
                <div className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl bg-foreground text-background shadow-card">
                  <value.icon size={20} aria-hidden />
                </div>
                <div className="relative space-y-1">
                  <h3 className="text-base font-semibold text-foreground">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
