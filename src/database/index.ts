import { Pool } from 'pg';

const pool = new Pool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: +process.env.DATABASE_PORT,
    max: 15,
    idleTimeoutMillis: 10000,
    connectionTimeoutMillis: 5000
});

export default pool;
