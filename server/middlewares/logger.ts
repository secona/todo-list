import morgan from 'morgan';
import { LOG_PREFIX } from '../constants';

export default morgan(
  `${LOG_PREFIX} :method :url \x1B[90m:status - :response-time ms\x1B[0m`
);
