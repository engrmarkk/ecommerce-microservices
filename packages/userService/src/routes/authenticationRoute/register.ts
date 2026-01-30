import { Router } from 'express';
import registerController from '../../controllers/authControllers/registerControl';

const router: Router = Router();

router.post('/', registerController);

export default router;
