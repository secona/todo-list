import express from 'express';
import validateUser from '../middlewares/validateUser';
import * as userController from '../controllers/user.controller';

const router = express.Router();

// TODO: login route
router.post('/new', validateUser, userController.create);
router
  .route('/:id')
  .get(userController.byId)

  /*Change put handlers,
    I don't like how you have to put in every single value to update
    make it so it's only the values that you want to updat*/
  .put(validateUser, userController.update)
  .delete(userController.remove);

export default router;
