import { int, mysqlTable, text } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
	id: int('id').autoincrement().primaryKey(),
	username: text('username').unique().notNull(),
	password: text('password').notNull()
});
