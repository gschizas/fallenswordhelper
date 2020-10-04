import { U as nowSecs } from './calfSystem-975d976a.js';
import { o as outputFormat } from './outputFormat-d53ee8dc.js';
import { s as splitTime } from './splitTime-b59440b5.js';

function formatLastActivity(lastLogin) {
  const timeAry = splitTime(Math.abs(nowSecs - lastLogin));
  return `${outputFormat(timeAry[0], ' days, ')
    + outputFormat(timeAry[1], ' hours, ')
    + outputFormat(timeAry[2], ' mins, ')
    + timeAry[3]} secs`;
}

export { formatLastActivity as f };
//# sourceMappingURL=formatLastActivity-416f4f71.js.map
