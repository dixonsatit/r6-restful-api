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

router.post('/save', (req, res, next) => {
  let name = req.body.name;
  let sername = req.body.sername;
  res.send({ 
      ok: true, 
      name: name, 
      sername: sername
  });
});

//http://127.0.0.1:3000/myapi/params/4/abc?age=56
router.get('/params/:id/:name', (req, res, next) => {
  let id = req.params.id;
  let name = req.params.name;

  let age = req.query.age;

  res.send({ 
      ok: true, 
      id:id,
      name: name, 
      sername: 'สีถาพล',
      age: age
      
  });
});

export default router;