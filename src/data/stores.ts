export type StoreSlug = 'centro' | 'cidade-alta' | 'vila-rezende';

export type StoreServiceId =
  | 'pet'
  | 'piscina'
  | 'jardim'
  | 'agro'
  | 'vet'
  | 'banho-tosa';

export type StoreSchedule = {
  label: string;
  value: string;
};

export type StoreService = {
  id: StoreServiceId;
  label: string;
  description: string;
  segments: StoreServiceId[];
};

export type StoreAddress = {
  street: string;
  district: string;
  city: string;
  state: string;
  zip?: string;
  reference?: string;
  mapsUrl?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
};

export type Store = {
  id: string;
  slug: StoreSlug;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  highlight?: boolean;
  address: StoreAddress;
  phone: string;
  whatsapp?: string;
  email?: string;
  businessHours: StoreSchedule[];
  services: StoreService[];
  amenities: string[];
  highlights: string[];
  heroImage: string;
  gallery: string[];
  whatsappMessage?: string;
};

export const stores: Store[] = [
  {
    id: 'store-centro',
    slug: 'centro',
    name: 'Agro Mané Centro',
    shortName: 'Centro',
    tagline: 'Flagship com mix completo e clínica vet diária',
    description:
      'Unidade referência em Piracicaba: estoque completo de rações premium, linha clínica veterinária diária e consultoria para piscinas e jardins residenciais.',
    highlight: true,
    address: {
      street: 'Rua São José, 1121 - Cidade Alta',
      district: 'Centro',
      city: 'Piracicaba',
      state: 'SP',
      zip: '13419-250',
      reference: 'Esquina com a Rua Governador Pedro de Toledo',
      mapsUrl: 'https://maps.app.goo.gl/cdz4kD69Bv1L3jzn8',
      coordinates: {
        lat: -22.725543,
        lng: -47.647132,
      },
    },
    phone: '(19) 3437-7777',
    whatsapp: '+55 19 99778-0777',
    email: 'centro@agromane.com.br',
    businessHours: [
      { label: 'Seg a Sex', value: '08h às 19h' },
      { label: 'Sábados', value: '08h às 17h' },
      { label: 'Domingos', value: '09h às 13h (plantão vet)' },
    ],
    services: [
      {
        id: 'pet',
        label: 'Pet Completo',
        description:
          'Rações, acessórios inteligentes, farmacêuticos e consultores de rações especiais.',
        segments: ['pet', 'vet'],
      },
      {
        id: 'banho-tosa',
        label: 'Banho & Tosa Boutique',
        description:
          'Equipe especializada em raças de pelagem longa com agendamento pelo WhatsApp.',
        segments: ['pet'],
      },
      {
        id: 'piscina',
        label: 'Piscinas & Wellness',
        description:
          'Linha completa de tratamento, cascatas em inox e automação de casa de máquinas.',
        segments: ['piscina'],
      },
      {
        id: 'jardim',
        label: 'Jardim e Paisagismo',
        description:
          'Ferramentas profissionais, irrigação inteligente e mudas selecionadas.',
        segments: ['jardim'],
      },
    ],
    amenities: [
      'Estacionamento conveniado',
      'Pet friendly',
      'Retirada express em 2h',
      'Consultoria veterinária diária',
    ],
    highlights: [
      'Maior mix da rede com 3.200 itens ativos',
      'Atendimento veterinário com raio-X e exames rápidos',
      'Equipe especializada em projetos de piscina e jardim residencial',
    ],
    heroImage:
      '/brand/logo-mane.webp',
    gallery: [
      '/brand/logo-mane.webp',
      '/brand/logo-mane.webp',
      '/brand/logo-mane.webp',
    ],
    whatsappMessage:
      'Olá! Gostaria de falar com a equipe da loja Centro da Agro Mané.',
  },
  {
    id: 'store-cidade-alta',
    slug: 'cidade-alta',
    name: 'Agro Mané Cidade Alta',
    shortName: 'Cidade Alta',
    tagline: 'Especializada em piscina e projetos de jardim',
    description:
      'Unidade focada em piscinas, automação residencial e linhas premium para jardinagem urbana, com showroom aberto para especificadores.',
    address: {
      street: 'Avenida Independência, 2801 - Cidade Alta',
      district: 'Cidade Alta',
      city: 'Piracicaba',
      state: 'SP',
      zip: '13416-230',
      reference: 'Ao lado do Carrefour Bairro',
      mapsUrl: 'https://maps.app.goo.gl/FDqAt1qHqHcLUvQk9',
      coordinates: {
        lat: -22.716392,
        lng: -47.643001,
      },
    },
    phone: '(19) 3434-7070',
    whatsapp: '+55 19 99644-0707',
    email: 'cidadealta@agromane.com.br',
    businessHours: [
      { label: 'Seg a Sex', value: '09h às 19h' },
      { label: 'Sábados', value: '09h às 16h' },
    ],
    services: [
      {
        id: 'piscina',
        label: 'Pool Lab',
        description:
          'Análises de água, contratos de manutenção e reposição express de químicos.',
        segments: ['piscina'],
      },
      {
        id: 'jardim',
        label: 'Paisagismo Inteligente',
        description:
          'Projetos modulares de irrigação e linha completa de adubos orgânicos.',
        segments: ['jardim'],
      },
      {
        id: 'agro',
        label: 'Agro Boutique',
        description:
          'Sementes especiais, nutrição animal e consultoria de manejo sustentável.',
        segments: ['agro'],
      },
    ],
    amenities: [
      'Showroom com decks e cascatas',
      'Coworking para arquitetos/parceiros',
      'Estacionamento frontal',
    ],
    highlights: [
      'Análise de água em 15 minutos com relatório digital',
      'Curadoria de irrigação por gotejamento e sensores IoT',
      'Equipe certificada CBP para piscinas residenciais',
    ],
    heroImage:
      '/brand/logo-mane.webp',
    gallery: [
      '/brand/logo-mane.webp',
      '/brand/logo-mane.webp',
      '/brand/logo-mane.webp',
    ],
    whatsappMessage:
      'Oi, equipe da unidade Cidade Alta! Quero falar sobre projetos de piscina/jardim.',
  },
  {
    id: 'store-vila-rezende',
    slug: 'vila-rezende',
    name: 'Agro Mané Vila Rezende',
    shortName: 'Vila Rezende',
    tagline: 'Loja de bairro com foco em pet express',
    description:
      'Ideal para compras rápidas: linha pet essencial, farmácia básica, kits de manutenção de piscina e mini garden com mudas da estação.',
    address: {
      street: 'Rua do Rosário, 335 - Vila Rezende',
      district: 'Vila Rezende',
      city: 'Piracicaba',
      state: 'SP',
      zip: '13405-045',
      reference: 'Em frente à Praça Takaki',
      mapsUrl: 'https://maps.app.goo.gl/X3Q4aV2jX1TfGVzv6',
      coordinates: {
        lat: -22.70551,
        lng: -47.65742,
      },
    },
    phone: '(19) 3422-5050',
    whatsapp: '+55 19 99888-5050',
    email: 'vilarezende@agromane.com.br',
    businessHours: [
      { label: 'Seg a Sex', value: '08h30 às 18h30' },
      { label: 'Sábados', value: '08h30 às 14h' },
    ],
    services: [
      {
        id: 'pet',
        label: 'Pet Express',
        description:
          'Curadoria de rações campeãs de venda e kits rápidos para passeio.',
        segments: ['pet'],
      },
      {
        id: 'banho-tosa',
        label: 'Banho & Tosa Fast',
        description: 'Agenda compacta com retorno em até 2 horas para pets de pequeno porte.',
        segments: ['pet'],
      },
      {
        id: 'piscina',
        label: 'Piscina Essencial',
        description:
          'Cloro estabilizado, elevadores de pH e acessórios de sucção portáteis.',
        segments: ['piscina'],
      },
    ],
    amenities: [
      'Drive-thru para pedidos on-line',
      'Locker 24h integrado ao WhatsApp',
      'Entrega por bike elétrica em bairros próximos',
    ],
    highlights: [
      'Abastecimento diário da central para evitar rupturas',
      'Equipe treinada para montar kits personalizados pelo WhatsApp',
      'Parceria com clínicas vet do bairro para encaminhamento imediato',
    ],
    heroImage:
      '/brand/logo-mane.webp',
    gallery: [
      '/brand/logo-mane.webp',
      '/brand/logo-mane.webp',
      '/brand/logo-mane.webp',
    ],
    whatsappMessage:
      'Olá, equipe Vila Rezende! Preciso separar um pedido rápido na loja.',
  },
];

export function getStores() {
  return stores;
}

export function getStoreBySlug(slug: string) {
  return stores.find((store) => store.slug === slug);
}

export function getFeaturedStores() {
  return stores.filter((store) => store.highlight);
}

export function getStoreSlugs() {
  return stores.map((store) => store.slug);
}
