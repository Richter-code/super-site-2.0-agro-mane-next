# Arquitetura — AgroMané

## Padrões

- Next.js (App Router) + TypeScript
- Tailwind + shadcn/ui
- Páginas server components onde possível
- `src/features/*` como unidades de negócio

## Rotas (iniciais)

- `/` (Home)
- `/produtos` (lista + filtros)
- `/produtos/[slug]` (detalhe)
- `/carrinho`
- `/loja` (endereço, horário, contato)

## Dados

- Catálogo local (stub) em `src/lib/catalog.ts` (evoluir para DB/Prisma)

## Telemetria e Qualidade

- ESLint + Prettier + Husky
- Lighthouse CI (opcional)
