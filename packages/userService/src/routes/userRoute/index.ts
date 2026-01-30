import { Router } from 'express';
import userDetailsRoutes from './getUser';

const router: Router = Router();

router.use('/me', userDetailsRoutes);

export default router;
