import mysql2 from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

export const pool = mysql2.createPool({
    port: process.env.PORT_DB,
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    database: process.env.NAME_DB,
    password: process.env.PASSWORD_DB,
});