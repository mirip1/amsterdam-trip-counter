import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
    const { personId, itemId } = await req.json()

    await prisma.event.create({
        data: {
            personId,
            itemId
        }
    })

    return Response.json({ ok: true })
}