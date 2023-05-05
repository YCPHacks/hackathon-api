/**
 *
 *  USERS SERVICE
 *
 */

import {
  executeSQL
} from '../../middleware/database.mjs';

export async function checkInUser(userID) {
  const [ error, data ] = await executeSQL(
      'CALL check_in_user(?);',
      userID);

  return { data, error };
}

export async function createUser(subject) {
  const [ error, data ] = await executeSQL(
      'CALL create_user(?);',
      subject);

  return { data, error };
}

export async function deleteUser(userID) {
  const [ error, data ] = await executeSQL(
      'CALL delete_user(?);',
      userID);

  return { data, error };
}

export async function listUsers() {
  const [ error, data ] = await executeSQL('CALL list_users;');

  return { data, error };
}

export async function readUser(subject) {
  const [ error, data ] = await executeSQL(
      'CALL read_user(?);',
      subject);

  return { data, error };
}

export async function updateUser(userID) {
  return;
}