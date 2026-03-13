import { getGlobalStats } from "@/lib/data"
import Link from "next/link"
import StatsView from "./StatsView"

export default async function StatsPage() {
    const stats = await getGlobalStats()

    return (
        <main className="app-container">
            <header className="app-header">
                <Link href="/" className="back-link">← Back</Link>
                <div className="header-icon">📊</div>
                <h1>Estadísticas Globales</h1>
                <p className="header-sub">Ranking por categoría de consumición</p>
            </header>

            <StatsView stats={stats} />
        </main>
    )
}
