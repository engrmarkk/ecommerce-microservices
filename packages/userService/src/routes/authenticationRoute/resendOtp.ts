// resendOtpController
import { Router } from 'express';
import resendOtpController from '../../controllers/authControllers/resendOtpTokenControl';

const router: Router = Router();

router.patch('/', resendOtpController);

export default router;
