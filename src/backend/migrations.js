import fs from 'node:fs/promises';
import process from 'process';
import * as db from './db/db.js';
import path from 'path';

let directoryPath = './migrations';

const totalArguments = process.argv.length;
const directoryParamIndex = process.argv.findIndex((e) => e === '-d');

if (directoryParamIndex >= 0) {
	if (totalArguments <= directoryParamIndex + 1) {
		console.error('Bad arguments.');
		console.log('Exiting.');
		process.exit(0);
	}
	directoryPath = process.argv[directoryParamIndex + 1];
}

console.log();
console.log('Reading scripts from directory: ' + directoryPath);
console.log('--------------------');

await db.query(`CREATE SCHEMA IF NOT EXISTS migrations;
CREATE TABLE IF NOT EXISTS migrations.migrations(
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL
);`);

const existingMigrations = await db.query('SELECT id, "name" FROM migrations.migrations ORDER BY id;');

const files = await fs.readdir(directoryPath);

for (const file of files) {
	if (path.extname(file) === '.sql') {
		const filePath = path.join(directoryPath, file);
		if (existingMigrations.rows && (existingMigrations.rowCount === 0 || existingMigrations.rows.findIndex((e) => e.name === file) < 0)) {
			const fileContents = await fs.readFile(filePath, { encoding: 'utf8' });
			console.log(`Executing migration: ${filePath}`);
			await db.query(fileContents);
			console.log('Exuceted migration: ' + file);
			console.log('Saving migration in db: ' + file);
			await db.query(
				`INSERT INTO migrations.migrations
			(id, "name")
			VALUES(nextval('migrations.migrations_id_seq'::regclass), $1);`,
				[file],
			);
			console.log('Saved migration in db: ' + file);
			console.log('--------------------');
		} else {
			console.log(filePath + ' is already executed.');
			console.log('--------------------');
		}
	}
}
