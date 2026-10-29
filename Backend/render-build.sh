#!/usr/bin/env bash
# exit on error
set -o errexit

npm install

# Setup puppeteer cache directory on Render
PUPPETEER_CACHE_DIR=/opt/render/.cache/puppeteer
mkdir -p "$PUPPETEER_CACHE_DIR"

if [[ ! -d "$PUPPETEER_CACHE_DIR/chrome" ]]; then
  echo "...Saving Puppeteer Cache to Render opt cache"
  cp -R .cache/puppeteer/* "$PUPPETEER_CACHE_DIR/" 2>/dev/null || true
else
  echo "...Restoring Puppeteer Cache from Render opt cache"
  cp -R "$PUPPETEER_CACHE_DIR"/* .cache/puppeteer/ 2>/dev/null || true
fi
