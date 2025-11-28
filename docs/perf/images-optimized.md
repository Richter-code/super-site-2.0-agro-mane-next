# Log de otimização de imagens — 22/11/2025

## Conversões

| Arquivo                      | Formato original | Tamanho original | Novo formato | Novo tamanho | Redução |
| ---------------------------- | ---------------- | ---------------- | ------------ | ------------ | ------- |
| `public/brand/logo-mane.png` | PNG              | 50.0 kB          | AVIF         | 6.4 kB       | −87%    |
| `public/brand/logo-mane.png` | PNG              | 50.0 kB          | WEBP         | 7.8 kB       | −84%    |

> Conversões realizadas com `sharp@0.33.5` usando preset padrão (`quality 70`). Ambos os formatos preservam o fundo translúcido da marca original.

## Referências atualizadas

- Novo módulo `src/components/brand/BrandMark.tsx` centraliza o uso da marca e força o carregamento prioritário somente no header.
- Header/Footer agora usam o componente e deixam de renderizar SVGs genéricos.
- `content/brand/agro-mane.json` passou a expor `logo_sources` com os caminhos das versões AVIF/WEBP/PNG; `og_image` padrão utiliza o WEBP.
- `src/lib/brand.ts` exporta `logoSources`, `primaryLogo` e `socialImageVariants`, permitindo que o metadata (`src/app/layout.tsx`) divulgue múltiplos formatos simultaneamente (Open Graph, Twitter e JSON-LD).
- Componentes com `next/image` tiveram `sizes` ajustados:
  - `ProductCard` → `(max-width: 768px) 100vw, 50vw`.
  - `ProductHero` → `(max-width: 1024px) 100vw, 55vw`.
  - `SimilarProducts` e `InstagramFeed` → breakpoints refinados para 640/1024 px.
  - Thumbnails do carrinho (full/minicart) continuam com dimensões fixas, porém explicitamente `loading="lazy"`.

## Próximos passos sugeridos

1. Incluir as novas variantes (`logo_sources`) no CMS definitivo ou no backend que vai alimentar a storefront para manter paridade entre ambientes.
2. Reprocessar eventuais outras imagens institucionais (hero/galeria) seguindo o mesmo fluxo e registrar no presente arquivo para manter rastreabilidade.
