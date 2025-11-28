#!/usr/bin/env bash
set -e
printf "\n✅ BMAD: QA (checagens rápidas)\n"
# Lint, tipos e build
pnpm eslint . || true
pnpm typecheck || true
pnpm build || true
printf "\nSugestão: rode Lighthouse local (Chrome DevTools) e anote métricas no bmad/04-qa/plano-de-testes.md\n"
