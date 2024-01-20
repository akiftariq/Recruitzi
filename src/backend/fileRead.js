import  fs from 'node:fs/promises';

async function example() {
	try {
		const data = await fs.readFile('./index.js', { encoding: 'utf8' });
		console.log(data);
	} catch (err) {
		console.log(err);
	}
}
example();
