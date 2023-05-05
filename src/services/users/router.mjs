/**
 *
 *  USERS ROUTER
 *
 */

import express from 'express';

import {
  checkRequiredPermissions
} from '../../middleware/auth0.mjs';
} from '../../lib/auth.mjs';

import {
  USERS_PERMISSIONS
} from './permissions.mjs';

import {
  checkInUser,
  createUser,
  deleteUser,
  listUsers,
  readUser,
  updateUser
} from './service.mjs';

const router = express.Router();

router.route('/users')
  .get(
    checkRequiredPermissions(USERS_PERMISSIONS.LIST),
    async (req, res) => {
      const result = await listUsers();

      res.status(200).json(result);
    })
  .post(
    checkRequiredPermissions(USERS_PERMISSIONS.CREATE),
    async (req, res) => {
      const result = await createUser(req.body.subject);

      res.status(201).json(result);
    });

router.route('/users/:user_id')
  .delete(
    checkRequiredPermissions(USERS_PERMISSIONS.DELETE),
    async (req, res) => {
      await deleteUser(req.params.user_id);

      res.status(204).end();
    })
  .get(
    checkRequiredPermissions(USERS_PERMISSIONS.READ),
    async (req, res) => {
      const result =
          await readUser(req.params.user_id);

      res.status(200).json(result);
    })
  .put(
    checkRequiredPermissions(USERS_PERMISSIONS.UPDATE),
    async (req, res) => {
      await updateUser(req.params.user_id);

      // TODO (REG): Finalize this HTTP status code.
      res.status(200).end();
    });

router.route('/users/:user_id/.check_in')
  .post(
    checkRequiredPermissions(USERS_PERMISSIONS.CHECK_IN),
    async (req, res) => {
      const result = await checkInUser(req.params.user_id);

      // TODO (REG): Finalize this HTTP status code.
      res.status(200).json(result);
    }
  );

export { router };