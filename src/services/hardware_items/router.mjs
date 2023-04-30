/**
 *
 *  HARDWARE ITEMS ROUTER
 *
 */

import express from 'express';

import {
  checkRequiredPermissions
} from '../../lib/auth.mjs';

import {
  HARDWARE_ITEMS_PERMISSIONS
} from './permissions.mjs';

import {
  createHardwareItem,
  deleteHardwareItem,
  listHardwareItems,
  readHardwareItem,
  updateHardwareItem
} from './service.mjs';

const router = express.Router();

router.route('/hardware_items')
  .get(
    checkRequiredPermissions(HARDWARE_ITEMS_PERMISSIONS.LIST),
    async (req, res) => {
      const result = await listHardwareItems();

      res.status(200).json(result);
    })
  .post(
    checkRequiredPermissions(HARDWARE_ITEMS_PERMISSIONS.CREATE),
    async (req, res) => {
      await createHardwareItem();

      res.status(201).end();
    });

router.route('/hardware_items/:hardware_item_id')
  .delete(
    checkRequiredPermissions(HARDWARE_ITEMS_PERMISSIONS.DELETE),
    async (req, res) => {
      await deleteHardwareItem(req.params.hardware_item_id);

      res.status(204).end();
    })
  .get(
    checkRequiredPermissions(HARDWARE_ITEMS_PERMISSIONS.READ),
    async (req, res) => {
      const result =
          await readHardwareItem(req.params.hardware_item_id);

      res.status(200).json(result);
    })
  .put(
    checkRequiredPermissions(HARDWARE_ITEMS_PERMISSIONS.UPDATE),
    async (req, res) => {
      await updateHardwareItem(req.params.hardware_item_id);

      // TODO (REG): Finalize this HTTP status code.
      res.status(200).end();
    });

export { router };
