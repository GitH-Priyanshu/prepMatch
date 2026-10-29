# PrepMatch 🎯

> **AI-Powered Interview Preparation & Tailored Resume Intelligence Platform**

[![Render Status](https://img.shields.io/badge/Deployed%20on-Render-46E3B7?logo=render&logoColor=white)](https://prepmatch.onrender.com)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Node.js](https://img.shields.io/badge/Node.js-20-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-GenAI-4285F4?logo=google&logoColor=white)](https://ai.google.dev)
[![Puppeteer](https://img.shields.io/badge/Puppeteer-PDF%20Generation-40B5A4?logo=puppeteer&logoColor=white)](https://pptr.dev)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white)](https://www.docker.com)

---

## 🌐 Live Demo

🔗 **Live Application**: [https://prepmatch.onrender.com](https://prepmatch.onrender.com)  
*(Note: If your custom Render service name is different, replace `prepmatch` with your Render subdomain).*

---

## 📖 Overview

**PrepMatch** bridges the gap between candidate qualifications and job expectations. By uploading a resume (or providing a self-description) along with a target job description, PrepMatch leverages **Google Gemini AI** to produce an in-depth, structured interview preparation report and generates an ATS-friendly, tailored resume in downloadable PDF format.

### ✨ Key Features

- 🎯 **Match Score Evaluation**: Instant score (0–100%) quantifying alignment between candidate profile and job requirements.
- 💻 **7 Targeted Technical Questions**: Tailored questions covering programming concepts, architecture, and problem-solving, complete with interviewer intention and strategic answering guides.
- 🤝 **5 Behavioral Questions (STAR Method)**: Scenario-based questions assessing teamwork, leadership, conflict resolution, and soft skills.
- ⚠️ **Skill Gap Analysis**: Pinpoints missing competencies with categorized severity levels (`low`, `medium`, `high`).
- 📅 **Day-by-Day Preparation Roadmap**: Step-by-step action plan with daily topics, practice problems, and study tasks.
- 📄 **ATS-Optimized PDF Resume Generator**: Automated HTML generation turned into downloadable, print-perfect PDF resumes using **Puppeteer**.
- 🔐 **Dual-Mode Secure Authentication**: JWT authentication with support for both HTTP-only cookies and Authorization headers, including token blacklisting for safe logouts.
- 🐳 **Single-Container Full-Stack Architecture**: Monorepo served seamlessly through Express 5 with unified SPA client-side routing.

---

## 🛠️ Tech Stack & Architecture

### **Frontend**
| Technology | Description |
|---|---|
| **React 19** | Modern UI framework with hooks and functional components |
| **Vite 7** | Lightning-fast build tool and development server |
| **React Router 7** | Declarative client-side routing and protected routes |
| **Sass / SCSS** | Modular styling with responsive design |
| **Axios** | HTTP client with automatic JWT bearer interceptor |

### **Backend**
| Technology | Description |
|---|---|
| **Node.js 20 & Express 5** | High-performance backend API engine |
| **MongoDB & Mongoose 9** | NoSQL database modeling for users, reports, and token blacklists |
| **Google Gemini API (@google/genai)** | Structured schema intelligence with `gemini-2.5-flash` |
| **Zod & Zod-to-Json-Schema** | Strict type validation and JSON-schema output enforcement |
| **Puppeteer 24** | Headless Chrome engine for server-side HTML-to-PDF rendering |
| **pdf-parse** | Server-side extraction of resume text from uploaded PDF files |
| **Multer** | Multipart form-data parser for resume file uploads |
| **Bcrypt.js & JSON Web Tokens** | Password hashing and session authorization |

### **DevOps & Cloud**
| Technology | Description |
|---|---|
| **Docker** | Multi-stage container build with embedded Debian Chromium runtime |
| **Render** | Cloud hosting via Web Services or 1-Click Blueprints (`render.yaml`) |

---

## 📁 Project Structure

```text
prepMatch/
├── Dockerfile                  # Unified multi-stage Docker build for Render
├── render.yaml                 # Render Blueprint configuration (IaC)
├── RENDER_DEPLOYMENT.md        # Comprehensive deployment manual
├── .dockerignore               # Docker build exclusions
├── .gitattributes              # Git line-ending normalization (LF for shell scripts)
├── Backend/
│   ├── Dockerfile              # Backend standalone Dockerfile
│   ├── puppeteer.config.cjs    # Puppeteer browser cache configuration
│   ├── render-build.sh         # Linux build script with persistent Chromium cache
│   ├── server.js               # Express server entry point (PORT dynamic binding)
│   ├── package.json
│   └── src/
│       ├── app.js              # Express app setup, CORS, static SPA fallback
│       ├── config/             # Database connection (MongoDB)
│       ├── controllers/        # Auth and Interview business logic
│       ├── middlewares/        # JWT auth verification, file upload middleware
│       ├── models/             # User, InterviewReport, and Blacklist schemas
│       ├── routes/             # RESTful API endpoints
│       └── services/           # Gemini AI prompt engine & Puppeteer PDF generator
└── Frontend/
    ├── vite.config.js          # Vite config with proxy settings
    ├── package.json
    └── src/
        ├── App.jsx             # App layout & root providers
        ├── app.routes.jsx      # Route definitions & protected guards
        ├── features/
        │   ├── auth/           # Login, Register, Auth Context & API services
        │   ├── interview/      # Report generation, View Report, History & PDF
        │   └── landing/        # Interactive marketing & features showcase
        └── style/              # Global SCSS variables and mixins
```

---

## 🚀 Getting Started Locally

### Prerequisites

- **Node.js** (v18 or v20+)
- **MongoDB** (local instance or free cluster from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **Google Gemini API Key** (from [Google AI Studio](https://aistudio.google.com/app/apikey))

---

### 1. Clone the Repository

```bash
git clone https://github.com/GitH-Priyanshu/prepMatch.git
cd prepMatch
```

---

### 2. Configure Environment Variables

Create `.env` inside `Backend/`:

```env
# Backend/.env
PORT=3000
NODE_ENV=development
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/prepmatch?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key
GOOGLE_GENAI_API_KEY=your_gemini_api_key_here
CLIENT_URL=http://localhost:5173
```

*(Optional)* Create `.env` inside `Frontend/`:
```env
# Frontend/.env
VITE_API_URL=
```
*(Leave blank for local development since Vite automatically proxies `/api` to `http://localhost:3000`).*

---

### 3. Run with Local Node.js

#### Terminal 1 — Backend:
```bash
cd Backend
npm install
npm run dev
```
Backend runs on `http://localhost:3000`.

#### Terminal 2 — Frontend:
```bash
cd Frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`.

---

### 4. Run with Docker Locally

To run the exact production container locally:

```bash
docker build -t prepmatch .
docker run -p 10000:10000 \
  -e MONGO_URI="your_mongo_uri" \
  -e JWT_SECRET="your_jwt_secret" \
  -e GOOGLE_GENAI_API_KEY="your_gemini_api_key" \
  prepmatch
```
Open [http://localhost:10000](http://localhost:10000) in your browser.

---

## 📡 API Reference

### **Authentication (`/api/auth`)**
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register a new candidate account | No |
| `POST` | `/api/auth/login` | Log in and receive JWT token & session cookie | No |
| `GET` | `/api/auth/logout` | Clear session cookie and blacklist token | Yes |
| `GET` | `/api/auth/get-me` | Get currently authenticated profile | Yes |

### **Interview & Resume Intelligence (`/api/interview`)**
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/interview/` | Generate interview report from resume PDF & JD | Yes |
| `GET` | `/api/interview/` | Retrieve all past interview reports for candidate | Yes |
| `GET` | `/api/interview/report/:interviewId` | Fetch a specific interview report by ID | Yes |
| `POST` | `/api/interview/resume/pdf/:interviewReportId` | Generate & download tailored PDF resume | Yes |

### **Health & Diagnostics**
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Cloud health check endpoint returning server status |

---

## ☁️ Deployment on Render

This project contains native support for **Render**:

1. Log in to [Render Dashboard](https://dashboard.render.com).
2. Click **New +** $\rightarrow$ **Blueprint** (or **Web Service** using Docker runtime).
3. Connect `GitH-Priyanshu/prepMatch`.
4. Provide your `MONGO_URI` and `GOOGLE_GENAI_API_KEY`.
5. Deploy!

For a detailed walkthrough, consult [RENDER_DEPLOYMENT.md](./RENDER_DEPLOYMENT.md).

---

## 🛡️ License

This project is licensed under the [ISC License](LICENSE).

---

## 👨‍💻 Author

**Priyanshu**  
GitHub: [@GitH-Priyanshu](https://github.com/GitH-Priyanshu)
