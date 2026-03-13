import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function POST(req: Request) {
    const { personId, itemId } = await req.json()

    await prisma.event.create({
        data: {
            personId,
            itemId
        }
    })

    revalidatePath('/', 'layout')

    return Response.json({ ok: true })
}