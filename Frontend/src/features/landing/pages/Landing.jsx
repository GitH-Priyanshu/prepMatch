import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../../auth/hooks/useAuth'
import '../style/landing.scss'

const Landing = () => {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [ demoStep, setDemoStep ] = useState(1)

    // Automatically transition the interactive product demo steps on a loop
    useEffect(() => {
        const interval = setInterval(() => {
            setDemoStep(current => {
                if (current === 1) return 2
                if (current === 2) return 3
                return 1
            })
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className='landing-page'>
            {/* Header */}
            <header className='landing-header'>
                <div className='logo-container' onClick={() => navigate('/')}>
                    <span className='logo-icon'>
                        <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stop-color="#5850ec" />
                                    <stop offset="100%" stop-color="#10b981" />
                                </linearGradient>
                            </defs>
                            <circle cx="13" cy="16" r="8" stroke="url(#logoGrad)" strokeWidth="2.5" strokeOpacity="0.8" />
                            <circle cx="19" cy="16" r="8" stroke="url(#logoGrad)" strokeWidth="2.5" strokeOpacity="0.8" />
                            <path d="M12 16.5L14.5 19L20 13" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </span>
                    <span style={{ textTransform: 'none' }}>prepMatch</span>
                </div>
                <nav className='nav-links'>
                    <a href='#how-it-works'>How it works</a>
                </nav>
                <div className='auth-actions'>
                    {user ? (
                        <button className='button primary-button' onClick={() => navigate('/dashboard')}>
                            Go to Dashboard
                        </button>
                    ) : (
                        <>
                            <Link to='/login' className='button ghost-button'>Sign In</Link>
                            <Link to='/register' className='button primary-button'>Get Started</Link>
                        </>
                    )}
                </div>
            </header>

            {/* Hero Section */}
            <section className='landing-hero'>
                <div className='hero-badge'>Next-Gen Interview Intelligence</div>
                <h1>Walk into your next interview with <span>absolute clarity</span>, not anxiety</h1>
                <p className='hero-subtitle'>
                    Stop relying on generic question lists. prepMatch parses targeted job requirements against your unique resume to build a tailored technical and behavioral preparation blueprint.
                </p>
                <div className='hero-cta'>
                    {user ? (
                        <button className='button primary-button' style={{ paddingScale: '1.5rem 3rem' }} onClick={() => navigate('/dashboard')}>
                            Go to Dashboard
                        </button>
                    ) : (
                        <>
                            <Link to='/register' className='button primary-button' style={{ paddingInline: '2rem' }}>Start Free Trial</Link>
                            <a href='#demo' className='button secondary-button' style={{ paddingInline: '2rem' }}>Watch Live Flow</a>
                        </>
                    )}
                </div>
            </section>

            {/* Interactive Live Demo */}
            <section className='demo-showcase' id='demo'>
                <div className='demo-window'>
                    <div className='demo-header'>
                        <div className='window-dots'>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <div className='window-title'>prepMatch Interactive Walkthrough</div>
                        <div className='demo-steps'>
                            <span className={`step-indicator ${demoStep === 1 ? 'step-indicator--active' : ''}`}>1. Inputs</span>
                            <span className={`step-indicator ${demoStep === 2 ? 'step-indicator--active' : ''}`}>2. Analyzing</span>
                            <span className={`step-indicator ${demoStep === 3 ? 'step-indicator--active' : ''}`}>3. Strategy Report</span>
                        </div>
                    </div>
                    <div className='demo-body'>
                        {/* Step 1: Drag & Drop Inputs */}
                        {demoStep === 1 && (
                            <div className='demo-step-1'>
                                <div className='demo-panel-left'>
                                    <label>1. Paste Job Requirements</label>
                                    <div className='mock-textarea'>
                                        We are looking for a Senior React Engineer... Must have deep knowledge of State Management (Zundstand, Redux) and performance profiling.
                                    </div>
                                </div>
                                <div className='demo-panel-right'>
                                    <label>2. Upload Resume</label>
                                    <div className='mock-dropzone active-file'>
                                        <div className='dropzone-icon'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                                        </div>
                                        <p>resume_frontend_dev.pdf</p>
                                        <span>Ready for analysis (120 KB)</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Spinner Generation */}
                        {demoStep === 2 && (
                            <div className='demo-step-2'>
                                <div className='mock-spinner'></div>
                                <h3>Extracting qualifications & modeling gaps</h3>
                                <p>Mapping resume attributes against core job requirements using Gemini-2.5-Flash...</p>
                            </div>
                        )}

                        {/* Step 3: Interactive Dashboard */}
                        {demoStep === 3 && (
                            <div className='demo-step-3'>
                                <div className='mock-report-main'>
                                    <div className='mock-tabs'>
                                        <span className='mock-tab mock-tab--active'>Technical Preparation Plan</span>
                                        <span className='mock-tab'>Behavioral Road Map</span>
                                    </div>
                                    <div className='mock-question'>
                                        <div className='mock-q-header'>
                                            <span>Q1</span>
                                            <p>How do you optimize React applications to prevent unnecessary component re-renders?</p>
                                        </div>
                                        <div className='mock-q-body'>
                                            <div className='tag'>Why they ask this</div>
                                            <p>The job description requests experience with large-scale rendering. The interviewer wants to assess memory profiling and hook triggers (useMemo, useCallback).</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='mock-report-side'>
                                    <div className='mock-score-section'>
                                        <h4>Match Score</h4>
                                        <div className='mock-score-ring'>88%</div>
                                        <p>Strong Fit</p>
                                    </div>
                                    <div className='mock-gaps-section'>
                                        <h4>Severity Gap</h4>
                                        <div className='mock-tag-list'>
                                            <span>Jest Testing</span>
                                            <span>Docker Config</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Features list */}
            <section className='landing-features' id='features'>
                <div className='features-header'>
                    <h2>Tailored tools for elite preparation</h2>
                    <p>Designed around the actual requirements of high-caliber engineering roles.</p>
                </div>
                <div className='features-grid'>
                    <div className='feature-card'>
                        <div className='feature-icon'>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                        </div>
                        <h3>Deep Skill Mapping</h3>
                        <p>Automatically isolates skill requirements from the job description and points out gaps between the target role and your resume.</p>
                    </div>
                    <div className='feature-card'>
                        <div className='feature-icon'>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                        </div>
                        <h3>Intent-Based Questions</h3>
                        <p>We generate technical and behavioral questions tailored directly to your profile, detailing exactly why the interviewer is asking and how to respond.</p>
                    </div>
                    <div className='feature-card'>
                        <div className='feature-icon'>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                        </div>
                        <h3>Day-by-Day Roadmap</h3>
                        <p>A structured, customized preparation timeline designed to help you cover high-priority gaps and practice mock interviews systematically.</p>
                    </div>
                </div>
            </section>

            {/* Showcase details */}
            <section className='landing-showcase' id='how-it-works'>
                <div className='showcase-content'>
                    <div className='showcase-text'>
                        <span className='badge'>Day-by-Day Action</span>
                        <h2>A structured blueprint built for your schedule</h2>
                        <p>
                            Don't guess what to study next. prepMatch builds a daily calendar mapping exactly what topics to study, how to bridge experience deficits, and what mock answers to write out.
                        </p>
                        <ul>
                            <li>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                                Day 1: Bridging advanced framework architectures
                            </li>
                            <li>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                                Day 2: Refining scale-out system design questions
                            </li>
                            <li>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                                Day 3: Mock behavioral preparation under STAR
                            </li>
                        </ul>
                    </div>
                    <div className='showcase-visual'>
                        <div className='plan-preview'>
                            <div className='plan-day'>
                                <h4>Day 1: Advanced State & Rerendering</h4>
                                <p>Implement a clean counter store in Zustand, profiling render commits to target the performance gaps highlighted in the description.</p>
                            </div>
                            <div className='plan-day'>
                                <h4>Day 2: System Design & Caching</h4>
                                <p>Draft architecture diagrams for a multi-region pub-sub cache, addressing the database scalability expectations of the target team.</p>
                            </div>
                            <div className='plan-day'>
                                <h4>Day 3: STAR Conflict Resolution Mock</h4>
                                <p>Outline the narrative describing your technical trade-off disagreement with the product leads using our behavioral framework.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            {/* CTA Section */}
            <section className='landing-cta' id='pricing'>
                <div className='cta-card'>
                    <h2>Build your preparation blueprint now</h2>
                    <p>Start preparing with custom, role-specific questions and targeted resume analysis in less than a minute.</p>
                    <Link to='/register' className='button primary-button' style={{ paddingInline: '2.5rem', paddingBlock: '0.85rem' }}>Create Your Strategy</Link>
                </div>
            </section>

            {/* Footer */}
            <footer className='landing-footer'>
                <div className='footer-content'>
                    <div className='footer-logo'>
                        <span className='logo-icon'>
                            <svg width="18" height="18" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <linearGradient id="footerLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stop-color="#5850ec" />
                                        <stop offset="100%" stop-color="#10b981" />
                                    </linearGradient>
                                </defs>
                                <circle cx="13" cy="16" r="8" stroke="url(#footerLogoGrad)" strokeWidth="2.5" strokeOpacity="0.8" />
                                <circle cx="19" cy="16" r="8" stroke="url(#footerLogoGrad)" strokeWidth="2.5" strokeOpacity="0.8" />
                                <path d="M12 16.5L14.5 19L20 13" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                        <span style={{ textTransform: 'none' }}>prepMatch</span>
                    </div>
                    <p className='copyright'>&copy; 2026 prepMatch Inc. All rights reserved.</p>
                    <div className='footer-links'>
                        <a href='#'>Privacy Policy</a>
                        <a href='#'>Terms of Service</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Landing
