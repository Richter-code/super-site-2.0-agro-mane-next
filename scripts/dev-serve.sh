#!/usr/bin/env bash
# Start dev server in background and capture logs to .dev.log
set -euo pipefail
cd "$(dirname "$0")/.."
nohup pnpm dev -p 3001 > .dev.log 2>&1 &
printf "Dev server started in background, logs: .dev.log\n"
printf "To stop: pkill -f 'next dev' || true\n"
