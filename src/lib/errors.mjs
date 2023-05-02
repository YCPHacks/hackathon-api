import pkg from 'express-oauth2-jwt-bearer';
const {
  InsufficientScopeError,
  InvalidTokenError,
  UnauthorizedError
} = pkg;

export const errorHandler = (err, req, res, next) => {
  if (err instanceof InsufficientScopeError) {
    return res.status(err.status).json({ message: 'Permission denied' });
  }

  if (err instanceof InvalidTokenError) {
    return res.status(err.status).json({ message: 'Bad credentials' });
  }

  if (err instanceof UnauthorizedError) {
    return res.status(err.status).json({ message: err.message });
  }

  return res.status(500).json({ message: 'Internal Server Error' });
};

export const notFoundHandler = (req, res, next) => {
  return res.status(404).json({ message: 'Not Found' });
};
