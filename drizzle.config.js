/** @type { import("drizzle-kit").Config } */
export default {
	schema: 'src/lib/server/database/schema.js',
	driver: 'mysql2',
	dbCredentials: {
		host: process.env.MYSQL_HOST,
		user: process.env.MYSQL_USERNAME,
		password: process.env.MYSQL_PASSWORD,
		database: process.env.MYSQL_DATABASE
	}
};
