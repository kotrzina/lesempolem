# Create Dev Script

The project is a React frontend (with yarn) + a containerized backend API (universal-store-api via Docker). There's no Makefile or dev script.

## Requirements

Create a `dev.sh` script:

1. Accept port via env var: `FRONTEND_PORT="${PORT:-3000}"`
2. Kill any existing process on the port
3. Ensure the backend Docker container is running (`docker-compose up -d` if there's a docker-compose.yml)
4. Build and start the frontend in production mode (not `npm start` which is interactive):
   - `cd frontend && yarn build`
   - Serve the built frontend with `npx serve -s build -l $FRONTEND_PORT` (or similar static server) running detached via `nohup ... &`
5. Wait for startup (check port is listening)
6. Print status with app URL (`http://pi:$FRONTEND_PORT`), PID, and log location

Also create a basic `Makefile` with a `dev` target: `dev: bash ./dev.sh`

Make the script executable.