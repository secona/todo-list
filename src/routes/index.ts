import { Application } from 'express';
import userRoute from './users.route';

export default (app: Application) => {
  app.get('/api', (_, res) => {
    res.json({ message: 'Hello World!' });
  });

  app.use('/api/users', userRoute);
};
