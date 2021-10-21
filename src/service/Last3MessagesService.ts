import { PrismaClient } from '@prisma/client'

export class Last3MessagesService {
    async execute() {
        const prisma = new PrismaClient()

        const messages = await prisma.mensage.findMany({
            take: 3,
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                user: true
            }
        })

        return messages
    }
}