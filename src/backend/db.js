import pg from 'pg';
import config from './config.js';

const Pool = pg.Pool;

const pool = new Pool({
	host: config.dbHost,
	port: config.dbPort,
	database: config.dbName,
	user: config.dbUser,
	password: config.dbPassword
});

export const query = async (text, params) => {
	const start = Date.now();
	const res = await pool.query(text, params);
	const duration = Date.now() - start;
	if (config.logDbQueries) console.log('executed query', { text, params, duration, rows: res.rowCount });
	return res;
};
