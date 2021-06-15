import express from 'express';
import authorize from '../middlewares/authorize';
import validators from '../middlewares/validators';
import userController from '../controllers/user.controller';

const router = express.Router();

router.post('/register', validators.userBody(), userController.register);
router.post('/login', validators.userLogin, userController.login);

router
  .route('/:userId')
  .all(authorize)
  .get(userController.byId)
  .patch(validators.userBody(true), userController.update)
  .delete(userController.remove);

export default router;
