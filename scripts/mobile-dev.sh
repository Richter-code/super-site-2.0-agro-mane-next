#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

fuser -k 3001/tcp 2>/dev/null || true
mkdir -p .mobile
: > .mobile/url.txt

start_localtunnel() {
	local attempt=1
	while [ ${attempt} -le 5 ]; do
		echo "[mobile-dev] opening localtunnel (attempt ${attempt})..."
		nohup npx localtunnel --port 3001 --subdomain agromane > .mobile/tunnel.log 2>&1 &
		LT_PID=$!
		sleep 3
		URL=$(grep -Eo 'https://[^ ]+' .mobile/tunnel.log | head -n1 || true)
		if [ -n "${URL:-}" ]; then
			echo "${URL}" > .mobile/url.txt
			echo "[mobile-dev] localtunnel PID=${LT_PID} (logs: .mobile/tunnel.log)"
			echo "[mobile-dev] URL: ${URL}"
			return 0
		fi
		echo "[mobile-dev] localtunnel failed (see .mobile/tunnel.log)." >&2
		kill ${LT_PID} 2>/dev/null || true
		attempt=$((attempt + 1))
		sleep 2
	done
	return 1
}

echo "[mobile-dev] starting Next dev on 0.0.0.0:3001"
nohup pnpm run dev:host > .mobile/dev.log 2>&1 &
DEV_PID=$!
sleep 2
echo "[mobile-dev] Next dev PID=${DEV_PID} (logs: .mobile/dev.log)"

if ! start_localtunnel; then
	echo "[mobile-dev] ERROR: could not establish localtunnel after multiple attempts." >&2
	exit 1
fi

wait ${LT_PID}
