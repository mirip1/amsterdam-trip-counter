import { getPeopleWithScores } from "@/lib/data"
import Link from "next/link"

export default async function Home() {
    const people = await getPeopleWithScores()

    return (
        <main className="app-container">
            <header className="app-header">
                <div className="header-icon">😈​</div>
                <h1>Viaje a Amsterdam</h1>
                <p className="header-sub">Seleccionate para apuntar el vicio</p>
                <Link href="/stats" className="stats-link" style={{ marginTop: '12px', padding: '8px 16px', background: 'var(--surface2)', borderRadius: 'var(--radius-sm)', color: 'var(--text)', textDecoration: 'none', fontSize: '14px', fontWeight: 600, border: '1px solid var(--border)', display: 'inline-block' }}>
                    Estadísticas Globales
                </Link>
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