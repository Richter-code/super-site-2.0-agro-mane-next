#!/usr/bin/env bash
set -e
printf "\n🧭 BMAD: Planejamento/Arquitetura\n"
cat > bmad/02-arquitetura/arquitetura.md <<'EOF'
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
EOF
printf "✅ Arquitetura atualizada em bmad/02-arquitetura/arquitetura.md\n"
