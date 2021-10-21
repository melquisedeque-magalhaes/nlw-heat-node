import { Request, Response } from 'express'
import { GithubAuthenticationService } from '../service/GithubAuthenticationService'

export class GithubAuthenticationController {
    async handle(request: Request, response: Response) {
        const { code } = request.body

        try {
            const githubAuthenticationService = new GithubAuthenticationService()

            const result = await githubAuthenticationService.execute(code)

            console.log(result)

            return response.json(result)

        }catch (err) {
            return response.json({
                error: err
            })
        }
        
    }
}