import express from 'express';
import config from './config.js';
import * as userRepository from './user.js';
import * as auth from './auth.js';

let app = express();
app.use(express.json());

app.get('/api/user', auth.authenticate, userRepository.getUsers);
app.get('/api/user/:id', auth.authenticate, userRepository.getUser);
app.post('/api/user', auth.authenticate, userRepository.addUser);
app.put('/api/user', auth.authenticate, userRepository.updateUser);

app.post('/api/login', auth.login);

app.listen(config.appPort, () => {
	console.log('Server listining on port 3000');
});
