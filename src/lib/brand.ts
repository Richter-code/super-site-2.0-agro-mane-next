import brandContentJson from '@content/brand/agro-mane.json' assert { type: 'json' };

export type BrandLink = {
  rotulo: string;
  url: string;
};

export type BrandFaq = {
  pergunta: string;
  resposta: string;
};

export type BrandLogoSources = {
  avif?: string;
  webp?: string;
  png?: string;
};

export type BrandContent = {
  nome: string;
  instagram: string;
  descricao_curta: string;
  endereco: string;
  cidade: string;
  horario_funcionamento: string;
  telefone: string;
  whatsapp: string;
  email: string;
  links_uteis: BrandLink[];
  categorias: string[];
  beneficios: string[];
  faq: BrandFaq[];
  site_url?: string;
  logo_sources?: BrandLogoSources;
  og_image?: string;
};

const brandContent = brandContentJson as BrandContent;

const sanitizeValue = (value?: string) => {
  if (!value) return '';
  const trimmed = value.trim();
  return trimmed.toLowerCase().startsWith('todo') ? '' : trimmed;
};

const findLink = (label: string) =>
  brandContent.links_uteis.find(
    (link: BrandLink) => link.rotulo.toLowerCase() === label.toLowerCase(),
  );

export const brand: BrandContent = {
  ...brandContent,
  endereco: sanitizeValue(brandContent.endereco),
  horario_funcionamento: sanitizeValue(brandContent.horario_funcionamento),
  telefone: sanitizeValue(brandContent.telefone),
  whatsapp: sanitizeValue(brandContent.whatsapp),
  email: sanitizeValue(brandContent.email),
};

export const siteUrl =
  brand.site_url ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://agropecuariadomane.com.br';

const defaultLogoSources: Required<BrandLogoSources> = {
  avif: '/brand/logo-mane.avif',
  webp: '/brand/logo-mane.webp',
  png: '/brand/logo-mane.png',
};

export const logoSources: Required<BrandLogoSources> = {
  avif: brand.logo_sources?.avif || defaultLogoSources.avif,
  webp: brand.logo_sources?.webp || defaultLogoSources.webp,
  png: brand.logo_sources?.png || defaultLogoSources.png,
};

export const primaryLogo =
  logoSources.avif || logoSources.webp || logoSources.png;

export const ogImage = brand.og_image || logoSources.webp || logoSources.png;

const socialImageCandidates = [
  brand.og_image,
  logoSources.avif,
  logoSources.webp,
  logoSources.png,
];

export const socialImageVariants = Array.from(
  new Set(
    socialImageCandidates.filter((image): image is string => Boolean(image)),
  ),
);

export function getInstagramLink() {
  if (brand.instagram) return brand.instagram;
  return findLink('Instagram')?.url ?? '';
}

export function getWhatsAppLink() {
  const link = findLink('WhatsApp')?.url ?? '';
  const normalizedLink = sanitizeValue(link);

  if (normalizedLink.startsWith('http')) {
    return normalizedLink;
  }

  const phone = sanitizeValue(brand.whatsapp);
  const digits = phone.replace(/\D/g, '');
  if (digits) {
    return `https://wa.me/${digits}`;
  }

  return '';
}

export function getPhoneLink() {
  const digits = sanitizeValue(brand.telefone).replace(/\D/g, '');
  return digits ? `tel:+${digits}` : '';
}

export function getEmailLink() {
  const email = sanitizeValue(brand.email);
  return email ? `mailto:${email}` : '';
}

export function getBrandMissingFields() {
  const missing: string[] = [];
  if (!brand.endereco) missing.push('endereco');
  if (!brand.horario_funcionamento) missing.push('horario_funcionamento');
  if (!brand.telefone) missing.push('telefone');
  if (!brand.whatsapp) missing.push('whatsapp');
  if (!brand.email) missing.push('email');
  if (!findLink('WhatsApp')) missing.push('links_uteis.whatsapp');
  if (
    brand.faq.some(
      (faq) => !sanitizeValue(faq.pergunta) || !sanitizeValue(faq.resposta),
    )
  ) {
    missing.push('faq');
  }
  return missing;
}
