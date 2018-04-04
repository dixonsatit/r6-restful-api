import Knex = require('knex');
import * as moment from 'moment';

export class KpiSumModel {

  public tableName  = 'kpi_sum';
  public primaryKey = 'id';

  byKpi(knex: Knex, kpiId: string,year:string,hospcode:string) {
    return knex(this.tableName)
      .where({
        'kpi_id': kpiId,
        'kpi_year': year,
        'hospcode': hospcode
      });
  }
}