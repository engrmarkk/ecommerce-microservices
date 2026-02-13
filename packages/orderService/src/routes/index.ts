import cartRoute from './cart';
import {Router} from 'express';

const router: Router = Router();

router.use('/cart', cartRoute);

export default router;
