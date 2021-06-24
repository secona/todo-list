import express from 'express';
import verificationController from '../controllers/verification.controller';

const router = express.Router();

router.post('/resend-email', verificationController.resendVerification);
router.get('/confirm', verificationController.confirm);

export default router;
