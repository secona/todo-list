export type ErrorType = 'validation' | 'resource' | 'auth' | 'other';
export type ErrorLocation = 'body' | 'cookies' | 'headers' | 'params' | 'query';

export interface ErrorDetail {
  location?: ErrorLocation;
  value?: any;
  name: any;
  msg: string;
}

export interface ErrorField {
  statusCode: number;
  type: ErrorType;
  details?: ErrorDetail[];
}
