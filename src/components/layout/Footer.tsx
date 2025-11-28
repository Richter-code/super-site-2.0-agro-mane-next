import Link from 'next/link';
import { Clock, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import {
  brand,
  getEmailLink,
  getInstagramLink,
  getPhoneLink,
  getWhatsAppLink,
} from '@/lib/brand';
import { BrandMark } from '@/components/brand/BrandMark';

const socialLinks = [
  { label: 'Instagram', href: getInstagramLink(), icon: Instagram },
  { label: 'WhatsApp', href: getWhatsAppLink(), icon: Phone },
].filter((link) => Boolean(link.href));

export function Footer() {
  const whatsappHref = getWhatsAppLink();
  const whatsappLink = whatsappHref || '#contato';
  const whatsappTarget = whatsappHref ? '_blank' : undefined;
  const instagramLink = getInstagramLink();
  const instagramTarget = instagramLink ? '_blank' : undefined;
  const phoneLink = getPhoneLink();
  const emailLink = getEmailLink();
  const instagramHandle = brand.instagram
    ? `@${brand.instagram
        .replace(/https?:\/\/(www\.)?instagram\.com\//, '')
        .replace(/\/$/, '')
        .replace('@', '')}`
    : '@agropecuariadomane';
  return (
    <footer
      id="contato"
      className="mt-16 border-t border-border/60 bg-gradient-to-b from-moss-900 via-moss-900 to-black text-sand-50 dark:from-[#0f1a14] dark:via-[#0d1511] dark:to-[#090f0c]"
    >
      <Container className="grid gap-10 py-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <BrandMark className="w-40" sizes="(max-width: 768px) 60vw, 200px" />
          <h2 className="text-3xl font-semibold">
            Casa oficial para Pet, Piscina, Jardim e Agro
          </h2>
          <p className="text-sand-100/90">{brand.descricao_curta}</p>
          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              className="rounded-full bg-white text-moss-900 hover:bg-sand-100 dark:bg-secondary dark:text-secondary-foreground dark:hover:bg-secondary/80"
            >
              <Link
                href={whatsappLink}
                target={whatsappTarget}
                rel={whatsappTarget ? 'noreferrer' : undefined}
                aria-disabled={!whatsappHref}
              >
                Fale no WhatsApp
              </Link>
            </Button>
            <Button
              variant="outline"
              asChild
              className="rounded-full border-white/40 text-sand-50 hover:bg-white/10 dark:border-border dark:text-foreground dark:hover:bg-muted/40"
            >
              <Link
                href={instagramLink || '#contato'}
                target={instagramTarget}
                rel={instagramTarget ? 'noreferrer' : undefined}
                aria-disabled={!instagramLink}
              >
                Ver no Instagram
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-6 text-sm md:grid-cols-2">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sand-300">
              Visite a loja
            </p>
            <div className="space-y-2 text-sand-100/90">
              {brand.endereco || brand.cidade ? (
                <p className="inline-flex items-start gap-2">
                  <MapPin size={16} className="mt-1" aria-hidden />
                  <span>
                    {brand.endereco || 'Endereço a confirmar'}
                    <br />
                    {brand.cidade}
                  </span>
                </p>
              ) : (
                <p className="text-sand-200/80">
                  Endereço: preencha em content/brand/agro-mane.json
                </p>
              )}

              <p className="inline-flex items-center gap-2">
                <Phone size={16} aria-hidden />
                {phoneLink ? (
                  <a href={phoneLink} className="hover:text-white">
                    {brand.telefone}
                  </a>
                ) : (
                  <span className="text-sand-200/80">
                    Telefone: preencher em content/brand/agro-mane.json
                  </span>
                )}
              </p>
              <p className="inline-flex items-center gap-2">
                <Mail size={16} aria-hidden />
                {emailLink ? (
                  <a href={emailLink} className="hover:text-white">
                    {brand.email}
                  </a>
                ) : (
                  <span className="text-sand-200/80">
                    E-mail: preencher em content/brand/agro-mane.json
                  </span>
                )}
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sand-300">
              Horários
            </p>
            <p className="inline-flex items-center gap-2 text-sand-100/90">
              <Clock size={16} aria-hidden />
              {brand.horario_funcionamento ||
                'Preencha os horários em content/brand/agro-mane.json'}
            </p>
            <div className="space-y-2 pt-2">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sand-100/80 hover:text-white"
                >
                  <social.icon size={18} aria-hidden /> {social.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 text-xs text-sand-100/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {brand.nome}. Todos os direitos
            reservados.
          </p>
          <p>Instagram {instagramHandle} • Atendimento humanizado.</p>
        </Container>
      </div>
    </footer>
  );
}
