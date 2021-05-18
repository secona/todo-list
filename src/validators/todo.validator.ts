import { createSchemaValidator } from './createValidator';

const todoValidators = {
  todoBody(optional?: true) {
    return createSchemaValidator({
      title: {
        in: 'body',
        optional,
        errorMessage: 'Invalid title',
        isString: { bail: true },
        notEmpty: true,
      },
      description: {
        in: 'body',
        errorMessage: 'Invalid description',
        isString: true,
        optional: true,
      },
    });
  },
};

export default todoValidators;
