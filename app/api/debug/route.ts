export async function GET() {
    const { createClient } = await import('@libsql/client')
    const url = `file:${process.cwd()}/prisma/dev.db`
    console.log('DEBUG URL:', url)
    
    try {
        const client = createClient({ url })
        await client.execute('SELECT 1')
        return Response.json({ ok: true, url })
    } catch (e: unknown) {
        return Response.json({ ok: false, url, error: String(e) })
    }
}
