#!/usr/bin/env bash
set -euo pipefail

FRONTEND_PORT="${PORT:-3000}"
BACKEND_PORT="${BACKEND_PORT:-8080}"
BACKEND_CONTAINER="lesempolem-backend"
LOG_DIR="$(pwd)/log"
FRONTEND_LOG="$LOG_DIR/frontend.log"

mkdir -p "$LOG_DIR"

echo "==> Starting Lesempolem development environment"

# --- Kill any existing process on the frontend port ---
if pid=$(lsof -ti :"$FRONTEND_PORT" 2>/dev/null); then
    echo "    Killing existing process on port $FRONTEND_PORT (PID: $pid)"
    kill $pid 2>/dev/null || true
    sleep 1
fi

# --- Start backend Docker container ---
echo "==> Starting backend container ($BACKEND_CONTAINER) on port $BACKEND_PORT"
if docker ps --format '{{.Names}}' | grep -q "^${BACKEND_CONTAINER}$"; then
    echo "    Backend container already running"
else
    docker rm -f "$BACKEND_CONTAINER" 2>/dev/null || true
    docker run -d \
        --name "$BACKEND_CONTAINER" \
        -p "$BACKEND_PORT":8080 \
        -v "$(pwd)/backend/config.yml:/app/config.yml" \
        ghcr.io/kozaktomas/universal-store-api:main \
        run /app/config.yml mem
    echo "    Backend container started"
fi

# --- Build frontend ---
echo "==> Building frontend"
cd frontend
export NODE_OPTIONS=--openssl-legacy-provider
export REACT_APP_BACKEND_URL="http://localhost:$BACKEND_PORT"
yarn install --frozen-lockfile
yarn build
cd ..

# --- Serve frontend ---
echo "==> Serving frontend on port $FRONTEND_PORT"
nohup npx serve -s frontend/build -l "$FRONTEND_PORT" > "$FRONTEND_LOG" 2>&1 &
FRONTEND_PID=$!

# --- Wait for startup ---
echo "==> Waiting for frontend to start..."
for i in $(seq 1 30); do
    if curl -s -o /dev/null "http://localhost:$FRONTEND_PORT" 2>/dev/null; then
        break
    fi
    if ! kill -0 "$FRONTEND_PID" 2>/dev/null; then
        echo "ERROR: Frontend process exited unexpectedly. Check $FRONTEND_LOG"
        exit 1
    fi
    sleep 1
done

if ! curl -s -o /dev/null "http://localhost:$FRONTEND_PORT" 2>/dev/null; then
    echo "ERROR: Frontend did not start within 30 seconds. Check $FRONTEND_LOG"
    exit 1
fi

# --- Print status ---
echo ""
echo "============================================"
echo "  Lesempolem dev environment is running"
echo "============================================"
echo "  Frontend:  http://pi:$FRONTEND_PORT"
echo "  Backend:   http://localhost:$BACKEND_PORT"
echo "  PID:       $FRONTEND_PID"
echo "  Log:       $FRONTEND_LOG"
echo "============================================"
