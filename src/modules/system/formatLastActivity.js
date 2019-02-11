import {nowSecs} from '../support/now';
import outputFormat from './outputFormat';

export default function formatLastActivity(last_login) {
  var s = Math.abs(nowSecs - last_login);
  var m = Math.floor(s / 60);
  s %= 60;
  var h = Math.floor(m / 60);
  m %= 60;
  var d = Math.floor(h / 24);
  h %= 24;
  return outputFormat(d, ' days, ') + outputFormat(h, ' hours, ') +
    outputFormat(m, ' mins, ') + s + ' secs';
}
