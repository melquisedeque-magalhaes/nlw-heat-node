import { Request, Response } from 'express'
import { CreateMensageService } from '../service/CreateMensageService'

export class CreateMensageController {
    async handle(request: Request, response: Response) {
        
        const { text } = request.body
        const { user_id } = request

        const createMensageService = new CreateMensageService()

        const results = await createMensageService.execute({ text, user_id })

        return response.json(results)
    }
}