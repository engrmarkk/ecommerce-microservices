// userDetailsController
import { Router } from 'express';
import userDetailsController from '../../controllers/userControllers/getUserControl';
import {authenticate} from '@ecommerce/shared'

const router: Router = Router();

router.get('/', authenticate, userDetailsController);

export default router;
