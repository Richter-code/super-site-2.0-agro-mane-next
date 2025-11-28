import { brand, getWhatsAppLink } from '@/lib/brand';

export type BuildWhatsappLinkOptions = {
  phone?: string;
  message?: string;
  fallbackUrl?: string;
};

export function buildWhatsappLink(
  options: BuildWhatsappLinkOptions = {},
): string {
  const { phone, message, fallbackUrl } = options;
  const directLink = getWhatsAppLink();
  const digits = extractDigits(phone) || extractDigits(brand.whatsapp);

  const base = digits
    ? `https://wa.me/${digits}`
    : directLink || fallbackUrl || '';

  if (!base) return '';

  const text = message?.trim();
  if (!text) {
    return base;
  }

  const separator = base.includes('?') ? '&' : '?';
  return `${base}${separator}text=${encodeURIComponent(text)}`;
}

function extractDigits(value?: string) {
  if (!value) return '';
  if (value.startsWith('http')) {
    const digits = value.replace(/[^0-9]/g, '');
    return digits;
  }
  return value.replace(/\D/g, '');
}
