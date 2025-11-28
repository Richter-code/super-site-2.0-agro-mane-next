#!/usr/bin/env bash
# Shared bootstrap for mobile/dev automation
set -euo pipefail
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

require_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "[init] ERRO: comando '$1' não foi encontrado no PATH." >&2
    exit 1
  fi
}

for bin in pnpm npx curl python3; do
  require_cmd "$bin"
done

MOBILE_DIR="$ROOT_DIR/.mobile"
LOG_DIR="$MOBILE_DIR/logs"
mkdir -p "$LOG_DIR"
: > "$MOBILE_DIR/url.txt"
touch "$LOG_DIR/dev.log" "$LOG_DIR/tunnel.log" "$LOG_DIR/check.log" "$MOBILE_DIR/url.txt"

export ROOT_DIR MOBILE_DIR LOG_DIR
