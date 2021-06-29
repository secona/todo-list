import { Location } from 'express-validator';

type ErrorType = 'validation' | 'resource' | 'auth' | 'other';

interface Detail {
  location?: Location;
  value?: any;
  name: any;
  msg: string;
}

export class BaseError {
  statusCode: number = 500;
  type: ErrorType = 'other';
  message: string = 'an error occurred';
  details: Detail[] = [];

  constructor(args?: Partial<BaseError>) {
    Object.assign(this, args);
  }
}
