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
  errorHandler,
  processWarnings
} from './middleware/error.middleware.mjs';

const app = express();

app.use(auth({
  audience: process.env.AUDIENCE,
  issuerBaseURL: process.env.ISSUER_BASE_URL
}));

app.get('/events/:event/application',
      claimIncludes('ycp_hacks_user_roles', 'Attendee'),
      async (req, res, next) => {

  const session = await mysqlx
    .getSession(process.env.MYSQLX_CONFIG)
    .catch(() => { throw new Error('Cannot connect to MySQL') });


/*
  const response = await session
    .sql('CALL read_event_application(?, ?);')
    .bind(req.params.event, req.auth.payload.ycp_hacks_user_id)
    .execute()
    .then((res) => {
      console.log(res.fetchAll())
    })
    .then(() => { session.close(); })
    .catch((err) => { throw new DatabaseError(err.message); });
*/



  const response = await session
    .sql('CALL read_event_application(?, ?);')
    .bind(req.params.event, req.auth.payload.ycp_hacks_user_id)
    .execute()
    .then(res => res.fetchAll())
    .then(data => { console.log(data); res.json({ data: { application: data } }); })
    .catch((err) => { throw new DatabaseError(err.message); });







/*
  try {
    const response = await session
      .sql('CALL read_event_application(?, ?);')
      .bind(req.params.event, req.auth.payload.ycp_hacks_user_id)
      .execute();

    const columns = response.getColumns();

    const result = await response.fetchAll();

    session.close();

    res.status(200).json({
      data: {
        application: result
      }
    });

      // (REG): What if there are no MySQL warnings, but also no data to give?
      //        The client request wasn't bad, but there is no application to
      //        show for that event-user combination. We need to prompt them
      //        to create one.

  // If there are MySQL errors, handle them and respond to the client.
  } catch (err) {
    throw new DatabaseError(err.message);
  }
*/
//  res.status(400).end();
});

//app.use(notFoundHandler);
app.use(errorHandler);

export { app };
