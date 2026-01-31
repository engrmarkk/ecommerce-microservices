import { getCategoriesController } from '../controllers/categoryControl';
import { Router } from 'express';

const router: Router = Router();

router.get('/', getCategoriesController);

export default router;
