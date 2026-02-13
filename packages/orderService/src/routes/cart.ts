import { Router } from 'express';
import { getCart } from '../controllers/cartControl';

const router: Router = Router();

router.get('/getCart', getCart);

export default router;
