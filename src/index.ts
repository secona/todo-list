import express from 'express';
import mountRoutes from './routes';
import { LOG_PREFIX } from './constants';
import dbConnect from './dbConnect';
import logger from './middlewares/logger';

const app = express();

dbConnect()
  .then(() => console.log(LOG_PREFIX, 'Connected to database'))
  .catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

mountRoutes(app);

app.listen(5000, () => {
  console.log(LOG_PREFIX, 'Listening on port 5000');
});
