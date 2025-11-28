#!/usr/bin/env bash
# Start localtunnel for port 3001. Uses npx so no install required.
set -euo pipefail
cd "$(dirname "$0")/.."
if ! command -v npx >/dev/null 2>&1; then
  echo "npx not found. Install Node.js and npm/pnpm."
  exit 1
fi
printf "Starting localtunnel on port 3001...\n"
# Allow optional SUBDOMAIN env var
if [ -n "${SUBDOMAIN-}" ]; then
  npx --yes localtunnel --port 3001 --subdomain "$SUBDOMAIN"
else
  npx --yes localtunnel --port 3001
fi
