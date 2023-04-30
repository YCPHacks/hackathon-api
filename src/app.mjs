/**
 *
 *  API APPLICATION
 *
 */

import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import nocache from 'nocache';

import {
  validateAccessToken
} from './lib/auth.mjs';

import {
  router as event_applications
} from './services/event_applications/router.mjs';

import {
  router as hardware_items
} from './services/hardware_items/router.mjs';

import {
  router as users
} from './services/users/router.mjs';

const app = express();

app.use(cors({
  allowedHeaders: [
    'Authorization',
    'Content-Type'
  ],
  maxAge: 86400
//  origin: process.env.CLIENT_ORIGIN_URL
}));
app.use(express.json());
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      "default-src": ["'none'"],
      "frame-ancestors": ["'none'"],
    },
    frameguard: {
      action: 'deny'
    },
    hsts: {
      maxAge: 31536000
    },
    useDefaults: false
  }
}));
app.use(nocache());
app.use(validateAccessToken);

app.use('/api', [
  event_applications,
  hardware_items,
  users
]);

// TODO (REG): Error-handling middleware
app.use((err, req, res, next) => {
  res.status(err.status ?? 500).json({
    message: err.message
  });
});

export { app };
