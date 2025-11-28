#!/usr/bin/env bash
# One-shot command: free port, start dev server, open tunnel, run checks.
set -euo pipefail
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
# shellcheck disable=SC1091
source "$ROOT_DIR/scripts/init.sh"

PORT=3001
PROVIDER=${1:-ngrok}

pnpm kill:3001 >/dev/null 2>&1 || true

"$ROOT_DIR/scripts/dev-all.sh"

echo "[mobile-full] servidor pronto, iniciando túnel (${PROVIDER})"
"$ROOT_DIR/scripts/tunnel.sh" "$PROVIDER" &
TUNNEL_PID=$!

sleep 5
"$ROOT_DIR/scripts/mobile-check.sh"

wait $TUNNEL_PID
