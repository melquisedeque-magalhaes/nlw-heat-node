import { Request, Response } from 'express'
import { ProfileService } from '../service/ProfilerService'

export class ProfileController {
    async handle(request: Request, response: Response) {
        const { user_id } = request

        const profileService = new ProfileService()

        const results = await profileService.execute(user_id)

        return response.json(results)
    }
}