"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

interface Props {
    personId: number
    itemId: number
    count: number
}

export default function AdjustButtons({ personId, itemId, count }: Props) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    async function add() {
        setLoading(true)
        await fetch("/api/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ personId, itemId }),
        })
        router.refresh()
        setLoading(false)
    }

    async function subtract() {
        if (count <= 0) return
        setLoading(true)
        await fetch("/api/subtract", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ personId, itemId }),
        })
        router.refresh()
        setLoading(false)
    }

    return (
        <div className="adjust-buttons">
            <button
                className={`adjust-btn minus${loading ? " loading" : ""}`}
                onClick={subtract}
                disabled={count === 0 || loading}
            >
                -
            </button>
            <span className="item-count">{count}</span>
            <button
                className={`adjust-btn plus${loading ? " loading" : ""}`}
                onClick={add}
                disabled={loading}
            >
                +
            </button>
        </div>
    )
}
