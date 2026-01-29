import { Router } from 'express';
import registerController from '../controllers/authControllers/registerControl';

const router: Router = Router();

// login route, POST
router.post('/', registerController);

export default router;
