import { Router } from 'express';
import loginRoutes from './login';
import registerRoutes from './register';

const router: Router = Router();

router.use('/login', loginRoutes);
router.use('/register', registerRoutes);

export default router;
