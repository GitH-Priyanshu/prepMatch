# ==============================================================================
# Stage 1: Build the React/Vite Frontend
# ==============================================================================
FROM node:20-bookworm-slim AS frontend-builder
WORKDIR /app/Frontend

# Install frontend dependencies
COPY Frontend/package*.json ./
RUN npm install

# Build frontend production bundle
COPY Frontend/ ./
RUN npm run build

# ==============================================================================
# Stage 2: Production Container with Chromium dependencies for Puppeteer
# ==============================================================================
FROM node:20-bookworm-slim

# Install system dependencies required for Puppeteer and Chromium headless mode
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    ca-certificates \
    procps \
    libxss1 \
    libxtst6 \
    libnss3 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libgbm1 \
    libasound2 \
    libpango-1.0-0 \
    fonts-liberation \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy backend dependencies
COPY Backend/package*.json ./Backend/
WORKDIR /app/Backend
RUN npm install --omit=dev

# Copy backend source code
COPY Backend/ /app/Backend/

# Copy compiled frontend from builder stage into /app/Frontend/dist
COPY --from=frontend-builder /app/Frontend/dist /app/Frontend/dist

ENV NODE_ENV=production
ENV PORT=10000

EXPOSE 10000

CMD ["npm", "start"]
