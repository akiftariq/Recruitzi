import bcrypt from 'bcrypt';
import config from '../config.js';
import * as db from '../db/db.js';

export const getUsers = async function (req, res) {
	const dbRes = await db.query('SELECT * from users');
	res.send(dbRes.rows);
};

// route handler to fetch individual user
export const getUser = async function (req, res) {
	let userId = req.params.id;
	const dbRes = await db.query('SELECT * from users where id = $1', [userId]);
	res.send(dbRes.rows[0]);
};

export const addUser = async function (req, res) {
	const { firstname, lastname, dob, cell, email, password } = req.body;
	let dbRes = await db.query('SELECT * from users where email = $1', [email]);
	if (dbRes.rowCount > 0) {
		console.log(`User with email ${email} already exists`, email);
		return res.status(409);
	}
	bcrypt.hash(password, config.saltRounds, async function (err, hash) {
		dbRes = await db.query('INSERT INTO public.users(firstname, lastname, dob, cell, email, "password") VALUES($1, $2, $3, $4, $5, $6) returning *;', [firstname, lastname, dob, cell, email, hash]);
		res.send(dbRes.rows[0]);
	});
};

export const updateUser = async function (req, res) {
	const { firstname, lastname, dob, cell, email, password, id } = req.body;

	await db.query('UPDATE public.users SET firstname=$1, lastname=$2, dob=$3, cell=$4, email=$5, "password"=$6 WHERE id=$7', [firstname, lastname, dob, cell, email, password, id]);
	res.sendStatus(200);
};
