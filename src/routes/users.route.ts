import express from 'express';
import userValidator from '../validators/user.validator';
import userController from '../controllers/user.controller';

const router = express.Router();

router.post('/register', userValidator.userBody(), userController.register);
router.post('/signin', userValidator.signIn, userController.signIn);

router
  .route('/:id')
  .all(...userValidator.isVerified)
  .get(userController.byId)
  .put(userValidator.userBody(true), userController.update)
  .delete(userController.remove);

export default router;
