import 'dotenv/config';

import { server } from './app.js';

server.listen({ host: '0.0.0.0', port: process.env.PORT }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`🚀 Servidor rodando em ${address}`);
});
