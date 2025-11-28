#!/usr/bin/env bash
set -e
printf "\n🔎 BMAD: Análise\n"
# Gera/atualiza PRD a partir de perguntas padrão
cat > bmad/01-analise/PRD.md <<'EOF'
# PRD — AgroMané


## Objetivo
Descrever claramente o problema, público, metas de negócio e métricas de sucesso.


## Escopo (MVP)
- [ ] Página Home com vitrines
- [ ] Catálogo com filtros (categorias: Pet, Piscina, Jardim, Agro)
- [ ] Carrinho e Checkout (stub)
- [ ] Página da Loja (endereço, horário, contato)


## Requisitos Não Funcionais
- Lighthouse ≥ 90 (Performance, A11y, Best Practices, SEO)
- CLS < 0.1, LCP < 2.5s
- Responsivo mobile-first


## Referências
- Instagram da marca
- Concorrentes diretos


## Decisões Pendentes
- [ ] Integração de pagamento
- [ ] Estratégia de imagens
EOF
printf "✅ PRD atualizado em bmad/01-analise/PRD.md\n"
