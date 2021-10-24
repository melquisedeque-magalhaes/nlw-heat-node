import { PrismaClient } from '@prisma/client'
import { io } from '../app'

interface CreateMensageServiceProps {
    text: string;
    user_id: string;
}

export class CreateMensageService {
    async execute({ text, user_id }: CreateMensageServiceProps) {
        const prisma = new PrismaClient()

        const mensage = await prisma.mensage.create({
            data: {
                text,
                user_id,
            },
            include: {
                user: true
            }
        })

        const infos = {
            id: mensage.id,
            text: mensage.text,
            user_id: mensage.user_id,
            createdAt: mensage.createdAt,
            user: {
                name: mensage.user.name,
                avatar_url: mensage.user.avatar_url
            }
        }

        io.emit('new_mensage', infos)

        return mensage
    }
}