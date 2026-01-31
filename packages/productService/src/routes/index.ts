import productRoute from './products';
import categoryRoute from './categories';
import { Router } from 'express';

const router: Router = Router();

router.use('/getProducts', productRoute);
router.use('/getCategories', categoryRoute);

export default router;
