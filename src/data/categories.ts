export type CategorySlug = 'pet' | 'piscina' | 'jardim' | 'agro' | 'vet';

export type CategoryDefinition = {
  slug: CategorySlug;
  name: string;
  description: string;
  accent: string;
  cardImage?: string;
  eyebrow: string;
  heroTitle: string;
  heroDescription: string;
  highlights: string[];
  whatsappMessage: string;
  displayOnHome?: boolean;
  hasProductListing?: boolean;
};

const categoryDefinitions: CategoryDefinition[] = [
  {
    slug: 'pet',
    name: 'Pet',
    description:
      'Rações, acessórios inteligentes, nutrição clínica e experiências pet friendly.',
    accent: 'from-brand-200/70 to-brand-400/70',
    // cardImage removed: using animated placeholder instead
    eyebrow: 'Linha Pet',
    heroTitle: 'Seleção Pet premium',
    heroDescription:
      'Nutrição completa, tecnologia wearable para pets e curadoria de acessórios com orientação veterinária diária.',
    highlights: [
      'Rações super premium com rastreabilidade de lote',
      'Clínica vet integrada com raio-X e exames rápidos',
      'Acessórios inteligentes para monitorar atividade e bem-estar',
    ],
    whatsappMessage:
      'Olá, equipe Agro Mané! Preciso de ajuda com produtos da linha Pet.',
    displayOnHome: true,
    hasProductListing: true,
  },
  {
    slug: 'piscina',
    name: 'Piscina',
    description:
      'Tratamento completo de água, automação de casa de máquinas e itens de bem-estar.',
    accent: 'from-sand-200/70 to-sand-400/60',
    // cardImage removed: using animated placeholder instead
    eyebrow: 'Linha Piscina',
    heroTitle: 'Piscinas perfeitas o ano inteiro',
    heroDescription:
      'Linha técnica de químicos, acessórios premium e consultoria para projetos residenciais e clubes.',
    highlights: [
      'Laboratório com análise digital em 15 minutos',
      'Catálogo de cascatas, spas e iluminação LED',
      'Planos de manutenção com time próprio Agro Mané',
    ],
    whatsappMessage:
      'Oi Agro Mané! Quero um especialista de piscina para me ajudar.',
    displayOnHome: true,
    hasProductListing: true,
  },
  {
    slug: 'jardim',
    name: 'Jardim',
    description:
      'Paisagismo funcional, irrigação inteligente e insumos para hortas urbanas.',
    accent: 'from-moss-200/70 to-moss-400/70',
    // cardImage removed: using animated placeholder instead
    eyebrow: 'Linha Jardim',
    heroTitle: 'Paisagismo vivo e funcional',
    heroDescription:
      'Ferramentas, adubos orgânicos e kits completos para jardins e hortas, com consultoria para irrigação automatizada.',
    highlights: [
      'Projetos modulares de irrigação gota a gota',
      'Linha premium de adubos orgânicos certificados',
      'Ferramentas profissionais com ergonomia avançada',
    ],
    whatsappMessage:
      'Olá Agro Mané, preciso de ajuda com soluções para jardim/paisagismo.',
    displayOnHome: true,
    hasProductListing: true,
  },
  {
      // cardImage removed: using animated placeholder instead (Agro will keep text-only per prior request)
    slug: 'agro',
    name: 'Agro',
    description:
      'Insumos agrícolas, sementes de alta produtividade e nutrição animal.',
    accent: 'from-clay-200/70 to-clay-400/70',
    eyebrow: 'Linha Agro',
    heroTitle: 'Campo produtivo e sustentável',
    heroDescription:
      'Portfólio para pequenas e médias propriedades, com foco em eficiência hídrica e manejo responsável.',
    highlights: [
      'Sementes híbridas com suporte técnico',
      'Nutrição animal com minerais quelatados',
      'Sensores IoT para monitoramento climático e de solo',
    ],
    whatsappMessage:
      'Olá Agro Mané! Quero falar sobre insumos e soluções Agro.',
    displayOnHome: true,
    hasProductListing: true,
  },
  {
    slug: 'vet',
    name: 'Vet',
    description:
      'Serviços clínicos, exames rápidos e linha hospitalar para pets.',
    accent: 'from-brand-200/70 to-moss-300/60',
    // cardImage removed: using animated placeholder instead
    eyebrow: 'Clínica Veterinária',
    heroTitle: 'Orientação veterinária todos os dias',
    heroDescription:
      'Equipe multidisciplinar com consultas, vacinas e cirurgias eletivas sob agendamento.',
    highlights: [
      'Agenda integrada às lojas com pós-consulta por WhatsApp',
      'Laboratório próprio para exames em até 2 horas',
      'Parcerias com especialistas externos para casos complexos',
    ],
    whatsappMessage:
      'Oi Agro Mané! Preciso agendar atendimento veterinário.',
    displayOnHome: true,
    hasProductListing: false,
  },
];

export const productCategorySlugs = categoryDefinitions
  .filter((category) => category.hasProductListing)
  .map((category) => category.slug) as ['pet', 'piscina', 'jardim', 'agro'];

export type ProductCategory = (typeof productCategorySlugs)[number];

export function getAllCategories() {
  return categoryDefinitions;
}

export function getHomeCategories(slugs?: string[]) {
  if (!slugs || slugs.length === 0) {
    return categoryDefinitions.filter((category) => category.displayOnHome);
  }

  const normalized = slugs
    .map((label) => slugifyCategory(label))
    .filter((slug): slug is CategorySlug => Boolean(slug));

  const mapped = normalized
    .map((slug) => categoryDefinitions.find((category) => category.slug === slug))
    .filter((category): category is CategoryDefinition => Boolean(category));

  if (mapped.length > 0) {
    return mapped;
  }

  return categoryDefinitions.filter((category) => category.displayOnHome);
}

export function getCategoryBySlug(slug: string) {
  return categoryDefinitions.find((category) => category.slug === slug);
}

export function getProductCategories() {
  return categoryDefinitions.filter((category) => category.hasProductListing);
}

export function slugifyCategory(label: string): CategorySlug | undefined {
  const normalized = label
    .normalize('NFD')
    .replace(/[^\p{Letter}\p{Number}]+/gu, '-')
    .replace(/(^-|-$)/g, '')
    .toLowerCase();

  if (categoryDefinitions.some((category) => category.slug === normalized)) {
    return normalized as CategorySlug;
  }

  return undefined;
}
