#!/usr/bin/env bash
# Start ngrok tunnel for port 3001. Requires NGROK_TOKEN env var if using authtoken.
set -euo pipefail
cd "$(dirname "$0")/.."
if ! command -v npx >/dev/null 2>&1; then
  echo "npx not found. Install Node.js and npm/pnpm."
  exit 1
fi
if [ -z "${NGROK_TOKEN-}" ]; then
  echo "Starting ngrok without token (may have limits)."
  npx --yes ngrok http 3001
else
  echo "Starting ngrok with token from NGROK_TOKEN env var."
  npx --yes ngrok authtoken "$NGROK_TOKEN" >/dev/null 2>&1 || true
  npx --yes ngrok http 3001
fi
