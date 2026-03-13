"use client"

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"

const COLORS = {
    cervezas: "#facc15", // yellow
    setas: "#ef4444",    // red
    chupitos: "#f97316", // orange
    copas: "#ec4899",    // pink
    porros: "#22c55e",   // green
}

export default function ConsumptionChart({ data, items }: { data: any[], items: any[] }) {
    if (!data || data.length === 0) return null

    return (
        <div className="chart-container" style={{
            width: '100%', height: 300, marginTop: '24px', marginBottom: '30px'
        }}>
            <h3 className="chart-title" style={{ textAlign: 'center', marginBottom: '16px', color: 'var(--text-muted)' }
            } >
                Consumo por día
            </ h3>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                    <XAxis dataKey="date" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                    <Tooltip
                        contentStyle={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px' }}
                        itemStyle={{ color: 'var(--text)' }}
                    />
                    <Legend iconType="square" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />

                    {items.map(item => (
                        <Bar
                            key={item.id}
                            dataKey={item.name}
                            name={item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                            fill={COLORS[item.name as keyof typeof COLORS] || "#8884d8"}
                            radius={[4, 4, 0, 0]}
                        />
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
