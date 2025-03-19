
import {fastify} from "fastify";
import cors from '@fastify/cors'

const server = fastify()

server.get('/test', (request, reply) =>{
    return reply.status(200).send('running')
})
server.register(cors,{
    origin: "*"
})
server.listen({
    port:3001
})

