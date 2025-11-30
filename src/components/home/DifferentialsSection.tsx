import { HandHeart, Leaf, MessagesSquare, Sparkles, Truck, Waves } from 'lucide-react';

import { Container } from '@/components/ui/container';

type Differential = {
  title: string;
  description: string;
  icon: typeof Leaf;
  tag: string;
};

const differentials: Differential[] = [
  {
    title: 'Atendimento que escuta',
    description:
      'A gente começa perguntando o que você precisa no campo, na clínica ou em casa. Sem script engessado.',
    icon: MessagesSquare,
    tag: 'Humano',
  },
  {
    title: 'Logística na vida real',
    description:
      'Separação rápida para retirada ou entrega com parceiros locais. O que é urgente sai primeiro.',
    icon: Truck,
    tag: 'Ágil',
  },
  {
    title: 'Curadoria que evita erro',
    description:
      'Misturamos técnica e prática: insumos, linha vet e produtos de piscina escolhidos para não dar retrabalho.',
    icon: Sparkles,
    tag: 'Preciso',
  },
  {
    title: 'Bem-estar no centro',
    description:
      'CRMV ativo, protocolos claros e orientações que respeitam o bem-estar animal e o uso correto de cada produto.',
    icon: HandHeart,
    tag: 'Seguro',
  },
  {
    title: 'Paixão pelo verde',
    description:
      'Quem cuida de jardim ou campo encontra dicas, mixes prontos e suporte de quem vive plantando também.',
    icon: Leaf,
    tag: 'Orgânico',
  },
  {
    title: 'Piscina cristalina sem novela',
    description:
      'Passo a passo simples e produtos certos para manter a água saudável o ano todo, mesmo com rotina puxada.',
    icon: Waves,
    tag: 'Prático',
  },
];

export function DifferentialsSection() {
  return (
    <section className="relative overflow-hidden py-14">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(124,92,60,0.08),transparent_35%),radial-gradient(circle_at_85%_10%,rgba(92,107,60,0.1),transparent_35%)]"
      />
      <div aria-hidden className="leaf-shape leaf-sway -left-8 top-12 opacity-35" />
      <Container className="relative space-y-8 rounded-[2rem] border border-border/70 bg-card/90 p-8 shadow-dune ring-1 ring-border/70 backdrop-blur">
        <div className="space-y-3 sm:max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
            Diferenciais
          </p>
          <h2 className="text-3xl font-semibold text-foreground sm:text-[2rem]">
            Mais que produtos: presença no dia a dia e pós-venda próximo.
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Time técnico, veterinário e de loja trabalhando junto para resolver rápido — com cuidado,
            transparência e zero burocracia.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {differentials.map((item) => (
            <article
              key={item.title}
              className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-br from-card/90 via-card/80 to-muted/70 p-5 shadow-card transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-dune"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-sand-400/10" />
              </div>
              <div className="relative flex items-center gap-3">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-foreground text-background shadow-card">
                  <item.icon size={20} aria-hidden />
                </div>
                <span className="inline-flex items-center rounded-full bg-foreground/5 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-muted-foreground ring-1 ring-border/70">
                  {item.tag}
                </span>
              </div>
              <div className="relative space-y-2">
                <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
