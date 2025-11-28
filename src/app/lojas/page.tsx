import type { Metadata } from 'next';
import Link from 'next/link';
import { Building2, Clock, MapPin, MessageCircle, Phone } from 'lucide-react';

import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { brand } from '@/lib/brand';
import { getStores } from '@/data/stores';
import { buildWhatsappLink } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: `Nossas lojas | ${brand.nome}`,
  description:
    'Conheça as unidades Agro Mané em Piracicaba: endereços, serviços e canais de atendimento especializados.',
  alternates: {
    canonical: '/lojas',
  },
};

export default function StoresPage() {
  const stores = getStores();

  return (
    <main className="bg-brand-hero">
      <section className="py-12">
        <Container className="rounded-3xl bg-card/90 p-10 shadow-dune ring-1 ring-border/60">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-muted-foreground">
            Rede Agro Mané
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-foreground">
            Encontre a unidade ideal
          </h1>
          <p className="mt-4 max-w-3xl text-base text-muted-foreground">
            Cada loja possui mix e serviços específicos para Pet, Piscina, Jardim e Agro. Veja horários, contatos e diferenciais antes de visitar.
          </p>
        </Container>
      </section>

      <section className="pb-12">
        <Container className="space-y-8">
          {stores.map((store) => {
            const whatsappHref = buildWhatsappLink({
              phone: store.whatsapp,
              message:
                store.whatsappMessage ??
                `Olá! Gostaria de falar com a unidade ${store.shortName}.`,
            });
            const whatsappTarget = whatsappHref ? '_blank' : undefined;

            return (
            <Card key={store.id} className="overflow-hidden border-border/80">
              <div className="grid gap-0 lg:grid-cols-[1fr_1.2fr]">
                <figure className="relative flex min-h-[240px] items-center justify-center bg-gradient-to-br from-brand-100 via-card to-sand-100">
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-3xl bg-foreground text-background shadow-card">
                    <div className="absolute -top-1 -left-1 h-2 w-2 rounded-sm bg-brand-400" aria-hidden />
                    <div className="absolute -bottom-1 -right-1 h-2 w-2 rounded-sm bg-sand-400" aria-hidden />
                    <Building2 className="h-8 w-8" aria-hidden />
                  </div>
                  {store.highlight && (
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-foreground">
                      Destaque
                    </span>
                  )}
                </figure>
                <CardContent className="flex flex-col gap-6 p-6">
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
                      {store.shortName}
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-2xl font-semibold text-foreground">
                        {store.name}
                      </h2>
                      <span className="rounded-full border border-brand-200 px-3 py-1 text-xs font-medium text-brand-700">
                        {store.tagline}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{store.description}</p>
                  </div>

                  <StoreInfoRow
                    icon={MapPin}
                    label={store.address.street}
                    value={`${store.address.city}/${store.address.state}`}
                  />
                  <StoreInfoRow
                    icon={Phone}
                    label={store.phone}
                    value={store.email}
                  />
                  <StoreBusinessHours hours={store.businessHours} />

                  <div className="flex flex-wrap gap-2">
                    {store.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-muted-foreground"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button asChild size="lg" className="focus-ring rounded-full">
                      <Link href={`/lojas/${store.slug}`}>Ver detalhes</Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="focus-ring inline-flex items-center gap-2"
                      asChild
                    >
                      <Link
                        href={whatsappHref || '#contato'}
                        target={whatsappTarget}
                        rel={whatsappTarget ? 'noreferrer' : undefined}
                        aria-disabled={!whatsappHref}
                      >
                        <MessageCircle size={16} aria-hidden /> Atendimento WhatsApp
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </div>
              </Card>
            );
          })}
        </Container>
      </section>
    </main>
  );
}

type StoreInfoRowProps = {
  icon: typeof MapPin;
  label: string;
  value?: string;
};

function StoreInfoRow({ icon: Icon, label, value }: StoreInfoRowProps) {
  return (
    <div className="flex items-center gap-3 text-sm text-muted-foreground">
      <Icon size={16} aria-hidden />
      <span className="font-medium text-foreground">{label}</span>
      {value && <span>• {value}</span>}
    </div>
  );
}

type StoreBusinessHoursProps = {
  hours: Array<{ label: string; value: string }>;
};

function StoreBusinessHours({ hours }: StoreBusinessHoursProps) {
  return (
    <div className="space-y-1 rounded-2xl border border-border bg-muted/30 p-4 text-sm">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Clock size={16} aria-hidden />
        <span className="font-semibold uppercase tracking-[0.3em]">
          Horários
        </span>
      </div>
      <dl className="grid gap-1 text-sm">
        {hours.map((entry) => (
          <div key={entry.label} className="flex justify-between gap-4">
            <dt className="text-muted-foreground">{entry.label}</dt>
            <dd className="font-medium text-foreground">{entry.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
