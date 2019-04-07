import {nowSecs} from '../support/now';

export default function lastActivityToDays(last_activity) {
  return Math.floor((nowSecs - last_activity) / 86400);
}
