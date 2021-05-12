import { param } from 'express-validator';
import createValidator from './createValidator';

const validateMongoId = createValidator(param('id', 'Invalid Id').isMongoId());

export default validateMongoId;
