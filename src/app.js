import fastifyCors from '@fastify/cors';
import { fastify } from 'fastify';
import authRoutes from './routes/authRoutes.js';
import ticketRoutes from './routes/ticketRoutes.js';

const server = fastify();

server.addHook('onRequest', (req, reply, done) => {
  if (
    !req.headers['content-type'] ||
    req.headers['content-type'] !== 'application/json'
  ) {
    reply.header('content-type', 'application/json');
  }
  done();
});

server.register(fastifyCors, {
  origin: '*',
  allowedHeaders: ['Content-Type', 'Authorization'],
});
server.register(authRoutes);
server.register(ticketRoutes);

server.get('/', async (request, reply) => {
  return reply.status(200).send('API ATOS rodando!');
});

export { server };
