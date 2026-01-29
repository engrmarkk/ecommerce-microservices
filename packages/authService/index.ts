import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import authRoutes from './src/routes';

const app = express();

app.use(express.json());

app.use('/auth', authRoutes);

const authPort = 3002;

app.listen(authPort, () => {
  console.log('the server url is http://localhost:' + authPort);
});
