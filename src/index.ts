import express from 'express';
import morgan from 'morgan';

const app = express();
const LOG_PREFIX = '[\x1B[36mSERVER\x1B[0m]';
const logger = morgan(
  `${LOG_PREFIX} :method :url \x1B[90m:status - :response-time ms\x1B[0m`
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.get('/api', (_, res) => {
  res.json({ message: 'Hello World!' });
});

app.listen(5000, () => {
  console.log(LOG_PREFIX, 'Listening on port 5000');
});
