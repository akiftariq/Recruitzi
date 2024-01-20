import fs from 'fs';
import * as db from './db/db.js';
import path from 'path';

const directoryPath = './migrations';

db.query(
	`
	CREATE SCHEMA IF NOT EXISTS migrations;
	CREATE TABLE IF NOT EXISTS migrations.migrations(
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL
);`
)
	.then(() => {
		db.query('SELECT id, "name" FROM migrations.migrations ORDER BY id;')
			.then((existingMigrations) => {
				fs.readdir(directoryPath, (fdError, files) => {
					if (fdError) {
						console.error('Error reading directory:', fdError);
						return;
					}
					for (const file of files) {
						if (path.extname(file) === '.sql') {
							const filePath = path.join(directoryPath, file);
							if (existingMigrations.rows && (existingMigrations.rowCount === 0 || existingMigrations.rows.find((e) => e.name === file < 0))) {
								fs.readFile(filePath, 'utf8', (fError, fileContents) => {
									if (fError) {
										console.error('Error reading file:', fError);
										return;
									}
									console.log(`Executing migration: ${filePath}`);
									db.query(fileContents)
										.then(() => {
											console.log('Exuceted migration: ' + file);
											console.log('Saving migration in db: ' + file);
											db.query(
												`INSERT INTO migrations.migrations
									(id, "name")
									VALUES(nextval('migrations.migrations_id_seq'::regclass), $1);`,
												[file]
											)
												.then(() => {
													console.log('Saved migration in db: ' + file);
													console.log('--------------------');
												})
												.catch((errMigration) => {
													console.log(errMigration);
													return;
												});
										})
										.catch((errMigration) => {
											console.log(errMigration);
											return;
										});
								});
							} else {
								console.log(filePath + ' is already executed.');
							}
						}
					}
				});
			})
			.catch((e2) => {
				console.log(e2);
				return;
			});
	})
	.catch((e1) => {
		console.log(e1);
		return;
	});
