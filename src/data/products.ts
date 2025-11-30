import type { StoreSlug } from '@/data/stores';
import type { ProductCategory } from '@/data/categories';

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: ProductCategory;
  image: string;
  imageAlt?: string;
  rating: number;
  inStock: boolean;
  tags: string[];
  highlight?: boolean;
  releaseDate?: string;
  availableAt?: StoreSlug[];
};

const productImagesByCategory: Record<
  ProductCategory,
  { src: string; alt: string }
> = {
  pet: {
    src: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=80&fm=webp',
    alt: 'Produtos pet premium organizados em bancada',
  },
  piscina: {
    src: 'https://images.unsplash.com/photo-1505764706515-aa95265c5abc?auto=format&fit=crop&w=1200&q=80&fm=webp',
    alt: 'Equipamentos e acessórios para piscinas',
  },
  jardim: {
    src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80&fm=webp',
    alt: 'Ferramentas de jardinagem e vasos em um jardim',
  },
  agro: {
    src: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80&fm=webp',
    alt: 'Insumos agrícolas e sementes em bancada de fazenda',
  },
};

export const products: Product[] = [
  {
    id: 'prd-pet-001',
    name: 'Ração Premium Cães Adultos 12kg',
    slug: 'racao-premium-caes-adultos-12kg',
    description:
      'Fórmula com proteínas de alta digestibilidade, prebióticos e blend de ômegas para cães adultos.',
    price: 239.9,
    category: 'pet',
    image: productImagesByCategory.pet.src,
    imageAlt: 'Saco de ração premium em destaque',
    rating: 4.8,
    inStock: true,
    tags: ['ração', 'cães', 'premium'],
    highlight: true,
    availableAt: ['centro', 'vila-rezende'],
    releaseDate: '2024-02-10',
  },
  {
    id: 'prd-pet-002',
    name: 'Areia Sanitária Ultra Control 12L',
    slug: 'areia-sanitaria-ultra-control-12l',
    description:
      'Controle superior de odores para gatos com grãos finos e ação antibacteriana.',
    price: 89.5,
    category: 'pet',
    image:
      'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=1200&q=80&fm=webp',
    imageAlt: 'Areia sanitária para gatos em embalagem',
    rating: 4.5,
    inStock: true,
    tags: ['gatos', 'higiene'],
    availableAt: ['centro', 'vila-rezende'],
  },
  {
    id: 'prd-pet-003',
    name: 'Kit Mordedor Natural Café com Leite',
    slug: 'kit-mordedor-natural-cafe-com-leite',
    description:
      'Conjunto com três mordedores atóxicos para aliviar o estresse de cães filhotes.',
    price: 59.9,
    category: 'pet',
    image:
      'https://images.unsplash.com/photo-1556228578-0b1dfad29e0e?auto=format&fit=crop&w=1200&q=80&fm=webp',
    imageAlt: 'Brinquedos naturais para cães em bancada',
    rating: 4.2,
    inStock: true,
    tags: ['brinquedos', 'filhotes'],
    availableAt: ['centro', 'vila-rezende'],
  },
  {
    id: 'prd-pet-004',
    name: 'Suplemento Articulado Mobility Pet 60ml',
    slug: 'suplemento-articulado-mobility-pet-60ml',
    description:
      'Condroitina + glucosamina para suporte das articulações em cães e gatos.',
    price: 129.0,
    category: 'pet',
    image: productImagesByCategory.pet.src,
    imageAlt: 'Suplemento veterinário com seringa dosadora',
    rating: 4.6,
    inStock: true,
    tags: ['saúde', 'suplemento'],
    availableAt: ['centro'],
  },
  {
    id: 'prd-pisc-001',
    name: 'Cloro Estabilizado Granulado 10kg',
    slug: 'cloro-estabilizado-granulado-10kg',
    description:
      'Tratamento completo para piscinas residenciais com proteção UV.',
    price: 349.9,
    category: 'piscina',
    image: productImagesByCategory.piscina.src,
    imageAlt: productImagesByCategory.piscina.alt,
    rating: 4.7,
    inStock: true,
    tags: ['tratamento', 'cloro'],
    highlight: true,
    availableAt: ['centro', 'cidade-alta', 'vila-rezende'],
  },
  {
    id: 'prd-pisc-002',
    name: 'Kit Teste 6 em 1 Piscinas',
    slug: 'kit-teste-6-em-1-piscinas',
    description:
      'Faixas de leitura rápida para pH, alcalinidade, cloro livre e dureza.',
    price: 79.0,
    category: 'piscina',
    image:
      'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=1200&q=80&fm=webp',
    imageAlt: 'Kit de teste químico para água de piscina',
    rating: 4.3,
    inStock: true,
    tags: ['teste', 'manutenção'],
    availableAt: ['centro', 'cidade-alta'],
  },
  {
    id: 'prd-pisc-003',
    name: 'Robô Aspirador Piscinas Compact',
    slug: 'robo-aspirador-piscinas-compact',
    description:
      'Equipamento automático para limpeza de piso e meia-parede com ciclo de 2h.',
    price: 4299.0,
    category: 'piscina',
    image:
      'https://images.unsplash.com/photo-1618381778806-40b54dab2c2f?auto=format&fit=crop&w=1200&q=80&fm=webp',
    imageAlt: 'Robô aspirador de piscina em operação',
    rating: 4.9,
    inStock: false,
    tags: ['limpeza', 'automação'],
    availableAt: ['cidade-alta'],
  },
  {
    id: 'prd-pisc-004',
    name: 'Borda Clean Espuma Enzimática 1L',
    slug: 'borda-clean-espuma-enzimatica-1l',
    description:
      'Desengordurante biodegradável para linha d’água com ação rápida.',
    price: 54.9,
    category: 'piscina',
    image:
      'https://images.unsplash.com/photo-1505764706515-aa95265c5abc?auto=format&fit=crop&w=1200&q=80&fm=webp',
    imageAlt: 'Equipe realizando limpeza na borda da piscina',
    rating: 4.4,
    inStock: true,
    tags: ['limpeza', 'enzimático'],
    availableAt: ['centro', 'cidade-alta', 'vila-rezende'],
  },
  {
    id: 'prd-jard-001',
    name: 'Kit Ferramentas Jardim Pro 8 Peças',
    slug: 'kit-ferramentas-jardim-pro-8-pecas',
    description: 'Jogo completo em aço carbono com estojo e cabos ergonômicos.',
    price: 299.0,
    category: 'jardim',
    image: productImagesByCategory.jardim.src,
    imageAlt: 'Kit de ferramentas de jardinagem sobre bancada',
    rating: 4.6,
    inStock: true,
    tags: ['ferramentas', 'kit'],
    highlight: true,
    availableAt: ['centro', 'cidade-alta'],
  },
  {
    id: 'prd-jard-002',
    name: 'Adubo Orgânico Premium 5kg',
    slug: 'adubo-organico-premium-5kg',
    description:
      'Composto orgânico enriquecido com micronutrientes para hortas urbanas.',
    price: 74.5,
    category: 'jardim',
    image:
      'https://images.unsplash.com/photo-1523419400524-c23e99d6c655?auto=format&fit=crop&w=1200&q=80&fm=webp',
    imageAlt: 'Adubo orgânico em saco e pá de jardinagem',
    rating: 4.8,
    inStock: true,
    tags: ['adubo', 'horta'],
    availableAt: ['centro', 'cidade-alta'],
  },
  {
    id: 'prd-jard-003',
    name: 'Sistema Micro Gotejamento 25m',
    slug: 'sistema-micro-gotejamento-25m',
    description:
      'Kit completo com reguladores para irrigação de vasos e canteiros.',
    price: 219.9,
    category: 'jardim',
    image:
      'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1200&q=80&fm=webp',
    imageAlt: 'Sistema de irrigação por gotejamento instalado em horta',
    rating: 4.5,
    inStock: true,
    tags: ['irrigação', 'automação'],
    availableAt: ['cidade-alta'],
  },
  {
    id: 'prd-jard-004',
    name: 'Sementes Gramado Shade Resistant 1kg',
    slug: 'sementes-gramado-shade-resistant-1kg',
    description:
      'Blend adaptado à meia-sombra, germinação em 7 dias e baixo consumo hídrico.',
    price: 119.0,
    category: 'jardim',
    image:
      'https://images.unsplash.com/photo-1441123694162-e54a981ceba3?auto=format&fit=crop&w=1200&q=80&fm=webp',
    imageAlt: 'Gramado verde em área sombreada',
    rating: 4.1,
    inStock: true,
    tags: ['gramado', 'sementes'],
    availableAt: ['centro', 'cidade-alta'],
  },
  {
    id: 'prd-agro-001',
    name: 'Semente de Milho Híbrido 20kg',
    slug: 'semente-de-milho-hibrido-20kg',
    description:
      'Alto potencial produtivo, genética resistente a lagartas e boa tolerância a seca.',
    price: 569.0,
    category: 'agro',
    image: productImagesByCategory.agro.src,
    imageAlt: 'Sementes de milho em mãos de produtor',
    rating: 4.7,
    inStock: true,
    tags: ['sementes', 'milho'],
    availableAt: ['cidade-alta'],
  },
  {
    id: 'prd-agro-002',
    name: 'Herbicida Seletivo Pós-Emergente 5L',
    slug: 'herbicida-seletivo-pos-emergente-5l',
    description:
      'Controle eficiente de folhas largas com baixo impacto na cultura.',
    price: 899.0,
    category: 'agro',
    image:
      'https://images.unsplash.com/photo-1571842469084-216e6be8f5a8?auto=format&fit=crop&w=1200&q=80&fm=webp',
    imageAlt: 'Aplicação de herbicida em cultura',
    rating: 4.4,
    inStock: false,
    tags: ['defensivos', 'herbicida'],
    availableAt: ['cidade-alta'],
  },
  {
    id: 'prd-agro-003',
    name: 'Ração Proteinizada Bovinos 30kg',
    slug: 'racao-proteinizada-bovinos-30kg',
    description:
      'Mistura com 40% PB e minerais quelatados para suplementação de pastejo.',
    price: 279.5,
    category: 'agro',
    image:
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80&fm=webp',
    imageAlt: 'Ração para bovinos em saco e cocho ao fundo',
    rating: 4.6,
    inStock: true,
    tags: ['nutrição', 'bovinos'],
    availableAt: ['centro', 'cidade-alta'],
  },
  {
    id: 'prd-agro-004',
    name: 'Pulverizador Costal Motorizado 25L',
    slug: 'pulverizador-costal-motorizado-25l',
    description:
      'Motor 2 tempos com alcance de 10m para aplicações foliares de média escala.',
    price: 2149.0,
    category: 'agro',
    image:
      'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=1200&q=80&fm=webp',
    imageAlt: 'Pulverizador costal em área rural',
    rating: 4.3,
    inStock: true,
    tags: ['pulverizador', 'equipamento'],
    highlight: true,
    availableAt: ['centro'],
  },
  {
    id: 'prd-pet-005',
    name: 'Coleira Smart GPS Pet',
    slug: 'coleira-smart-gps-pet',
    description:
      'Monitoramento em tempo real com app, resistência IP67 e bateria de 5 dias.',
    price: 499.0,
    category: 'pet',
    image:
      'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80&fm=webp',
    imageAlt: 'Coleira tecnológica em cachorro brincando',
    rating: 4.6,
    inStock: true,
    tags: ['tecnologia', 'gps'],
    availableAt: ['centro'],
  },
  {
    id: 'prd-jard-005',
    name: 'Vaso Autoirrigável Terracota 38cm',
    slug: 'vaso-autoirrigavel-terracota-38cm',
    description:
      'Reservatório com indicador de nível e acabamento fosco resistente aos raios UV.',
    price: 189.9,
    category: 'jardim',
    image:
      'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=80&fm=webp',
    imageAlt: 'Vaso autoirrigável com planta decorativa',
    rating: 4.5,
    inStock: true,
    tags: ['vaso', 'decor'],
    availableAt: ['centro', 'cidade-alta', 'vila-rezende'],
  },
  {
    id: 'prd-pisc-005',
    name: 'Cascata Inox Wave 60cm',
    slug: 'cascata-inox-wave-60cm',
    description:
      'Design premium em aço 304 com vazão uniforme para piscinas residenciais.',
    price: 3699.0,
    category: 'piscina',
    image:
      'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=1200&q=80&fm=webp',
    imageAlt: 'Cascata de inox instalada em piscina',
    rating: 4.9,
    inStock: true,
    tags: ['cascata', 'design'],
    availableAt: ['cidade-alta'],
  },
  {
    id: 'prd-agro-005',
    name: 'Kit Monitoramento Solo IoT',
    slug: 'kit-monitoramento-solo-iot',
    description:
      'Sensores de umidade, temperatura e salinidade com dashboard web.',
    price: 4890.0,
    category: 'agro',
    image:
      'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=1200&q=80&fm=webp',
    imageAlt: 'Sensor de solo instalado em plantação',
    rating: 4.8,
    inStock: true,
    tags: ['iot', 'monitoramento'],
    availableAt: ['cidade-alta'],
  },
];

export function getCatalog() {
  return products;
}
