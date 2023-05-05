import express from 'express';

import {
  checkRequiredPermissions
} from '../../middleware/auth0.mjs';

import {
  eventApplicationsPermissions
} from './events.permissions.mjs';

import {
  createEventApplication,
  readEventApplication
} from './events.service.mjs';

const router = express.Router();

router.use((req, res, next) => {
  res.locals.ycp_hacks_user_id = req.auth.payload.ycp_hacks_user_id;

  next();
});

router.get('/:event/application',
      checkRequiredPermissions(eventApplicationsPermissions.READ),
      async (req, res, next) => {
  const { event } = req.params;

  const application = await readEventApplication(
        event,
        res.locals.ycp_hacks_user_id);

  return res.status(200).json(application);
});

router.post('/:event/application',
      checkRequiredPermissions(eventApplicationsPermissions.CREATE),
      async (req, res) => {
  const { application } = req.body;
  const { event } = req.params;

  const data = await createEventApplication(
        event,
        res.locals.ycp_hacks_user_id,
        application);

  res.status(201).json(data);
});

export { router };
