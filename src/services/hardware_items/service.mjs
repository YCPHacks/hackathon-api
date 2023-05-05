/**
 *
 *  HARDWARE ITEMS SERVICE
 *
 */

import {
  executeSQL
} from '../../lib/database.mjs';

export async function createHardwareItem() {
  return;
}

export async function deleteHardwareItem(hardwareItemID) {
  const [ error, data ] = await executeSQL(
      'CALL delete_hardware_item(?);',
      hardwareItemID);

  return { data, error };
}

export async function listHardwareItems() {
  const [ error, data ] = await executeSQL('CALL list_hardware_items;');

  return { data, error };
}

export async function readHardwareItem(hardwareItemID) {
  const [ error, data ] = await executeSQL(
      'CALL read_hardware_item(?);',
      hardwareItemID);

  return { data, error };
}

export async function updateHardwareItem(hardwareItemID) {
  return;
}
