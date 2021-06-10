import express from 'express';
import authorize from '../middlewares/authorize';
import validators from '../middlewares/validators';
import userController from '../controllers/user.controller';

const router = express.Router();

router.post('/register', validators.userBody(), userController.register);
router.post('/signin', validators.userSignIn, userController.signIn);

router
  .route('/:id')
  .all(authorize)
  .get(userController.byId)
  .put(validators.userBody(true), userController.update)
  .delete(userController.remove);

export default router;
