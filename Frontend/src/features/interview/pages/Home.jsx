import React, { useState, useRef } from 'react'
import "../style/home.scss"
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'
import { useAuth } from '../../auth/hooks/useAuth'

const Home = () => {
    const { loading, generateReport, reports } = useInterview()
    const { user, handleLogout } = useAuth()
    const [ jobDescription, setJobDescription ] = useState("")
    const [ selfDescription, setSelfDescription ] = useState("")
    const [ selectedFile, setSelectedFile ] = useState(null)
    const resumeInputRef = useRef()

    const [ error, setError ] = useState("")
    const navigate = useNavigate()

    const handleGenerateReport = async () => {
        try {
            setError("")
            const resumeFile = resumeInputRef.current?.files[ 0 ] || selectedFile
            if (!resumeFile && !selfDescription) {
                setError("Please upload a resume or provide a quick self-description")
                return
            }
            if (!jobDescription) {
                setError("Please target a job description")
                return
            }
            const data = await generateReport({ jobDescription, selfDescription, resumeFile })
            if (data?._id) {
                navigate(`/interview/${data._id}`)
            }
        } catch (err) {
            console.error(err)
            setError(err?.response?.data?.message || err?.message || "Failed to generate interview plan. Please check your credentials or API keys.")
        }
    }

    if (loading) {
        return (
            <main className='loading-screen'>
                <div className='loading-spinner'></div>
                <h1>Analyzing requirements & mapping capabilities...</h1>
                <p>Generating your interview preparation strategy using Gemini 3 Flash (approx 30s)</p>
            </main>
        )
    }

    return (
        <div className='home-page'>
            {/* Dashboard Navbar */}
            <nav className='dashboard-navbar'>
                <div className='navbar-container'>
                    <div className='navbar-logo' onClick={() => navigate('/')}>
                        <span className='logo-icon'>
                            <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <linearGradient id="homeLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stop-color="#5850ec" />
                                        <stop offset="100%" stop-color="#10b981" />
                                    </linearGradient>
                                </defs>
                                <circle cx="13" cy="16" r="8" stroke="url(#homeLogoGrad)" strokeWidth="2.5" strokeOpacity="0.8" />
                                <circle cx="19" cy="16" r="8" stroke="url(#homeLogoGrad)" strokeWidth="2.5" strokeOpacity="0.8" />
                                <path d="M12 16.5L14.5 19L20 13" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                        <span style={{ textTransform: 'none' }}>prepMatch</span>
                    </div>
                    <div className='navbar-user-actions'>
                        {user && (
                            <span className='user-greeting'>
                                Welcome, <strong>{user.username}</strong>
                            </span>
                        )}
                        <button className='button secondary-button' style={{ paddingInline: '1rem', paddingBlock: '0.45rem' }} onClick={handleLogout}>
                            Sign Out
                        </button>
                    </div>
                </div>
            </nav>

            <div className='dashboard-content'>
                {/* Page Header */}
                <header className='page-header'>
                    <h1>Create Your Target Strategy</h1>
                    <p>Map a job description against your profile to generate targeted technical and behavioral preparation Blueprints.</p>
                </header>

                {/* Main Card Form */}
                <div className='interview-card'>
                    <div className='interview-card__body'>

                        {/* Left Panel - Job Description */}
                        <div className='panel panel--left'>
                            <div className='panel__header'>
                                <span className='panel-icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                                </span>
                                <h2>Target Job Description</h2>
                                <span className='badge badge--required'>Required</span>
                            </div>
                            <textarea
                                value={jobDescription}
                                onChange={(e) => { setJobDescription(e.target.value) }}
                                className='panel__textarea'
                                placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Stripe requires proficiency in React, TypeScript, and large-scale performance optimization...'`}
                                maxLength={5000}
                            />
                            <div className='char-counter'>{jobDescription.length} / 5000 chars</div>
                        </div>

                        {/* Vertical Divider */}
                        <div className='panel-divider' />

                        {/* Right Panel - Profile */}
                        <div className='panel panel--right'>
                            <div className='panel__header'>
                                <span className='panel-icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                </span>
                                <h2>Your Qualifications</h2>
                            </div>

                            {/* Upload Resume */}
                            <div className='upload-section'>
                                <label className='section-label'>
                                    Upload Resume
                                    <span className='badge badge--best'>Best Results</span>
                                </label>
                                <label className={`dropzone ${selectedFile ? 'selected' : ''}`} htmlFor='resume'>
                                    <span className='dropzone__icon'>
                                        {selectedFile ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /></svg>
                                        )}
                                    </span>
                                    <p className='dropzone__title'>{selectedFile ? selectedFile.name : 'Click to upload or drag & drop'}</p>
                                    <p className='dropzone__subtitle'>{selectedFile ? `Size: ${(selectedFile.size / 1024).toFixed(1)} KB` : 'PDF or DOCX (Max 5MB)'}</p>
                                    <input 
                                        onChange={(e) => setSelectedFile(e.target.files[0])}
                                        ref={resumeInputRef} 
                                        hidden 
                                        type='file' 
                                        id='resume' 
                                        name='resume' 
                                        accept='.pdf,.docx' 
                                    />
                                </label>
                            </div>

                            {/* OR Divider */}
                            <div className='or-divider'><span>OR</span></div>

                            {/* Quick Self-Description */}
                            <div className='self-description'>
                                <label className='section-label' htmlFor='selfDescription'>Quick Self-Description</label>
                                <textarea
                                    value={selfDescription}
                                    onChange={(e) => { setSelfDescription(e.target.value) }}
                                    id='selfDescription'
                                    name='selfDescription'
                                    className='panel__textarea panel__textarea--short'
                                    placeholder="Briefly describe your experience, key skills, and stack if you don't have a resume handy..."
                                />
                            </div>

                            {/* Info Box */}
                            <div className='info-box'>
                                <span className='info-box__icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                                </span>
                                <p>Provide either a PDF resume or a self-description to analyze capabilities against target requirements.</p>
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div style={{ padding: '1rem 2.5rem', color: '#ff4d4f', backgroundColor: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '8px', margin: '0 2.5rem 1.5rem 2.5rem', textAlign: 'center', fontSize: '0.825rem', fontWeight: '500' }}>
                            {error}
                        </div>
                    )}

                    {/* Card Footer */}
                    <div className='interview-card__footer'>
                        <span className='footer-info'>AI Analysis Engine &bull; Generates in 30s</span>
                        <button
                            onClick={handleGenerateReport}
                            className='generate-btn'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
                            Generate My Strategy
                        </button>
                    </div>
                </div>

                {/* Recent Reports List */}
                {reports.length > 0 && (
                    <section className='recent-reports'>
                        <h2>My Target Blueprints</h2>
                        <ul className='reports-list'>
                            {reports.map(report => (
                                <li key={report._id} className='report-item' onClick={() => navigate(`/interview/${report._id}`)}>
                                    <h3>{report.title || 'Untitled Strategy'}</h3>
                                    <p className='report-meta'>Generated {new Date(report.createdAt).toLocaleDateString()}</p>
                                    <p className={`match-score ${report.matchScore >= 80 ? 'score--high' : report.matchScore >= 60 ? 'score--mid' : 'score--low'}`}>
                                        Match Score: {report.matchScore}%
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
            </div>

            {/* Page Footer */}
            <footer className='page-footer'>
                <a href='#'>Privacy Policy</a>
                <a href='#'>Terms of Service</a>
                <a href='#'>Help Center</a>
            </footer>
        </div>
    )
}

export default Home