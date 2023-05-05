import express from 'express';
import 'express-async-errors';
import nocache from 'nocache';

import {
  validateAccessToken
} from './middleware/auth0.mjs';

import { errorHandler, notFoundHandler } from './middleware/errors.mjs';

import {
  router as events
} from './services/events/events.router.mjs';

import {
  router as users
} from './services/users/router.mjs';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(nocache());

app.use(validateAccessToken);

app.use('/api/events', events);
app.use('/api', users);

app.use(notFoundHandler);
app.use(errorHandler);

export { app };
