import {
  auth,
  claimCheck,
  InsufficientScopeError
} from 'express-oauth2-jwt-bearer';

export const checkRequiredPermissions = (requiredPermissions) => {
  return (req, res, next) => {
    const permissionCheck = claimCheck((payload) => {
      const permissions = payload.permissions || [];

      const hasPermissions =
            requiredPermissions.every((requiredPermission) =>
        permissions.includes(requiredPermission));

      if (!hasPermissions) {
        throw new InsufficientScopeError();
      }

      return hasPermissions;
    });

    permissionCheck(req, res, next);
  };
};

export const validateAccessToken = auth({
  audience: process.env.AUDIENCE,
  issuerBaseURL: process.env.ISSUER_BASE_URL
});
