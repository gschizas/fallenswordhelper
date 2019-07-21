import {nowSecs} from '../support/now';

export default function lastActivityToDays(last_activity) {
  return Math.floor(Math.max(0, nowSecs - last_activity) / 86400);
}
