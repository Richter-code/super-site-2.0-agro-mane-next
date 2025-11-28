#!/usr/bin/env bash
# Start Next.js dev server on 0.0.0.0:3001 with logging and health checks
set -euo pipefail
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
# shellcheck disable=SC1091
source "$ROOT_DIR/scripts/init.sh"

PORT=3001
HOST="0.0.0.0"
DEV_LOG="$LOG_DIR/dev.log"
HEALTH_FILE="$MOBILE_DIR/health.txt"

pnpm kill:3001 >/dev/null 2>&1 || true

echo "[dev-all] iniciando Next.js em ${HOST}:${PORT}"
nohup pnpm run dev:host > "$DEV_LOG" 2>&1 &
DEV_PID=$!

echo "$DEV_PID" > "$MOBILE_DIR/dev.pid"

for i in {1..20}; do
  if curl -fsS "http://127.0.0.1:${PORT}/api/health" >/dev/null 2>&1 || curl -fsS "http://127.0.0.1:${PORT}" >/dev/null 2>&1; then
    echo "[dev-all] Next.js responde na porta ${PORT}" | tee "$HEALTH_FILE"
    echo "[dev-all] logs: $DEV_LOG"
    exit 0
  fi
  sleep 1
done

echo "[dev-all] ERRO: Next.js não respondeu a tempo" >&2
exit 1
