import {
  InvalidTokenError,
  InsufficientScopeError,
  UnauthorizedError
} from 'express-oauth2-jwt-bearer';

export const errorHandler = (err, req, res, next) => {
  switch (err.constructor) {
    case InvalidTokenError:
    case InsufficientScopeError:
    case UnauthorizedError:
      console.error(err);

      return res.status(err.status).json({
        message: err.message
      });
    default:
      console.error(err);

      return res.status(500).json({
        message: 'Internal Server Error'
      });
  }
};

export const notFoundHandler = (req, res, next) => {
  return res.status(404).json({ message: 'Not Found' });
};