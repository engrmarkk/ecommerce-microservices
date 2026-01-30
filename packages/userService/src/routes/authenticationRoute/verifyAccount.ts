// resendOtpController
import { Router } from 'express';
import verifyAccountController from '../../controllers/authControllers/verifyAccountControl';

const router: Router = Router();

router.patch('/', verifyAccountController);

export default router;
