import "dotenv/config"
import express from 'express'
import { Server } from 'socket.io'
import cors from 'cors'
import { app, serverHttp } from './server'

import { router } from './routes'

export const io = new Server(serverHttp, {
    cors: {
        origin: '*'
    }
})

app.use(express.json())
app.use(router)
app.use(cors())

io.on('connection', (socket) => {
    console.log(`Usuario conectado no ${socket.id}`)
})


