import express from 'express';
import * as auth from '../services/auth.js';

const authRoutes = express.Router();

authRoutes.post('/login', auth.login);

export default authRoutes;
