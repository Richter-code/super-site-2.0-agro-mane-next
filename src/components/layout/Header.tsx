'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Instagram, Menu, Phone, PhoneCall, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { brand, getInstagramLink, getPhoneLink } from '@/lib/brand';
import { BrandMark } from '@/components/brand/BrandMark';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { buildWhatsappLink } from '@/lib/whatsapp';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Produtos', href: '/produtos' },
  { label: 'Categorias', href: '/#categorias' },
  { label: 'Lojas', href: '/lojas' },
  { label: 'Contato', href: '/#contato' },
];

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const instagramHref = getInstagramLink();
  const phoneHref = getPhoneLink();
  const whatsappHref = buildWhatsappLink({
    message:
      'Olá! Vim do site da Agro Mané e gostaria de falar com um especialista.',
  });
  const instagramTarget = instagramHref ? '_blank' : undefined;
  const whatsappTarget = whatsappHref ? '_blank' : undefined;
  const [streetFragment, rawDistrict] = brand.endereco?.split('-') ?? [];
  const streetLabel = streetFragment?.trim();
  const district = rawDistrict?.split(',')[0]?.trim();
  const locationLabel = district ? `Loja ${district}` : 'Piracicaba • Rede oficial';

  const isActive = (href: string) =>
    href.startsWith('/#') ? false : pathname === href;

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  // Micro interação simples: reforça o contraste do header após um leve scroll.
  // Não adiciona libs e depende apenas do estado local.
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerClasses = cn(
    'sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70 motion-safe:transition-all motion-safe:duration-300',
    isScrolled &&
      'border-border/80 bg-background/90 shadow-lg shadow-black/5 dark:shadow-black/30',
  );

  const navLinkClasses = ({ active }: { active: boolean }) =>
    cn(
      'rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/60 hover:text-foreground',
      active && 'bg-accent/20 text-foreground',
    );

  return (
    <header className={headerClasses}>
      <Container className="flex max-w-6xl items-center justify-between gap-3 py-3 md:py-4">
        <Link
          href="/"
          className="focus-ring inline-flex items-center gap-2 rounded-full bg-card/80 px-4 py-2 text-sm font-semibold text-foreground shadow-card transition-transform duration-200 ease-out hover:scale-[1.01]"
          aria-label={`Voltar ao início da ${brand.nome}`}
        >
          <BrandMark
            priority
            sizes="(max-width: 768px) 40vw, 180px"
            className="w-32"
          />
          <span className="sr-only">{brand.nome}</span>
        </Link>

        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-2 md:flex"
        >
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={navLinkClasses({ active: isActive(item.href) })}
              onClick={handleNavClick}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {streetLabel && (
            <div className="hidden min-w-[12rem] flex-col text-right lg:flex">
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-muted-foreground">
                {locationLabel}
              </span>
              <span className="text-sm text-foreground">{streetLabel}</span>
            </div>
          )}
          <ThemeToggle />
          {brand.telefone && (
            <Button
              variant="outline"
              asChild
              className="focus-ring hidden items-center gap-2 rounded-full border-border/70 text-sm text-foreground transition-colors duration-200 ease-out hover:border-primary hover:text-primary lg:inline-flex"
            >
              <Link href={phoneHref || '#contato'} aria-label="Ligar para a unidade Centro">
                <Phone size={16} aria-hidden /> {brand.telefone}
              </Link>
            </Button>
          )}
          <Button
            variant="ghost"
            asChild
            className="focus-ring gap-2 text-muted-foreground transition-colors duration-200 ease-out hover:text-foreground"
          >
            <Link
              href={instagramHref || '#contato'}
              target={instagramTarget}
              rel={instagramTarget ? 'noreferrer' : undefined}
              aria-disabled={!instagramHref}
            >
              <Instagram size={18} aria-hidden /> Ver Instagram
            </Link>
          </Button>
          <Button
            asChild
            className="focus-ring rounded-full px-5 transition-colors duration-200 ease-out hover:bg-primary/90"
          >
            <Link
              href={whatsappHref || '#contato'}
              target={whatsappTarget}
              rel={whatsappTarget ? 'noreferrer' : undefined}
              className="inline-flex items-center gap-2"
              aria-label="Abrir conversa no WhatsApp"
              aria-disabled={!whatsappHref}
            >
              <PhoneCall size={18} aria-hidden /> Fale com a loja
            </Link>
          </Button>
          <CartDrawer />
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <CartDrawer />
          <Button
            size="icon"
            variant="ghost"
            className="focus-ring transition-colors duration-200 ease-out"
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isMenuOpen}
            aria-controls="menu-principal-mobile"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? (
              <X size={20} aria-hidden />
            ) : (
              <Menu size={20} aria-hidden />
            )}
          </Button>
        </div>
      </Container>

      {isMenuOpen && (
        <div
          id="menu-principal-mobile"
          className="border-t border-border/80 bg-card/95 shadow-lg shadow-black/10 transition-all"
          role="navigation"
          aria-label="Navegação principal móvel"
        >
          <Container className="flex flex-col gap-4 py-6">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="focus-ring rounded-full px-4 py-2 text-base font-medium text-foreground transition-colors duration-200 ease-out hover:bg-accent/20"
                onClick={handleNavClick}
              >
                {item.label}
              </Link>
            ))}
            <Button asChild className="focus-ring w-full rounded-full">
              <Link
                href={whatsappHref || '#contato'}
                target={whatsappTarget}
                rel={whatsappTarget ? 'noreferrer' : undefined}
                className="inline-flex items-center justify-center gap-2"
                aria-label="Abrir conversa no WhatsApp"
                aria-disabled={!whatsappHref}
              >
                <PhoneCall size={18} aria-hidden /> Fale com a loja
              </Link>
            </Button>
            <Button variant="outline" asChild className="focus-ring w-full">
              <Link
                href={instagramHref || '#contato'}
                target={instagramTarget}
                rel={instagramTarget ? 'noreferrer' : undefined}
                className="inline-flex items-center justify-center gap-2"
                aria-disabled={!instagramHref}
              >
                <Instagram size={18} aria-hidden /> Ver no Instagram
              </Link>
            </Button>
            {brand.telefone && (
              <Button variant="secondary" asChild className="focus-ring w-full">
                <Link
                  href={phoneHref || '#contato'}
                  className="inline-flex items-center justify-center gap-2"
                  aria-label="Ligar para a unidade Centro"
                  aria-disabled={!phoneHref}
                >
                  <Phone size={18} aria-hidden /> Ligar para a loja
                </Link>
              </Button>
            )}
            <div className="pt-2">
              <ThemeToggle className="w-full justify-center" />
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
