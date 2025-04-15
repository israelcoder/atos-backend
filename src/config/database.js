import mysql from 'mysql2/promise'

import dotenv from 'dotenv'
dotenv.config()

export const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,  // Adicionado para garantir que o pool funcione corretamente
    connectionLimit: 10,       // Pode ser ajustado conforme necessário
    queueLimit: 0
});

