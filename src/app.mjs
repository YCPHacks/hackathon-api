/**
 *
 *  API APPLICATION
 *
 */

import express from 'express';
import 'express-async-errors';
import mysqlx from '@mysql/xdevapi';

import {
  auth,
  claimCheck,
  claimIncludes
} from 'express-oauth2-jwt-bearer';

import {
  DatabaseError,
  errorHandler
} from './middleware/error.middleware.mjs';

const app = express();

app.use(auth({
  audience: process.env.AUDIENCE,
  issuerBaseURL: process.env.ISSUER_BASE_URL
}));

app.get('/events/:event/application',
      claimIncludes('ycp_hacks_user_roles', 'Attendee'),
      async (req, res) => {

  const session = await mysqlx
    .getSession(process.env.MYSQLX_CONFIG)
    .catch(() => { throw new Error('Cannot connect to MySQL') });

  try {
    const response = await session
      .sql('CALL read_event_application(?, ?);')
      .bind(req.params.event, req.auth.payload.ycp_hacks_user_id)
      .execute();

    const columns = response.getColumns();

    const result = await response.fetchAll();

    if (result.length) {
      return res.status(200).json({
        data: {
          application: result[0]
        }
      });
    }
  // If there are MySQL errors, handle them and respond to the client.
  } catch (err) {
    throw new DatabaseError(err.message);
  }

  // (REG): What if there are no MySQL warnings, but also no data to give?
  //        The client request wasn't bad, but there is no application to
  //        show for that event-user combination. We need to prompt them
  //        to create one.

  session.close();

  res.status(400).end();
});

app.use(errorHandler);

export { app };
