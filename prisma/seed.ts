import { PrismaClient } from "../app/generated/prisma/client"
import { PrismaLibSql } from "@prisma/adapter-libsql"

let dbUrl = `file:${process.cwd()}/data/dev.db`
if (process.env.NODE_ENV === 'production') {
    dbUrl = 'file:/data/dev.db'
} else if (process.env.DATABASE_URL && process.env.DATABASE_URL !== 'file:./data/dev.db') {
    dbUrl = process.env.DATABASE_URL
}

const adapter = new PrismaLibSql({ url: dbUrl })
const prisma = new PrismaClient({ adapter })

async function main() {
    const personCount = await prisma.person.count()
    if (personCount === 0) {
        await prisma.person.createMany({
            data: [
                { name: "Iván" },
                { name: "Miguel" },
                { name: "Petro" },
                { name: "Yerai" },
                { name: "Malena" },
                { name: "Lucía" }
            ]
        })
        console.log("Seeded persons.")
    } else {
        console.log("Persons already seeded.")
    }

    const itemCount = await prisma.item.count()
    if (itemCount === 0) {
        await prisma.item.createMany({
            data: [
                { name: "cervezas", value: 1 },
                { name: "setas", value: 3 },
                { name: "chupitos", value: 2 },
                { name: "copas", value: 2 },
                { name: "porros", value: 2 }
            ]
        })
        console.log("Seeded items.")
    } else {
        console.log("Items already seeded.")
    }

    console.log("Seed complete")
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())