import { getPersonWithCounts, getPersonChartData } from "@/lib/data"
import { notFound } from "next/navigation"
import Link from "next/link"
import AdjustButtons from "./AdjustButtons"
import ConsumptionChart from "./ConsumptionChart"

type ItemWithCount = { id: number; name: string; value: number; count: number }

const ITEM_EMOJI: Record<string, string> = {
    cervezas: "🍺",
    chupitos: "🥃",
    setas: "🍄",
    copas: "🍹",
    porros: "🌿",
}

export default async function PersonPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const { person, items } = await getPersonWithCounts(Number(id))
    const chartData = await getPersonChartData(Number(id))

    if (!person) notFound()

    return (
        <main className="app-container">
            <header className="app-header">
                <Link href="/" className="back-link">← Back</Link>
                <div className="header-icon">{person.name[0]}</div>
                <h1>{person.name}</h1>
            </header>

            <section className="items-grid">
                {items.map((item: ItemWithCount) => (
                    <div key={item.id} className="item-card">
                        <div className="item-info">
                            <span className="item-emoji">
                                {ITEM_EMOJI[item.name.toLowerCase()] ?? "🎯"}
                            </span>
                            <span className="item-name">{item.name}</span>
                        </div>
                        <AdjustButtons personId={person.id} itemId={item.id} count={item.count} />
                    </div>
                ))}
            </section>

            <section className="totals-section">
                <h2 className="totals-title">Puntuación</h2>
                <div className="score-value">
                    {items.reduce((sum: number, item: ItemWithCount) => sum + item.count * item.value, 0)} pts
                </div>
            </section>

            <ConsumptionChart data={chartData} items={items} />
        </main>
    )
}
