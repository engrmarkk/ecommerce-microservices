import { Router } from 'express';
import loginRoutes from './login';
import registerRoutes from './register';
import resendOtpRoutes from './resendOtp';
import verifyAccountRoutes from './verifyAccount';

const router: Router = Router();

router.use('/login', loginRoutes);
router.use('/register', registerRoutes);
router.use('/resendOtp', resendOtpRoutes);
router.use('/verifyAccount', verifyAccountRoutes);

export default router;
