import http from 'http'
import express from 'express'

export const app = express()

export const serverHttp = http.createServer(app)

serverHttp.listen(process.env.PORT, () => {
    console.log(`Server is run in port ${process.env.PORT} 🚀`)
})