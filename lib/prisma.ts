import { PrismaClient } from '@/app/generated/prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'

function createPrisma() {
    let dbUrl = process.env.DATABASE_URL || `file:${process.cwd()}/data/dev.db`
    const adapter = new PrismaLibSql({ url: dbUrl })
    return new PrismaClient({ adapter })
}

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || createPrisma()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma