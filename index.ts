import express, { type Request, type Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Hello World',
  });
});

app.listen(3000, () => {
  console.log('the server url is http://localhost:3000');
});

// npm install -D typescript @types/node @types/express ts-node nodemon
