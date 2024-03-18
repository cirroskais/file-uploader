import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { env } from '$env/dynamic/private';
import * as schema from './schema';

const connection = await mysql.createConnection({
	host: env.MYSQL_HOST,
	user: env.MYSQL_USERNAME,
	password: env.MYSQL_PASSWORD,
	database: 'fileuploader'
});

export const db = drizzle(connection, { schema, mode: 'default' });
