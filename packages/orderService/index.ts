require('dotenv').config();
import express from 'express';
import ordersRoutes from './src/routes';
import { authenticate } from '@ecommerce/shared';

const app = express();

app.use(express.json());

app.use(authenticate);

app.use('/orders', ordersRoutes);

const productPort = process.env.PRODUCT_SERVICE_PORT || 3004;

app.listen(productPort, () => {
  console.log('the server url is http://localhost:' + productPort);
});
