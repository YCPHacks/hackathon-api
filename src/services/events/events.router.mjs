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

router.get('/:event/application',
      checkRequiredPermissions(eventApplicationsPermissions.READ),
      async (req, res) => {
  const { event } = req.params;

  const application = await readEventApplication(event);

  res.status(200).json(application);
});

router.post('/:event/application',
      checkRequiredPermissions(eventApplicationsPermissions.CREATE),
      async (req, res) => {
  const { application } = req.body;

  console.table(application);

  await createEventApplication({ ...application });

  res.status(201).end();
});

export { router };
