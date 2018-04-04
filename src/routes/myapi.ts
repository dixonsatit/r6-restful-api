'use strict';

import * as express from 'express';
import * as moment from 'moment';
import * as _ from 'lodash';
import { log } from 'util';
// import { load } from 'mime';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.send({ 
      ok: true, 
      message: 'My API' 
  });
});

router.get('/name', (req, res, next) => {
  res.send({ 
      ok: true, 
      name: 'สาธิต', 
      sername: 'สีถาพล' 
  });
});

router.get('/params/:id', (req, res, next) => {
  res.send({ 
      ok: true, 
      name: 'สาธิต', 
      sername: 'สีถาพล' 
  });
});

export default router;