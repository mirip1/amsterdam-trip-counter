import { prisma } from "./prisma"

export async function getPeople() {
    return prisma.person.findMany({ orderBy: { id: "asc" } })
}

export async function getPeopleWithScoresCompetitive() {
    const TRIP_START = new Date('2026-03-29T00:00:00.000Z')
    const TRIP_END = new Date('2026-04-03T23:59:59.999Z')

    const people = await prisma.person.findMany()
    const items = await prisma.item.findMany()
    const events = await prisma.event.findMany({
        where: { createdAt: { gte: TRIP_START, lte: TRIP_END } }
    })

    const itemValues = Object.fromEntries(items.map(i => [i.id, i.value]))

    const scores = people.map(person => {
        const personEvents = events.filter(e => e.personId === person.id)
        const score = personEvents.reduce((sum, e) => sum + (itemValues[e.itemId] || 0), 0)
        return { ...person, score }
    })

    return scores.sort((a, b) => b.score - a.score)
}

export async function getPeopleWithScores() {
    const people = await prisma.person.findMany()
    const items = await prisma.item.findMany()
    const events = await prisma.event.findMany()

    const itemValues = Object.fromEntries(items.map(i => [i.id, i.value]))
    
    const scores = people.map(person => {
        const personEvents = events.filter(e => e.personId === person.id)
        const score = personEvents.reduce((sum, e) => sum + (itemValues[e.itemId] || 0), 0)
        return { ...person, score }
    })

    return scores.sort((a, b) => b.score - a.score)
}

export async function getItems() {
    return prisma.item.findMany({ orderBy: { name: "asc" } })
}

export async function getGlobalStats() {
    const people = await prisma.person.findMany()
    const items = await prisma.item.findMany()
    const events = await prisma.event.findMany()

    // Build stats object: { [itemName]: [{ person, count }] }
    const stats = items.map(item => {
        const itemEvents = events.filter(e => e.itemId === item.id)
        
        const rankings = people.map(person => {
            const count = itemEvents.filter(e => e.personId === person.id).length
            return { person, count }
        }).sort((a, b) => b.count - a.count)

        return { item, rankings }
    })

    return stats
}

export async function getPersonWithCounts(id: number) {
    const person = await prisma.person.findUnique({ where: { id } })
    const items = await prisma.item.findMany({ orderBy: { id: "asc" } })
    const events = await prisma.event.groupBy({
        by: ["itemId"],
        where: { personId: id },
        _count: { id: true },
    })

    const countMap = Object.fromEntries(
        events.map((e: { itemId: number; _count: { id: number } }) => [e.itemId, e._count.id])
    )

    return {
        person,
        items: items.map((item: { id: number; name: string; value: number }) => ({
            ...item,
            count: countMap[item.id] ?? 0,
        })),
    }
}

export async function getPersonChartData(personId: number) {
    // Generate dates from 29/03/2026 to 03/04/2026
    const startDate = new Date('2026-03-29T00:00:00.000Z')
    const endDate = new Date('2026-04-03T23:59:59.999Z')
    
    const dates: string[] = []
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        dates.push(d.toISOString().split('T')[0]) // yyyy-mm-dd format
    }

    const items = await prisma.item.findMany({ orderBy: { id: "asc" } })
    
    // Get all events for this person in the date range
    const events = await prisma.event.findMany({
        where: {
            personId,
            createdAt: { gte: startDate, lte: endDate }
        },
        include: { item: true }
    })

    // Initialize data structure for Recharts
    // Format: [{ date: '29/03', cervezas: 10, setas: 5, ... }, ...]
    const chartData = dates.map(dateStr => {
        const [year, month, day] = dateStr.split('-')
        const displayDate = `${day}/${month}`
        
        const dayData: any = { date: displayDate }
        
        // Initialize all item counts/points to 0 for this day
        items.forEach(item => {
            dayData[item.name] = 0
        })
        
        return dayData
    })

    // Aggregate points (count * value) or just counts
    events.forEach(event => {
        const eventDateStr = event.createdAt.toISOString().split('T')[0]
        const dataPoint = chartData.find(d => {
            const [day, month] = d.date.split('/')
            return `2026-${month}-${day}` === eventDateStr
        })
        
        if (dataPoint && event.item) {
            // Count actual units. The user requested 5 bars per day symbolizing each type of consumption
            dataPoint[event.item.name] += 1
        }
    })

    return chartData
}