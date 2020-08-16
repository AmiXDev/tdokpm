import * as moment from 'jalali-moment';
import * as $ from "jquery";
import React from 'react'
import mapValue from '../src/map-value'
import PropertyJSON, { RecordJSON, ResourceJSON, Box } from 'admin-bro'
interface Props {
  property: PropertyJSON;
  record: RecordJSON;
  resource: ResourceJSON;
}
let todayJalali = moment().locale('fa').format('YYYY/M/D');


export class DateThingy {

  public getDate(): moment.Moment {
    return moment();
  }
}

