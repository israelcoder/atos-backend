import mysql from 'mysql2/promise';

const isProduction = process.env.NODE_ENV === 'production';

export const db = mysql.createPool({
  host: isProduction ? process.env.MYSQL_HOST : process.env.DB_HOST,
  user: isProduction ? process.env.MYSQL_USER : process.env.DB_USER,
  password: isProduction ? process.env.MYSQL_PASSWORD : process.env.DB_PASSWORD,
  database: isProduction ? process.env.MYSQL_DATABASE : process.env.DB_NAME,
  port: isProduction ? process.env.MYSQL_PORT : process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 30000, // 10 segundos
});
