import { nowSecs } from '../support/now';
import outputFormat from './outputFormat';
import splitTime from '../common/splitTime';

export default function formatLastActivity(last_login) {
  const timeAry = splitTime(Math.abs(nowSecs - last_login));
  return `${outputFormat(timeAry[0], ' days, ')
    + outputFormat(timeAry[1], ' hours, ')
    + outputFormat(timeAry[2], ' mins, ')
    + timeAry[3]} secs`;
}
