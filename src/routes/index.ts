import express from 'express';
import { resolve } from 'path';

const distFolder = resolve(__dirname, '../../client/dist');

export default (app: express.Application) => {
  app.use(express.static(distFolder));

  /* This route is for user info CRUD */
  app.use('/api/users', require('./users.route').default);

  /* This route is for todos CRUD */
  app.use('/api/users/:userId/todos', require('./todos.route').default);

  /* This route is for email verification */
  app.use('/api/verification', require('./verification.route').default);

  app.get('/*', (_, res) => res.sendFile(resolve(distFolder, 'index.html')));
};
