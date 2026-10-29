import axios from "axios"

const getApiBaseUrl = () => {
    let url = import.meta.env.VITE_API_URL || "/"
    if (url !== "/" && !url.startsWith("http://") && !url.startsWith("https://")) {
        url = `https://${url}`
    }
    return url
}

const api = axios.create({
    baseURL: getApiBaseUrl(),
    withCredentials: true
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export async function register({ username, email, password }) {

    try {
        const response = await api.post('/api/auth/register', {
            username, email, password
        })

        if (response.data?.token) {
            localStorage.setItem("token", response.data.token)
        }

        return response.data

    } catch (err) {
        const message = err?.response?.data?.message || "Registration failed. Please try again."
        throw new Error(message)
    }

}

export async function login({ email, password }) {

    try {

        const response = await api.post("/api/auth/login", {
            email, password
        })

        if (response.data?.token) {
            localStorage.setItem("token", response.data.token)
        }

        return response.data

    } catch (err) {
        const message = err?.response?.data?.message || "Login failed. Please check your credentials."
        throw new Error(message)
    }

}

export async function logout() {
    try {

        const response = await api.get("/api/auth/logout")
        localStorage.removeItem("token")
        return response.data

    } catch (err) {
        localStorage.removeItem("token")
        throw err
    }
}

export async function getMe() {

    try {

        const response = await api.get("/api/auth/get-me")

        return response.data

    } catch (err) {
        // Not authenticated — don't throw, just return null
        return null
    }

}
