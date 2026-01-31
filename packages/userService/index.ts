import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import authRoutes from './src/routes/authenticationRoute';
import userRoutes from './src/routes/userRoute';

const app = express();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

const authPort = process.env.AUTH_SERVICE_PORT || 3002;

app.listen(authPort, () => {
  console.log('the server url is http://localhost:' + authPort);
});
