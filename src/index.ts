import express from 'express';
import mountRoutes from './routes';
import { LOG_PREFIX } from './constants';
import db from './db';
import logger from './middlewares/logger';
import errorHandler from './middlewares/errorHandler';

const app = express();

db.connect()
  .then(() => console.log(LOG_PREFIX, 'Connected to database'))
  .catch(console.log);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

mountRoutes(app);

app.use(errorHandler);
app.listen(5000, () => {
  console.log(LOG_PREFIX, 'Listening on port 5000 for', process.env.NODE_ENV);
});
