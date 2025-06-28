#!/usr/bin/env bash
set -e

if [ -f "web/package.json" ]; then
  npm install --prefix web
fi

if [ -f "backend/requirements.txt" ]; then
  pip install -r backend/requirements.txt
fi

