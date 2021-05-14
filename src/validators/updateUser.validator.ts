import createValidator from './createValidator';
import { validators } from './registerUser.validator';

const validateUpdateUser = createValidator(
  ...validators.map(v => v.optional())
);

export default validateUpdateUser;
