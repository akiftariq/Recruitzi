import express from 'express';
import config from './config.js';
import userRoutes from './routes/user.js';
import authRoutes from './routes/auth.js';

let app = express();
app.use(express.json());

app.use('/api/', authRoutes);

app.use('/api/user', userRoutes);

app.listen(config.appPort, () => {
	console.log('Server listining on port 3000');
});
