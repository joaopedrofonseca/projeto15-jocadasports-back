import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRouter from './routes/authRouter.js'
import productsRouter from './routes/productsRouter.js'
import cartRouter from './routes/cartRouter.js'

dotenv.config()
const server = express()
server.use(cors())
server.use(express.json())

server.use([authRouter, productsRouter, cartRouter])


server.listen(process.env.PORT, () => {
    console.log("Servidor: " + process.env.PORT)
})