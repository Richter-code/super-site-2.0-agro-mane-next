import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';

type BrandContent = {
  nome: string;
  instagram?: string;
  descricao_curta?: string;
  endereco?: string;
  cidade?: string;
  horario_funcionamento?: string;
  telefone?: string;
  whatsapp?: string;
  email?: string;
  site_url?: string;
  links_uteis?: Array<{ rotulo: string; url: string }>;
  faq?: Array<{ pergunta: string; resposta: string }>;
};

type PartialBrand = Partial<BrandContent>;

type SourceConfig = {
  name: string;
  url: string;
  parser: (html: string) => PartialBrand;
};

const SOURCE_TIMEOUT_MS = 8000;
const BRAND_JSON_PATH = path.resolve(
  process.cwd(),
  'content/brand/agro-mane.json',
);

const sources: SourceConfig[] = [
  {
    name: 'instagram',
    url: 'https://www.instagram.com/agropecuariadomane/',
    parser: parseInstagram,
  },
  {
    name: 'google',
    url: 'https://www.google.com/search?q=Agropecu%C3%A1ria+do+Man%C3%A9+Piracicaba',
    parser: parseGenericBusinessListing,
  },
  {
    name: 'facebook',
    url: 'https://www.facebook.com/search/top?q=Agropecu%C3%A1ria+do+Man%C3%A9+Piracicaba',
    parser: parseGenericBusinessListing,
  },
];

async function fetchWithTimeout(url: string): Promise<string | undefined> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), SOURCE_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; fill-brand-script/1.0)',
      },
    });

    if (!response.ok) {
      console.warn(`[fill-brand] ${url} -> HTTP ${response.status}`);
      return undefined;
    }

    return await response.text();
  } catch (error) {
    console.warn(
      `[fill-brand] erro ao acessar ${url}:`,
      (error as Error).message,
    );
    return undefined;
  } finally {
    clearTimeout(timeout);
  }
}

function parseInstagram(html: string): PartialBrand {
  const description = matchMeta(html, 'property', 'og:description');
  const siteUrl = matchMeta(html, 'property', 'og:url');
  const whatsapp = extractWhatsApp(html);
  const telefone = extractPhone(html);

  const sanitizedDescription = description?.split('\n').at(0)?.trim();

  return {
    descricao_curta: sanitizedDescription,
    site_url: siteUrl,
    telefone,
    whatsapp,
  };
}

function parseGenericBusinessListing(html: string): PartialBrand {
  const endereco = extractAddress(html);
  const telefone = extractPhone(html);
  const whatsapp = extractWhatsApp(html);
  const email = extractEmail(html);
  const horario = extractHours(html);
  const siteUrl = extractWebsite(html);

  return {
    endereco,
    telefone,
    whatsapp,
    email,
    horario_funcionamento: horario,
    site_url: siteUrl,
  };
}

function matchMeta(
  html: string,
  attr: 'name' | 'property',
  value: string,
): string | undefined {
  const regex = new RegExp(
    `<meta[^>]+${attr}=["']${value}["'][^>]+content=["']([^"']+)["']`,
    'i',
  );
  const match = html.match(regex);
  return match?.[1];
}

function extractPhone(html: string): string | undefined {
  const match = html.match(/\(\d{2}\)\s?\d{4,5}-\d{4}/);
  return match?.[0];
}

function extractWhatsApp(html: string): string | undefined {
  const match = html.match(/https?:\/\/wa\.me\/(\d{10,13})/i);
  if (!match) return undefined;
  return `https://wa.me/${match[1]}`;
}

function extractEmail(html: string): string | undefined {
  const match = html.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  return match?.[0];
}

function extractWebsite(html: string): string | undefined {
  const match = html.match(/https?:\/\/[\w.-]+agropecuariadomane\.[\w./-]+/i);
  return match?.[0];
}

function extractAddress(html: string): string | undefined {
  const match = html.match(/Rua\s+S[a\u00E3]o\s+Jos[e\u00E9][^<]{0,80}/i);
  return match?.[0]?.replace(/\s+/g, ' ').trim();
}

function extractHours(html: string): string | undefined {
  const match = html.match(/Seg[^<]{0,40}\d{1,2}h[^<]{0,10}\d{1,2}h/i);
  return match?.[0]?.replace(/\s+/g, ' ').trim();
}

function mergeLinks(
  existing: BrandContent['links_uteis'],
  instagram?: string,
  whatsapp?: string,
) {
  const links = existing ? [...existing] : [];

  if (
    instagram &&
    !links.find((link) => link.rotulo.toLowerCase() === 'instagram')
  ) {
    links.push({ rotulo: 'Instagram', url: instagram });
  }

  if (
    whatsapp &&
    !links.find((link) => link.rotulo.toLowerCase() === 'whatsapp')
  ) {
    links.push({ rotulo: 'WhatsApp', url: whatsapp });
  }

  return links;
}

function looksTodo(value?: string): boolean {
  if (!value) return true;
  return value.trim().toLowerCase().startsWith('todo');
}

async function main() {
  const brandRaw = await readFile(BRAND_JSON_PATH, 'utf8');
  const existing: BrandContent = JSON.parse(brandRaw);
  const collected: PartialBrand = {};

  for (const source of sources) {
    console.log(`[fill-brand] buscando ${source.name}...`);
    const html = await fetchWithTimeout(source.url);
    if (!html) continue;

    try {
      const partial = source.parser(html);
      Object.assign(
        collected,
        Object.fromEntries(
          Object.entries(partial).filter(([, value]) => Boolean(value)),
        ),
      );
      // Respeita o limite da propria fonte para evitar bloqueios.
      await delay(200);
    } catch (error) {
      console.warn(
        `[fill-brand] falha ao interpretar ${source.name}:`,
        (error as Error).message,
      );
    }
  }

  if (collected.whatsapp || collected.instagram) {
    existing.links_uteis = mergeLinks(
      existing.links_uteis,
      collected.instagram || existing.instagram,
      collected.whatsapp,
    );
  }

  const updated: BrandContent = { ...existing };
  const changedFields: string[] = [];
  const targetFields: Array<keyof BrandContent> = [
    'descricao_curta',
    'endereco',
    'horario_funcionamento',
    'telefone',
    'whatsapp',
    'email',
    'site_url',
  ];

  targetFields.forEach((field) => {
    const currentValue = existing[field] as string | undefined;
    const newValue = collected[field] as string | undefined;
    if (looksTodo(currentValue) && newValue) {
      updated[field] = newValue as never;
      changedFields.push(field as string);
    }
  });

  if (changedFields.length > 0) {
    await writeFile(
      BRAND_JSON_PATH,
      `${JSON.stringify(updated, null, 2)}\n`,
      'utf8',
    );
    console.log(`[fill-brand] Campos atualizados: ${changedFields.join(', ')}`);
  } else {
    console.log(
      '[fill-brand] Nenhum campo precisava de atualizacao automatica (sem TODOs ou fontes indisponiveis).',
    );
  }
}

main().catch((error) => {
  console.error('[fill-brand] erro inesperado:', error);
  process.exitCode = 1;
});
