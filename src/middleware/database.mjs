/**
 *
 *  CORE DATABASE
 *
 */

import mysqlx from '@mysql/xdevapi';

export async function executeSQL(statement, ...bindings) {
  try {
    const session = await mysqlx.getSession(process.env.MYSQLX_CONFIG);

    let _statement = session.sql(statement);

    bindings.forEach(binding => _statement.bind(binding));

    const response = await _statement.execute();
    const result = await response.fetchAll();

    await session.close();

    return [ null, result ];
  } catch (err) {
    // TODO (REG): Error-handling middleware (handling MySQL errors)
    err.message = 'Something went wrong.';

    return [ err.message, null ];
  }
}