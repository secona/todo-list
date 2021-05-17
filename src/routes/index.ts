import { Application } from 'express';
import userRoute from './users.route';
import todoRoute from './todos.route';

export default (app: Application) => {
  app.get('/api', (_, res) => {
    res.json({ message: 'Hello World!' });
  });

  /* This route is for user info CRUD */
  app.use('/api/users', userRoute);

  /* This route is for todos CRUD */
  app.use('/api/todos', todoRoute);
};
