import { Application } from 'express';

export default (app: Application) => {
  app.get('/api', (_, res) => {
    res.json({ message: 'Hello World!' });
  });

  /* This route is for user info CRUD */
  app.use('/api/users', require('./users.route').default);

  /* This route is for todos CRUD */
  app.use('/api/todos', require('./todos.route').default);

  /* This route is for email verification */
  app.use('/api/verification', require('./verification.route').default);
};
