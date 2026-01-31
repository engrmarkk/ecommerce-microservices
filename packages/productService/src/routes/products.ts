import { Router } from 'express';
import { getProductsController } from '../controllers/productControl';

const router: Router = Router();

router.get('/', getProductsController);

export default router;
