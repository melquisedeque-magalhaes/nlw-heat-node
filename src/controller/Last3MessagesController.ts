import { Request, Response } from 'express'
import { Last3MessagesService } from '../service/Last3MessagesService'

export class last3MessagesController {
    async handle(request: Request, response: Response) {
        const last3MessagesService = new Last3MessagesService()

        const results = await last3MessagesService.execute()

        return response.json(results)
    }
}