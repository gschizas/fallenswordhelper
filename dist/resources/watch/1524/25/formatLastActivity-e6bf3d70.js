import { T as nowSecs } from './calfSystem-0ffc234f.js';
import { o as outputFormat } from './outputFormat-c14ae873.js';
import { s as splitTime } from './splitTime-10e4bfd4.js';

function formatLastActivity(lastLogin) {
  const timeAry = splitTime(Math.abs(nowSecs - lastLogin));
  return `${outputFormat(timeAry[0], ' days, ')
    + outputFormat(timeAry[1], ' hours, ')
    + outputFormat(timeAry[2], ' mins, ')
    + timeAry[3]} secs`;
}

export { formatLastActivity as f };
//# sourceMappingURL=formatLastActivity-e6bf3d70.js.map
