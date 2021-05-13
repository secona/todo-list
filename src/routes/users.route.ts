import express from 'express';
import validateMongoId from '../validators/mongoId.validator';
import validateUser from '../validators/user.validator';
import validateSignIn from '../validators/signIn.validator';
import validateUpdateUser from '../validators/updateUser.validator';
import authenticateToken from '../middlewares/authenticateToken';
import * as userController from '../controllers/user.controller';

const router = express.Router();

router.post('/register', validateUser, userController.register);
router.post('/signin', validateSignIn, userController.signIn);

router
  .route('/:id')
  .all(authenticateToken, validateMongoId)
  .get(userController.byId)
  .put(validateUpdateUser, userController.update)
  .delete(userController.remove);

export default router;
