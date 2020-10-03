import { T as nowSecs } from './calfSystem-c851a12c.js';
import { o as outputFormat } from './outputFormat-007d893f.js';
import { s as splitTime } from './splitTime-6b91c10c.js';

function formatLastActivity(lastLogin) {
  const timeAry = splitTime(Math.abs(nowSecs - lastLogin));
  return `${outputFormat(timeAry[0], ' days, ')
    + outputFormat(timeAry[1], ' hours, ')
    + outputFormat(timeAry[2], ' mins, ')
    + timeAry[3]} secs`;
}

export { formatLastActivity as f };
//# sourceMappingURL=formatLastActivity-e44808d7.js.map
