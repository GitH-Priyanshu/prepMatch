import React, { useState, useEffect } from 'react'
import '../style/interview.scss'
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate, useParams } from 'react-router'
import { useAuth } from '../../auth/hooks/useAuth'

const NAV_ITEMS = [
    { id: 'technical', label: 'Technical Prep Plan', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>) },
    { id: 'behavioral', label: 'Behavioral Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>) },
    { id: 'roadmap', label: 'Preparation Road Map', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>) },
]

// ── Sub-components ────────────────────────────────────────────────────────────
const QuestionCard = ({ item, index }) => {
    const [ open, setOpen ] = useState(false)
    return (
        <div className='q-card'>
            <div className='q-card__header' onClick={() => setOpen(o => !o)}>
                <span className='q-card__index'>Q{index + 1}</span>
                <p className='q-card__question'>{item.question}</p>
                <span className={`q-card__chevron ${open ? 'q-card__chevron--open' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </span>
            </div>
            {open && (
                <div className='q-card__body'>
                    <div className='q-card__section'>
                        <span className='q-card__tag q-card__tag--intention'>Interviewer Intent</span>
                        <p>{item.intention}</p>
                    </div>
                    <div className='q-card__section'>
                        <span className='q-card__tag q-card__tag--answer'>Response Guidance</span>
                        <p>{item.answer}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

const RoadMapDay = ({ day }) => (
    <div className='roadmap-day'>
        <div className='roadmap-day__header'>
            <span className='roadmap-day__badge'>Day {day.day}</span>
            <h3 className='roadmap-day__focus'>{day.focus}</h3>
        </div>
        <ul className='roadmap-day__tasks'>
            {day.tasks.map((task, i) => (
                <li key={i}>
                    <span className='roadmap-day__bullet' />
                    {task}
                </li>
            ))}
        </ul>
    </div>
)

// ── Main Component ────────────────────────────────────────────────────────────
const Interview = () => {
    const [ activeNav, setActiveNav ] = useState('technical')
    const [ downloading, setDownloading ] = useState(false)
    const { report, getReportById, loading, getResumePdf } = useInterview()
    const { user, handleLogout } = useAuth()
    const { interviewId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        }
    }, [ interviewId ])

    if (loading || !report) {
        return (
            <main className='loading-screen'>
                <div className='loading-spinner'></div>
                <h1>Fetching strategy analysis...</h1>
                <p>Retrieving your targeted preparation blueprints...</p>
            </main>
        )
    }

    const scoreColor =
        report.matchScore >= 80 ? 'score--high' :
            report.matchScore >= 60 ? 'score--mid' : 'score--low'

    const scoreLabel =
        report.matchScore >= 80 ? 'Strong match for this role' :
            report.matchScore >= 60 ? 'Moderate match for this role' : 'Weak match for this role'

    return (
        <div className='interview-page'>
            {/* Dashboard Navbar */}
            <nav className='dashboard-navbar'>
                <div className='navbar-container'>
                    <div className='navbar-logo' onClick={() => navigate('/')}>
                        <span className='logo-icon'>
                            <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <linearGradient id="intLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stop-color="#5850ec" />
                                        <stop offset="100%" stop-color="#10b981" />
                                    </linearGradient>
                                </defs>
                                <circle cx="13" cy="16" r="8" stroke="url(#intLogoGrad)" strokeWidth="2.5" strokeOpacity="0.8" />
                                <circle cx="19" cy="16" r="8" stroke="url(#intLogoGrad)" strokeWidth="2.5" strokeOpacity="0.8" />
                                <path d="M12 16.5L14.5 19L20 13" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                        <span style={{ textTransform: 'none' }}>prepMatch</span>
                    </div>
                    <div className='navbar-user-actions'>
                        <button className='button secondary-button' style={{ paddingInline: '1rem', paddingBlock: '0.45rem' }} onClick={() => navigate('/dashboard')}>
                            Back to Dashboard
                        </button>
                        <button className='button ghost-button' style={{ paddingInline: '1rem', paddingBlock: '0.45rem' }} onClick={handleLogout}>
                            Sign Out
                        </button>
                    </div>
                </div>
            </nav>

            <div className='interview-layout'>
                {/* ── Left Nav ── */}
                <nav className='interview-nav'>
                    <div className="nav-content">
                        <p className='interview-nav__label'>Analysis Blueprint</p>
                        {NAV_ITEMS.map(item => (
                            <button
                                key={item.id}
                                className={`interview-nav__item ${activeNav === item.id ? 'interview-nav__item--active' : ''}`}
                                onClick={() => setActiveNav(item.id)}
                            >
                                <span className='interview-nav__icon'>{item.icon}</span>
                                {item.label}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={async () => {
                            try {
                                setDownloading(true)
                                await getResumePdf(interviewId)
                            } catch (err) {
                                alert(err.message || "Failed to download resume. Please try again.")
                            } finally {
                                setDownloading(false)
                            }
                        }}
                        disabled={downloading}
                        className='button primary-button' >
                        <svg height={"0.8rem"} style={{ marginRight: "0.5rem" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                        {downloading ? "Downloading..." : "Download Resume"}
                    </button>
                </nav>

                <div className='interview-divider' />

                {/* ── Center Content ── */}
                <main className='interview-content'>
                    {activeNav === 'technical' && (
                        <section>
                            <div className='content-header'>
                                <h2>Technical Evaluation Plan</h2>
                                <span className='content-header__count'>{report.technicalQuestions?.length || 0} questions generated</span>
                            </div>
                            <div className='q-list'>
                                {report.technicalQuestions && report.technicalQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'behavioral' && (
                        <section>
                            <div className='content-header'>
                                <h2>Behavioral STAR Questions</h2>
                                <span className='content-header__count'>{report.behavioralQuestions?.length || 0} questions generated</span>
                            </div>
                            <div className='q-list'>
                                {report.behavioralQuestions && report.behavioralQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'roadmap' && (
                        <section>
                            <div className='content-header'>
                                <h2>Preparation Road Map</h2>
                                <span className='content-header__count'>{report.preparationPlan?.length || 0}-day plan generated</span>
                            </div>
                            <div className='roadmap-list'>
                                {report.preparationPlan && report.preparationPlan.map((day) => (
                                    <RoadMapDay key={day.day} day={day} />
                                ))}
                            </div>
                        </section>
                    )}
                </main>

                <div className='interview-divider' />

                {/* ── Right Sidebar ── */}
                <aside className='interview-sidebar'>
                    {/* Match Score */}
                    <div className='match-score'>
                        <p className='match-score__label'>Position Match</p>
                        <div className={`match-score__ring ${scoreColor}`}>
                            <span className='match-score__value'>{report.matchScore}</span>
                            <span className='match-score__pct'>%</span>
                        </div>
                        <p className={`match-score__sub ${scoreColor}`}>{scoreLabel}</p>
                    </div>

                    <div className='sidebar-divider' />

                    {/* Skill Gaps */}
                    {report.skillGaps && report.skillGaps.length > 0 && (
                        <div className='skill-gaps'>
                            <p className='skill-gaps__label'>Qualifications Gap</p>
                            <div className='skill-gaps__list'>
                                {report.skillGaps.map((gap, i) => (
                                    <span key={i} className={`skill-tag skill-tag--${gap.severity}`}>
                                        {gap.skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </aside>
            </div>
        </div>
    )
}

export default Interview