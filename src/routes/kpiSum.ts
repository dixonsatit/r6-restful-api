'use strict';

import * as express from 'express';
import * as moment from 'moment';

import { KpiSumModel } from './../models/kpiSum';

const router = express.Router();

const model = new KpiSumModel();

router.get('/bykpi/:kpiId', (req, res, next) => {
  let kpiId = req.params.kpiId;
  let year = req.query.year;
  let hospcode = req.query.hospcode;
  let db = req.db;

  model.byKpi(db, kpiId,year,hospcode)
    .then((results: any) => {
      res.send({ ok: true, rows: results })
    })
    .catch(error => {
      res.send({ ok: false, error: error })
    })
    .finally(() => {
      db.destroy();
  });
});

export default router;