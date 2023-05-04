import {
  InsufficientScopeError,
  InvalidTokenError,
  UnauthorizedError
} from 'express-oauth2-jwt-bearer';

export class DatabaseError extends Error {
  constructor(message) {
    super(message);
  }
}

export const errorHandler = (err, req, res, next) => {
  switch (err.constructor) {
    case DatabaseError:
      console.error(err);

      return res.status(400).end();
    case InsufficientScopeError:
    case InvalidTokenError:
    case UnauthorizedError:
      return res.status(err.status).end();
    default:
      console.error(err);

      return res.status(500).end();
  }
};
