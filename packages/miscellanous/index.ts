import express from 'express';
import miscRoutes from './src/misc';

const app = express();

app.use('/misc', miscRoutes);

app.listen(3001, () => {
  console.log('the server url is http://localhost:3001');
});
