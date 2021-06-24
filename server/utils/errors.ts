export class BaseError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class NotFoundError extends BaseError {
  constructor(message: string) {
    super(404, message);
  }
}

export class ForbiddenError extends BaseError {
  constructor(message: string) {
    super(403, message);
  }
}

export class BadRequestError extends BaseError {
  constructor(message: string) {
    super(400, message);
  }
}

export class UnauthorizedError extends BaseError {
  constructor(message: string) {
    super(401, message);
  }
}

const err = new BaseError(404, `User with id "sugma" not found`);
