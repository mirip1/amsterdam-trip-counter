import { PrismaClient } from "../app/generated/prisma/client"
import { PrismaLibSql } from "@prisma/adapter-libsql"
import path from "path"

const adapter = new PrismaLibSql({
    url: `file:${path.join(process.cwd(), "dev.db")}`
})
const prisma = new PrismaClient({ adapter })

async function main() {
    await prisma.event.deleteMany()
    await prisma.item.deleteMany()
    await prisma.person.deleteMany()

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

    await prisma.item.createMany({
        data: [
            { name: "cervezas", value: 1 },
            { name: "setas", value: 3 },
            { name: "chupitos", value: 2 },
            { name: "copas", value: 2 },
            { name: "porros", value: 2 }
        ]
    })

    console.log(" Seed complete")
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())