import "dotenv/config"
import express from 'express'
import { Server } from 'socket.io'
import cors from 'cors'
import { app, serverHttp } from './server'

import { router } from './routes'

app.use(express.json())
app.use(cors())

export const io = new Server(serverHttp, {
    cors: {
        origin: '*'
    }
})

app.use(router)

io.on('connection', (socket) => {
    console.log(`Usuario conectado no ${socket.id}`)
})


