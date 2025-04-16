import authRoutes from "./src/routes/authRoutes.js"
import ticketRoutes from "./src/routes/ticketRoutes.js";

const cors = require('@fastify/cors')

import dotenv from 'dotenv'
dotenv.config()

import {fastify} from "fastify";
const server = fastify()

server.addHook('onRequest',(req, reply, done)=>{
    if(!req.headers['content-type'] || req.headers['content-type'] !=='application/json'){
        reply.header('content-type','application/json')
    }
    done()
})

server.register(cors, {
    origin: '*',
    allowedHeaders: ['Content-Type','Authorization'],
})
server.register(authRoutes)
server.register(ticketRoutes)

server.get('/', async (request, reply) =>{
    return reply.status(200).send('API Hit rodando!')
})
server.listen({host:'0.0.0.0', port:process.env.PORT}, (err, adress) =>{
        if(err){
            console.error(err)
            process.exit(1)
        }
        console.log(`Servidor rodando em ${adress}`)
})

