# Relatório de QA final — Agro Mané

## Diagnósticos executados

- `pnpm lint` — OK (sem novos avisos depois do ajuste em `src/types/content.d.ts`).
- `pnpm typecheck` — OK.
- `pnpm build` — executado duas vezes; a segunda rodada garantiu o `BUILD_ID` e habilitou o `next start` para a bateria de testes.
- `npx next start -p 3002` + `npx --yes lighthouse http://localhost:3002 --preset=desktop --chrome-flags="--headless --no-sandbox"`.
  - Relatório salvo em `docs/perf/lh-desktop.json`.
  - Performance **100**, Accessibility **94**, Best Practices **96**, SEO **100**.
  - Métricas: FCP 0.2s, LCP 0.6s, Speed Index 0.2s, TBT 0ms, CLS 0.00, TTI 0.6s.

## Conteúdo e fontes públicas

- `content/brand/agro-mane.json` atualizado com telefone fixo `(19) 3437-7777`, WhatsApp oficial `https://wa.me/5519997780777`, e-mail `mane@agropecuariadomane.com.br`, endereço completo “Rua São José, 1121 - Cidade Alta, Piracicaba/SP, 13419-250”, horário padrão e FAQ com 3 respostas curtas.
- Fontes consultadas: Instagram oficial (`@agropecuariadomane`), resultados públicos do Google Maps para “Agropecuária do Mané Piracicaba” e diretórios locais citados na Câmara de Piracicaba.
- `links_uteis` mantém apenas Instagram/WhatsApp e o `site_url` foi normalizado para `https://www.agropecuariadomane.com.br` (usado por SEO, header, footer e JSON-LD).
- Novo script `scripts/fill-brand-from-web.ts` (Node/TS puro, fetch + regex) registra tentativas por fonte e atualiza somente campos que ainda estavam em TODO, preservando a integridade do conteúdo manualmente confirmado.

## SEO, A11y e UX

- Metadata (`src/app/layout.tsx`) e JSON-LD `LocalBusiness` já consomem o mesmo JSON de conteúdo; robots/sitemap continuam publicados.
- CTAs de WhatsApp/Instagram e blocos de contato nos headers/footers passaram a refletir automaticamente as novas informações após rodar o script + commit de conteúdo.
- Lighthouse desktop não apontou regressões de acessibilidade; apenas oportunidades recorrentes de cache/imagens.

## Performance — panorama atual

- Com o servidor em modo `next start`, o TBT zerou e o LCP ficou em 0.6s; principais recomendações atuais são revisar imagens hero (AVIF/WebP + tamanhos menores) e observar `unused-javascript` via `pnpm build --analyze` antes do go-live.
- Continuar monitorando INP/LCP quando o catálogo real for plugado; para já, o bundle compartilhado está em 87kB no carregamento inicial.

## 🚀 Otimização Final

- `public/brand/logo-mane.*` convertido para AVIF/WEBP (redução média de 85%) com log em `docs/perf/images-optimized.md`.
- `content/brand/agro-mane.json` agora expõe `logo_sources` + `og_image` padrão em WEBP; `src/lib/brand.ts` publica `logoSources`, `primaryLogo` e `socialImageVariants` para reutilização em metadata e componentes.
- Novo componente `BrandMark` substitui o placeholder de texto no Header/Footer e força apenas um carregamento prioritário.
- `next/image` recebeu `sizes` realistas em `ProductCard`, `ProductHero`, `SimilarProducts`, `InstagramFeed`, além de `loading="lazy"` explícito para as miniaturas do carrinho.
- Metadata (`src/app/layout.tsx`) agora envia variantes AVIF/WEBP/PNG tanto em Open Graph quanto em JSON-LD/Twitter, liberando fallback automático sem depender apenas do PNG original.

## Validação manual

- Para smoke tests seguir com `pnpm dev -p 3001` (ou `pnpm dev -p 3002` se a porta estiver ocupada) e navegar por `/`, `/produtos`, `/categorias/{pet,piscina,jardim,agro}`, `/produtos/[slug]`, `/carrinho` e `/checkout`.
- Replicar o Lighthouse com `npx next start -p 3002` e o comando descrito acima sempre que fizer mudanças relevantes em mídia ou layout para acompanhar a evolução dos escores.

## Pendências / próximos passos

- Avaliar se o horário genérico (“Atendimento em horário comercial; consulte redes”) precisa ser substituído por faixas específicas por unidade.
- Confirmar com a equipe se o telefone `(19) 3437-7777` continua sendo o principal para todas as lojas; caso contrário, registrar no FAQ qual unidade atende cada número.
- Considerar rodar `pnpm build --analyze` e otimizar imagens principais antes da publicação.
