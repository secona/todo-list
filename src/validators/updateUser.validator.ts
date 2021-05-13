import createValidator from './createValidator';
import { validators } from './user.validator';

const validateUpdateUser = createValidator(
  ...validators.map(v => v.optional())
);

export default validateUpdateUser;
