#!/usr/bin/env bash
# Manage tunnels (ngrok default, localtunnel fallback)
set -euo pipefail
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
# shellcheck disable=SC1091
source "$ROOT_DIR/scripts/init.sh"

TUNNEL_PROVIDER=${1:-ngrok}
PORT=3001
TUNNEL_LOG="$LOG_DIR/tunnel.log"
URL_FILE="$MOBILE_DIR/url.txt"

echo "" > "$TUNNEL_LOG"
: > "$URL_FILE"

kill_tunnel() {
  if [ -f "$MOBILE_DIR/tunnel.pid" ]; then
    if kill "$(cat "$MOBILE_DIR/tunnel.pid")" >/dev/null 2>&1; then
      echo "[tunnel] PID anterior encerrado"
    fi
    rm -f "$MOBILE_DIR/tunnel.pid"
  fi
  pkill -f "ngrok http ${PORT}" >/dev/null 2>&1 || true
  pkill -f "localtunnel --port ${PORT}" >/dev/null 2>&1 || true
}

start_ngrok() {
  local attempt=1
  while [ $attempt -le 5 ]; do
    echo "[tunnel] iniciando ngrok (tentativa $attempt)"
    # If NGROK_TOKEN is provided, install it so ngrok runs authenticated
    if [ -n "${NGROK_TOKEN-}" ]; then
      echo "[tunnel] aplicando NGROK_TOKEN..."
      npx --yes ngrok authtoken "$NGROK_TOKEN" >/dev/null 2>&1 || true
    fi
    nohup npx --yes ngrok http ${PORT} >> "$TUNNEL_LOG" 2>&1 &
    local pid=$!
    echo $pid > "$MOBILE_DIR/tunnel.pid"
    sleep 3
    local url
    url=$(grep -Eo 'https://[a-zA-Z0-9\-]+\.ngrok[^ ]*' "$TUNNEL_LOG" | head -n1 || true)
    if [ -n "$url" ]; then
      echo "$url" > "$URL_FILE"
      echo "[tunnel] ngrok pronto: $url"
      wait $pid
      return 0
    fi
    echo "[tunnel] falha ao obter URL, verificando logs" >&2
    kill $pid >/dev/null 2>&1 || true
    attempt=$((attempt + 1))
    sleep 2
  done
  return 1
}

start_localtunnel() {
  local attempt=1
  while [ $attempt -le 5 ]; do
    echo "[tunnel] iniciando localtunnel (tentativa $attempt)"
    nohup npx --yes localtunnel --port ${PORT} --subdomain agromane > "$TUNNEL_LOG" 2>&1 &
    local pid=$!
    echo $pid > "$MOBILE_DIR/tunnel.pid"
    sleep 3
    local url
    url=$(grep -Eo 'https://[^ ]+' "$TUNNEL_LOG" | head -n1 || true)
    if [ -n "$url" ]; then
      echo "$url" > "$URL_FILE"
      echo "[tunnel] localtunnel pronto: $url"
      wait $pid
      return 0
    fi
    echo "[tunnel] falha ao obter URL, verificando logs" >&2
    kill $pid >/dev/null 2>&1 || true
    attempt=$((attempt + 1))
    sleep 2
  done
  return 1
}

kill_tunnel

case "$TUNNEL_PROVIDER" in
  ngrok)
    start_ngrok || { echo "[tunnel] ngrok indisponível" >&2; start_localtunnel; }
    ;;
  lt|localtunnel)
    start_localtunnel
    ;;
  *)
    echo "[tunnel] provedor desconhecido: $TUNNEL_PROVIDER" >&2
    exit 1
    ;;
esac
