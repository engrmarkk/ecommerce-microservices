import express from 'express';
import { IMiscResponse } from '@ecommerce/shared';

const router = express.Router();

// ping route
router.get('/ping', (req: express.Request, res: express.Response) => {
  const response: IMiscResponse = {
    message: 'pong',
  };
  res.status(200).json(response);
});

export default router;
