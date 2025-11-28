#!/usr/bin/env bash
set -e
printf "\n🛠️ BMAD: Implementação (bootstrap)\n"
# Garante dependências mínimas
pnpm i -D eslint prettier lint-staged husky @commitlint/{config-conventional,cli} >/dev/null 2>&1 || true


# Husky + commitlint + lint-staged
pnpm dlx husky init >/dev/null 2>&1 || true
cat > .husky/commit-msg <<'EOF'
#!/usr/bin/env sh
. "$(dirname "$0")/_/husky.sh"
pnpm commitlint --edit "$1"
EOF
chmod +x .husky/commit-msg


cat > .husky/pre-commit <<'EOF'
#!/usr/bin/env sh
. "$(dirname "$0")/_/husky.sh"
pnpm lint-staged
EOF
chmod +x .husky/pre-commit


# lint-staged
jq '. + {"lint-staged": {"**/*.{ts,tsx,js,jsx}": ["eslint --fix"], "**/*.{md,json,css}": ["prettier -w"]}}' package.json > package.tmp && mv package.tmp package.json


# commitlint
cat > commitlint.config.cjs <<'EOF'
module.exports = { extends: ['@commitlint/config-conventional'] };
EOF


printf "✅ Husky/lint-staged/commitlint prontos\n"
