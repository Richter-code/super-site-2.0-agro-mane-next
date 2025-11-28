#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

fuser -k 3001/tcp 2>/dev/null || true
mkdir -p .mobile
: > .mobile/url.txt

start_localtunnel() {
	local attempt=1
	while [ ${attempt} -le 5 ]; do
		echo "[mobile-prod] opening localtunnel (attempt ${attempt})..."
		nohup npx localtunnel --port 3001 --subdomain agromane > .mobile/tunnel.log 2>&1 &
		LT_PID=$!
		sleep 3
		URL=$(grep -Eo 'https://[^ ]+' .mobile/tunnel.log | head -n1 || true)
		if [ -n "${URL:-}" ]; then
			echo "${URL}" > .mobile/url.txt
			echo "[mobile-prod] localtunnel PID=${LT_PID} (logs: .mobile/tunnel.log)"
			echo "[mobile-prod] URL: ${URL}"
			return 0
		fi
		echo "[mobile-prod] localtunnel failed (see .mobile/tunnel.log)." >&2
		kill ${LT_PID} 2>/dev/null || true
		attempt=$((attempt + 1))
		sleep 2
	done
	return 1
}

echo "[mobile-prod] building…"
pnpm build

echo "[mobile-prod] starting Next start on 0.0.0.0:3001"
nohup pnpm run start:host > .mobile/prod.log 2>&1 &
START_PID=$!
sleep 2
echo "[mobile-prod] Next start PID=${START_PID} (logs: .mobile/prod.log)"

if ! start_localtunnel; then
	echo "[mobile-prod] ERROR: could not establish localtunnel after multiple attempts." >&2
	exit 1
fi

wait ${LT_PID}
