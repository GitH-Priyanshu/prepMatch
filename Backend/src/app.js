const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const path = require("path")
const fs = require("fs")

const app = express()

app.use(express.json())
app.use(cookieParser())

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://localhost:4173",
    process.env.CLIENT_URL
].filter(Boolean)

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (e.g. mobile apps, curl, same-origin)
        if (!origin) return callback(null, true)
        
        if (allowedOrigins.includes(origin) || process.env.CLIENT_URL === "*") {
            return callback(null, true)
        }
        
        // Also automatically permit any .onrender.com domain to ease deployment
        if (origin.endsWith(".onrender.com")) {
            return callback(null, true)
        }
        
        return callback(null, true) // Allow other origins with credentials
    },
    credentials: true
}))

/* Health check endpoint for Render */
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() })
})
app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() })
})

/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")

/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)

/* Serve built frontend if available (Full-stack single service mode) */
const frontendDist = path.join(__dirname, "../../Frontend/dist")
if (fs.existsSync(frontendDist)) {
    app.use(express.static(frontendDist))
    app.get("*", (req, res, next) => {
        if (req.path.startsWith("/api")) return next()
        res.sendFile(path.join(frontendDist, "index.html"))
    })
}

module.exports = app
