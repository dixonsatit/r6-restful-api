'use strict';

import * as express from 'express';
import * as moment from 'moment';

import { ContactModel } from "../models/contact";

const router = express.Router();

const model = new ContactModel();

router.get('/rawquery', (req, res, next) => {
  let db = req.db;
  let id = req.query.id;
  model.rawQuery(db,id)
    .then((results: any) => {
      res.send({ ok: true, rows: results[0] });
    })
    .catch(error => {
      res.send({ ok: false, error: error })
    });
});


router.get('/', (req, res, next) => {

  let db = req.db;

  model.list(db)
    .then((results: any) => {
      res.send({ ok: true, rows: results });
    })
    .catch(error => {
      res.send({ ok: false, error: error })
    });
});

router.post('/', (req, res, next) => {
  let name = req.body.name;
  let email = req.body.email;
  let mobile_number = req.body.mobile_number;
  let db = req.db;

    model.save(db, {
        name:name,
        email: email,
        mobile_number: mobile_number
    })
      .then((results: any) => {
        res.send({ ok: true })
      })
      .catch(error => {
        res.send({ ok: false, error: error })
      })
      .finally(() => {
        db.destroy();
      });
  
});

router.put('/:id', (req, res, next) => {
  let id = req.params.id;
 
  let name = req.body.name;
  let email = req.body.email;
  let mobile_number = req.body.mobile_number;
  
  let db = req.db;

  if (id) {
    model.update(db, id,  {
        name:name,
        email: email,
        mobile_number: mobile_number
    })
      .then((results: any) => {
        res.send({ ok: true })
      })
      .catch(error => {
        res.send({ ok: false, error: error })
      })
      .finally(() => {
        db.destroy();
      });
  } else {
    res.send({ ok: false, error: 'ข้อมูลไม่สมบูรณ์' }) ;
  }
});

router.get('/detail/:id', (req, res, next) => {
  let id = req.params.id;
  let db = req.db;

  model.detail(db, id)
    .then((results: any) => {
      res.send({ ok: true, detail: results[0] })
    })
    .catch(error => {
      res.send({ ok: false, error: error })
    })
    .finally(() => {
      db.destroy();
    });
});

router.delete('/:id', (req, res, next) => {
  let id = req.params.id;
  let db = req.db;

  model.remove(db, id)
    .then((results: any) => {
      res.send({ ok: true })
    })
    .catch(error => {
      res.send({ ok: false, error: error })
    })
    .finally(() => {
      db.destroy();
    });
});

export default router;