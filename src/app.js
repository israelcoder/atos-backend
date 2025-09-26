import fastifyCors from '@fastify/cors';
import { fastify } from 'fastify';

import authRoutes from './routes/authRoutes.js';
import ticketRoutes from './routes/ticketRoutes.js';

const server = fastify();

server.addHook('onRequest', (request, response, done) => {
  const contentType = request.headers['content-type'];
  if (contentType !== 'application/json') {
    response.header('content-type', 'application/json');
  }

  done();
});

server.register(fastifyCors, {
  origin: '*',
  allowedHeaders: ['Content-Type', 'Authorization'],
});
server.register(authRoutes);
server.register(ticketRoutes);

server.get('/', async (_, response) => {
  return response.status(200).send('API ATOS rodando!');
});

export { server };
