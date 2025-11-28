# AgroMané Next

Kit inicial com estrutura de pastas e scripts BMAD para acelerar o e-commerce AgroMané usando Next.js (App Router) + TypeScript.

## Scripts principais

- `pnpm dev` — inicia o servidor em `http://localhost:3001`.
- `pnpm bmad:analisar` — atualiza o PRD.
- `pnpm bmad:planejar` — atualiza decisões de arquitetura.
- `pnpm bmad:impl` — prepara Husky, lint-staged e commitlint.
- `pnpm bmad:qa` — roda lint, typecheck e build como sanity check.

## Fluxo sugerido

1. Rodar os scripts BMAD conforme a fase.
2. Desenvolver features atômicas em `src/features/*`.
3. Atualizar artefatos `bmad/` a cada entrega.
4. Abrir PR com checklist BMAD completo.
