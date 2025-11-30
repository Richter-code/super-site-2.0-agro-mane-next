import Image from 'next/image';
import { Star } from 'lucide-react';

import { Container } from '@/components/ui/container';

type Testimonial = {
  name: string;
  roleOrCity: string;
  quote: string;
  rating: number;
  avatar?: string;
  segment?: 'Pet' | 'Agro' | 'Vet' | 'Piscina' | 'Jardim';
};

const testimonials: Testimonial[] = [
  {
    name: 'Mariana Lopes',
    roleOrCity: 'Piracicaba • Pet',
    quote: 'Meu cãozinho foi atendido rápido, com carinho e explicação clara da veterinária.',
    rating: 5,
    avatar: '/testimonials/mariana.jpg',
    segment: 'Pet',
  },
  {
    name: 'Carlos Menezes',
    roleOrCity: 'Zona rural • Agro',
    quote:
      'Precisei de insumo na colheita e o time separou tudo no mesmo dia. Logística simples e sem burocracia.',
    rating: 5,
    avatar: '/testimonials/carlos.jpg',
    segment: 'Agro',
  },
  {
    name: 'Ana Paula Ferreira',
    roleOrCity: 'Piracicaba • Piscina',
    quote: 'Orientação certeira para deixar a piscina cristalina. Atendimento paciente no WhatsApp.',
    rating: 5,
    avatar: '/testimonials/ana.jpg',
    segment: 'Piscina',
  },
  {
    name: 'Ricardo Silva',
    roleOrCity: 'Piracicaba • Vet',
    quote:
      'Consulta sem pressa, CRMV ativo e retorno no dia seguinte perguntando do meu gato. Humanizado mesmo.',
    rating: 4,
    avatar: '/testimonials/ricardo.jpg',
    segment: 'Vet',
  },
  {
    name: 'Julia Fernandes',
    roleOrCity: 'Nova Odessa • Jardim',
    quote: 'Comprei mudas e produtos, mas o diferencial foi o passo a passo para cuidar do jardim.',
    rating: 5,
    avatar: '/testimonials/julia.jpg',
    segment: 'Jardim',
  },
  {
    name: 'Pedro Costa',
    roleOrCity: 'Piracicaba • Agro',
    quote:
      'Equipe entende o dia a dia do produtor. Separaram um mix sob medida e ficaram disponíveis no pós-venda.',
    rating: 5,
    avatar: '/testimonials/pedro.jpg',
    segment: 'Agro',
  },
];

export function TestimonialsGrid() {
  return (
    <section className="py-14">
      <Container className="relative space-y-8 rounded-[2rem] border border-border/70 bg-card/90 p-8 shadow-dune ring-1 ring-border/70 backdrop-blur">
        <div aria-hidden className="leaf-shape leaf-sway -left-10 top-4 scale-75 opacity-30" />
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
            Depoimentos reais
          </p>
          <h2 className="text-3xl font-semibold text-foreground">
            Quem já foi atendido pela Agro Mané
          </h2>
          <p className="text-sm text-muted-foreground">
            Feedbacks de clientes no campo, na clínica e nas lojas — atendimento humano e próximo.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-br from-card/90 via-card/80 to-muted/70 p-5 shadow-card transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-dune"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-sand-400/10" />
              </div>
              <div className="relative flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-full bg-foreground/5 ring-1 ring-border/70">
                  {item.avatar ? (
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-muted-foreground">
                      {item.name.slice(0, 1)}
                    </div>
                  )}
                </div>
                <div className="space-y-1">
                  <p className="text-base font-semibold text-foreground">{item.name}</p>
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                    {item.roleOrCity}
                  </p>
                </div>
                {item.segment ? (
                  <span className="ml-auto inline-flex items-center rounded-full bg-foreground/5 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-muted-foreground ring-1 ring-border/70">
                    {item.segment}
                  </span>
                ) : null}
              </div>
              <p className="relative text-sm leading-relaxed text-muted-foreground">
                “{item.quote}”
              </p>
              <div
                className="relative flex items-center gap-2 text-primary"
                aria-label={`${item.rating} de 5 estrelas`}
              >
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    size={16}
                    className={idx < item.rating ? 'fill-current' : 'opacity-30'}
                  />
                ))}
                <span className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                  Nota {item.rating}/5
                </span>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
