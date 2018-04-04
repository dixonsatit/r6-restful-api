import Knex = require('knex');
import * as moment from 'moment';

export class KpiSumModel {

  public tableName  = 'kpi_sum';
  public primaryKey = 'id';

  byKpi(knex: Knex, kpiId: string,year:string,hospcode:string) {
    return knex(this.tableName)
      .innerJoin('kpi_list','kpi_list.id','kpi_sum.kpi_id')
      .where({
        'kpi_sum.kpi_id': kpiId,
        'kpi_sum.kpi_year': year,
        'kpi_sum.hospcode': hospcode
      });
  }

  byHospcode(knex: Knex,hospcode:string, year:string) {
    return knex(this.tableName)
      .innerJoin('kpi_list','kpi_list.id','kpi_sum.kpi_id')
      .where({
        'kpi_sum.kpi_year': year,
        'kpi_sum.hospcode': hospcode
      });
  }

  byProvince(knex: Knex, provcode:string, year:string) {
    return knex(this.tableName)
      .innerJoin('kpi_list','kpi_list.id','kpi_sum.kpi_id')
      .where({
        'kpi_sum.kpi_year': year,
        'kpi_sum.kpi_provcode': provcode
      });
  }
}