import { getPeopleWithScores, getPeopleWithScoresCompetitive } from "@/lib/data"
import HomeClient from "./HomeClient"

export const dynamic = 'force-dynamic'

export default async function Home() {
    const [allTimePeople, competitivePeople] = await Promise.all([
        getPeopleWithScores(),
        getPeopleWithScoresCompetitive(),
    ])

    return <HomeClient allTimePeople={allTimePeople} competitivePeople={competitivePeople} />
}