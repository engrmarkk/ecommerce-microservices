import { Router } from 'express';
import loginController from '../controllers/authControllers/loginControl';

const router: Router = Router();

// login route, POST
router.post('/', loginController);

export default router;
