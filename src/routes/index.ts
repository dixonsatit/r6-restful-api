'use strict';

import * as express from 'express';
import * as moment from 'moment';
import * as fse from 'fs-extra';
import * as wrap from 'co-express';
import * as _ from 'lodash';
import { log } from 'util';
// import { load } from 'mime';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.send({ ok: true, message: 'KPI API Server' });
});

router.get('/version', (req, res, next) => {
  res.send({ ok: true, version: 'v1.0.0', build: '20170603' });
});

export default router;