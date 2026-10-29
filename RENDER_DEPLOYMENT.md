# Deploying PrepMatch to Render 🚀

This repository is fully configured for deployment on [Render](https://render.com).

---

## Required Environment Variables

Before deploying, ensure you have these values ready:

| Variable | Description | Where to get |
|---|---|---|
| `MONGO_URI` | MongoDB connection string | [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) |
| `JWT_SECRET` | Any random secure string (e.g. `openssl rand -hex 32`) | You can generate one |
| `GOOGLE_GENAI_API_KEY` | Gemini API key | [Google AI Studio](https://aistudio.google.com/app/apikey) |

---

## Method 1: Render Blueprint (Easiest & Recommended) ⭐

Render Blueprints use the [`render.yaml`](./render.yaml) file in the repo to automatically set up both the backend and frontend services with the proper routing, build scripts, and linked environment variables.

1. **Commit and push** the changes to GitHub:
   ```bash
   git add .
   git commit -m "Configure project for Render deployment"
   git push origin main
   ```
2. Go to your [Render Dashboard](https://dashboard.render.com/).
3. Click **New +** (top right) and select **Blueprint**.
4. Connect your GitHub repository: `GitH-Priyanshu/prepMatch`.
5. Render will automatically read `render.yaml` and show:
   - `prepmatch-backend` (Web Service)
   - `prepmatch-frontend` (Static Site)
6. Fill in the prompted secret environment variables:
   - `MONGO_URI`: Your MongoDB Atlas URI
   - `GOOGLE_GENAI_API_KEY`: Your Gemini API key
7. Click **Apply**.
   - Render will build and deploy both services!

---

## Method 2: Manual Setup via Render Dashboard

If you prefer to configure each service manually:

### Part A: Deploy the Backend (Web Service)

1. In Render Dashboard, click **New +** -> **Web Service**.
2. Connect `GitH-Priyanshu/prepMatch`.
3. Configure the settings:
   - **Name**: `prepmatch-backend`
   - **Root Directory**: `Backend`
   - **Runtime**: `Node`
   - **Build Command**: `chmod +x ./render-build.sh && ./render-build.sh`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`
4. Under **Environment Variables**, add:
   - `NODE_ENV` = `production`
   - `MONGO_URI` = `<your_mongodb_connection_string>`
   - `JWT_SECRET` = `<your_random_secret_string>`
   - `GOOGLE_GENAI_API_KEY` = `<your_gemini_api_key>`
   - `CLIENT_URL` = `<your_frontend_url_after_frontend_step>` *(can be set after deploying frontend)*
5. Click **Create Web Service**.
6. Copy the generated backend URL (e.g., `https://prepmatch-backend.onrender.com`).

> **Note on Puppeteer**: If you encounter any Linux sandbox/chromium issues in Render's native Node environment, you can switch the backend **Runtime** from `Node` to `Docker`. Render will automatically build the included [Backend/Dockerfile](./Backend/Dockerfile) which contains all required Chrome libraries.

---

### Part B: Deploy the Frontend (Static Site)

1. In Render Dashboard, click **New +** -> **Static Site**.
2. Connect `GitH-Priyanshu/prepMatch`.
3. Configure the settings:
   - **Name**: `prepmatch-frontend`
   - **Root Directory**: `Frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Under **Environment Variables**, add:
   - `VITE_API_URL` = `https://<your-backend-service-name>.onrender.com`
5. Under **Redirects / Rewrites**, click **Add Rule**:
   - **Type**: `Rewrite`
   - **Source**: `/*`
   - **Destination**: `/index.html`
   *(This ensures client-side routing works on page refreshes).*
6. Click **Create Static Site**.
7. Once deployed, copy your frontend URL and paste it as `CLIENT_URL` in your backend environment variables!

---

## Verification & Health Check

- **Backend Health Check**:
  Visit `https://<your-backend-name>.onrender.com/health` in your browser. You should receive:
  ```json
  {"status":"ok","timestamp":"..."}
  ```
- **Frontend App**:
  Visit `https://<your-frontend-name>.onrender.com` to test registration, login, and report generation.

