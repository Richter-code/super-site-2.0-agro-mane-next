#!/usr/bin/env bash
# Simple health check for mobile readiness
set -euo pipefail
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
# shellcheck disable=SC1091
source "$ROOT_DIR/scripts/init.sh"

PORT=3001
CHECK_LOG="$LOG_DIR/check.log"
URL_FILE="$MOBILE_DIR/url.txt"

check_local() {
  echo "[check] verificando http://127.0.0.1:${PORT}" | tee -a "$CHECK_LOG"
  if curl -fsS "http://127.0.0.1:${PORT}" >/dev/null; then
    echo "[check] Next.js responde localmente" | tee -a "$CHECK_LOG"
  else
    echo "[check] ERRO: Next.js não responde" | tee -a "$CHECK_LOG"
    return 1
  fi
}

check_url() {
  if [ ! -s "$URL_FILE" ]; then
    echo "[check] nenhuma URL de túnel encontrada" | tee -a "$CHECK_LOG"
    return 1
  fi
  local url
  url=$(cat "$URL_FILE")
  echo "[check] verificando $url" | tee -a "$CHECK_LOG"
  if curl -fsS "$url" >/dev/null; then
    echo "[check] túnel acessível" | tee -a "$CHECK_LOG"
  else
    echo "[check] ERRO: túnel não acessível" | tee -a "$CHECK_LOG"
    return 1
  fi
}

check_local && check_url
