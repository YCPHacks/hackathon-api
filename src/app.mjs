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

const app = express();

app.use(auth({
  audience: process.env.AUDIENCE,
  issuerBaseURL: process.env.ISSUER_BASE_URL
}));

app.get('/events/:event/application',
      claimIncludes('ycp_hacks_user_roles', 'Attendee'),
      async (req, res) => {
  const session = await mysqlx.getSession(process.env.MYSQLX_CONFIG);

  const response = await session
    .sql('CALL read_event_application(?, ?);')
    .bind(req.params.event, req.auth.payload.ycp_hacks_user_id)
    .execute();

  const data = await response.fetchAll();

  session.close();

  res.status(200).json({ data });
});

export { app };
