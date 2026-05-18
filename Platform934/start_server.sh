#!/usr/bin/env bash
# Simple helper to run a local static server for development
# Usage: ./start_server.sh
set -e
echo "Starting static server on http://localhost:8000"
python3 -m http.server 8000
