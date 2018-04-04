import Knex = require('knex');
import * as moment from 'moment';

export class UserModel {

  changePassword(knex: Knex, userId: any, password: any) {
    return knex('user')
      .where('id', userId)
      .update({
        password: password
      });
  }

}