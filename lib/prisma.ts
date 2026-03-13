import { PrismaClient } from '@/app/generated/prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'

function createPrisma() {
    let dbUrl = `file:${process.cwd()}/data/dev.db`
    console.log("DATABASE_URL:", process.env.DATABASE_URL)
    const adapter = new PrismaLibSql({ url: dbUrl })
    return new PrismaClient({ adapter })
}

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || createPrisma()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma