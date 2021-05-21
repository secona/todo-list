import express from 'express';
import verificationController from '../controllers/verification.controller';
import validateMongoId from '../validators/mongoId.validator';

const router = express.Router();

router.post(
  '/send-email/:id',
  validateMongoId,
  verificationController.sendEmail
);
router.get('/confirm', verificationController.confirm);

export default router;
