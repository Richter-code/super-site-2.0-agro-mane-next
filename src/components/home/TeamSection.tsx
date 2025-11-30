import Image from 'next/image';
import { BadgeCheck, HeartPulse, Sprout, Stethoscope } from 'lucide-react';

import { Container } from '@/components/ui/container';

type TeamMember = {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  credential?: string;
  focus?: string;
  icon?: typeof Sprout;
};

const team: TeamMember[] = [
  {
    name: 'Dra. Luiza Andrade',
    role: 'Médica-veterinária',
    credential: 'CRMV-SP 12345',
    bio: 'Cuida de clínica geral e explica cada passo para tutores novatos. Fala a língua do dia a dia.',
    avatar: '/team/luiza.jpg',
    focus: 'Vet',
    icon: Stethoscope,
  },
  {
    name: 'Dr. Rafael Campos',
    role: 'Veterinário e cirurgião',
    credential: 'CRMV-SP 22341',
    bio: 'Protocolos claros, segurança em cirurgias e retorno próximo no pós-atendimento.',
    avatar: '/team/rafael.jpg',
    focus: 'Vet',
    icon: HeartPulse,
  },
  {
    name: 'Marina Silva',
    role: 'Especialista em agro',
    bio: 'Ajuda produtores a montar o mix sem desperdício. Separação rápida e suporte no campo.',
    avatar: '/team/marina.jpg',
    focus: 'Agro',
    icon: Sprout,
  },
  {
    name: 'Felipe Duarte',
    role: 'Especialista em piscina e jardim',
    bio: 'Passo a passo simples para água cristalina e verde saudável, mesmo com rotina corrida.',
    avatar: '/team/felipe.jpg',
    focus: 'Piscina & Jardim',
    icon: BadgeCheck,
  },
];

export function TeamSection() {
  return (
    <section className="relative overflow-hidden py-14">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_12%_15%,rgba(124,92,60,0.08),transparent_35%),radial-gradient(circle_at_88%_12%,rgba(92,107,60,0.1),transparent_35%)]"
      />
      <div aria-hidden className="leaf-shape leaf-sway -right-10 top-8 scale-90 opacity-35" />
      <Container className="relative space-y-8 rounded-[2rem] border border-border/70 bg-card/90 p-8 shadow-dune ring-1 ring-border/70 backdrop-blur">
        <div className="space-y-3 sm:max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
            Equipe
          </p>
          <h2 className="text-3xl font-semibold text-foreground sm:text-[2rem]">
            Veterinários e especialistas que ficam ao seu lado.
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Gente acessível, CRMV ativo e experiência de campo — para resolver com cuidado e linguagem
            simples, seja no agro, na clínica, na piscina ou no jardim.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <article
              key={member.name}
              className="group relative flex h-full flex-col gap-3 overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-br from-card/90 via-card/80 to-muted/70 p-5 shadow-card transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-dune"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-sand-400/10" />
              </div>
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-full bg-foreground/5 ring-1 ring-border/70">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-base font-semibold text-foreground">{member.name}</p>
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                    {member.role}
                  </p>
                </div>
                {member.focus ? (
                  <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-foreground/5 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-muted-foreground ring-1 ring-border/70">
                    {member.icon ? <member.icon size={14} aria-hidden /> : null}
                    {member.focus}
                  </span>
                ) : null}
              </div>
              {member.credential ? (
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-muted-foreground">
                  {member.credential}
                </p>
              ) : null}
              <p className="text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
