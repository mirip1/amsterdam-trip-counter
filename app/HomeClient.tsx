"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

const bgImages = [
    '/images-juank/juank1.png',
    '/images-juank/juank2.png',
    '/images-juank/juank3.png',
    '/images-juank/juank4.png'
]

type Person = {
    id: number
    name: string
    score: number
}

type Props = {
    allTimePeople: Person[]
    competitivePeople: Person[]
}

export default function HomeClient({ allTimePeople, competitivePeople }: Props) {
    const [competitive, setCompetitive] = useState(false)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % bgImages.length)
        }, 4000)
        return () => clearInterval(interval)
    }, [])

    const people = competitive ? competitivePeople : allTimePeople

    return (
        <main className="app-container">
            <header className="app-header" style={{ position: 'relative', overflow: 'hidden' }}>
                {bgImages.map((src, index) => (
                    <div
                        key={src}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundImage: `url(${src})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            opacity: index === currentImageIndex ? 0.4 : 0,
                            transition: 'opacity 1.5s ease-in-out',
                            zIndex: 0,
                        }}
                    />
                ))}
                
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className="header-icon">😈​</div>
                    <h1 style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>Viaje a Amsterdam</h1>
                    <p className="header-sub" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>Seleccionate para apuntar el vicio</p>
                    <Link
                    href="/stats"
                    className="stats-link"
                    style={{
                        marginTop: '12px',
                        padding: '8px 16px',
                        background: 'var(--surface2)',
                        borderRadius: 'var(--radius-sm)',
                        color: 'var(--text)',
                        textDecoration: 'none',
                        fontSize: '14px',
                        fontWeight: 600,
                        border: '1px solid var(--border)',
                        display: 'inline-block'
                    }}
                >
                    Estadísticas Globales
                </Link>

                {/* Competitive mode toggle */}
                <div style={{
                    marginTop: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    justifyContent: 'center',
                }}>
                    <span style={{
                        fontSize: '13px',
                        fontWeight: 600,
                        color: competitive ? 'var(--text-muted, #888)' : 'var(--text)',
                        transition: 'color 0.2s',
                    }}>
                        Todo el tiempo
                    </span>

                    <button
                        onClick={() => setCompetitive(v => !v)}
                        aria-label="Activar modo competitivo"
                        style={{
                            position: 'relative',
                            width: '48px',
                            height: '26px',
                            borderRadius: '999px',
                            border: 'none',
                            cursor: 'pointer',
                            padding: 0,
                            background: competitive
                                ? 'linear-gradient(135deg, #ff416c, #ff4b2b)'
                                : 'var(--surface2)',
                            boxShadow: competitive
                                ? '0 0 12px rgba(255, 65, 108, 0.5)'
                                : 'none',
                            transition: 'background 0.3s, box-shadow 0.3s',
                            outline: 'none',
                        }}
                    >
                        <span style={{
                            position: 'absolute',
                            top: '3px',
                            left: competitive ? '25px' : '3px',
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            background: '#fff',
                            transition: 'left 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                            boxShadow: '0 1px 4px rgba(0,0,0,0.35)',
                        }} />
                    </button>

                    <span style={{
                        fontSize: '13px',
                        fontWeight: 700,
                        color: competitive ? '#ff6b6b' : 'var(--text-muted, #888)',
                        transition: 'color 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                    }}>
                        Modo Premio
                    </span>
                </div>

                {competitive && (
                    <p style={{
                        fontSize: '11px',
                        color: 'var(--text-muted, #888)',
                        marginTop: '6px',
                        opacity: 0.8,
                    }}>
                        29 mar – 3 abr 2026
                    </p>
                )}
                </div>
            </header>

            <ul className="people-list">
                {people.map((p, index) => {
                    let rankClass = ""
                    if (index === 0) rankClass = "rank-1"
                    else if (index === 1) rankClass = "rank-2"
                    else if (index === 2) rankClass = "rank-3"

                    return (
                        <li key={p.id}>
                            <Link href={`/person/${p.id}`} className={`person-card ${rankClass}`}>
                                <div className="person-rank">{index + 1}</div>
                                <span className="person-avatar">{p.name[0]}</span>
                                <span className="person-name">{p.name}</span>
                                <span className="person-score">{p.score} pts</span>
                                <span className="person-arrow">→</span>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </main>
    )
}
