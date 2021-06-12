import { Application } from 'express';

export default (app: Application) => {
  /* This route is for user info CRUD */
  app.use('/api/users', require('./users.route').default);

  /* This route is for todos CRUD */
  app.use('/api/users/:userId/todos', require('./todos.route').default);

  /* This route is for email verification */
  app.use('/api/verification', require('./verification.route').default);
};
