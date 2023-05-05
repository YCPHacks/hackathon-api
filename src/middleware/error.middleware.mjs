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
      return res.status(err.status ?? 400).json({
        message: err.message ?? 'Bad Request',
        status: err.status ?? 400
      });
    case InsufficientScopeError:
    case InvalidTokenError:
    case UnauthorizedError:
      return res.status(err.status ?? 400).json({
        message: err.message ?? 'Bad Request',
        status: err.status ?? 400
      });
    default:
//      console.error(err);

      return res.status(err.status ?? 500).json({
        message: err.message || 'Internal Server Error',
        status: err.status ?? 500
      });
  }
};

export function processWarnings(result) {
  if (result.getWarningsCount()) {
    const warnings = result.getWarnings();

    for (const warning of warnings) {
      console.log(warning.level, warning.code, warning.message);
    }
  } else {
    console.log('No warnings.');
  }
}
