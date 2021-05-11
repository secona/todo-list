import express from 'express';
import validateUser from '../middlewares/validateUser';
import validateSignIn from '../middlewares/validateSignIn';
import authenticateToken from '../middlewares/authenticateToken';
import * as userController from '../controllers/user.controller';

const router = express.Router();

router.post('/register', validateUser, userController.register);
router.post('/signin', validateSignIn, userController.signIn);

router
  .route('/:id')
  .all(authenticateToken)
  .get(userController.byId)

  /*Change put handlers,
    I don't like how you have to put in every single value to update
    make it so it's only the values that you want to updat*/
  .put(validateUser, userController.update)
  .delete(userController.remove);

export default router;
