import express from 'express';
import verificationController from '../controllers/verification.controller';

const router = express.Router();

router.post('/send', verificationController.send);
router.post('/confirm', verificationController.confirm);

export default router;
