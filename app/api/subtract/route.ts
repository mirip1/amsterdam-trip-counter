import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function POST(req: Request) {
    const { personId, itemId } = await req.json()

    const lastEvent = await prisma.event.findFirst({
        where: {
            personId,
            itemId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    if (lastEvent) {
        await prisma.event.delete({
            where: {
                id: lastEvent.id
            }
        })
    }

    revalidatePath('/', 'layout')

    return Response.json({ ok: true })
}
