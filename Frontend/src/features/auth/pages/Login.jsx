import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'

const Login = () => {
    const { loading, handleLogin, error } = useAuth()
    const navigate = useNavigate()

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        const success = await handleLogin({ email, password })
        if (success) navigate('/dashboard')
    }

    return (
        <div className="auth-split-layout">
            {/* Left Brand Side */}
            <div className="auth-brand-side">
                <div className="brand-logo" onClick={() => navigate('/')}>
                    <span className="logo-icon">
                        <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <linearGradient id="loginLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stop-color="#5850ec" />
                                    <stop offset="100%" stop-color="#10b981" />
                                </linearGradient>
                            </defs>
                            <circle cx="13" cy="16" r="8" stroke="url(#loginLogoGrad)" strokeWidth="2.5" strokeOpacity="0.8" />
                            <circle cx="19" cy="16" r="8" stroke="url(#loginLogoGrad)" strokeWidth="2.5" strokeOpacity="0.8" />
                            <path d="M12 16.5L14.5 19L20 13" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </span>
                    <span style={{ textTransform: 'none' }}>prepMatch</span>
                </div>

                <div className="brand-testimonial">
                    <span className="quote-icon">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.748-9.762 9-9.762v3.361c-2.906 0-4.573 2.116-4.573 5.181h4.573V21h-9zm-12 0v-7.391c0-5.704 3.748-9.762 9-9.762v3.361c-2.906 0-4.573 2.116-4.573 5.181h4.573V21h-9z"/></svg>
                    </span>
                    <blockquote>
                        "Preparation creates confidence. prepMatch gave me structured blueprints so I didn't waste time on fundamentals the hiring managers wouldn't ask about."
                    </blockquote>
                    <div className="author">
                        <span className="name">Marcus Aurelius</span>
                        <span className="role">Incoming Frontend Lead at Stripe</span>
                    </div>
                </div>

                <div className="brand-footer">
                    &copy; 2026 Signal Inc. All rights reserved.
                </div>
            </div>

            {/* Right Form Side */}
            <div className="auth-form-side">
                <div className="form-container">
                    <div className="form-header">
                        <h1>Welcome back</h1>
                        <p>Sign in to access your interview blueprints.</p>
                    </div>

                    {/* Google OAuth Option */}
                    <button className="oauth-button">
                        <svg viewBox="0 0 24 24">
                            <path fill="#EA4335" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.53 15.01 0 12 0 7.37 0 3.4 2.66 1.45 6.55l3.87 3a7.16 7.16 0 0 1 6.68-4.51z"/>
                            <path fill="#4285F4" d="M23.45 12.27c0-.82-.07-1.6-.2-2.38H12v4.51h6.42a5.48 5.48 0 0 1-2.38 3.6l3.87 3c2.26-2.09 3.54-5.17 3.54-8.73z"/>
                            <path fill="#FBBC05" d="M5.32 14.51a7.17 7.17 0 0 1 0-4.51l-3.87-3A11.94 11.94 0 0 0 0 12c0 1.92.45 3.74 1.45 5.51l3.87-3z"/>
                            <path fill="#34A853" d="M12 24c3.24 0 5.97-1.07 7.96-2.91l-3.87-3a7.17 7.17 0 0 1-10.77-4.51l-3.87 3A11.94 11.94 0 0 0 12 24z"/>
                        </svg>
                        Continue with Google
                    </button>

                    <div className="divider">or use credentials</div>

                    {error && <div className="error-card">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                id="email"
                                name="email"
                                placeholder="name@company.com"
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                id="password"
                                name="password"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <button className="button primary-button" disabled={loading}>
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    <p className="form-footer">
                        Don't have an account? <Link to="/register">Register</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login