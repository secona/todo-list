export class BaseError {
  statusCode: number = 500;
  message: string = 'an error occurred';
  details: object = {};

  constructor(args?: Partial<BaseError>) {
    Object.assign(this, args);
  }
}
