import { PrismaClient } from '@prisma/client'

export class ProfileService {
    async execute(user_id: string) {
        const prisma = new PrismaClient()

        const user = await prisma.user.findFirst({
            where: {
                id: user_id
            }
        })

        return user
    }
}