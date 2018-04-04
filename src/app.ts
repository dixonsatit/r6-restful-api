'use strict';
require('dotenv').config();
import Knex = require('knex');
import { MySqlConnectionConfig } from 'knex';
import { Jwt } from './models/jwt';

import * as express from 'express';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as ejs from 'ejs';

import indexRoute from './routes/index';
import contactRoute from './routes/contact';
import loginRoute from './routes/login';
import kpiList from './routes/kpiList';
import kpiSum from './routes/kpiSum';
import myApi from "./routes/myapi";

const jwt = new Jwt();
const protect = require('@risingstack/protect');

let checkAuth = (req, res, next) => {
  let token: string = null;

  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    token = req.query.token;
  } else {
    token = req.body.token;
  }

  jwt.verify(token)
    .then((decoded: any) => {
      req.decoded = decoded;
      next();
    }, err => {
      return res.send({
        ok: false,
        error: 'No token provided.',
        code: 403
      });
    });
}

let dbConnection: MySqlConnectionConfig = {
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true
}

const app: express.Express = express();

//view engine setup
app.set('views', path.join(__dirname, '../views'));
app.engine('.html', ejs.renderFile);
app.set('view engine', 'html');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use(protect.express.sqlInjection({
  body: true,
  loggerFunction: console.error
}));

app.use(protect.express.xss({
  body: true,
  loggerFunction: console.error
}));

app.use((req, res, next) => {
  req.db = Knex({
    client: 'mysql',
    connection: dbConnection,
    pool: {
      min: 0,
      max: 7,
      afterCreate: (conn, done) => {
        conn.query('SET NAMES utf8', (err) => {
          done(err, conn);
        });
      }
    },
    debug: true,
    acquireConnectionTimeout: 10000
  });

  next();
});

app.use('/login', loginRoute);
app.use('/contacts',checkAuth, contactRoute);
app.use('/kpilist',checkAuth, kpiList);
app.use('/kpisum', kpiSum);
app.use('/myapi', myApi);
app.use('/', indexRoute);


//catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err['status'] = 404;
  next(err);
});

//development error handler
//will print stacktrace
if (process.env.NODE_ENV === 'development') {
  app.use((err: Error, req, res, next) => {
    res.status(err['status'] || 500);
    res.render('error', {
      title: 'error',
      message: err.message,
      error: err
    });
  });
}

app.use((err: Error, req, res, next) => {
  res.status(err['status'] || 500);
  console.log(err);
  res.send({ ok: false, error: err });
});

export default app;
