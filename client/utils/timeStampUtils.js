import moment from 'moment';

export function getCurrentDate() {
  return moment().format('MMMM Do YYYY, h:mm:ss a');
}