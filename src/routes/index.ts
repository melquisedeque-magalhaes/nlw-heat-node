import { Router } from 'express'
import { CreateMensageController } from '../controller/CreateMensageController'
import { GithubAuthenticationController } from "../controller/GithubAuthenticationController"
import { last3MessagesController } from '../controller/Last3MessagesController'
import { ProfileController } from '../controller/ProfileController'
import { EnsureAuthenticated } from '../middleware/ensureAuthenticated'

export const router = Router()

router.get('/github/login', async (request, response) => {

    response.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)

})

router.get('/github/callback', (request, response) => {
    const { code } = request.query 

    return response.json({
        code
    })
})

router.post('/github/authentication', new GithubAuthenticationController().handle)

router.get('/profile',  EnsureAuthenticated, new ProfileController().handle)

router.post('/create/mensage', EnsureAuthenticated, new CreateMensageController().handle)

router.get('/last3messages', new last3MessagesController().handle)
