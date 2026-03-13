"use client"

import { useState } from "react"

const ITEM_EMOJI: Record<string, string> = {
    cervezas: "🍺",
    chupitos: "🥃",
    setas: "🍄",
    copas: "🍹",
    porros: "🌿",
}

const VERBS: Record<string, string> = {
    cervezas: "bebido",
    copas: "bebido",
    chupitos: "bebido",
    porros: "fumado",
    setas: "consumido",
}

export default function StatsView({ stats }: { stats: any[] }) {
    const [selectedIndex, setSelectedIndex] = useState(0)

    if (!stats || stats.length === 0) return null

    const currentStat = stats[selectedIndex]
    const { item, rankings } = currentStat
    const totalCount = rankings.reduce((sum: number, r: any) => sum + r.count, 0)
    const verb = VERBS[item.name.toLowerCase()] || "consumido"

    return (
        <div className="stats-container" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="category-selector" style={{ display: 'flex', gap: '8px', width: '100%' }}>
                {stats.map((s, index) => (
                    <button
                        key={s.item.id}
                        onClick={() => setSelectedIndex(index)}
                        style={{
                            flex: 1,
                            fontSize: '20px',
                            padding: '10px 0',
                            background: index === selectedIndex ? 'var(--accent)' : 'var(--surface)',
                            color: index === selectedIndex ? '#fff' : 'var(--text)',
                            border: index === selectedIndex ? 'none' : '1px solid var(--border)',
                            borderRadius: 'var(--radius-sm)',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.15s',
                        }}
                    >
                        <span>{ITEM_EMOJI[s.item.name.toLowerCase()] ?? "🎯"}</span>
                        {/* <span style={{ textTransform: 'capitalize' }}>{s.item.name}</span> */}
                    </button>
                ))}
            </div>

            <section className="category-section">
                <div style={{ textAlign: 'center', padding: '16px', background: 'var(--surface2)', borderRadius: 'var(--radius)', marginBottom: '24px' }}>
                    <p style={{ fontSize: '15px', color: 'var(--text-muted)' }}>
                        Se han {verb} un total de
                    </p>
                    <p style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text)', marginTop: '4px' }}>
                        {totalCount} <span style={{ textTransform: 'lowercase', color: 'var(--accent)' }}>{item.name}</span>
                    </p>
                </div>

                <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '24px' }}>{ITEM_EMOJI[item.name.toLowerCase()] ?? "🎯"}</span>
                    <span style={{ textTransform: 'capitalize' }}>Ranking de {item.name}</span>
                </h2>

                <ul className="people-list">
                    {rankings.map(({ person, count }: any, index: number) => (
                        <li key={person.id} className="person-card" style={{ padding: '12px 16px', cursor: 'default', transform: 'none', background: 'var(--surface)' }}>
                            <div className="person-rank" style={{ color: 'var(--text-muted)' }}>{index + 1}</div>
                            <span className="person-avatar" style={{ width: '36px', height: '36px', fontSize: '15px' }}>{person.name[0]}</span>
                            <span className="person-name" style={{ fontSize: '16px' }}>{person.name}</span>
                            <span className="person-score" style={{ color: 'var(--text)', fontWeight: 800 }}>{count}</span>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    )
}
