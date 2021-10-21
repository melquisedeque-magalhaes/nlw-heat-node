import axios from 'axios'
import { PrismaClient } from '@prisma/client'
import { sign } from 'jsonwebtoken'

interface GithubResponse {
    access_token: string
}

interface GithubUserResponse {
    login: string;
    id: number;
    avatar_url: string;
    name: string;
}

export class GithubAuthenticationService {
    async execute(code: string) {
        const prisma = new PrismaClient()

        const { data } = await axios.post<GithubResponse>('https://github.com/login/oauth/access_token', {}, {
                params: {
                    client_id: process.env.GITHUB_CLIENT_ID,
                    client_secret: process.env.GITHUB_CLIENT_SECRET,
                    code
                },
                headers: {
                    Accept: "application/json",
                }
            },
        )

        const { access_token } = data

        const userGithub = await axios.get<GithubUserResponse>('https://api.github.com/user', {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })

        const { login, id, avatar_url, name } = userGithub.data

        let user = await prisma.user.findFirst({
            where: {
                github_id: id
            }
        })

        if(!user){
            user = await prisma.user.create({
                data: {
                    github_id: id,
                    name,
                    avatar_url,
                    login
                }
            })
        }

        const token = sign({
                user: {
                    name: user.name,
                    avatar_url: user.avatar_url,
                    id: user.id
                }
            },
            process.env.TOKEN_SECRET,
            {
                subject: user.id,
                expiresIn: '1d'
            }
        )

        return { token, user }
    }
}