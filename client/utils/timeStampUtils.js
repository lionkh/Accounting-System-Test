import moment from 'moment';

export function getHumanDate(date) {
  return moment(date).format('MMMM Do YYYY, h:mm:ss a');
}